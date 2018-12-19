//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    region: ['广东省', '广州市', '海珠区'],
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  submit() {
    wx.redirectTo({
      url: '/pages/success/success',
    })
  },
  onLoad() {
  }
})
