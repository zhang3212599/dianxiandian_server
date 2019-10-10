module.exports = class extends think.Logic {

  paintingCordAction() {
    this.allowMethods = 'post';

    let rules = {
      ptName: { required: true, string: true, aliasName: '参数1' },
      ptSpot: { required: true, string: true, aliasName: '参数2' },
      ptSpotStep: { required: true, int: true, aliasName: '参数3' },
      ptSpotImg: { required: true, string: true, aliasName: '参数4' },
      ptLine: { required: true, string: true, aliasName: '参数5' },
      ptLineStep: { required: true, int: true, aliasName: '参数6' },
      ptLineImg: { required: true, string: true, aliasName: '参数7' }
    };

    let flag = this.validate(rules);
    if(!flag){
      return this.fail('提交数据有问题', this.validateErrors);
    }

  }


  paintingWarAction() {
    this.allowMethods = 'post';

    let rules = {
      ptId: { required: true, int: true, aliasName: '参数1' },
      ptUid: { required: true, int: true, aliasName: '参数2' },
      ptLineStep: { required: true, string: true, aliasName: '参数3' }
    };

    let flag = this.validate(rules);
    if(!flag){
      return this.fail('提交数据有问题', this.validateErrors);
    }

  }




};
