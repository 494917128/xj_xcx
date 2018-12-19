//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
  },
  submit() {
    wx.redirectTo({
      url: '/pages/success/success',
    })
  },
  onLoad() {
  }
})
