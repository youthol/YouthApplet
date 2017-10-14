let app = getApp();
Page({
  data: {
    cores: [
      {
        url: '/pages/core/calendar/index/index',
        icon: '/images/nav/calendar.png',
        name: '校历'
      }, {
        url: '/pages/core/dorm/input/input',
        icon: '/images/nav/dorm.png',
        name: '新生宿舍'
      }, {
        url: '/pages/core/fresh/input/input',
        icon: '/images/nav/fresh.png',
        name: '新生信息'
      }, {
        url: '/pages/core/index/index',
        icon: '/images/nav/more.png',
        name: '更多'
      }
    ],
    boils: [],
    quotes: []
  },
  onShareAppMessage() {
    return {
      title: "青春在线",
      desc: "青春在线+，加无限精彩与可能！",
      path: "/pages/index/index"
    }
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  onLoad(options) {
    this.getBoils();
    this.getQuotes();
    wx.getSystemInfo({
      success: res => {
        this.setData({ height: res.windowHeight })
      }
    })
  },
  readBoil(e) {
    const eid = e.target.dataset.eid || e.currentTarget.dataset.eid;
    wx.navigateTo({
      url: '/pages/core/boiling/detail/detail?eid=' + eid
    })
  },
  getBoils() {
    wx.request({
      url: `${app.server}/core/boils`,
      success: res => {
        if (res.statusCode == 200 && typeof res.data == 'object') {
          this.setData({ boils: res.data })
          // console.log(res)
        } else {
          app.showErrModal('请求数据出错，请稍后重试！')
        }
      },
      fail: res => {
        app.showErrModal('获取沸点内容失败！')
      }
    })
  },
  getQuotes() {
    wx.request({
      url: `${app.server}/core/quotes`,
      success: res => {
        const quotes = res.data;
        this.setData({ quotes })
      },
      fail: err => {
        app.showErrModal('获取引言内容失败！')
      }
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})