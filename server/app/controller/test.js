"use strict";

module.exports = app => {
  return class TestController extends app.Controller {
    async index(ctx) {
      ctx.body = {
        msg: "This is an interesting test !"
      };
    }
  };
};
