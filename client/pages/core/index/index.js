var app = getApp();
Page({
  data: {
    cores: [
      {
        url: '/pages/core/calendar/index/index',
        icon: '/images/nav/calendar_fff.png',
        name: '校历'
      }, {
        url: '/pages/core/score/input/input',
        icon: '/images/nav/grade_point_fff.png',
        name: '绩点查询'
      }, {
        url: '/pages/core/fresh/input/input',
        icon: '/images/nav/fresh_fff.png',
        name: '新生信息'
      }, {
        url: '/pages/core/dorm/input/input',
        icon: '/images/nav/dorm_fff.png',
        name: '新生宿舍查询'
      }, {
        url: '/pages/core/invest/input/input',
        icon: '/images/nav/invest_fff.png',
        name: '新学期问卷'
      }
    ]
  },
  onLoad: function (options) {

  },
  onShareAppMessage: function () {

  },
  onclick: function () {
    wx.request({
      url: 'http://sdlg.sinaapp.com/Pc/Score/gets.lg',
      data: {
        xh: '15110302127'
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
      }
    })
  }
})