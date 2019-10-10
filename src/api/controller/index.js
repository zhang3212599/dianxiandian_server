const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.fail(400,'失败，不提供服务');
    //return this.success("获取成功");
  }


};
