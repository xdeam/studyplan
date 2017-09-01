// addplan.js
var datas;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTime:'请选择日期',
    currentTime:''
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
    var curTime = new Date().Format('YYYY-MM-dd');
    this.setData({ currentTime: curTime });
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
    item.remainTime="";
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
    if (item.time == '请选择日期'){
      wx.showModal({
        title: '请选择日期',
        content: "",
        showCancel: false
      });
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
   console.log(event);
   this.setData({selectTime:event.detail.value});
  }
 
})

Date.prototype.Format = function (formatStr) {
  var str = formatStr;
  var Week = ['日', '一', '二', '三', '四', '五', '六'];

  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

  str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
  str = str.replace(/M/g, this.getMonth() + 1);

  str = str.replace(/w|W/g, Week[this.getDay()]);

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());

  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
  str = str.replace(/m/g, this.getMinutes());

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
  str = str.replace(/s|S/g, this.getSeconds());

  return str;
}   