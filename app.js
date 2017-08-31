//app.js

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var first = wx.getStorageSync('first');
    console.log('first',first);
    if (!first){
     
    var datas=new Array();
    var data0=new Object();
    data0.isShow=false;
    data0.text="读一本好书";
    data0.time="2028-08-08";
    datas.push(data0);

    var data1=new Object();
    data1.isShow = false;
    data1.text = "学一门语言";
    data1.time = "2028-08-08";
    datas.push(data1);

    var data2=new Object();
    data2.isShow = false;
    data2.text = "做一次演讲";
    data2.time = "2028-08-08";
    datas.push(data2);

    var data3=new Object();
    data3.isShow = false;
    data3.text = "记一次旅行";
    data3.time = "2028-08-08";
    datas.push(data3);
     wx.setStorageSync('key',datas);
     console.log(datas);
     wx.setStorageSync('first', true);  

   }
  },
 
  getUserInfo: function(callback) {
    var self = this
    console.log(this)
    console.log(self.globalData.userinfo)
    if (this.globalData.userInfo) {
      typeof callback == "function" && callback(this.globalData.avatarUrl)
    } else {
      //调用登录接口
    //  wx.getUserInfo({
     //   withCredentials: false,
     //   success: function(res) {
     //     that.globalData.userInfo = res.userInfo
       //   typeof cb == "function" && cb(that.globalData.userInfo)
      //  }
      //})
         wx.getUserInfo({
           withCredentials:false,
           success:function(res){
             self.globalData.userInfo=res.userInfo
             typeof callback=="function"&&callback(self.globalData.userInfo)
           }
         })
    }
  },

  globalData: {
    userInfo: null
  },
  
})
