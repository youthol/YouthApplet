let app = getApp();
let wxCharts = app.wxCharts;
let pieChart = null;
Page({
  data: {
    showMore: true,
    activeIndex: ''
  },
  onLoad(options) {
    const xm = options.xm;
    wx.request({
      url: `${app.server}/core/dorm`,
      data: {
        xm
      },
      success: res => {
        const dorm = res.data;
        if (res.statusCode == '200') {
          this.setData({ dorm });
        } else {
          app.showErrModal('查询失败，请重新输入！', '', () => {
            wx.redirectTo({
              url: `/pages/core/dorm/input/input`,
            })
          });
        }
      },
      fail: err => {
        app.showErrModal('访问服务器失败，请稍后重试！', '', () => {
          wx.redirectTo({
            url: `/pages/core/dorm/input/input`,
          })
        });
      }
    })
  },
  onShareAppMessage() { },
  showMore(e) {
    const index = e.target.dataset.index
    this.setData({
      showMore: false,
      activeIndex: index,
      roommates: this.data.dorm[index].roommates
    })
  }
})