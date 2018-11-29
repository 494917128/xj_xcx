//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    list: [{},{},{}]
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title || '',
    })
    this.setData({
      title: options.title
    })
  }
})
