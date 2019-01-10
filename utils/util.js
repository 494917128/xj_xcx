const app = getApp()

// 时间格式转字符串(date为时间格式的值，isTime表示是否显示时分秒)
const formatTime = (date, isTime) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + (isTime ? ' ' + [hour, minute, second].map(formatNumber).join(':') : '')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getTime = (time) => {
  var hour = parseInt(time / 3600),
    minute = parseInt(time / 60 - hour * 60),
    second = parseInt(time - hour * 3600 - minute * 60)
  if (hour < 10 && hour != 0) { hour = '0' + hour }
  if (minute < 10) { minute = '0' + minute }
  if (second < 10) { second = '0' + second }
  return (hour ? hour + ':' : '') + minute + ':' + second
}

// 显示二维码二维码
const myCode = (_this) => {
  _this.setData({
    my_code_show: !_this.data.my_code_show
  })
}

const tokenReset = (callback) => {
  var refresh_token = wx.getStorageSync('refreshToken') || ''
  request2({
    url: 'login/refresh',
    method: 'get',
    type: 'form',
    data: {
      refresh_token: refresh_token,
    },
    success(res) {
      console.log(res)
      if (res.data.state == 1) {
        wx.setStorageSync('userId', res.data.data.access_token)
        wx.setStorageSync('accessToken', res.data.data.access_token)
        wx.setStorageSync('refreshToken', res.data.data.refresh_token)
        callback && callback()
      } else {
        wx.removeStorageSync('user_rank')
        wx.removeStorageSync('userId')
        wx.removeStorageSync('accessToken')
        wx.removeStorageSync('refreshToken')
        loginFail(res.data.message, '/pages/login/agent/agent')
      }
    },
    fail() {
      callback && callback()
    }
  })

}

// request
var before_network
const request = ({ prefix_url, url, data, method, type, success }) => {
  var token = wx.getStorageSync('accessToken'),
    old_url = url;
  if (token) { url = url + '&accessToken=' + token; console.log(token) }
  var ajax = wx.request({
    url: (prefix_url || app.url) + url,
    data: data,
    header: {
      'content-type': type == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
    },
    method: method || 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      console.log(res)
      if (old_url == 'login/refresh') { // 为了tokenReset
        success && success(res)
      } else if (res.data.code == 200 || res.data.code == 0) {
        if (res.data.state == 0) {
          wx.showToast({
            title: res.data.message || '',
            icon: 'none',
          })
        } else {
          success && success(res)
        }
      } else if (res.data.code == 401) {
        wx.showToast({
          title: '登录已失效，请重新登录',
          icon: 'none',
          duration: 1500,
        })
        setTimeout(() => {
          // wx.navigateTo({ url: '/pages/login/agent/agent?again=1' })
          wxLogin()
          wxSys()
        }, 1500)
      } else if (res.data.code == 429) { // 请求过快
        wx.showToast({
          title: '您点的太快了，请等下再试',
          icon: 'none',
          duration: 1500,
        })
      } else {
        wx.showToast({
          title: res.data.message||'请求出错',
          icon: 'none',
        })
      }
    },
    fail: function () {
      var callback = () => {
        request({ prefix_url, url, data, method, type, success })
      }
      wx.getNetworkType({
        success: function (res) {
          // 返回网络类型
          noneNetworl(res, callback)
        }
      })
    }
  })
  return ajax // 返回实例用于中断请求
}

const wxSys = (callback) => {
  request({
    url: 'v1/sys/index',
    success(res) {
      app.globalData.sys = res.data.data
      callback && callback()
    }
  })
}

const wxLogin = () => { // 
  wx.login({
    success: function (ress) {
      if (ress.code) {
        wx.getUserInfo({
          success: function (res) {
            res.code = ress.code
            login(res)
          },
          fail() {
            // 显示点击授权模态框
            var pages = getCurrentPages();
            var Page = pages[pages.length - 1];  //当前页面
            Page.getUserInfo = (e) => {
              if (e.detail.detail.userInfo) {
                e.detail.detail.code = ress.code
                login(e.detail.detail)
              }
            }
            Page.setData({
              get_userinfo: true
            })
          }
        })
      }
    }
  })
}
const login = (res) => {
  console.log(res)
  var userInfo = JSON.stringify(res.userInfo)
  wx.showLoading({
    title: '登录中...',
  })
  var pages = getCurrentPages();
  var Page = pages[pages.length - 1];  //当前页面
  Page.setData({
    userInfo: res.userInfo
  })
  app.globalData.userInfo = res.userInfo
  console.log(res)
  request({
    url: 'v1/mini-program/login',
    data: {
      // appid: app.AppID,
      // secret: app.AppSecret,
      code: res.code,
      // userInfo: userInfo,
      iv: res.iv,
      rawData: res.rawData,
      signature: res.signature,
      encryptedData: res.encryptedData,
    },
    method: 'post',
    type: 'form',
    success: function (res) {
      wx.setStorageSync('accessToken', res.data.data.access_token)
      wx.setStorageSync('refreshToken', res.data.data.refresh_token)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '登录成功'
      })

      if (Number(res.data.data.messages_total) > 0) {
        wx.showTabBarRedDot({ index: 2 })
      }
      
      var pages = getCurrentPages();
      var Page = pages[pages.length - 1];  //当前页面
      Page.pageData && Page.pageData()
    }
  })

}
var loginTime = 1
const loginCallback = (res) => {
  wx.hideLoading()
  if (res.data.state === 1) {
    wx.setStorage({ // 储存用户等级，大于等于6是官方
      key: 'user_rank',
      data: res.data.user.user_rank,
    })
    wx.setStorage({ // 储存userid（适应之前版本）
      key: 'userId',
      data: res.data.user_id,
    })
    wx.setStorage({ // 储存换取token的refreshToken
      key: 'refreshToken',
      data: res.data.toke.refresh_token || '',
    })
    wx.setStorage({ // 储存token
      key: 'accessToken',
      data: res.data.toke.access_token || '',
      success() { // 储存完毕再执行
        var pages = getCurrentPages();
        var Page = pages[pages.length - 1];  //上一个页面
        (Page.onPullDownRefresh && Page.onPullDownRefresh()) || (Page.pageData && Page.pageData()) // 刷新数据
      }
    })
    wx.showToast({
      icon: 'none',
      title: '登录成功'
    })
  } else if (res.data.state === 0) {
    if (loginTime < 5) { // 小于5次，登录失败，重新登录
      wxLogin()
      loginTime++
      wx.showToast({
        icon: 'none',
        title: res.data.data == -41003 ? '登录失败，请再试' : String(res.data.data)
      })
    } else { // 大于等于5次，登录失败，报异常
      wx.showToast({
        icon: 'none',
        title: '登录异常，请联系管理员'
      })
      loginTime = 1
    }
  } else {
    wx.showToast({
      icon: 'none',
      title: '登录失败'
    })
  }
}
const getUserInfo = () => {
  var pages = getCurrentPages();
  var Page = pages[pages.length - 1];  //当前页面
  if (app.globalData.userInfo){
    Page.setData({ userInfo: app.globalData.userInfo })
  } else { 
    wx.getUserInfo({
      success: function (res) {
        Page.setData({ userInfo: res.userInfo })
      },
    })
  }
}

const upload = ({ url, tempFilePath, callback }) => {
  var token = wx.getStorageSync('accessToken')
  wx.showLoading({
    title: '上传中...',
  })
  wx.uploadFile({
    url: app.upload_url + '&accessToken=' + token,
    filePath: tempFilePath,
    formData: {
      guid: 'wu_1cvfqk6cepb31hipobs32s1744o',
      id: 'WU_FILE_1',
      name: 'alipay.jpeg',
      type: 'image/jpeg',
      lastModifiedDate: new Date(),
      size: 167890,
    },
    name: 'file',
    success: function (res) {
      console.log(res)
      res = JSON.parse(res.data)
      if (res.code == 200) {
        callback && callback(res.data)
      } else if (res.code == 401) {
        loginFail()
      } else {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      }
    },
    complete() {
      wx.hideLoading()
    }
  })

}
var noneNetworl = (res, callback) => {
  if (res.networkType == 'none') {
    wx.showToast({
      title: '当前无网络，请连接网络后再试',
      icon: 'none',
      duration: 5000
    })
  }
}
const loginFail = (msg, nav) => {
  wx.showToast({
    title: msg || '登录已失效，请重新登录',
    icon: 'none',
    duration: 1500,
  })
  setTimeout(() => {
    wx.navigateTo({
      url: nav || '/pages/login/agent/agent?again=1',
    })
  })
}

// 跳转webview
const webview = e => {
  var src = e.currentTarget.dataset.src,
    type = e.currentTarget.dataset.type,
    title = e.currentTarget.dataset.title
  src = encodeURIComponent(src)
  wx.navigateTo({
    url: '/pages/webView/webView?src=' + src + '&title=' + (title || ''),
  })
}

// 授权（暂时只用到保存到相册）
const authorize = (scope, callback, _this) => {
  compatible({// 兼容
    api: wx.getSetting,
    callback: function () {
      wx.getSetting({
        success(res) {
          if (!res.authSetting[scope]) {
            wx.authorize({
              scope: scope,
              success() {
                callback && callback()
              }, fail(res) {
                wx.showModal({
                  title: '提示',
                  content: '保存失败，请打开授权--保存到相册',
                  success(res) {
                    if (res.confirm) {
                      if (wx.canIUse('openSetting')) {
                        wx.openSetting()
                      } else {
                        _this.setData({
                          open_setting: true
                        })
                      }
                    }
                  }
                })
              }
            })
          } else {
            callback && callback()
          }
        }
      })
    }
  })
}

// 设置上一个页面参数并返回上个页面
const prevPage = (data) => {
  var pages = getCurrentPages();
  var prevPage = pages[pages.length - 2];  //上一个页面
  prevPage.setData(data)
  // 返回上一个页面
  wx.navigateBack({
    delta: 1,
  })
}

// 接口兼容
const compatible = ({ api, callback }) => {
  if (api) {
    callback()
  } else {
    wx.showModal({ title: '提示', content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。' })
  }
}

// 保存图片
const saveImage = ({ _this, url, callback, callbackFail }) => {
  wx.getImageInfo({
    src: url,
    success: function (res) {
      compatible({// 兼容版本
        api: wx.saveImageToPhotosAlbum,
        callback: function () {
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
            success(res) {
              callback && callback(res)
            },
            fail() {
              callbackFail && callbackFail()
              wx.showToast({
                icon: 'none',
                title: '保存失败'
              })
            }
          })
        }
      })
    }, fail(res) {
      callbackFail && callbackFail(res)
      wx.showToast({ icon: 'none', title: '保存失败' })
    }
  })
}

// wxPay
const getWxPay = (order_id, callback, callbackFail) => {
  request({
    url: 'v1/order/order-pay',
    data: {
      order_id: order_id,
    },
    type: 'form',
    success(res) {
      var data = res.data.data
      wxPay(data.timestamp, data.nonceStr, data.package, data.signType, data.paySign, callback, callbackFail)
    }
  })
}
const wxPay = (timeStamp, nonceStr, _package, signType, paySign, callback, callbackFail) => {
  wx.requestPayment({
    timeStamp: timeStamp,
    nonceStr: nonceStr,
    package: _package,
    signType: signType,
    paySign: paySign,
    success(res) {
      wx.hideLoading()
      callback && callback()
      wx.redirectTo({
        url: '/pages/success/success?type=cart',
      })
    },
    fail(res) {
      wx.hideLoading()
      callbackFail && callbackFail()
      console.log(res)
    }
  })
}

// 获取myHeader的参数
const getHeader = (name) => {
  var image = app.globalData.sys['min_' + name + '_banner_images'],
    color = app.globalData.sys['min_' + name + '_banner_color']

  var pages = getCurrentPages();
  var prevPage = pages[pages.length - 1];  // 当前页面
  prevPage.setData({
    myHeader_image: image,
    myHeader_color: color,
  })
}

module.exports = {
  wxSys,
  wxLogin,
  getUserInfo,
  authorize,
  saveImage,
  prevPage,
  request,
  upload,
  getWxPay,
  getHeader,
}
