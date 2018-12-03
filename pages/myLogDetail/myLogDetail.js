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
  },
  onLoad() {
    util.wxLogin()
  }
})
