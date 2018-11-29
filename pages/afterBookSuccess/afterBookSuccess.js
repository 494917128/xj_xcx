//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
  },
  onLoad(options) {

  },
  onShareAppMessage: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '转发时显示的标题',
      path: '转发的页面路径',
      success: res => {
        console.log('--- 转发成功 ---', res);
      },
      fail: (res) => {
        console.log('--- 转发失败 ---', res);
      }
    }
  }
})
