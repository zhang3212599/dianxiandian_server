module.exports = class extends think.Controller {
  async __before() {
    // 根据token值获取用户id
    this.ctx.state.token = this.ctx.header['x-dianxiandian-token'] || '';
    const tokenSerivce = think.service('token', 'api');
    this.ctx.state.id = await tokenSerivce.getUserId(this.ctx.state.token);

    if (this.ctx.controller !== 'auth') {
      if (this.ctx.state.id <= 0) {
        return this.fail(999, '请先登录');
      }
    }
  }

  /**
   * 获取时间戳
   * @returns {Number}
   */
  getTime() {
    return parseInt(Date.now() / 1000);
  }

  /**
   * 获取当前登录用户的id
   * @returns {*}
   */
  getLoginUserId() {
    return this.ctx.state.id;
  }
};
