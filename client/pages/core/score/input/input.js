let app = getApp();
Page({
  data: {
    showTopTips: false
  },
  onLoad(options) { },
  onShareAppMessage() { },
  showTopTips() {
    this.setData({ showTopTips: true });
    setTimeout(() => {
      this.setData({ showTopTips: false });
    }, 3000);
  },
  formSubmit: function (e) {
    const xh = e.detail.value.xh;
    if (xh && xh.length == 11) {
      wx.redirectTo({
        url: `/pages/core/score/result/result?xh=${xh}`,
      })
      // wx.request({
      //   url: `${app.server}/core/score/${xh}`,
      //   success: res => {
      //     const { jidian, chengji } = res.data;
      //     jidian && chengji ? this.setData({ jidian, chengji, showForm: false }) : app.showErrModal('查询失败');
      //   },
      //   fail: err => {
      //     app.showErrModal('查询失败，请重新输入')
      //   }
      // })
    } else {
      this.showTopTips();
    }
  },
})