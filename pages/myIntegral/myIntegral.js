//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    list: [
      { title: '标题标题标题', date: '11/11 11:11', price: '+100' },
      { title: '标题标题标题', date: '11/11 11:11', price: '-10' },
      { title: '标题标题标题', date: '11/11 11:11', price: '+10' },
    ],
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
