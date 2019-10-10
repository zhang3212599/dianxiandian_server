// default config
module.exports = {
  default_module: 'api',
  //errnoField: 'returnCode', // errno field
  //errmsgField: 'returnMsg', // errmsg field
  weixin: {
    appid: 'wx2ccbd155987444b7', // 小程序 点线点appid
    secret: '1c9186af6158927c094cf7fee1f07ffe',

    //appid: 'wxdd589557778ba6d4', // 小程序 申请的测试账号 appid
    //secret: '58741defb97739b34eca69c68042437c',
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知，例：https://www.yuganwang.com/api/pay/notify
  },
  express: {
    // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.yuganwang.com/
    appid: '', // 对应快递鸟用户后台 用户ID
    appkey: '', // 对应快递鸟用户后台 API key
    request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
  }
};
