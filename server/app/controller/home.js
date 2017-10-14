"use strict";

module.exports = app => {
  return class HomeController extends app.Controller {
    async index(ctx) {
      ctx.body = {
        name: app.config.pkg.description,
        version: app.config.pkg.version,
        contact: "youth@sdut.edu.cn"
      };
    }
  };
};
