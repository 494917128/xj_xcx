//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    data: {},
    id: '',
  },
  delete(){
    util.request({
      url: 'v1/user-plan/del-log',
      data: {
        log_id: this.data.id,
      },
      type: 'form',
      success(res){
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
        setTimeout(()=>{ wx.navigateBack({ delta: 1 }) },1500)
      }
    })
  },
  pageData(){
    var _this = this
    util.request({
      url: 'v1/users/plan-details',
      data: {
        id: this.data.id,
      },
      type: 'form',
      success(res){
        _this.setData({
          data: res.data.data
        })
      }
    })
  },
  onLoad(options) {
    this.setData({ id: options.id })
    this.pageData()
    util.getUserInfo()
  }
})
