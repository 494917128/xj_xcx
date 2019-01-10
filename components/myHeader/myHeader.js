Component({
  relations: {

  },
  properties: {
    bg_color: {
      type: String,
      value: '#509AFF',
      observer(newVal, oldVal, changedPath) {
        this.ready()
      }
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
    ready() {
      wx.setNavigationBarColor({
        frontColor: this.data.font_color || '#ffffff',
        backgroundColor: this.data.bg_color,
      })
      wx.setBackgroundColor({
        backgroundColor: this.data.bg_color,
        backgroundColorTop: this.data.bg_color,
        backgroundColorBottom: this.data.bg_color,
      })
    }
  },
  ready() {
    this.ready()
  }
})
