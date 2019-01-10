//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    list: [
      { name: '我的日志', icon: 'icon-woderizhi', icon_image: '/images/icon/log.png', link: '/pages/myLog/myLog' },
      { name: '我的订单', icon: 'icon-icon', icon_image: '/images/icon/order.png', link: '/pages/myOrder/myOrder?title=订单' },
      { name: '积分商城', icon: 'icon-icon-test', icon_image: '/images/icon/shop.png', link: '/pages/myIntegralShop/myIntegralShop?title=积分商城' },
      { name: '我的优惠券', icon: 'icon-youhuiquan01', icon_image: '/images/icon/coupon.png', link: '/pages/myCoupon/myCoupon?title=优惠券' },
      { name: '了解玩法', icon: 'icon-lejiejieshou', icon_image: '/images/icon/method.png', link: '/pages/method/method?title=' },
      { name: '关于小程序', icon: 'icon-guanyuwomen', icon_image: '/images/icon/about.png', link: '/pages/about/about?title=关于小程序' },
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
        _this.setData({
          info: res.data.data
        })
      }
    })
  },
  onLoad() { 
    util.getUserInfo()
    this.pageData()
  }
})

