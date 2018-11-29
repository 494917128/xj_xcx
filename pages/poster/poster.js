//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    nav: [
      { title: '阅后感', icon: 'icon-wodeshouhuo', url: '/pages/afterBook/afterBook' },
      { title: '海报', icon: 'icon-ht_gain', url: '/pages/indexCreat/indexCreat' },
      { title: '购买书籍', icon: 'icon-studyplan', url: '/pages/book/book' },
    ],
    list: [
      'haibao/haibao (1).jpg',
      'haibao/haibao (2).jpg',
      'haibao/haibao (3).jpg',
      'haibao/haibao (4).jpg',
      'haibao/haibao (5).jpg',
      'haibao/haibao (7).jpg',
      'haibao/haibao (8).jpg',
      'haibao/haibao (9).jpg',
      'haibao/haibao (10).jpg',
      'haibao/haibao (11).jpg',
      'haibao/haibao (12).jpg',
      'haibao/haibao (13).jpg',
    ]
  },
  swiper_index: 0, // 轮播图的index
  // 图片预览
  previewImage(e) {
    var url = app.image_url + e.currentTarget.dataset.url
    var list = this.data.list
    var urls = []
    list.map((item,index)=>{
      urls.push(app.image_url + item)
    })
    wx.previewImage({
      current: url,
      urls: urls,
    })
  },
  swiper(e) {
    this.swiper_index = e.detail.current
  },
  saveImage() {
    var list = this.data.list,
      index = this.swiper_index,
      _this = this
    console.log(app.image_url + list[index])
    util.authorize('scope.writePhotosAlbum', function () {
      util.saveImage({
        _this: this,
        url: app.image_url + list[index],
        callback(res) {
          wx.hideLoading()
          wx.showToast({ title: '保存完成' })
        },
        callbackFail() {
          wx.showToast({ title: '保存失败' })
        }
      })
    }, _this)
  },
  onLoad() {
    util.wxLogin()
  },
  onShareAppMessage: function () {
  }
})
