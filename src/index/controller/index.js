/*
const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    //const admin = await this.model('adminuser').where({ username: "dahai" }).find();
    return this.success({
      token: '首页测试'
    });
  }


};
*/

const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const admin = await this.model('adminuser').field(['id']).where({ username: "dahai" }).find();
    admin.token = 19;
    return this.success({
      admin: admin
    });
  }
};
