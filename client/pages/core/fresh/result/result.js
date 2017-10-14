let app = getApp();
let wxCharts = app.wxCharts;
let pieChart = null;
Page({
  data: {
    showMore: false
  },
  onLoad(options) {
    wx.request({
      url: `${app.server}/core/newsdut/`,
      data: {
        exam_num: options.exam_num
      },
      success: res => {
        const infos = res.data;
        infos ? this.setData({ infos }) : app.showErrModal('查询失败');
        this.showPie(infos.male, infos.female)        
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
  },
  showPie(male, female) {
    let windowWidth = 375;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '男',
        data: male
      }, {
        name: '女',
        data: female
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  }
})