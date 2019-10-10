module.exports = class extends think.Logic {

  adminWorksDelAction() {
    this.allowMethods = 'post';

    let rules = {
      id: { required: true, int: true, aliasName: '参数1' }
    };

    let flag = this.validate(rules);
    if(!flag){
      return this.fail('提交数据有问题', this.validateErrors);
      // 如果校验失败，返回
      // {"errno":1000,"errmsg":"validate error","data":{"username":"username can not be blank"}}
    }

  }

};
