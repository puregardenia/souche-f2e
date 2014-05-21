// Generated by CoffeeScript 1.7.1
(function() {
  var app, config, express, expressUglify, fs, http, less, lessmiddle, log4js, logger, path, rainbow;

  express = require('express');

  http = require('http');

  require('./lib/modelLoader.coffee');

  require('./lib/functionLoader.coffee');

  path = require('path');

  config = global.__CONFIG = require('./config.coffee');

  rainbow = require('./lib/rainbow.js');

  lessmiddle = require('less-middleware');

  less = require('less');

  fs = require('fs');

  expressUglify = require('express-uglify');

  log4js = require('log4js');

  log4js.configure({
    appenders: [
      {
        type: 'console'
      }
    ]
  });

  logger = log4js.getLogger('normal');

  logger.setLevel('INFO');

  app = express();

  app.configure(function() {
    app.set("port", config.run_port);
    app.set("views", config.demo_path);
    app.set("view engine", "jade");
    app.use(express.favicon());
    app.use("/assets", lessmiddle({
      src: config.assets_path,
      compress: false,
      force: true
    }));
    app.use("/assets", express["static"](config.assets_path));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.cookieSession({
      secret: 'fd2afdsafdvcxzjaklfdsa'
    }));
    app.use(log4js.connectLogger(logger, {
      level: log4js.levels.INFO
    }));
    app.locals.pretty = true;
    app.get(/^\/demo\/(.*)$/, function(req, res, next) {
      var _path;
      console.log(req.params[0]);
      res.locals.query = req.query;
      _path = path.join(config.demo_path, req.params[0] + ".jade");
      if (fs.existsSync(_path)) {
        return res.render("./../../../demo/" + req.params[0] + ".jade", {
          pretty: true
        });
      } else {
        return fs.readFile(path.join(config.demo_path, req.params[0]), 'utf-8', function(error, content) {
          if (error) {
            return next(error);
          } else {
            return res.send(content);
          }
        });
      }
    });
    app.use(app.router);
    rainbow.route(app, {
      controllers: '/controllers/',
      filters: '/filters/',
      template: '/views/'
    });
    app.all("*", function(req, res, next) {
      return res.send("页面不存在", 404);
    });
    app.use(function(err, req, res, next) {
      console.trace(err);
      return res.send(err.message, 404);
    });
    app.locals.moment = require('moment');
    return app.locals.moment.lang('zh-cn');
  });

  app.set('env', 'development');

  console.log(process.env.NODE_ENV);

  app.configure("development", function() {
    return app.use(express.errorHandler());
  });

  module.exports = app;

}).call(this);
