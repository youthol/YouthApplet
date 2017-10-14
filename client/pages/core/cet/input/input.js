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
    const {zkzh, xm} = e.detail.value;

    if (zkzh.trim().length != 15 || !xm.trim()) {
      app.showErrModal('输入的查询信息不正确，请重新输入！');
    } else {
      // console.log('err')
      wx.redirectTo({
        url: `/pages/core/cet/result/result?zkzh=${zkzh.trim()}&xm=${xm.trim()}`,
      })
    }
  }
})