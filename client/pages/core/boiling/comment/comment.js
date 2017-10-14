let app = getApp();
Page({
  data: {
    wxInfo: wx.getStorageSync('wxInfo')
  },
  onLoad(options) {
    const eid = options.eid;
    this.setData({ eid })
  },
  formSubmit(e) {
    const uid = wx.getStorageSync('uid');
    const eid = this.data.eid;
    const val = e.detail.value.content;
    this.postData(uid, eid, val);
  },
  change(e) {
    let len = e.detail.value.length;
    this.setData({ len });
  },
  postData(uid, eid, content) {
    const nickName = this.data.wxInfo.nickName;
    if (!content || !uid || !eid) {
      app.showErrModal('无法提交数据！')
    } else {
      wx.request({
        url: `${app.server}/core/boil/${eid}`,
        method: 'POST',
        data: { content, nickName },
        success: res => {
          if (res.statusCode == 200) {
            app.showToast('评论成功', 'success', 2000);
            wx.redirectTo({
              url: `/pages/core/boiling/detail/detail?eid=${this.data.eid}`
            })
          }
        },
        fail: err => {
          app.showErrModal('提交评论失败，请稍后再试！')
        }
      })
    }
  }
})