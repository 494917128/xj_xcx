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
  navigator(e){
    var index = e.currentTarget.dataset.index,
      list = this.data.list,
      id = list[index].id,
      value_id = list[index].value_id,
      value_type = list[index].value_type

    if (value_type == 'plan_log') { // 跳转到我的日志
      wx.navigateTo({
        url: '/pages/myLogDetail/myLogDetail?id=' + value_id,
      })
    } else if (value_type == 'coupons') { // 跳转到优惠券
      wx.navigateTo({
        url: '/pages/myCoupon/myCoupon',
      })
    } else if (value_type == 'order') { // 跳转到订单详情
      wx.navigateTo({
        url: '/pages/myOrderDetail/myOrderDetail?id=' + value_id,
      })
    } else if (!value_type && !value_id) { // 不跳转
    } else { // 跳转到消息详情
      wx.navigateTo({
        url: '/pages/content/content?id='+id+'&url=v1/article/details'
      })
    }
  },
  pageData() {
    var _this = this,
      list = this.data.list

    this.setData({ loading: true })
    this.ajax = util.request({
      url: 'v1/message/list',
      data: {
        page: this.data.page,
      },
      type: 'form',
      success(res) {

        res.data.data.list.map((item,index)=>{
          if(item.number > 0) {
            res.data.data.list[index].number = "+" + item.number
          }
        })

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
          TotalCount: res.data.data.page.TotalCount,
          page: _this.data.page + 1
        })
      },
    })
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title || '',
    })
    this.setData({
      title: options.title
    })

    util.getHeader('message')
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
