//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs:[]
  },
  onShow: function () {
    var datas=wx.getStorageSync('finishdata');
    console.log('datas',datas);
    this.setData({
      // logs: (wx.getStorageSync('logs') || []).map(function (log) {
      //   return util.formatTime(new Date(log))
      // })
      logs:datas
    })
  },
 
})
