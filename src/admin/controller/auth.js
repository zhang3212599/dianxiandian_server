const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const username = this.post('username');
    const password = this.post('password');
    let passSalt = "张寿丁";
    let loginTime = Date.now();

    /*let md5Add = think.md5(password + '' + passSalt);
    let data = await this.model('adminuser').add({
      username: username,
      password: md5Add,
      usertel: 18621385215,
      login_time: parseInt(loginTime / 1000),
      login_time_date: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss"),
      login_ip: this.ctx.ip
    });
    return this.success(data, "添加用户成功");*/


    const admin = await this.model('adminuser').where({ username: username }).find();
    if (think.isEmpty(admin)) {
      return this.fail(401, '用户名或密码不正确');
    }

    if (think.md5(password + '' + passSalt) !== admin.password) {
      return this.fail(400, '用户名或密码不正确');
    }

    // 更新登录信息
    await this.model('adminuser').where({ id: admin.id }).update({
      login_time: parseInt(loginTime / 1000),
      login_time_date: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss"),
      login_ip: this.ctx.ip
    });

    const TokenSerivce = this.service('token', 'admin');
    const sessionKey = await TokenSerivce.create({
      user_id: admin.id
    });

    if (think.isEmpty(sessionKey)) {
      return this.fail(403,'登录失败,未获取到sessionKey');
    }

    const userInfo = {
      token: sessionKey,
      id: admin.id,
      username: admin.username
    };

    return this.success(userInfo, "获取成功");

  }
};
