module.exports = class extends think.Model {

    async getHotList(page,size){
        /*const list = await this.model('paintingdb').join({
            table: 'createddb',
            join: 'left', //join 方式，有 left, right, inner 3 种方式
            on: ['paintingdb.id','createddb.painting_id'], //ON 条件,
            field: ['createddb.painting_id'],
            count: '*'
        }).where({'paintingdb.is_painting':'1'}).order(['createddb.painting_id DESC']).page(page, 50).countSelect();*/


        const newList = await this.query("select id,user_id,painting_name,painting_spotimg,is_painting, (SELECT COUNT(1) FROM createddb WHERE createddb.painting_id = paintingdb.id) as countA from paintingdb where DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(painting_time_date) and is_painting = 1 ORDER BY countA DESC LIMIT "+ page +","+ size +"");
        return newList;
    }

    async getNewList(page,size){
        const newList = await this.query("select id,user_id,painting_name,painting_spotimg,is_painting, (SELECT COUNT(1) FROM createddb WHERE createddb.painting_id = paintingdb.id) as countA from paintingdb WHERE is_painting = 1 ORDER BY id DESC LIMIT "+ page +","+ size +"");
        return newList;

    }

    async getUserList(id) {
        const userList = await this.model("userdb").field('user_name,user_img').where({id: ''+ id +''}).find();
        return userList;
    }

}