'use strict';

module.exports = app => {
  return class CoreController extends app.Controller {
    async index(ctx) {
      ctx.body = {
        desc: 'Youthol Applet API Core Server'
      };
    }

    async getCalendar(ctx) {
      const n = {
        y: new Date().getFullYear(),
        m: new Date().getMonth(),
        d: new Date().getDate()
      };
      const date = new Date(n.y, n.m, n.d);
      ctx.body = await ctx.service.core.listCalendar(date);
    }

    async getScore(ctx) {
      const xh = ctx.params.xh;
      const result = await ctx.service.core.score(xh);
      ctx.body = result;
    }

    async getCET(ctx) {
      const {
        xm,
        zkzh
      } = ctx.query;

      const data = ctx.service.core.searchCET(xm, zkzh).catch(err => {
        console.log(err)
      })
      const result = ctx.service.core.parseCET(data)

      ctx.body = result.total > 0 ? result : 'err'
    }

    async getNewSdut(ctx) {
      const {
        exam_num
      } = ctx.query;
      const user = await ctx.service.core.findNewSdut(exam_num);
      ctx.body = user;
    }

    async getDorm(ctx) {
      const xm = ctx.query.xm;
      const user = await ctx.service.core.findDorm(xm);

      ctx.body = user;
    }

    async getBoils(ctx) {
      const result = await ctx.service.core.findBoils();
      ctx.body = result;
    }

    async getBoil(ctx) {
      const eid = ctx.query.eid;
      if (eid) {
        ctx.body = await ctx.service.core.findBoil(eid);
      } else {
        result = {
          status: 'fail',
          errmsg: 'Invited eid'
        }
      }
    }

    async commBoil(ctx) {
      const eid = ctx.params.eid;
      const {
        content,
        nickName
      } = ctx.request.body;
      // console.log(nickName)
      await ctx.service.core.createBoilComm(eid, content, nickName);
      ctx.body = "success"
    }

    async getQuotes(ctx) {
      const result = await ctx.service.core.findQuotes();
      ctx.body = result;
    }

  };
};