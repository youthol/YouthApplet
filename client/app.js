import config from './config';
import utils from './utils/util';
import wxCharts from './utils/wxcharts.min';

App({
  onLaunch() {
    this.getWxInfo();
    this.isBind()
  },
  onShow() { },
  onError() { },
  /**
   * 以下为全局函数，使用方法参照文档
   */
  getWxInfo() {
    wx.login({
      success: res => {
        let { code } = res;
        if (code) {
          wx.getUserInfo({
            success: res => {
              let { encryptedData, iv, signature, userInfo } = res;
              wx.setStorageSync('wxInfo', userInfo)
              wx.request({
                url: `${this.server}/user`,
                method: 'POST',
                data: { code, encryptedData, iv },
                success: res => {
                  if (res.statusCode == 200 && res.data.status == 'success' && res.data.uid) {
                    wx.setStorageSync('uid', res.data.uid);
                    this.getUserInfo(res.data.uid);
                  }
                },
                fail: err => {
                  this.showErrModal('请求服务器出现错误，请稍后再试！');
                }
              })
            },
            fail: err => {
              this.showErrModal('未授权信息将影响部分功能使用！');
            }
          })
        } else {
          that.showErrModal(res.errMsg)
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  getUserInfo(uid) {
    if (!uid) {
      this.showErrModal('暂时无法获取绑定信息！');
    } else {
      wx.request({
        url: `${this.server}/user/${uid}`,
        success: res => {
          if (res.data.sdutid && res.data.name) {
            wx.setStorageSync('isBind', true)
            wx.setStorageSync('userInfo', res.data);
          }
        },
        fail: err => {
          this.showErrModal('获取绑定信息失败！');
        }
      })
    }
  },
  isBind() {
    wx.getStorageInfo({
      success: res => {
        if (res.keys.indexOf('uid') >= 0 && res.keys.indexOf('userInfo')) {
          return true
        } else {
          return false
        }
      }
    })
  },
  /**
   * 以下为全局方法，具体用途和用法请看文档
   */
  showErrModal(content, title, callback) {
    wx.showModal({
      title: title || '',
      content: content || "发生错误，请稍后重试！",
      showCancel: false,
      confirmColor: "#008aff",
      success: (res) => {
        if (res.confirm && callback) {
          callback()
        }
      }
    })
  },
  showToast(title, icon, duration, mask) {
    wx.showToast({
      title: title || '加载中',
      icon: icon || 'loading',
      duration: duration || 3000,
      mask: mask || true
    })
  },
  /**
   * 以下为全局数据，具体格式和用法参照文档
   */
  utils,
  wxCharts,
  server: config.server,
  userInfo: {},
  schoolInfo: {
    colleges: [
      '请选择学院',
      '机械工程学院',
      '交通与车辆工程学院',
      '农业工程与食品科学学院',
      '电气与电子工程学院',
      '计算机科学与技术学院',
      '化学化工学院',
      '建筑工程学院',
      '资源与环境工程学院',
      '材料科学与工程学院',
      '生命科学学院',
      '数学与统计学院',
      '物理与光电工程学院',
      '经济学院',
      '管理学院',
      '文学与新闻传播学院',
      '外国语学院',
      '法学院',
      '马克思主义学院',
      '美术学院',
      '音乐学院',
      '体育学院',
      '国防教育学院',
      '鲁泰纺织服装学院',
    ],
    dormitories: [
      { title: '1#公寓南楼', value: '01#南' },
      { title: '1#公寓北楼', value: '01#北' },
      { title: '2#公寓南楼', value: '02#南' },
      { title: '2#公寓北楼', value: '02#北' },
      { title: '3#公寓南楼', value: '03#南' },
      { title: '3#公寓北楼', value: '03#北' },
      { title: '4#公寓南楼', value: '04#南' },
      { title: '4#公寓北楼', value: '04#北' },
      { title: '5#公寓楼', value: '05#' },
      { title: '6#公寓楼', value: '06#' },
      { title: '7#公寓楼', value: '07#' },
      { title: '8#公寓楼', value: '08#' },
      { title: '9#公寓楼', value: '09#' },
      { title: '10#公寓楼', value: '10#' },
      { title: '11#公寓楼', value: '11#' },
      { title: '12#公寓楼', value: '12#' },
      { title: '13#公寓南楼', value: '13#南' },
      { title: '13#公寓北楼', value: '13#北' },
      { title: '14#公寓楼', value: '14#' },
      { title: '15#公寓楼', value: '15#' },
      { title: '16#公寓楼', value: '16#' },
      { title: '17#公寓楼', value: '17#' },
      { title: '18#公寓楼', value: '19#' },
      { title: '19#公寓楼', value: '19#' },
      { title: '20#公寓楼', value: '20#' },
      { title: '21#公寓楼', value: '21#' },
      { title: '22#公寓楼', value: '22#' },
      { title: '研究生公寓北楼', value: '研男#' },
      { title: '研究生公寓南楼', value: '研女#' },
    ]
  }
})