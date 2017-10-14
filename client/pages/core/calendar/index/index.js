const app = getApp();
Page({
  data: {
    hasEmptyGrid: false,
    schedule: [],
    contains: []
  },

  onLoad(options) {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.getCalendar();
    this.calcEmptyGrids(cur_year, cur_month);
    this.calcDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calcDays(newYear, newMonth);
      this.calcEmptyGrids(newYear, newMonth);
      this.calcContains(newYear, newMonth);
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calcDays(newYear, newMonth);
      this.calcEmptyGrids(newYear, newMonth);
      this.calcContains(newYear, newMonth);
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calcEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calcDays(year, month) {
    let days = [];
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }
    this.setData({
      days
    });
  },
  calcContains(year, month) {
    // console.log(year, month)
    let contains = [];
    this.data.schedule.map((v, i) => {
      if (v.date.substr(0, 4) == year && v.date.substr(5, 2) == month) {
        contains.push(v.date.substr(8, 2))
      }
    })
    this.setData({ contains });
  },
  getCalendar() {
    let cur_date = new Date();
    wx.request({
      url: `${app.server}/core/calendar`,
      method: 'GET',
      success: res => {
        res.data.forEach((v, i) => {
          v.date = app.utils.formatTime(v.date).substr(0, 10);
        })
        this.setData({ schedule: res.data })
        // this.calcContains(this.data.cur_year, this.data.cur_month);    
      },
      fail: err => {
        // 查询校历失败
      }
    })
  }
})