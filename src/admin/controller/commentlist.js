const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const page = this.get('page') || 1;
    const ptid = this.get('Id') || '';
    const size = 20;

    if((ptid != '' && !(ptid > 0)) || !(page > 0)){
      return this.fail(401,'参数有问题');
    }

    const whereObj = {};
    ptid > 0 ? whereObj.painting_id = ptid : '';

    const modelA = this.model('commentdb');
    const data = await modelA.field(['id', 'painting_id', 'user_id', 'comment_text', 'comment_time_date']).where(whereObj).order(['id DESC']).page(page, size).countSelect();

    const newList = [];
    for (const item of data.data) {
      let newDataObj = {};
      newDataObj.id = item.id;
      newDataObj.ptid = item.painting_id;
      newDataObj.ptuid = item.user_id;
      newDataObj.pttext = item.comment_text;
      newDataObj.pttime = item.comment_time_date;
      newList.push(newDataObj);
    }
    data.data = newList;


    return this.success(data,'获取成功');
  }

};
