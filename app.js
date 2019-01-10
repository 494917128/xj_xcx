//app.js
var token = wx.getStorageSync('accessToken')

App({
  onLaunch: function () {
    wx.loadFontFace({
      family: 'YouYuan',
      source: 'url("https://saimi.oss-cn-zhangjiakou.aliyuncs.com/book/font/end.TTF")',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
    })
    var _this = this
  },
  url: 'https://book.saiminet.com/api/index.php?r=',
  image_url: 'https://saimi-book.oss-cn-beijing.aliyuncs.com/',
  webview_url: 'https://wx.saiminet.com/mby/webview.html?web_view_src=',
  upload_url: 'https://book.saiminet.com/api/index.php?r=v1/file/oss',
  AppID: 'wx3d8d41fdef650d0d',
  AppSecret: '7fab1777f75c96f8412baafe444b5d63',
  globalData: {
    userInfo: null, // 用户信息
    sys: null, // 小程序配置
    data: {},
  }
})