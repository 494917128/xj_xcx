Component({
  relations: {

  },
  properties: {
    nav: Array,
    bg_color: String,
  },

  data: {
    active: false,
  },

  methods: {
    Add() {
      this.setData({
        add: !this.data.add
      })
    },
    stop() { },
    addActivity(e) {
      var url = e.currentTarget.dataset.url

      this.Add()
      wx.navigateTo({
        url: url,
      })
    },
  },
  ready() {

  }
})
