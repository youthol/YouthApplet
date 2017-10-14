"use strict";

const request = require("request");
const rp = require("request-promise");
const md5 = require("md5");
const WXBizDataCrypt = require("../../public/js/WXBizDataCrypt");

module.exports = app => {
  return class ApiController extends app.Controller {
    async index(ctx) {
      ctx.body = {
        router: "/api"
      };
    }

    async getUserList(ctx) {
      const {
        limit,
        offset,
        order_by,
        order
      } = ctx.query;
      ctx.body = await ctx.service.wxUser.list(
        limit || 10,
        offset,
        order_by,
        order
      );
    }

    async getUser(ctx) {
      const {
        uid
      } = ctx.params;
      if (!uid) {
        ctx.body = {
          status: "fail",
          msg: "Invalid uid"
        };
      }
      ctx.body = await ctx.service.wxUser.find(uid);
    }

    async createUser(ctx) {
      const {
        code,
        encryptedData,
        iv
      } = ctx.request.body;
      if (!code) {
        ctx.body = {
          success: false,
          msg: "Invalid code"
        };
      } else {
        const appid = "wx02e80bfe731c15ce";
        const secret = "895a3f909457f69b81872b0f0abbf317";
        const uri = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;

        let uid, pc, decryptData;
        await rp(uri)
          .then(res => {
            let {
              session_key,
              openid
            } = JSON.parse(res);
            if (res.errcode) {
              ctx.body = {
                status: "fail",
                msg: res.errmsg
              };
            } else {
              uid = md5(openid, "youthol");
              pc = new WXBizDataCrypt(appid, session_key);
              decryptData = pc.decryptData(encryptedData, iv);
            }
          })
          .catch(err => {
            console.log(err);
          });
        // console.log("解密后 data: ", decryptData);
        let info = {
          uid,
          avatarUrl: decryptData.avatarUrl,
          city: decryptData.city,
          country: decryptData.country,
          gender: decryptData.gender,
          language: decryptData.language,
          nickName: decryptData.nickName,
          openId: decryptData.openId,
          province: decryptData.province,
          unionid: decryptData.unionid
        };

        const created = await ctx.service.wxUser.create(info);

        ctx.body = {
          status: "success",
          uid
        };
      }
    }

    async putBind(ctx) {
      const data = ctx.request.body;
      const uid = ctx.params.uid;
      if (uid && data.sdutid && data.name) {
        await ctx.service.wxUser.update(uid, data);

        ctx.body = await ctx.service.wxUser.find(uid);
      } else {
        ctx.body = {
          status: "fail",
          errmsg: "Invited data"
        };
      }
    }

    async delBind(ctx) {
      const uid = ctx.params.uid;
      if (uid) {
        const result = await ctx.service.wxUser.del(uid);
        // console.log(result)
        ctx.body = {
          status: "success",
          msg: "delete user successfully"
        };
      } else {
        ctx.body = {
          status: "fail",
          errmsg: "Invited data"
        };
      }
    }

    async feedback(ctx) {
      const {
        uid,
        content
      } = ctx.request.body;
      if (!uid || !content) {
        ctx.body = {
          success: false,
          msg: "Invited data"
        };
      } else {
        await ctx.service.wxUser.feedback(uid, content);
        ctx.body = {
          status: 'success',
          msg: '反馈成功'
        }
      }
    }
  };
};