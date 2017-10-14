let app = getApp();
Page({
  data: {
    showTopTips: false,
    accounts: app.schoolInfo.colleges,
    accountIndex: 0,
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
    const exam_num = e.detail.value.exam_num;
    if (exam_num) {
      wx.redirectTo({
        url: `/pages/core/fresh/result/result?exam_num=${exam_num}`,
      })
    } else {
      this.showTopTips();
    }
  },
  bindAccountChange(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  }
})