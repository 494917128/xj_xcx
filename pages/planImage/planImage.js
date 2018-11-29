//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    list: [
      "back_pic/1.jpg",
      "back_pic/2.jpg",
      "back_pic/3.jpg",
      "back_pic/4.jpg",
      "back_pic/5.jpg",
      "back_pic/6.jpg",
      "back_pic/7.jpg",
      "back_pic/8.jpg",
    ],
    select_image: '',
  },
  // 自定义添加
  userDefined(e){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        util.prevPage({
          user_defined: tempFilePaths,
          title_image: '',
        })
      }
    })
  },
  // 选择背景图
  selectImage(e){
    var index = e.currentTarget.dataset.index
    util.prevPage({
      user_defined: '',
      title_image: this.data.list[index],
    })
  },
  onLoad(options) {
    var _this = this

    this.setData({
      select_image: options.image
    })

  }
})
