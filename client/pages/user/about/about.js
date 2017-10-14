let app = getApp();
Page({
  data: {},
  onLoad: function () {
    this.setData({
      version: app.version,
      year: new Date().getFullYear()
    })
  }
})