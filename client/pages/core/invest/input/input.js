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
  formSubmit(e) {
    const xm = e.detail.value.xm;
    wx.redirectTo({
      url: `/pages/core/invest/result/result`,
    })
    // if (!xm.trim()) {
    //   app.showErrModal('姓名输入错误，请重新输入！');
    // } else {
    //   wx.redirectTo({
    //     url: `/pages/core/dorm/result/result?xm=${xm.trim()}`,
    //   })
    // }
  }
})