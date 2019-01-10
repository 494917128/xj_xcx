//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    list: [],
    page: 1,
    loading: false,
    list_max: false, // 是否加载完毕（我是有底线的）
  },
  pageData(){
    var _this = this,
      list = this.data.list

    this.setData({ loading: true })
    this.ajax = util.request({
      url: 'v1/article/list',
      data: {
        id: 1,
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
  onLoad(options) {
    util.getHeader('play')
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
