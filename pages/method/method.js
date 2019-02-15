//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    content: '',
  },
  pageData(){
    var _this = this

    this.ajax = util.request({
      url: 'v1/article/list',
      data: {
        id: 1,
      },
      type: 'form',
      success(res) {

        _this.setData({
          content: res.data.data.content,
        })
      },
    })
  },
  onLoad(options) {
    util.getHeader('play')
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.myHeader_color,
    })
    wx.setBackgroundColor({
      backgroundColor: this.data.myHeader_color,
      backgroundColorTop: this.data.myHeader_color,
      backgroundColorBottom: this.data.myHeader_color,
    })
    this.pageData()
  },
  // // 上拉加载
  // onReachBottom() {
  //   if (!this.data.loading) {
  //     this.ajax && this.ajax.abort()
  //     this.pageData && this.pageData()
  //   }
  // },
  // // 下拉刷新
  // onPullDownRefresh() {
  //   this.setData({
  //     list: [],
  //     page: 1,
  //   })
  //   this.ajax && this.ajax.abort()
  //   this.pageData()
  //   setTimeout(() => { wx.stopPullDownRefresh() }, 1000)
  // },
})
