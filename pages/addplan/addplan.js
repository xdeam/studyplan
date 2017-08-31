// addplan.js
var datas;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTime:'2017-09-01'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.index)
  this.index=options.index
  datas=wx.getStorageSync('key');
  if(!datas)datas=new Array();
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
  submit1:function(event){
    var item=new Object();
    item.isShow=false;
    item.text = event.detail.value.input;
    item.time=event.detail.value.picker;
    if(!item.text){
      wx.showModal({
        title: '请输入学习计划名称',
        content: '',
        showCancel:false
      })
      return;
    }
    if(item.text.length>20){
      wx.showModal({
        title: '学习计划名称过长',
        content: '请不要超过20个字符',
        showCancel: false
      })
      return;
    }
    datas.push(item);
    wx.setStorage({
      key: 'key',
      data: datas,
    })
    wx.navigateBack({
      
    })
  },
  selectTime:function(event){

  }
 
})