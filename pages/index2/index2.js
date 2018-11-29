//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    nav: [
      { title: '我的收获', icon: 'icon-wodeshouhuo', url: '/pages/indexCreat/indexCreat' },
      { title: '今日收获', icon: 'icon-ht_gain', url: '/pages/indexCreat/indexCreat' },
      { title: '明日计划', icon: 'icon-studyplan', url: '/pages/indexCreat/indexCreat' },
    ],
  },

  onLoad() {
    util.wxLogin()
  }
})
