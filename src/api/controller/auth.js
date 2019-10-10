const Base = require('./base.js');
const rp = require('request-promise');
//const WXBizDataCrypt = require('./WXBizDataCrypt.js');


module.exports = class extends Base {

    async loginByWeixinAction() {
        const code = this.post('code');
        const fullUserInfo = this.post('userInfo');
        const userInfo = fullUserInfo.userInfo;


        // 获取openid
        const options = {
            method: 'GET',
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            qs: {
                grant_type: 'authorization_code',
                js_code: code,
                secret: think.config('weixin.secret'),
                appid: think.config('weixin.appid')
            }
        };

        let sessionData = await rp(options);
        sessionData = JSON.parse(sessionData);
        if (!sessionData.openid) {
            return this.fail(902,'登录失败A');
        }

        // 验证用户信息完整性
        const crypto = require('crypto');
        const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData + sessionData.session_key).digest('hex');
        if (fullUserInfo.signature !== sha1) {
            return this.fail(902,'登录失败B');
        }

        // 解释用户数据
        const WeixinSerivce = this.service('weixin', 'api');
        const weixinUserInfo = await WeixinSerivce.decryptUserInfoData(sessionData.session_key, fullUserInfo.encryptedData, fullUserInfo.iv);
        if (think.isEmpty(weixinUserInfo)) {
            return this.fail(902,'登录失败C');
        }else{
            sessionData.unionid = weixinUserInfo.unionId || '';
        }
        /*let cipherText = new WXBizDataCrypt(think.config('weixin.appid'), sessionData.session_key);
        let cipherText_unionid = cipherText.decryptData(fullUserInfo.encryptedData , fullUserInfo.iv);
        if (think.isEmpty(cipherText_unionid)) {
            return this.fail(902,'登录失败C');
        }else{
            sessionData.unionid = cipherText_unionid.unionId || '';
        }*/

        console.log("用户全部信息："+ JSON.stringify(sessionData));

        // 根据openid查找用户是否已经注册
        let userId = await this.model('userdb').where({ openid: sessionData.openid}).getField('id', true);
        let loginTime = Date.now();
        if (think.isEmpty(userId)) {
            // 注册
            userId = await this.model('userdb').add({
                unionid: sessionData.unionid,
                session_key: sessionData.session_key,
                openid: sessionData.openid,

                user_name: userInfo.nickName || '',
                user_img: userInfo.avatarUrl || '',
                user_gender: userInfo.gender || 1, // 性别 0：未知、1：男、2：女
                user_city: userInfo.city || '',
                user_province: userInfo.province || '',
                user_country: userInfo.country || '',
                user_language: userInfo.language || '',
                user_terminal: '小程序',

                user_time: parseInt(loginTime / 1000),
                user_time_date: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss"),
                user_login_time: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss")
            });
        }

        sessionData.user_id = userId;

        // 查询用户信息
        const newUserInfo = await this.model('userdb').field(['id', 'user_name', 'user_img']).where({ id: userId }).find();

        // 更新登录信息
        userId = await this.model('userdb').where({ id: userId }).update({
            user_login_time: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss")
        });

        const TokenSerivce = this.service('token', 'api');
        const sessionKey = await TokenSerivce.create(sessionData);

        if (think.isEmpty(newUserInfo) || think.isEmpty(sessionKey)) {
            return this.fail(902,'登录失败D');
        }

        return this.success({ token: sessionKey, userInfo: newUserInfo, fulluserInfo: weixinUserInfo});
    }


};
