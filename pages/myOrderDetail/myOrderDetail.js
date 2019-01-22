const app = getApp()
import util from "../../utils/util.js";
Page({

  data: {
    image_url: app.image_url,
    id: '',
    order: {},
  },
  webView(e) {
    e.currentTarget.dataset.src = app.webview_url + e.currentTarget.dataset.src
    util.webview(e)
  },
  pay() {
    util.getWxPay(this.data.id, function(){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.onPullDownRefresh && prevPage.onPullDownRefresh() // 刷新数据
    })
  },
  pageData(){
    var _this = this
    util.request({
      url: 'v1/order/order-details',
      data: {
        order_id: this.data.id
      },
      type: 'form',
      success(res) {
        _this.setData({
          order: res.data.data
        })
      }
    })
  },
  onLoad: function (options) {
    this.setData({ id: options.id || '' })
    this.pageData()
  },
})