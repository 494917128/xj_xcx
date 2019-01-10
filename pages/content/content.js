//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    title: '',
    content: '',
    id: '',
  },
  url: '',
  pageData() {
    var _this = this
    util.request({
      url: this.url,
      data: {
        id: this.data.id
      },
      type: 'form',
      success(res) {
        wx.setNavigationBarTitle({
          title: res.data.data.title || '',
        })
        _this.setData({
          title: res.data.data.title,
          time: res.data.data.add_time,
          content: res.data.data.content
        })
      },
    })
  },
  onLoad(options) {
    this.url = options.url || ''
    this.setData({
      id: options.id || '',
    })
    this.pageData()
  }
})
