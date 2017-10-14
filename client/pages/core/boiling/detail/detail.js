let app = getApp();
Page({
  data: {
    boiling: {},
    boiling_comm: []
  },
  onLoad(options) {
    let eid = options.eid;
    this.getBoil(eid)
  },
  getBoil(eid) {
    if (!eid) {
      return;
    } else {
      wx.request({
        url: `${app.server}/core/boil`,
        data: { eid },
        success: res => {
          console.log(res)
          const { boiling, boiling_comm } = res.data;
          this.setData({
            boiling,
            boiling_comm
          })
        },
        fail: err => {
          app.showErrModal('获取校园沸点内容失败，请稍后再试！')
        }
      })
    }
  }
})