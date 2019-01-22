//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    images: [],
    content: '',
    show: '',
  },
  content(e) {
    var value = e.detail.value
    this.setData({
      content: value
    })
  },
  checkboxChange(e) {
    var value = e.detail.value[0]
    this.setData({
      show: value || ''
    })
  },
  // 选择图片
  chooseImage() {
    var _this = this,
      len = this.data.images.length,
      max_len = 9
    if (len >= max_len) {
      wx.showToast({
        title: '最多选择9张图片',
        icon: 'none'
      })
    } else {
      wx.chooseImage({
        count: max_len - len,
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          tempFilePaths.map((item, index) => {
            _this.uploadFile(item)
          })
        }
      })
    }
  },
  uploadFile(tempFilePath) {
    var _this = this,
      file_address = 'case'
    util.upload({
      url: file_address,
      tempFilePath: tempFilePath,
      callback(data) {
        var image = data.urlPath,
          images = _this.data.images
        images.push(image)
        _this.setData({
          images: images
        })
      }
    })
  },
  sheet(e){
    var _this = this
    wx.showActionSheet({
      itemList: ['删除', '预览'],
      success(res) {
        if (res.tapIndex == 0) {
          _this.deleteImage(e)
        } else {
          _this.previewImage(e)
        }
      },
    })
  },
  deleteImage(e) {
    var _this = this,
      index = e.currentTarget.dataset.index,
      images = this.data.images
    
    images.splice(index,1)
    this.setData({ images: images })
  },
  previewImage(e) {
    var _this = this,
      image = e.currentTarget.dataset.image,
      images = e.currentTarget.dataset.images
    var url = app.image_url
    var urls = []
    for (var i = 0, len = images.length; i < len; i++) {
      urls.push(url + images[i])
    }
    wx.previewImage({
      current: image, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })
  },
  submit() {
    if (!this.data.content) {
      wx.showToast({
        title: '请先填写阅后感',
        icon: 'none',
      })
      return;
    }

    util.request({
      url: 'v1/users/feedback',
      data: {
        content: this.data.content,
        images: this.data.images,
        is_show: this.data.show,
      },
      type: 'form',
      success(res){
        util.integralAdd(res.data.integral,'feedback')
      }
    })
  },
  onLoad() {
    util.getHeader('feedback')
  }
})
