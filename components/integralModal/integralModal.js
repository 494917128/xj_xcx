Component({
  relations: {

  },
  properties: {
    modal_show: Boolean,
    integral: String,
    modal_text: String,
  },

  data: {
    active: false,
  },

  methods: {
    closeModal() {
      this.setData({
        modal_show: false
      })
    },
    stop() { },
  },
  ready() {

  }
})
