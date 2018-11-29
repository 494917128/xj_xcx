//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    nav: [
      { title: '阅后感', icon: 'icon-studyplan', image: '/images/book.png', image_bg: '#FF7575', url: '/pages/afterBook/afterBook' },
      { title: '海报', icon: 'icon-ht_gain', image: '/images/haibao.png', image_bg: '#FFAA00', url: '/pages/poster/poster' },
      { title: '购买书籍', icon: 'icon-wodeshouhuo', image: '/images/book2.png', image_bg: '#21e495', url: '/pages/book/book' },
    ],
  },

  onLoad() { 
    util.wxLogin()
  }
})
