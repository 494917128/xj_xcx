//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    list: [],
    info: '',
  },
  integral(e) {
    var _this = this,
      id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否兑换该优惠券',
      success(res){
        if (res.confirm){
          _this.integralRequest(id)
        }
      }
    })
  },
  integralRequest(id){
    var _this = this

    util.request({
      url: 'v1/coupons/add-user-coupons',
      data: {
        coupons_id: id,
      },
      type: 'form',
      success(res) {
        wx.showToast({
          title: '兑换成功',
        })
        _this.infoData()
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/myCoupon/myCoupon?title=优惠券',
          })
        },1500)
      }
    })
  },
  pageData() {
    var _this = this

    this.ajax = util.request({
      url: 'v1/coupons/coupons-list',
      data: {},
      type: 'form',
      success(res) {
        var list = res.data.data

        if (res.data.data.length == 0) {
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
  infoData(){
    var _this = this
    util.request({
      url: 'v1/users/info',
      data: {},
      type: 'form',
      success(res) {
        _this.setData({
          info: res.data.data
        })
      }
    })
  },
  select(e) {
    var index = e.currentTarget.dataset.index

    if (!this.data.select) return;
    util.prevPage({
      coupon: {
        id: 1,
        price: 2,
        title: '优惠券2元',
        content: 'sadf',
      }
    })
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title || '',
    })
    this.setData({
      title: options.title,
    })

    this.pageData()
    this.infoData()
  },
})
