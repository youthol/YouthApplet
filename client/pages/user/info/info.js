let app = getApp();
Page({
  data: {
    colleges: app.schoolInfo.colleges,
    dormitories: app.schoolInfo.dormitories,
    userInfo: wx.getStorageSync('userInfo')
  },
  onLoad(options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  unBind() {
    wx.showModal({
      title: "提示",
      content: "确定要解除绑定？",
      confirmColor: "#E64340",
      success: res => {
        if (res.confirm) {
          let uid = wx.getStorageSync('uid');
          app.showToast('解绑中');
          wx.request({
            url: `${app.server}/user/${uid}`,
            method: 'DELETE',
            success: (res) => {
              console.log(res)
              if (res.statusCode == 200) {
                wx.setStorageSync('isBind', false);
                wx.removeStorageSync('userInfo');
                wx.hideToast();
                app.showErrModal('解绑成功！', '', () => {
                  wx.switchTab({ url: '/pages/user/index/index' })
                })
              } else {
                wx.hideToast();
                app.showErrModal();
              }
            }
          })
        }
        else {
          // app.showToast('取消解绑');
        }
      }
    })
  }

})