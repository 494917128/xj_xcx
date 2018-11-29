//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    list: [
      'http://thirdwx.qlogo.cn/mmopen/OPaHQTyAiaJN4IiaW1ibn4gLaas072e7KFIcDR48YQD8Gfl1DNbKs7rViaXmCExflEI8K2tAhWJQhmMWvFvib350WcdlzGInxUND0/132',
      'http://thirdwx.qlogo.cn/mmopen/EES6V2ic4QVA4P0c5s4ZXm8TyNTkWFDnhMA7Z9wvKXmlJdHrj9wtoic4EueT8Lzibk8P04KlYsvZO2qFGUMAgFzy6KcicibzEB6Zv/132',
      'http://thirdwx.qlogo.cn/mmopen/xVBka63MSx7zCwUptwbaK4w8mb5KRl6PR9ADgSdIXicalmPbL1JicLxrDRCdyolzLTM7ANoDb0TQxokbDP5IVeUibE3NZjyLpxO/132',
      'http://thirdwx.qlogo.cn/mmopen/vwDTyeLCRwWDINhic9cHcuf1Oc3xLp7hLHcgYgsAZ2qC2839rhEFoCRJW3mWF5nTQUG4bib5IR3eR0ORpicsYibMibw/132',
      'http://thirdwx.qlogo.cn/mmopen/TrFE2b3rIAibOVn4M6avMYAE617b4CE3A2pnq0x3Z7mk4d94vBwGf66AODlbIsVTEWlJ59h4sR7GjdtHpTEW2mZ8tGll4G4L6/132',
      'http://thirdwx.qlogo.cn/mmopen/xVBka63MSx7VcbaXI1w94icJhCV24SRclVJoicDzmavfH0SJN6XPdtCOnT5nkLBZoEoMiaZHenuGBPVJAzvp5QOyoe5GVWCcSZ5/132',
      'http://thirdwx.qlogo.cn/mmopen/xVBka63MSx7VcbaXI1w940pdv3TKOG8Y8IibzYVTn3DlIibvnz9BVV5AavDhZMOYFnajbKPyOdFPRYTHQQIMXlZXvjjG3iaia0IE/132',
    ],
    is_content: false, // 用于判断是否是内容页面
    content_index: '', // 用于判断内容显示的是第几个
    top: '', // 点击后当前元素距离顶部的距离
    is_anim: false, // 用于判断是否需要动画
  },
  scrollTop: 0,
  scroll (e){
    this.scrollTop = e.detail.scrollTop
  },
  contentAmin (e) {
    var top = e.currentTarget.offsetTop - this.scrollTop,
      index = e.currentTarget.dataset.index,
      _this = this
    this.setData({
      top: top,
      is_anim: false,
    })
    // if (wx.hideTabBar) { wx.hideTabBar({ animation: true }) } // 显示TabBar
    setTimeout(()=>{
      _this.setData({
        content_index: index,
        is_content: true,
        is_anim: true
      })
    },100)
  },
  like() {
    this.setData({
      is_like: !this.data.is_like,
    })
  },
  collect() {
    this.setData({
      is_collect: !this.data.is_collect,
    })
  },
  back() {
    var _this = this
    this.setData({
      is_content: false,
      is_anim: true,
    })
    // if (wx.showTabBar) { wx.showTabBar({ animation: true }) } // 显示TabBar
    setTimeout(() => {
      _this.setData({
        left: '',
        top: '',
        content_index: '',
        is_anim: false,
      })
    }, 600)
  },
  onLoad() {
    util.wxLogin()
  }
})
