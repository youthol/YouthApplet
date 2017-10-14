let app = getApp();
Page({
  data: {
    lists: [
      {
        url: '/pages/user/feedback/feedback',
        icon: '/images/user/feedback.png',
        title: '反馈',
      }, {
        url: '/pages/user/about/about',
        icon: '/images/user/about.png',
        title: '关于'
      }
    ]
  },
  onLoad: function (options) {
    const u = wx.getStorageSync('userInfo');
    if (u && u.sdutid && u.name) {
      this.setData({ isBind: true })
    }
  },
  onShow() {
    this.setData({
      wxInfo: wx.getStorageSync('wxInfo'),
      isBind: wx.getStorageSync('isBind')
    })
  }
})