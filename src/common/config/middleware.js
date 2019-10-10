const path = require('path');
const isDev = think.env === 'development';
const kcors = require('kcors');
//const payload = require('think-payload');

module.exports = [
  {
    handle: kcors, // 处理跨域
    options: {}
},
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: true, // 始终开启，默认为 `enable: isDev` 表示只再开发环境下开启
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: '/adminvip',
      index: 'index.html'
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
      error(err, ctx){
        return ctx.json({
          [ctx.app.think.config('errnoField')]: ctx.app.think.config('defaultErrno'),
          [ctx.app.think.config('errmsgField')]: err.toString(),
        });
      }
    }
  },
  {
    handle: 'payload',
    options: {
      uploadDir: path.join(think.ROOT_PATH, 'www/xiaochengxu/www/adminvip/uploads/')
    }
  },
  {
    handle: 'router',
    options: {
      defaultModule: 'index',
      defaultController: 'index',
      defaultAction: 'index'
    }
  },
  'logic',
  'controller'
];
