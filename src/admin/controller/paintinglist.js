const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const page = this.get('page') || 1;
    const ptid = this.get('Id') || '';
    const ptuid = this.get('userId') || '';
    //const size = this.get('size') || 10;
    const size = 10;
    const pttext = this.get('ptText') || '';

    if((ptid != '' && !(ptid > 0)) || (ptuid != '' && !(ptuid > 0))){
      return this.fail(401,'参数有问题');
    }

    const whereObj = {painting_name: ['like', `%${pttext}%`]};
    ptid > 0 ? whereObj.id = ptid : '';
    ptuid > 0 ? whereObj.user_id = ptuid : '';

    const modelA = this.model('paintingdb');
    const data = await modelA.field(['id', 'user_id', 'painting_name', 'painting_spot', 'painting_spotstep', 'painting_spotimg', 'painting_line', 'painting_linestep','painting_lineimg','is_painting','painting_time_date']).where(whereObj).order(['id DESC']).page(page, size).countSelect();

    const newList = [];
    for (const item of data.data) {
      let newDataObj = {};
      newDataObj.id = item.id;
      newDataObj.uid = item.user_id;
      newDataObj.pttext = item.painting_name;
      newDataObj.ptspotA = item.painting_spotstep;
      newDataObj.ptspotB = item.painting_spotimg;
      newDataObj.ptspotC = item.painting_spot;
      newDataObj.ptlineA = item.painting_linestep;
      newDataObj.ptlineB = item.painting_lineimg;
      newDataObj.ptlineC = item.painting_line;
      newDataObj.ispt = item.is_painting;
      newDataObj.ptwarnum = await this.model('createddb').where({painting_id: item.id }).count();
      newDataObj.ptcomment = await this.model('commentdb').where({painting_id: item.id }).count();
      newDataObj.pttime = item.painting_time_date;
      newList.push(newDataObj);
    }
    data.data = newList;


    return this.success(data,'获取成功');
  }

};
