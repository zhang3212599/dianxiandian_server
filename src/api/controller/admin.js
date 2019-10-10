const Base = require('./base.js');

module.exports = class extends Base {
  //获取用户基本信息
  async indexAction() {
    const Id = this.getLoginUserId();
    if(!(Id > 0)){
      return this.fail(401,'参数有问题');
    }

    const useris = await this.model("userdb").field('id').where({id: ''+ Id +''}).find();
    if(think.isEmpty(useris)) {
      return this.fail(401,"没有的用户id"+ Id +"");
    }

    const user = await this.model("userdb").field('id,user_name,user_img,is_painting,user_notice').where({id: ''+ Id +''}).find();
    let userA = {};
    userA.id = user.id;
    userA.userName = user.user_name;
    userA.userImg = user.user_img;
    userA.ptIs = user.is_painting;
    userA.ctCount = await this.model("createddb").field('is_success').where({"user_id": ''+ Id +''}).count();
    userA.ctCountYes = await this.model("createddb").field('is_success').where({"is_success": '1',"user_id": ''+ Id +''}).count();
    userA.ptNotice = user.user_notice;
    return this.success(userA,'获取成功');
  }


  //修改用户绘画是否显示
  async adminIsptAction() {
    const Id = this.getLoginUserId()
    const bool = this.post('bool');

    if(bool > 1 || bool < 0){
      return this.fail(402,'参数有问题');
    }

    const user = await this.model('userdb').where({id:Id}).update({"is_painting": ""+ bool +""});
    const userptList = await this.model("paintingdb").where('user_id='+ Id +'').update({"is_painting": ""+ bool +""});


    return this.success('获取成功');
  }

  //首页-----获取用户基本信息
  async adminIndexAction() {
    const Id = this.getLoginUserId();
    if(!(Id > 0)){
      return this.fail(401,'参数有问题');
    }
    const user = await this.model("userdb").field('id').where({id: ''+ Id +''}).find();
    if(think.isEmpty(user)) {
      return this.fail(401,"没有的用户id"+ Id +"");
    }

    return this.success(user,'获取成功');
  }

};
