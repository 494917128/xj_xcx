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
    list: []
  },
  swiper_index: 0, // 轮播图的index
  // 图片预览
  previewImage(e) {
    var url = e.currentTarget.dataset.url
    var list = this.data.list
    var urls = []
    list.map((item,index)=>{
      urls.push(item.playbill_images)
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
    wx.showLoading({ title: '保存中...' })
    util.authorize('scope.writePhotosAlbum', function () {
      util.saveImage({
        _this: this,
        url: list[index].playbill_images,
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
  pageData(){
    var _this = this
    util.request({
      url: 'v1/index/playbill',
      data: {},
      type: 'form',
      success(res){
        _this.setData({
          list: res.data.data
        })
      }
    })
  },
  onLoad() {
    this.pageData()
  },
  share(){
    var _this = this
    setTimeout(()=>{
      util.request({
        url: 'v1/users/share-playbill',
        data: {},
        type: 'form',
        success(res) {
          wx.showModal({
            title: '提示',
            content: '分享成功',
            showCancel: false,
          })
        }
      })
    },0)
  },
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      title: '21天改变之旅',
      imageUrl: this.data.list[this.swiper_index].playbill_images,
    }
  }
})
