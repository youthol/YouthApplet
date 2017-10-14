"use strict";

module.exports = appInfo => {
  const config = {};

  config.keys = appInfo.name + "_1501126993367_6733";
  config.proxy = true;
  config.security = {
    domainWhiteList: ['http://www.youthol.cn/', 'http://localhost:8080'],
    xframe: {
      enable: false
    },
    csrf: {
      ignoreJSON: true,
      queryName: "_csrf",
      bodyName: "_csrf"
    }
  };
  config.cors = {
    allowMethods: "GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH"
  };
  config.multipart = {
    fileExtensions: [".xls", ".doc", ".ppt", ".docx", ".xlsx", ".pptx"]
  };
  config.i18n = {
    defaultLocale: "zh-CN"
  };

  return config;
};