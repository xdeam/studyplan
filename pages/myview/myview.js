// myview.js
var vardatas
Page({

  /**
   * 页面的初始数据
   */
  data: {
  datas:[],
  result:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  vardatas=["ass","b","c","d","e"]
  this.setData({datas:vardatas})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  return{ title: '自定义转发标题',
      path: '/page/user?id=123'}
  },
  tapList:function(event){
    var index=event.currentTarget.id
    var data=vardatas[index]
    this.setData({result:data})
  },
  submit:function(e){
    console.log('input value'+e.detail.value.input)
    vardatas.push(e.detail.value.input)
    wx.setStorage({
      key: 'key1',
      data: vardatas,
      success:function(){
        console.log('save scuccess')
      },
      fail:function(){
        console.log('save failed')
      },
      complete:function(){
        console.log('completed')
      }
    })
  },
  read:function(){
    var res=wx.getStorageSync('key1')
    console.log('res='+res)
    if(res)
    this.setData({datas:res})
  }

})