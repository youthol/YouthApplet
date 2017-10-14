"use strict";

const cheerio = require("cheerio");
const superagent = require("superagent");
const rp = require("request-promise");

module.exports = app => {
  return class Core extends app.Service {
    /**
     * 校历
     * @param {*} date 
     */
    async listCalendar(date) {
      return await this.ctx.model.Calendar.findAll({
        where: {
          date: {
            $gte: date
          }
        },
        attributes: ["id", "date", "content"]
      });
    }

    async create(data) {
      const _this = this;
      const openId = data.openId;
      const user = await this.ctx.model.Calendar.findOne({
        where: {
          openId
        }
      });
      if (!user && !user.deleted_at) {
        user = await user.restore({
          where: {
            openId
          }
        });
        return await user.update(data);
      } else {
        return await this.ctx.model.Calendar.create(data);
      }
    }

    async update({
      openId,
      data
    }) {
      const user = await this.ctx.model.Calendar.findOne(openId);
      if (!user) {
        return "user not found";
      }
      return await user.update(data);
    }

    async del(openId) {
      const user = await this.ctx.model.Calendar.findOne({
        where: {
          openId
        }
      });
      if (!user) {
        return "user not found";
      }
      return user.destroy();
    }

    /**
     * 绩点查询
     */

    async score(xh) {
      let jidian = [];
      let chengji = [];
      let options = {
        method: "POST",
        uri: "http://sdlg.sinaapp.com/Pc/Score/gets.lg",
        formData: {
          xh
        }
      };
      await rp(options)
        .then(body => {
          const $ = cheerio.load(body);
          // 分析绩点信息
          const plen = $(".demo-type-example").find("p").length;
          for (let i = 0; i < plen; i++) {
            let text = $(".demo-type-example").find("p").eq(i).text().trim();
            let attr = text.split("：")[0];
            let value = text.split("：")[1];
            let m = {
              attr,
              value
            };
            if (m.value) {
              jidian.push(m);
            }
          }
          // 分析单科成绩
          const trlen = $("tbody").find("tr").length;
          for (let i = 0; i < trlen; i++) {
            let xh = $("tbody").find("tr").eq(i).find("td").eq(0).text().trim();
            let mc = $("tbody").find("tr").eq(i).find("td").eq(1).text().trim();
            let xf = $("tbody").find("tr").eq(i).find("td").eq(2).text().trim();
            let cj = $("tbody").find("tr").eq(i).find("td").eq(3).text().trim();
            let jd = $("tbody").find("tr").eq(i).find("td").eq(4).text().trim();
            let n = {
              xh,
              mc,
              xf,
              cj,
              jd
            };
            if (n.mc) {
              chengji.push(n);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      return {
        jidian,
        chengji
      };
    }

    /**
     * 四六级查询
     * @param {姓名，准考证号} xm,zkzh
     */
    async searchCET(xm, zkzh) {
      return new Promise((resolve, reject) => {
        superagent
          .get('http://www.chsi.com.cn/cet/query')
          .set({
            'Referer': 'http://www.chsi.com.cn/cet/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
          })
          .query({
            zkzh,
            xm
          })
          .end(function (err, sres) {
            if (err) {
              reject(err)
            }
            resolve(sres.text)
          })
      })
    }

    /**
     * 解析四六级数据
     * @param {数据} data
     */
    async parseCET(data) {
      let name, school, type, number, total, listen, read, writing
      const $ = cheerio.load(data)
      $('table.cetTable tr').each((index, ele) => {
        let text = $(ele).find('td').text().trim()
        let lastText = $(ele).children().last().text().trim()

        name = index == 0 ? text : name // 姓名
        school = index == 1 ? text : school // 学校
        type = index == 2 ? text : type //考试类别
        number = index == 4 ? text : number //准考证号
        total = index == 5 ? ($(ele).find('span.colorRed').text().trim() - 0) : total
        listen = index == 6 ? lastText : listen //听力
        read = index == 7 ? lastText : read //阅读
        writing = index == 8 ? lastText : writing //写作和翻译
      })

      return {
        name,
        school,
        type,
        number,
        total,
        listen,
        read,
        writing
      }
    }

    /**
     * 新生信息查询
     * @param {考试号} exam_num 
     */
    async findNewSdut(exam_num) {
      const that = this;
      const user = await this.ctx.model.NewSduts.findOne({
        where: {
          exam_num
        },
        attributes: ["sdutid", "class_name", "campus", "domain", "level", "school_len", "province", "exam_num", "sdut_name", "gender", "nation", "report_location", "college"]
      });

      user.dataValues.all = await this.ctx.model.NewSduts.count({
        where: {
          class_name: user.dataValues.class_name
        }
      });
      user.dataValues.male = await this.ctx.model.NewSduts.count({
        where: {
          class_name: user.dataValues.class_name,
          gender: "男"
        }
      });
      user.dataValues.female = user.dataValues.all - user.dataValues.male;
      user.dataValues.ratio = (user.dataValues.male / user.dataValues.female).toFixed(2);

      return user;
    }
    /**
     * 新生宿舍查询
     * @param {*学生姓名} sdut_name 
     */
    async findDorm(sdut_name) {
      const user = await this.ctx.model.FreshDorm.findAll({
        where: {
          sdut_name
        },
        attributes: ["sdut_id", "sdut_name", "gender", "nation", "class_name", "apartment", "room", "bed"]
      });

      for (let i in user) {
        user[i].dataValues.roommates = await this.ctx.model.FreshDorm.findAll({
          where: {
            room: user[i].dataValues.room
          },
          attributes: ["sdut_name", "nation", "class_name", "bed"],
          order: [
            ['bed', 'ASC']
          ],
        });
      }

      return user;
    }
    /**
     * 沸点列表
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order_by 
     * @param {*} order 
     */
    async findBoils(offset = 0, limit = 10, order_by = 'created_at', order = 'DESC') {
      const boils = await this.ctx.model.Boiling.findAll({
        offset,
        limit,
        order: [
          [order_by, order.toUpperCase()]
        ],
        attributes: ["eid", "title", "descript", "picUrl", "created_at"]
      });

      return boils;

    }
    /**
     * 沸点详情
     * @param {*} eid 
     */
    async findBoil(eid) {
      const boiling = await this.ctx.model.Boiling.findOne({
        where: {
          eid
        },
        attributes: ["eid", "title", "descript", "picUrl", "created_at"]
      });
      const boiling_comm = await this.ctx.model.BoilingComm.findAll({
        where: {
          eid
        },
        order: [
          ['created_at', 'DESC']
        ],
        attributes: ["eid", "nickName", "content", "created_at"]
      });
      return {
        boiling,
        boiling_comm
      }
    }
    /**
     * 沸点评论
     * @param {*} eid 
     * @param {*} content 
     * @param {*} nickName 
     */
    async createBoilComm(eid, content, nickName) {
      const data = {
        eid,
        content,
        nickName
      }
      return await this.ctx.model.BoilingComm.create(data);
    }
    /**
     * 每日一句话
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order_by 
     * @param {*} order 
     */
    async findQuotes(offset = 0, limit = 7, order_by = 'date', order = 'DESC') {
      const boils = await this.ctx.model.Quote.findAll({
        offset,
        limit,
        order: [
          [order_by, order.toUpperCase()]
        ]
      });

      return boils;
    }

  };
};