let app = getApp();
Page({
  data: {
    showMore: false
  },
  onLoad(options) {
    wx.request({
      url: `${app.server}/core/score/${options.xh}`,
      success: res => {
        const { jidian, chengji } = res.data;
        jidian && chengji ? this.setData({ jidian, chengji }) : app.showErrModal('查询失败');
      },
      fail: err => {
        app.showErrModal('查询失败，请重新输入')
      }
    })
  },
  onShareAppMessage() { },
  showTopTips() {
    this.setData({ showTopTips: true });
    setTimeout(() => {
      this.setData({ showTopTips: false });
    }, 3000);
  },
  showMore() {
    this.setData({ showMore: !this.data.showMore })
  }
})