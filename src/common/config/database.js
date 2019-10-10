const mysql = require('think-model-mysql');

module.exports = {
    handle: mysql,
    database: 'dianxiandian',
    prefix: '',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'ZHang2*ding&Shou%',
    dateStrings: true
};

/*
//测试环境
module.exports = {
    handle: mysql,
    database: 'dianxiandian',
    prefix: '',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    dateStrings: true
};*/
