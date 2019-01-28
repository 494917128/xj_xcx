//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    nav: [
      { title: '提交读后感', icon: 'icon-studyplan', image: '/images/book.png', image_bg: '#FF7575', url: '/pages/afterBook/afterBook' },
      { title: '分享海报', icon: 'icon-ht_gain', image: '/images/haibao.png', image_bg: '#FFAA00', url: '/pages/poster/poster' },
      { title: '购买书籍', icon: 'icon-wodeshouhuo', image: '/images/book2.png', image_bg: '#21e495', url: '/pages/book/book' },
    ],
  },
  guideClose() {
    this.setData({
      guide: false
    })
  },
  onLoad() { 
    var _this = this
    // if(!wx.getStorageSync('firstLogin')){
      this.setData({
        guide: true,
      })
      // wx.setStorageSync('firstLogin', true)
    // }
    // wx.removeStorageSync('firstLogin')
    util.wxSys(function(){
      _this.setData({ 
        title_image: app.globalData.sys.min_index_title_images,
        guide_image: app.globalData.sys.min_index_modal_images,
        mini_url: app.globalData.sys.mini_index_url_popup,
        foot_image: app.globalData.sys.min_index_foot_images,
      })
      util.getHeader('index')

    })
    util.wxLogin()
  },
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      title: app.globalData.sys.min_default_share_prompt,
      imageUrl: app.globalData.sys.min_default_share_images,
    }
  }
})
