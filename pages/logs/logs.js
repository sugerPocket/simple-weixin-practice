//logs.js
const util = require('../../utils/util.js')
const decorate = require('../../common/decorator.js')

Page(decorate({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
}))
