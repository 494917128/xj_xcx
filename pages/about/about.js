//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
  },
  code(){
    var code = this.data.code
    wx.previewImage({
      urls: [code],
      current: code
    })
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title || '关于小程序',
    })
    util.getUserInfo()
    this.setData({
      detail: app.globalData.sys.min_about_details,
      code: app.globalData.sys.min_about_qrcode_images,
      company: app.globalData.sys.min_about_company,
      title: app.globalData.sys.min_about_title,
    })
  }
})
