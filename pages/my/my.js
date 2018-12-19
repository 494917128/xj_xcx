//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    aa: 1,
    list: [
      { name: '我的订单', icon: 'icon-order', link: '/pages/myOrder/myOrder?title=订单' },
      { name: '了解玩法', icon: 'icon-flag', link: '/pages/method/method?title=' },
    ]
  },
  onLoad() { 
    util.wxLogin()
  }
})

