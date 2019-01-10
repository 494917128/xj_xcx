//获取应用实例
const app = getApp(),
  util = require('../../utils/util.js')

Page({
  data: {
    image_url: app.image_url,
    is_content: false, // 用于判断是否是内容页面
    content_index: '', // 用于判断内容显示的是第几个
    top: '', // 点击后当前元素距离顶部的距离
    is_anim: false, // 用于判断是否需要动画
    page: 1,
    loading: false,
    list: [],
    book_feedback: [],
    list_max: false, // 是否加载完毕（我是有底线的）
  },
  // 阻止冒泡
  stop(){},
  scrollTop: 0,
  onPageScroll (e){
    this.scrollTop = e.scrollTop
  },
  contentAmin (e) {
    var top = e.currentTarget.offsetTop - this.scrollTop,
      index = e.currentTarget.dataset.index,
      _this = this

    wx.createSelectorQuery().selectAll('.item').boundingClientRect(function (rect) { // 获取当前元素的高度
      _this.setData({
        height: rect[index].height + 'px'
      })
    }).exec()

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
    },50)
  },
  // 点赞
  like() {
    var _this = this,
      index = this.data.content_index

    this.ajax = util.request({
      url: 'v1/user-plan/add-click',
      data: {
        id: this.data.list[index].log_id,
      },
      type: 'form',
      success(res) {
        wx.showToast({
          title: '点赞成功，积分+1',
          icon: 'none'
        })
        var click_head_portrait = _this.data.list[index].click_head_portrait
        click_head_portrait.push({
          head_portrait: app.globalData.userInfo.avatarUrl
        })
        _this.setData({
          ['list[' + index + '].click_head_portrait']: click_head_portrait,
          ['list[' + index + '].click_total']: _this.data.list[index].click_total + 1,
          ['list[' + index + '].user_click']: true,
        })
      },
    })
  },
  collect() {
    var _this = this,
      index = this.data.content_index

    this.ajax = util.request({
      url: 'v1/user-plan/add-focus',
      data: {
        id: this.data.list[index].log_id,
      },
      type: 'form',
      success(res) {
        wx.showToast({
          title: '关注成功，积分+1',
          icon: 'none'
        })
        _this.setData({
          ['list[' + index + '].user_focus']: true,
        })
      },
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
        top: '',
        content_index: '',
        is_anim: false,
      })
    }, 600)
  },
  pageData(){
    var _this = this,
      list = this.data.list

    this.setData({ loading: true })
    this.ajax = util.request({
      url: 'v1/user-plan/list',
      data: {
        page: this.data.page,
      },
      type: 'form',
      success(res){
        if (res.data.data.list.length == 0) { 
          _this.setData({
            list_max: true,
            loading: false,
          })
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
          }) 
          return;
        }
        list.push(...res.data.data.list)

        _this.setData({
          loading: false,
          book_feedback: res.data.data.book_feedback.list,
          list: list,
          page: _this.data.page + 1
        })
      },
    })
  },
  onLoad() {
    util.getHeader('found')
    util.getUserInfo()
    this.pageData()
  },
  // 上拉加载
  onReachBottom() {
    if (!this.data.loading) {
      this.ajax && this.ajax.abort()
      this.pageData && this.pageData()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      list: [],
      page: 1,
    })
    this.ajax && this.ajax.abort()
    this.pageData()
    setTimeout(() => { wx.stopPullDownRefresh() }, 1000)
  },
})
