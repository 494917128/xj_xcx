//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({

  data: {
    sex_list: ['男', '女'],
    sex_index: 0,
    birthday: '0000-00-00',
    region: ['', '', ''],
    real_name: '',
    mobile_phone: '',
    email: '',
    profession: '',
    permanent_land: '',
    modal_show: false,
    integral: '',
    modal_text: '',
  },
  selectSex(e){
    this.setData({
      sex_index: e.detail.value
    })
  },
  selectBirthday(e){
    this.setData({
      birthday: e.detail.value
    })
  },
  selectAddress(e){
    this.setData({
      region: e.detail.value
    })
  },
  inputValue(e){
    var name = e.currentTarget.dataset.name,
      value = e.detail.value

    this.setData({
      [name]: value,
    })
  },
  submit(){
    var _this = this,
      data = {},
      region = this.data.region

    data.real_name = this.data.real_name||''
    data.sex = this.data.sex_index + 1
    data.mobile_phone = this.data.mobile_phone
    data.email = this.data.email
    data.birthday = this.data.birthday
    data.profession = this.data.profession
    data.permanent_land = region[0] + ',' + region[1] + ',' + region[2] + ',' + this.data.permanent_land
    data.status = this.data.is_guide

    console.log(data)
    util.request({
      url: 'v1/users/up-member',
      data: data,
      type: 'form',
      success(res) {
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(()=>{
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.pageData()
          if (res.data.integral) {
            _this.setData({
              modal_show: true,
              integral: res.data.integral.integral,
              modal_text: res.data.integral.name
            })
            setTimeout(function () { wx.navigateBack({ delta: 1 })},3000)
          } else {
            wx.navigateBack({ delta: 1 })
          }
        },1500)
      }
    })
  },
  onLoad: function (options) {
    if (options.title){
      wx.setNavigationBarTitle({
        title: options.title,
      })
    }
    var userInfo = app.globalData.userInfo
    console.log(userInfo)
    var address = userInfo.permanent_land.split(',')
    this.setData({
      title: options.title,
      sex_index: userInfo.sex - 1,
      birthday: userInfo.birthday,
      region: [address[0], address[1], address[2]],
      real_name: userInfo.realname,
      mobile_phone: userInfo.mobile_phone,
      email: userInfo.email,
      profession: userInfo.profession,
      permanent_land: address[3],
      status: options.status?1:0, // 判断是否是熊首页导航框进入
    })
  },

})