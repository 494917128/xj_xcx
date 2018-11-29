Component({
  relations: {

  },
  properties: {
    bg_color: {
      type: String,
      value: '#509AFF',
    },
    font_color: {
      type: String,
      value: '#ffffff',
    },
    bg_image: String,
  },

  data: {

  },

  methods: {

  },
  ready() {
    wx.setNavigationBarColor({
      frontColor: this.data.font_color||'#ffffff',
      backgroundColor: this.data.bg_color,
    })
  }
})
