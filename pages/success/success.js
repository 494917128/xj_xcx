//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
  },

  onLoad(options) {
    util.getHeader('success')
    this.setData({
      title: options.title,
      integral: options.integral||'',
    })

    var type = options.type
    if (type) {
      this.setData({
        title: app.globalData.sys['min_' + type + '_share_title'],
        integral: app.globalData.sys['min_' + type + '_share_integral'],
        share_prompt: app.globalData.sys['min_' + type + '_share_prompt'],
        share_image: app.globalData.sys['min_' + type + '_share_images'],
      })

    }
  },
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      title: this.data.share_prompt,
      imageUrl: this.data.share_image
    }
  }
})
