//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    list: [
      { name: '我的日志', icon: 'icon-hangdongrizhi', link: '/pages/myLog/myLog' },
      { name: '我的订单', icon: 'icon-dingdan1', link: '/pages/myOrder/myOrder?title=订单' },
      { name: '我的优惠券', icon: 'icon-qian01', link: '/pages/myCoupon/myCoupon?title=优惠券' },
      { name: '了解玩法', icon: 'icon-gou', link: '/pages/method/method?title=了解玩法' },
      { name: '关于小程序', icon: 'icon-fill147', link: '/pages/about/about?title=关于小程序' },
    ],
    info: {},
  },
  hideDot(e) {
    var url = e.currentTarget.dataset.url
    wx.hideTabBarRedDot({ index: 2 })
    this.setData({
      'info.messages_total': "0",
    })
    wx.navigateTo({
      url: url,
    })
  },
  pageData(){
    var _this = this
    util.request({
      url: 'v1/users/info',
      data: {},
      type: 'form',
      success(res){
        app.globalData.userInfo = res.data.data
        _this.setData({
          info: res.data.data
        })
      }
    })
  },
  onLoad() { 
    util.getHeader('my')
    util.getUserInfo()
    this.pageData()
  },
  onShow(){
    this.setData({
      info: app.globalData.userInfo
    })
  }
})

