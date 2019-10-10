const Base = require('./base.js');

module.exports = class extends Base {
  /*indexAction() {
    return this.display();
  }*/

  async indexAction() {
    const uid = this.get('id') || '';;
    const page = this.get('page') || 1;
    //const size = this.get('size') || 10;
    const size = 20;
    const name = this.get('name') || '';

    if((uid != '' && !(uid > 0)) || !(page > 0)){
      return this.fail(401,'参数有问题');
    }

    const whereObj = {user_name: ['like', `%${name}%`]};
    uid > 0 ? whereObj.id = uid : '';

    const modelA = this.model('userdb');
    const data = await modelA.field(['id', 'user_name', 'user_gender', 'user_city', 'is_painting', 'user_time_date']).where(whereObj).order(['id DESC']).page(page, size).countSelect();

    const newList = [];
    for (const item of data.data) {
      let newDataObj = {};
      newDataObj.id = item.id;
      newDataObj.name = item.user_name;
      newDataObj.gender = item.user_gender;
      newDataObj.city = item.user_city;
      newDataObj.ispt = item.is_painting;
      newDataObj.count = await this.model('paintingdb').where({user_id: item.id }).count();
      newDataObj.buildTime = item.user_time_date;
      newList.push(newDataObj);
    }
    data.data = newList;

    return this.success(data,'获取成功');
  }

};
