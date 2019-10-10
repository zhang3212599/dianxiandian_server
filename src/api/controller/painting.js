const Base = require('./base.js');
const request = require("request");
const path = require('path');
const fs = require("fs");

module.exports = class extends Base {

    /**
     * 获取挑战绘画信息
     * */
    async indexAction() {
        const Id = this.get('id') || '';
        const data = {};

        if(!(Id > 0)){
            return this.fail(401,'参数有问题');
        }

        const painting = await this.model("paintingdb").field('id,user_id,painting_name,painting_spot,painting_spotstep,painting_spotimg,painting_linestep').where({id: ''+ Id +''}).find();
        if(think.isEmpty(painting)){
            return this.fail(401,'没有的绘画');
        }

        data.id = painting.id;
        data.ptName = painting.painting_name;
        data.ptSpot = painting.painting_spot;
        data.ptSpotStep = painting.painting_spotstep;
        data.ptSpotImg = painting.painting_spotimg;
        data.ptLineStep = painting.painting_linestep;
        data.ptUserId = painting.user_id;

        return this.success(data,'获取成功');
    }


    /**
     * 提交绘画
     * */
    async paintingCordAction() {
        const ptUid = this.getLoginUserId();
        const ptName = this.post('ptName') || '';
        const ptSpot = this.post('ptSpot') || '';
        const ptSpotStep = this.post('ptSpotStep') || '';
        const ptSpotImg = this.post('ptSpotImg') || '';
        const ptLine = this.post('ptLine') || '';
        const ptLineStep = this.post('ptLineStep') || '';
        const ptLineImg = this.post('ptLineImg') || '';


        if(!(ptUid > 0) || ptName == '' || ptSpot == '' || ptSpotStep =='' || ptSpotImg == '' || ptLine == '' || ptLineStep == '' || ptLineImg == ''){
            return this.fail(401,'参数有问题');
        }

        const userIs = await this.model('userdb').where({id:ptUid}).find();
        if(think.isEmpty(userIs)){
            return this.fail(401,'不存在的用户');
        }

        let loginTime = Date.now();
        const data = await this.model("paintingdb").add({
            user_id: ptUid,
            painting_name: ptName,
            painting_spot: ptSpot,
            painting_spotstep: ptSpotStep,
            painting_spotimg: ptSpotImg,
            painting_line: ptLine,
            painting_linestep: ptLineStep,
            painting_lineimg: ptLineImg,
            is_painting: userIs.is_painting,
            painting_time: parseInt(loginTime / 1000),
            painting_time_date: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss")
        });

        return this.success(data,'获取成功');
    }


    /**
     * 挑战绘画-提交
     * */
    async paintingWarAction() {
        const ptId = this.post('ptId') || '';
        const ptUid = this.post('ptUid') || ''; //绘画用户
        const ptCoUid = this.getLoginUserId(); //挑战用户
        const ptLineStep = this.post('ptLineStep') || '';

        if(ptId == '' || ptUid == '' || ptCoUid == '' || ptLineStep == ''){
            return this.fail(401,'参数有问题');
        }

        const paintingIs = await this.model('paintingdb').where({id:ptId}).find();
        if(think.isEmpty(paintingIs)){
            return this.fail(401,'不存在的绘画');
        }

        const userIs = await this.model('userdb').where({id:ptCoUid}).find();
        if(think.isEmpty(userIs)){
            return this.fail(401,'不存在的用户');
        }

        let ptWarIs = 0;
        let ptLineStepArr = JSON.parse(ptLineStep);
        let ptLineStepArrLen = ptLineStepArr.length;
        let painting_lineArr = JSON.parse(paintingIs.painting_line);
        let painting_lineArrLen = painting_lineArr.length;
        if(ptLineStepArrLen == painting_lineArrLen){ //长度一样
            let arrIndex = 0;
            for(let x=0; x<painting_lineArrLen; x++){
                for(let y=0; y<painting_lineArrLen; y++){
                    let reverseObj = {};
                    reverseObj.moveLeft = painting_lineArr[y].lineLeft;
                    reverseObj.moveTop = painting_lineArr[y].lineTop;
                    reverseObj.lineLeft = painting_lineArr[y].moveLeft;
                    reverseObj.lineTop = painting_lineArr[y].moveTop;
                    if((JSON.stringify(ptLineStepArr[x]) == JSON.stringify(painting_lineArr[y])) || (JSON.stringify(ptLineStepArr[x]) == JSON.stringify(reverseObj))){
                        arrIndex++;
                    }
                    /*if(JSON.stringify(ptLineStepArr[x]) == JSON.stringify(painting_lineArr[y])){
                        arrIndex++;
                    }*/
                }
            }
            if(arrIndex == painting_lineArrLen){
                ptWarIs = 1;
            }
            //ptWarIs = 1;
        }

        let loginTime = Date.now();
        await this.model('createddb').add({
            painting_id: ptId,
            user_id: ptUid,
            careated_id: ptCoUid,
            is_success: ptWarIs,
            createdtime: parseInt(loginTime / 1000),
            createdtime_date: think.datetime(loginTime,"YYYY-MM-DD HH:mm:ss")
        });

        if(ptWarIs){
            return this.success('挑战成功');
        }else{
            return this.fail(202,'挑战失败');
        }

    }


    /**
     * 分享绘画 - 分享绘画基本信息
     * */
    async paintingShareAction() {
        const Id = this.get('id') || '';

        if(!(Id > 0)){
            return this.fail(401,'参数有问题');
        }

        const painting = await this.model("paintingdb").field('painting_spotimg,painting_name').where({id: ''+ Id +''}).find();
        if(think.isEmpty(painting)){
            return this.fail(401,'没有的绘画');
        }

        return this.success(painting,'获取成功');
    }

    /**
     * 绘画图片生成
     * */
    async paintingBaseImgAction(){
        let imgData = this.post("baseimg");
        let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = new Buffer(base64Data, 'base64');
        let base64str = new Buffer(dataBuffer).toString('base64'); //图片转字节
        let uploadsImg = Date.now() +"_"+ this.getLoginUserId() +".png";
        let uploadsUrl = think.ROOT_PATH +'/www/adminvip/uploads/' + uploadsImg;

        //nodejs fs模块写入
        fs.writeFile(uploadsUrl, dataBuffer, function (err,uploadsBool) {//同步writeFileSync；异步writeFile；
            if (err) throw err;
            //console.log('文件写入成功');
        });

        //返回数据
        return this.success("https://www.yuganwang.com/adminvip/uploads/"+uploadsImg,"上传成功");
    }


};
