//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    goods:{},
  },
  submit() {
    console.log(this.data.goods)
    app.globalData.goods = this.data.goods
    wx.redirectTo({
      url: '/pages/bookBuy/bookBuy',
    })
  },
  pageData(){
    var _this = this

    util.request({
      url: 'v1/order/goods-list',
      data: {},
      type: 'form',
      success(res) {
        _this.setData({
          goods: res.data.data
        })
        wx.setNavigationBarTitle({
          title: res.data.data.goods_name
        })
      }
    })
  },
  onLoad() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.globalData.sys.min_book_title,
    })
    this.pageData()
    this.setData({
      btn: app.globalData.sys.min_book_but_3,
      btn1: app.globalData.sys.min_book_but_5,
    })
  }
})
