let app = getApp();
Page({
  data: {},
  formSubmit(e) {
    const uid = wx.getStorageSync('uid');
    const val = e.detail.value.feedback;
    this.postData(val, uid);
  },
  change(e) {
    let len = e.detail.value.length;
    this.setData({ len });
  },
  postData(content, uid) {
    if (!content || !uid) {
      return
    } else {
      wx.request({
        url: `${app.server}/feedback`,
        method: 'POST',
        data: { content, uid },
        success: res => {
          console.log(res)
          if (res.statusCode == 200) {
            app.showToast('反馈成功', 'success', 2000);
            wx.switchTab({
              url: '/pages/user/index/index',
            })
          } else {
            console.log(res)
          }
        },
        fail: err => {
          app.showErrModal('提交留言失败，请稍后再试！')
        }
      })
    }
  }
})