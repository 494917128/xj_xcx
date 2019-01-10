//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    title_image: 'back_pic/1.jpg',
    summary: '', // 今日总结
    plan: '', // 明日计划
    harvest: '', // 今日收获
  },
  textarea(e){
    var type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail.value
    })
  },
  checkboxChange(e){
    var value = e.detail.value[0]
    this.setData({
      show: value||''
    })
  },
  submit(){
    util.request({
      url: 'v1/user-plan/add-log',
      data: {
        summary: this.data.summary,
        plan: this.data.plan,
        harvest: this.data.harvest,
        banner: this.data.banner,
        is_show: this.data.show||''
      },
      type: 'form',
      success(res){
        wx.redirectTo({
          url: '/pages/success/success?type=plan',
        })
      }
    })
  },
  pageData(){
    var _this = this
    util.request({
      url: 'v1/user-plan/banner',
      type: 'form',
      success(res) {
        _this.setData({
          banner: res.data.data.banner_img||''
        })
      }
    })
  },
  onLoad(options) {
    util.getHeader('plan')
    this.pageData()
  }
})
