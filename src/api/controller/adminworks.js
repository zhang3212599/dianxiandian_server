const Base = require('./base.js');

module.exports = class extends Base {

    /**
     * 我的绘画
     * */
    async adminWorksUseAction() {
        const Id = this.getLoginUserId();
        const page = this.get('page') || 1;
        const size = 10;

        if(!(Id > 0) || !(page > 0)){
            return this.fail(401,'参数有问题');
        }

        const userList = await this.model("userdb").field('user_name,user_img,is_painting').where({id: ''+ Id +''}).find();

        const data = await this.model('paintingdb').field('id,user_id,painting_name,painting_spotimg,is_painting').where({user_id: ''+ Id +''}).order('painting_time DESC').page(page, size).countSelect();


        const newList = [];
        for (const item of data.data) {
            let newDataObj = {};
            newDataObj.id = item.id;
            newDataObj.ptUid = item.user_id;
            newDataObj.ptName = item.painting_name;
            newDataObj.ptImg = item.painting_spotimg;
            newDataObj.ptIs = userList.is_painting;
            newDataObj.ptCount = await this.model("createddb").where({painting_id: ''+ item.id +''}).count();
            newDataObj.ptUsername = userList.user_name;
            newDataObj.ptUserimg = userList.user_img;
            newList.push(newDataObj);
        }
        data.data = newList;

        return this.success(data,'获取成功');
    }


    /**
     * 我挑战的绘画
     * */
    async adminWorksHeAction() {
        const Id = this.getLoginUserId();
        const page = this.get('page') || 1;
        const size = 10;

        if(!(Id > 0) || !(page > 0)){
            return this.fail(401,'参数有问题');
        }

        const dataDis = await this.model('createddb').where({careated_id:''+ Id +''}).distinct("painting_id").select();
        const createArr = [];
        for (const item of dataDis) {
            const indexId = await this.model("createddb").where({careated_id:''+ Id +'', painting_id:''+ item.painting_id +''}).max('id');
            createArr.push(indexId);
        }

        const newDataList = await this.model("createddb").where({id: ['IN', createArr]}).field('id,painting_id,user_id,is_success').order('createdtime DESC').page(page, size).countSelect();

        /*
        const data = await this.model('createddb').where({careated_id:Id}).field('id,painting_id,user_id,is_success').order('createdtime DESC').page(page, size).countSelect();
         */
        const createddbArr = [];
        for (const item of newDataList.data) {
            let newDataObj = {};
            const ptItem = await this.model('paintingdb').field('id,user_id,painting_name,painting_spotimg').where({id: ''+ item.painting_id +''}).find();
            if(think.isEmpty(ptItem)){
                continue;
            }
            newDataObj.id = ptItem.id;
            newDataObj.ptUid = ptItem.user_id;
            newDataObj.ptName = ptItem.painting_name;
            newDataObj.ptImg = ptItem.painting_spotimg;
            newDataObj.ptIsSuccess = item.is_success;

            newDataObj.ptCount = await this.model("createddb").where({painting_id: ''+ ptItem.id +''}).count();
            const userList = await this.model("userdb").field('user_name,user_img,is_painting').where({id: ''+ ptItem.user_id +''}).find();
            newDataObj.ptIs = userList.is_painting;
            newDataObj.ptUsername = userList.user_name;
            newDataObj.ptUserimg = userList.user_img;
            createddbArr.push(newDataObj);
        }
        newDataList.data = createddbArr;

        return this.success(newDataList,'获取成功');
    }


    /**
     * 我要删除自己的绘画
     * */
    async adminWorksDelAction() {

        //console.log(this.getLoginUserId()) 当前用户Uid
        const Id = this.post('id');
        const Uid = this.getLoginUserId();

        if(!(Id > 0) || !(Uid > 0)){
            return this.fail(401,'参数有问题');
        }

        let ptConfirmIs = await this.model('paintingdb').where({id: ''+ Id +''}).find();
        if(think.isEmpty(ptConfirmIs)) {
            return this.fail(401,"没有的绘画id"+ id +"");
        }

        const data = await this.model('paintingdb').where({id: ''+ Id +'',user_id: ''+ Uid +''}).delete();

        return this.success(data,'获取成功');
    }


};
