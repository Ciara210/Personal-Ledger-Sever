/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606747991901_2392';

  // add your middleware config here
  config.middleware = [];

  config.jwt = {
    secret: 'Ciara',
  };

  config.multipart = {
    mode: 'file',
    fileSize: '50kb'
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ '*' ], 
  };
  config.cors = {
    credentials: true, 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };

  exports.mysql = {
    
    client: {
      host: 'localhost',
      port: '',
      user: 'root',
      password: '', 
      database: 'Ciara-cost', 
    },
    app: true,
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};