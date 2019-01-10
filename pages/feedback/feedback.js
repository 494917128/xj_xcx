//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({

  data: {
    image_url: 'https://file.saiminet.com/',
    page: 1,
    loading: false,
    list: [],
    list_max: false, // 是否加载完毕（我是有底线的）

  },
  // 预览图片
  previewImage(e) {
    var _this = this,
      image = e.currentTarget.dataset.image,
      images = e.currentTarget.dataset.images
    var url = this.data.image_url
    var urls = []
    for (var i = 0, len = images.length; i < len; i++) {
      urls.push(images[i])
    }
    wx.previewImage({
      current: image, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  pageData() {
    var _this = this,
      list = this.data.list

    this.setData({ loading: true })
    this.ajax = util.request({
      url: 'v1/users/feedback-list',
      data: {
        page: this.data.page,
      },
      type: 'form',
      success(res) {
        if (res.data.data.list.length == 0) {
          _this.setData({
            list_max: true,
            loading: false,
          })
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
          })
          return;
        }
        list.push(...res.data.data.list)

        _this.setData({
          loading: false,
          list: list,
          page: _this.data.page + 1
        })
      },
    })
  },
  onLoad() {
    util.getHeader('cart')
    this.pageData()
  },
  // 上拉加载
  onReachBottom() {
    if (!this.data.loading) {
      this.ajax && this.ajax.abort()
      this.pageData && this.pageData()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      list: [],
      page: 1,
    })
    this.ajax && this.ajax.abort()
    this.pageData()
    setTimeout(() => { wx.stopPullDownRefresh() }, 1000)
  },
})