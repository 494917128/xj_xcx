//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    list: [],
    page: 1,
    loading: false,
    list_max: false, // 是否加载完毕（我是有底线的）
    select: '1',
    nav_list: ["全部", "未使用", "已使用", "无效"],
    nav_index: 0,
  },
  // nav导航
  navbar(e) {
    var index = e.detail.currentTarget.dataset.index
    if (index == this.data.nav_index)
      return;
    this.setData({
      loading: true,
      nav_index: index,
      list: [],// 重新加载
      page: 1,// 页数为1
    })
    this.ajax.abort()// 结束之前的请求
    this.pageData()
  },
  pageData2() {
    var _this = this
    console.log(1)
    this.ajax = util.request({
      url: 'v1/coupons/usable-coupons',
      data: {
        goods_number: this.data.num,
        goods_id: this.data.goods_id
      },
      type: 'form',
      success(res) {
        var list = res.data.data.list

        if (res.data.data.list.length == 0) {
          _this.setData({
            list_max: true,
            loading: false,
          })
          wx.showToast({
            title: '暂无优惠券',
            icon: 'none',
          })
          return;
        }

        _this.setData({
          list: list,
        })
      },
    })
  },
  pageData() {
    var _this = this,
      list = this.data.list


    this.ajax = util.request({
      url: 'v1/coupons/user-coupons-list',
      data: {
        page: this.data.page,
        state: this.data.nav_index
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
  select(e){
    var _this = this,
      index = e.currentTarget.dataset.index,
      coupon = this.data.list[index].coupons[0]

    if (!this.data.select) return;
    console.log(this.data.list[index].user_coupons_id)
    util.prevPage({
      coupon: {
        id: _this.data.list[index].user_coupons_id,
        price: coupon.coupons_amount * 1,
        type: coupon.coupons_type
      }
    })
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title || '',
    })
    this.setData({
      title: options.title,
      select: options.select || '',
    })

    if (options.select) {
      this.setData({
        goods_id: options.goods_id,
        num: options.num,
        select: options.select || '',
      })
      this.pageData = this.pageData2
    }
    util.getHeader('coupons')
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
