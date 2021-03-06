//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    name: '',
    phone: '',
    desc: '',
    region: ['浙江省', '杭州市', '萧山区'],
    num: 1,
    order_id: '', // 点提交后会产生，支付成功后需要
    coupon: {},
    discounts_code: '',
    modal_show: false,
    min_order_end_img: '',
  },
  guideClose(){
    this.setData({
      modal_show: false,
    })
  },
  // // 优惠券
  // coupon() {
  //   this.setData({
  //     coupon_show: true,
  //   })
  // },
  // couponHide() {
  //   this.setData({
  //     coupon_show: false,
  //   })
  // },
  // stop (){},
  // 获取邮费
  getShippingFee(){
    var _this = this
    util.request({
      url: 'v1/order/get-shipping-fee',
      data: {
        region: this.data.region[0],
      },
      type: 'form',
      success(res) {
        _this.setData({
          'goods.postage': res.data.data
        })
      }
    })
  },
  // 三级联动
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.getShippingFee()
  },
  // 数量
  updateNum(e) {
    var type = e.currentTarget.dataset.type,
      num = this.data.num

    this.setData({
      num: num + type
    })
  },
  inputValue(e) {
    var type = e.currentTarget.dataset.type,
      value = e.detail.value

    this.setData({
      [type]: value
    })
  },
  submit() {
    if (!this.data.name) {
      wx.showToast({
        title: '请先填写收货人',
        icon: 'none',
      })
    } else if (!this.data.phone) {
      wx.showToast({
        title: '请先填写联系方式',
        icon: 'none',
      })
    } else if (!this.data.desc) {
      wx.showToast({
        title: '请先填写详细地址',
        icon: 'none',
      })
    } else {
      this.submitRequest()
    }
  },
  submitRequest(){
    var _this = this
    wx.showLoading({
      title: '提交中...',
    })
    util.request({
      url: 'v1/order/add-order',
      data: {
        goods_id: this.data.goods.goods_id,
        consignee: this.data.name,
        mobile: this.data.phone,
        goods_number: this.data.num,
        address: this.data.region[0] + this.data.region[1] + this.data.region[2] + this.data.desc,
        region: this.data.region[0],
        user_coupons_id: this.data.coupon.id || '',
        discounts_code: this.data.discounts_code||''
      },
      type: 'form',
      success(res){
        var order_id = res.data.data.order_id
        _this.setData({
          order_id: order_id
        })
        util.getWxPay(order_id,function(){
          wx.navigateTo({
            url: '/pages/myOrderDetail/myOrderDetail?id=' + order_id,
          })
        },function(){
          wx.navigateTo({
            url: '/pages/myOrderDetail/myOrderDetail?id='+order_id,
          })
        })
      }
    })
  },

  onLoad() {
    util.getHeader('cart')
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.myHeader_color,
    })
    wx.setBackgroundColor({
      backgroundColor: this.data.myHeader_color,
      backgroundColorTop: this.data.myHeader_color,
      backgroundColorBottom: this.data.myHeader_color,
    })
    wx.setNavigationBarTitle({
      title: app.globalData.sys.min_cart_banner_title
    })
    this.setData({
      btn: app.globalData.sys.min_book_but_4,
      buy_book_carousel: app.globalData.sys.buy_book_carousel,
      goods: app.globalData.goods
    })
    this.getShippingFee()
  }
})
