let app = getApp();
Page({
  data: {
    isSubmit: false,
    colleges: [],
    dormitories: [],
    collegesIndex: 0,
    dormitoriesIndex: 0
  },
  onLoad(options) {
    this.setData({
      colleges: app.schoolInfo.colleges,
      dormitories: app.schoolInfo.dormitories
    })
  },
  collegesChange(e) {
    this.setData({
      collegesIndex: e.detail.value
    })
  },
  dormitoriesChange(e) {
    this.setData({
      dormitoriesIndex: e.detail.value
    })
  },
  toNext(e) {
    this.setData({ isSubmit: true });
  },
  formSubmit(e) {
    let that = this;
    let user = e.detail.value;
    for (let i in user) { i = i.trim(); }
    if (!user.name || !user.sdutid) {
      app.showErrModal("姓名和学工号不能为空！");
      return;
    } else {
      let uid = wx.getStorageSync('uid');
      let infos = {
        name: user.name,
        sdutid: user.sdutid,
        college: user.college,
        grade: user.grade,
        dormitory: user.dormitory,
        room: user.room,
        phone: user.phone
      }
      if (uid && infos) {
        console.log(infos)
        // this.putBind(uid, infos)
      }
    }
  },
  putBind(uid, data) {
    console.log(uid, typeof data)
    if (typeof data == "object" && data.sdutid && uid) {
      wx.request({
        url: `${app.server}/user/${uid}`,
        method: 'PUT',
        data: data,
        success: res => {
          // console.log(res)
          if (res.statusCode == 200 && res.data.uid) {
            console.log(res)
            wx.setStorageSync('userInfo', res.data);
            wx.setStorageSync('isBind', true);
            wx.switchTab({ url: '/pages/user/index/index' });
          } else {
            app.showErrModal('更新数据库失败，请稍后尝试！')
          }
        },
        fail: err => {
          app.showErrModal('请求服务器失败，请稍后尝试！')
        },
      })
    } else {
      app.showErrModal('Invited uid');
    }
  }
})