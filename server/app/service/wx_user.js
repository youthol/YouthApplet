"use strict";

module.exports = app => {
  return class User extends app.Service {
    async list({
      offset = 0,
      limit = 10,
      order_by = "created_at",
      order = "DESC"
    }) {
      return await this.ctx.model.WxUser.findAll({
        offset,
        limit,
        order: [
          [order_by, order.toUpperCase()]
        ]
      });
    }

    async find(uid) {
      return await this.ctx.model.WxUser.findOne({
        where: {
          uid
        },
        attributes: [
          "uid",
          "avatarUrl",
          "nickName",
          "gender",
          "city",
          "province",
          "country",
          "language",
          "sdutid",
          "name",
          "college",
          "grade",
          "dormitory",
          "room",
          "phone"
        ]
      });
    }

    async create(data) {
      const openId = data.openId;

      return await this.ctx.model.WxUser.upsert(data, {
        where: {
          openId
        }
      });
    }

    async update(uid, data) {
      if (!uid || !data) {
        return;
      } else {
        await this.ctx.model.WxUser.restore({
          where: {
            uid
          }
        });

        return await this.ctx.model.WxUser.update(data, {
          where: {
            uid
          }
        });
      }
    }

    async del(uid) {
      const user = await this.ctx.model.WxUser.findOne({
        where: {
          uid
        }
      });
      if (!user) {
        return "user not found";
      }
      return user.destroy();
    }

    async feedback(uid, content) {
      const data = {
        uid,
        content
      };
      if (uid && content) {
        return await this.ctx.model.Feedback.create(data);
      } else {
        return false
      }
    }
  };
};