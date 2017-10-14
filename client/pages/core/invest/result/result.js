let app = getApp();
Page({
  data: {
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    questions: [
      {
        "id": 1,
        "num": "1",
        "mark": "1",
        "question": "你在暑假做的最有意义的事是(  )",
        "answer": {
          "A": "回家陪伴父母",
          "B": "参加志愿服务、社会调查、创新创业等实践活动",
          "C": "外出旅游，增长见识",
          "D": "留校做实验、学习，增加知识储备",
          "E": "其他",
          "F": "",
          "G": "",
          "H": "",
          "I": "",
          "K": "",
          "L": "",
          "M": ""
        }
      },
      {
        "id": 2,
        "num": "2",
        "mark": "1",
        "question": "在暑假期间，你是否为自己下学期的学习生活做好规划(  )",
        "answer": {
          "A": "是",
          "B": "否",
          "C": "",
          "D": "",
          "E": "",
          "F": "",
          "G": "",
          "H": "",
          "I": "",
          "K": "",
          "L": "",
          "M": ""
        }
      },
    ]
  },
  onLoad(options) {
    const xm = options.xm;
    wx.request({
      url: `${app.server}/core/dorm`,
      data: {
        xm
      },
      success: res => {
        const dorm = res.data;
        if (res.statusCode == '200') {
          this.setData({ dorm });
        } else {
          app.showErrModal('查询失败，请重新输入！', '', () => {
            wx.redirectTo({
              url: `/pages/core/dorm/input/input`,
            })
          });
        }
      },
      fail: err => {
        app.showErrModal('访问服务器失败，请稍后重试！', '', () => {
          wx.redirectTo({
            url: `/pages/core/dorm/input/input`,
          })
        });
      }
    })
  },
  onShareAppMessage() { },
  showMore(e) {
    const index = e.target.dataset.index
    this.setData({
      showMore: false,
      activeIndex: index,
      roommates: this.data.dorm[index].roommates
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {

    console.log(e)
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    // var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    // for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
    //   checkboxItems[i].checked = false;

    //   for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
    //     if (checkboxItems[i].value == values[j]) {
    //       checkboxItems[i].checked = true;
    //       break;
    //     }
    //   }
    // }

    // this.setData({
    //   checkboxItems: checkboxItems
    // });
  },
})