//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    list: [],
    bg_img: '',
    modal_show: false,
    integral: '',
    modal_text: '',
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
    this.setData({
      bg_img: app.globalData.sys.min_posters_background_image
    })

    var color = app.globalData.sys.min_posters_title
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color,
    })
    wx.setBackgroundColor({
      backgroundColor: color,
      backgroundColorTop: color,
      backgroundColorBottom: color,
    })
  },
  share(){
    var _this = this
    setTimeout(()=>{
      util.request({
        url: 'v1/users/share-playbill',
        data: {},
        type: 'form',
        success(res) {
          if (res.data.integral) {
            _this.setData({
              modal_show: true,
              integral: res.data.integral.integral,
              modal_text: res.data.integral.name
            })
          }

          // wx.showModal({
          //   title: '提示',
          //   content: '分享成功',
          //   showCancel: false,
          // })
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
