const Base = require('./base.js');

module.exports = class extends Base {

    /**
     * 热门绘画列表
     * */
    async workslistHotAction() {
        const page = this.get('page') || 1;
        const size = 10;

        if(!(page > 0)){
            return this.fail(401,'参数有问题');
        }

        const pageA = parseInt(page - 1) * size;
        const sizeA = parseInt(page * size);
        const data = await this.model('workslist').getHotList(pageA,sizeA);

        const newList = [];
        for (const item of data) {
            let newDataObj = {};
            newDataObj.id = item.id;
            newDataObj.ptUid = item.user_id;
            newDataObj.ptName = item.painting_name;
            newDataObj.ptImg = item.painting_spotimg;
            newDataObj.ptIs = item.is_painting;
            newDataObj.ptCount = item.countA;
            let userList = await this.model('workslist').getUserList(item.user_id);
            newDataObj.ptUsername = userList.user_name;
            newDataObj.ptUserimg = userList.user_img;
            newList.push(newDataObj);
        }
        const dataA = newList;

        return this.success(dataA,'获取成功');
    }


    /**
     * 最新绘画列表
     * */
    async workslistNewAction() {
        const page = this.get('page') || 1;
        const size = 10;
        if(!(page > 0)){
            return this.fail(401,'参数有问题');
        }

        const pageA = parseInt(page - 1) * size;
        const sizeA = parseInt(page * size);
        const data = await this.model('workslist').getNewList(pageA,sizeA);

        const newList = [];
        for (const item of data) {
            let newDataObj = {};
            newDataObj.id = item.id;
            newDataObj.ptUid = item.user_id;
            newDataObj.ptName = item.painting_name;
            newDataObj.ptImg = item.painting_spotimg;
            newDataObj.ptIs = item.is_painting;
            newDataObj.ptCount = item.countA;
            let userList = await this.model('workslist').getUserList(item.user_id);
            newDataObj.ptUsername = userList.user_name;
            newDataObj.ptUserimg = userList.user_img;
            newList.push(newDataObj);
        }
        const dataA = newList;

        return this.success(dataA,'获取成功');
    }


    /**
     * 绘画详情
     * */
    async worksDetailsAction() {
        const Id = this.get('id') || '';
        const data = {};

        if(!(Id > 0)){
            return this.fail(401,'参数有问题');
        }

        const painting = await this.model("paintingdb").field('id,user_id,painting_name,painting_spotstep,painting_spotimg,painting_linestep').where({id: ''+ Id +''}).find();
        if(think.isEmpty(painting)){
            return this.fail(202,'没有的绘画');
        }

        const user = await this.model("userdb").field('user_name,user_img').where({id: ''+ painting.user_id +''}).find();

        data.id = painting.id;
        data.ptName = painting.painting_name;
        data.ptImg = painting.painting_spotimg;
        data.ptCountStep = parseInt(painting.painting_spotstep + painting.painting_linestep);
        data.ptUserId = painting.user_id;
        data.ptUserName = user.user_name;
        data.ptUserImg = user.user_img;
        data.ptWar = await this.model("createddb").where({painting_id: ''+ Id +''}).count();
        data.ptWarSucc = await this.model("createddb").where({painting_id: ''+ Id +'', is_success: 1}).count();

        return this.success(data,'获取成功');
    }


    /**
     * 绘画详情_评论列表
     * */
    async worksDetailsTheoryAction() {
        const Id = this.get('id') || '';
        const page = this.get('page') || '1';
        const size = 20;

        if(!(Id > 0) || !(page > 0)){
            return this.fail(401,'参数有问题');
        }

        const data = await this.model("commentdb").field('user_id,comment_text,comment_time_date').where({painting_id: ''+ Id +''}).order('comment_time_date DESC').page(page,size).countSelect();

        const newList = [];
        for (const item of data.data) {
            let newDataObj = {};
            newDataObj.coText = item.comment_text;
            newDataObj.coTime = item.comment_time_date;
            let userData = await this.model('userdb').field('user_name,user_img').where({id: item.user_id }).find();
            newDataObj.coName = userData.user_name;
            newDataObj.coImg = userData.user_img;
            newList.push(newDataObj);
        }
        data.data = newList;

        return this.success(data,'获取成功');
    }


    /**
     * 绘画详情_发起评论
     * */
    async worksTheoryAction() {
        const Id = this.getLoginUserId(); //挑战用户
        const ptId = this.post('ptid') || '';
        const cotext = this.post('cotext') || '';

        if(!(Id > 0) || !(ptId > 0) || cotext == ''){
            return this.fail(401,'参数有问题');
        }

        const coCount = await this.model("commentdb").where({painting_id:ptId, user_id:Id }).count();
        if(coCount >= 7){
            return this.fail(202,'最多评论7条');
        }

        let loginTime = Date.now();
        const commentAdd = await this.model("commentdb").add({
            painting_id: ptId,
            user_id: Id,
            comment_text: cotext,
            comment_time: parseInt(loginTime / 1000),
            comment_time_date: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss")
        });

        const data = await this.model("userdb").field('user_name,user_img').where({id: ''+ Id+''}).find();
        data.coId = commentAdd;

        return this.success(data,'获取成功');
    }


};
