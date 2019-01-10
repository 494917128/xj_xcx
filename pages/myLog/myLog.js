//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

// 计算相差天数
function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
  var dateSpan,
    tempDate,
    iDays;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays
};

Page({
  data: {
    nav_index: 0,
    date: ['日','一','二','三','四','五','六'],
    dateList: [],
    list_1: [],
    list_2: [{title:'',list:[{},{}]},{title:'',list:[{},{}]},{title:'',list:[{},{}]}],
    search: '',
    year: '',
    month: '',
    day: '',
    day_gap: '',
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
  // 计算与当前日期相差(获取当前日期的日志)
  getDayGap(){

    var year = this.data.year+'',
      month = this.data.month+'',
      day = this.data.day+'',
      date = year+'/'+month+'/'+day,
      date_now = new Date().toLocaleDateString()

    var t = datedifference(date_now,date),
      day_gap = ''

    if (t < 0){
      day_gap = -t + '天前'
    } else if (t > 0){
      day_gap = t + '天后'
    } else {
      var week = new Date(year, month - 1, day).getDay()
      day_gap = '周' + this.data.date[week]
    }

    var list_1 = []
    if (this.data.list[year] && this.data.list[year][month] && this.data.list[year][month][day]) {
      list_1 = this.data.list[year][month][day]
    }
    this.setData({
      day_gap: day_gap,
      list_1: list_1
    })
    
  },
  gotoToday() {
    if (this.data.nav_index==1) return;
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
    this.getDayGap()
  },
  beforeMonth: function (e) {
    e.detail.current = this.data.current - 1
    this.swiper(e)

    var day = e.currentTarget.dataset.day
    this.setData({
      day: day
    })
  },
  afterMonth: function (e) {
    e.detail.current = this.data.current + 1
    this.swiper(e)
    
    var day = e.currentTarget.dataset.day
    this.setData({
      day: day
    })
  },
  selectDay(e){
    var day = e.currentTarget.dataset.day
    this.setData({
      day: day
    })
    this.getDayGap()
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

    this.getDayGap()

    var list = this.data.dateList[this.data.current].list,
      day = this.data.day,
      _this = this,
      last_day = 1

    for (var i=0,len=list.length;i<len;i++) {
      if (list[i].type == 'now' || list[i].type == 'today') {
        if (list[i].num == day) return;
        last_day = list[i].num
      } else if (list[i].type == 'after') {
        _this.setData({ day: last_day })
        return;
      }
    }
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
    this.getDayGap()
  },
  // 加载日历内容
  getDate(year,month){
    let arr = [],							// 需要遍历的日历数组数据
      beforeMonth = (month - 1) < 1 ? 12 : (month - 1),
      nextMonth = (month + 1) > 12 ? 1 : (month + 1),
      startWeek = new Date(year, month-1, '1').getDay(),							//目标月1号对应的星期
      dayNums = new Date(year, month, 0).getDate(),				//获取目标月有多少天
      beforeDayNums = new Date(year, beforeMonth, 0).getDate();				//获取目标前一月有多少天
    if (month > 11) {
      let nextYear = year + 1;
      dayNums = new Date(nextYear, month, 0).getDate();
    }
    let arrLen = startWeek + dayNums;							//arr的数组长度
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        var has_plan = false,
          list = this.data.list
        // 判断当天是否有日志
        if (list[year] && list[year][month] && list[year][month][i - startWeek + 1]){ has_plan = true }

        if (this.today.year==year&&this.today.month==month&&this.today.day==i-startWeek+1) {
          arr[i] = { type: 'today', num: i - startWeek + 1, has_plan: has_plan };
        } else {
          arr[i] = { type: 'now', num: i - startWeek + 1, has_plan: has_plan };
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
  // 数据请求
  pageData(){
    var _this = this,
      year = this.data.year + '',
      month = this.data.month + '',
      day = this.data.day + ''
    util.request({
      url: 'v1/users/plan-list',
      data: {

      },
      type: 'form',
      success(res){
        var list = res.data.data,
          list_2 = []

        for (var key in list) {
          for (var k in list[key]) {
            var list_2_content = []
            for (var x in list[key][k]) {
              for (var y in list[key][k][x]) {
                list_2_content.push(list[key][k][x][y])
              }
            }
            if (list_2_content.length) {
              list_2.push({
                year: key,
                month: k,
                list: list_2_content
              })
            }
          }
        }

        var list_1 = []
        if (list[year] && list[year][month] && list[year][month][day]) {
          list_1 = list[year][month][day]
        }
        _this.setData({
          list: list,
          list_1: list_1,
          list_2: list_2
        })
        // 请求完后初始化
        _this.dateInit();
      }
    })
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

    this.pageData();
  }
})
