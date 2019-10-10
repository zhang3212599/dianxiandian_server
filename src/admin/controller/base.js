module.exports = class extends think.Controller {
  async __before() {
    // 根据token值获取用户id
    this.ctx.state.token = this.ctx.header['x-dianxiandian-token'] || '';
    const tokenSerivce = think.service('token', 'admin');
    this.ctx.state.id = await tokenSerivce.getUserId(this.ctx.state.token);
    // 只允许登录操作
    if (this.ctx.controller !== 'auth') {
      if (this.ctx.state.id <= 0) {
        return this.fail(999, '请登录用户。');
      }
    }

  }
};
