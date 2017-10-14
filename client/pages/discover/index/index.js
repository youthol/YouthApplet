let app = getApp();
Page({
  data: {
    boils: []
  },
  onLoad: function (options) {
    this.getBoils()
  },
  getBoils() {
    wx.request({
      url: `${app.server}/core/boils`,
      method: 'GET',
      success: res => {
        if (res.statusCode == 200 && typeof res.data == 'object') {
          this.setData({ boils: res.data })
        } else {
          app.showErrModal('请求数据出错，请稍后重试！')
        }
      },
      fail: res => {
        app.showErrModal('获取沸点内容失败！')
      }
    })
  }
})