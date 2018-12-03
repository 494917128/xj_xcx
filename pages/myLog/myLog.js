//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    nav_index: 1,
    date: ['日','一','二','三','四','五','六'],
    dateList: [],
    list_1: [{title:'',list:[{},{}]}],
    list_2: [{title:'',list:[{},{}]},{title:'',list:[{},{}]},{title:'',list:[{},{}]}],
    year: '',
    month: '',
    day: '',
    current: 1,
    duration: 300,
    is_nav: false, // 代表nav是否打开
  },
  nav() {
    this.setData({
      is_nav: !this.data.is_nav
    })
  },
  navIndex(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      nav_index: index
    })
  },
  gotoToday() {
    var year = this.today.year,
      month = this.today.month,
      day = this.today.day,
      current = ''
    this.data.dateList.map((item,index)=>{
      if (item.year == year && item.month == month) {
        for (var i = 0, len = item.list.length; i < len; i++) {
          if (item.list[i].num == day){
            current = index
          }
        }
      }
    })
    this.setData({
      year: year,
      month: month,
      day: day,
      current: current
    })
  },
  beforeMonth: function (e) {
    e.detail.current = this.data.current - 1
    this.swiper(e)
    this.selectDay(e)
  },
  afterMonth: function (e) {
    e.detail.current = this.data.current + 1
    this.swiper(e)
    this.selectDay(e)
  },
  selectDay(e){
    var day = e.currentTarget.dataset.day
    this.setData({
      day: day
    })
  },
  swiper(e) {
    var arr = this.data.dateList,
      index = e.detail.current,
      year = arr[index].year,
      month = arr[index].month,
      beforeYear = year,
      afterYear = year,
      beforeMonth = month - 1,
      afterMonth = month + 1
    if (month == 1) {
      beforeYear = year - 1
      beforeMonth = 12
    } else if (month == 12) {
      afterYear = year + 1
      afterMonth = 1
    }
    this.setData({
      month: month,
      year: year
    })
    if (index == 0) { // 代表在这之前要加载一个
      arr.unshift(this.getDate(beforeYear, beforeMonth))
      this.setData({ duration: 0 })
      var _this = this,
        index = 1
      setTimeout(() => { _this.setData({ duration: 300 }) })
    } else if (index == arr.length - 1) { // 代表在这之后要加载一个
      arr.push(this.getDate(afterYear, afterMonth))
    }
    this.setData({ dateList: arr, current: index })
  },
  // 初始化日历
  dateInit: function () {
    var arr = [],
      year = this.data.year,
      month = this.data.month,
      beforeYear = year,
      afterYear = year,
      beforeMonth = month - 1,
      afterMonth = month + 1
    if (month == 1) {
      beforeYear = year - 1
      beforeMonth = 12
    } else if (month == 12) {
      afterYear = year + 1
      afterMonth = 1
    }
    arr.push(this.getDate(beforeYear, beforeMonth))
    arr.push(this.getDate(year, month))
    arr.push(this.getDate(afterYear, afterMonth))
    this.setData({
      dateList: arr
    })
  },
  // 加载日历内容
  getDate(year,month){
    let arr = [],							// 需要遍历的日历数组数据
      beforeMonth = (month - 1) < 1 ? 12 : (month - 1),
      nextMonth = (month + 1) > 12 ? 1 : (month + 1),
      startWeek = new Date('' + year + ',' + month + ',1').getDay(),							//目标月1号对应的星期
      dayNums = new Date(year, month, 0).getDate(),				//获取目标月有多少天
      beforeDayNums = new Date(year, beforeMonth, 0).getDate();				//获取目标前一月有多少天
    if (month > 11) {
      let nextYear = year + 1;
      dayNums = new Date(nextYear, month, 0).getDate();
    }
    let arrLen = startWeek + dayNums;							//arr的数组长度
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        if (this.today.year==year&&this.today.month==month&&this.today.day==i-startWeek+1) {
          arr[i] = { type: 'today', num: i - startWeek + 1 };
        } else {
          arr[i] = { type: 'now', num: i - startWeek + 1 };
        }
      } else {
        arr[i] = { type: 'before', num: beforeDayNums + i - startWeek + 1 };
      }
    }
    for (let i = 0, len = arr.length; i < (len % 7 ? 7 - len % 7 : 0); i++) {
      arr.push({ type: 'after', num: i + 1 });
    }
    return { year: year, month: month, list: arr}
  },
  onLoad(options) {
    let now = new Date();
    this.today = {
      year: now.getFullYear(), // 当前的年数
      month: now.getMonth() + 1, // 当前的月数
      day: now.getDate(),
    }
    this.setData({
      year: now.getFullYear(), // 当前的年数
      month: now.getMonth()+1, // 当前的月数
      day: now.getDate(),
    })

    this.dateInit();
  }
})
