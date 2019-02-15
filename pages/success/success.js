//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    modal_show: false,
    integral: '',
    modal_text: '',
  },

  onLoad(options) {
    util.getHeader('success')
    var type = options.type
    if (type) {
      this.setData({
        type: type,
        title: app.globalData.sys['min_' + type + '_share_title'],
        integral: app.globalData.sys['min_' + type + '_share_integral'],
        share_prompt: app.globalData.sys['min_' + type + '_share_prompt'],
        share_image: app.globalData.sys['min_' + type + '_share_images'],
      })
    }

    this.setData({
      title: options.title,
      integral: options.integral || '',
    })
  },
  share() {
    var _this = this
    setTimeout(() => {
      var url,
        type = _this.data.type
      if (type == 'plan'){
        url = 'v1/users/share-plan'
      } else if (type == 'feedback'){
        url = 'v1/users/share-feed-back'
      }
      util.request({
        url: url,
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
        }
      })
    }, 0)
  },
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      title: this.data.share_prompt,
      imageUrl: this.data.share_image
    }
  }
})
