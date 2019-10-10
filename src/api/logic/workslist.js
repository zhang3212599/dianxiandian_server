module.exports = class extends think.Logic {

  worksTheoryAction() {
    this.allowMethods = 'post';


    let rules = {
      ptid: { required: true, int: true, aliasName: '参数1' },
      cotext: { required: true, string: true, aliasName: '参数2' }
    };

    let flag = this.validate(rules);
    if(!flag){
      return this.fail('提交数据有问题', this.validateErrors);
      // 如果校验失败，返回
      // {"errno":1000,"errmsg":"validate error","data":{"username":"username can not be blank"}}
    }

  }

};
