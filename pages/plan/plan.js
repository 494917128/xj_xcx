//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    title_image: 'back_pic/1.jpg',
  },
  submit(){
    wx.redirectTo({
      url: '/pages/planSuccess/planSuccess',
    })
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
  }
})
