let app = getApp();
let wxCharts = app.wxCharts;
let pieChart = null;
Page({
  data: {
    showMore: false
  },
  onLoad(options) {
    const { zkzh, xm } = options;
    wx.request({
      url: `${app.server}/core/cet`,
      data: {
        zkzh, xm
      },
      success: res => {
        const cet = res.data;
        if (res.statusCode == '200' && cet.name) {
          this.setData({ cet });
        } else {
          app.showErrModal('查询失败，请重新输入！', '', ()=> {
            wx.redirectTo({
              url: `/pages/core/cet/input/input`,
            })
          });
        }
      },
      fail: err => {
        app.showErrModal('访问服务器失败，请稍后重试！')
      }
    })
  },
  onShareAppMessage() { }
})