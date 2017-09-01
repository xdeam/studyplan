//app.js

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var first = wx.getStorageSync('first');
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
    data1.time = "2026-08-08";
    datas.push(data1);

    var data2=new Object();
    data2.isShow = false;
    data2.text = "做一次演讲";
    data2.time = "2025-08-08";
    datas.push(data2);

    var data3=new Object();
    data3.isShow = false;
    data3.text = "记一次旅行";
    data3.time = "2025-06-06";
    datas.push(data3);
     wx.setStorageSync('key',datas);
     wx.setStorageSync('first', true); 
    
   }
      var datas =wx.getStorageSync('key');
      var finishes = wx.getStorageSync('finishdata');
        
      if(datas) {
        if(!finishes){
         finishes=new Array();
        }
       handleOverTime(datas,finishes);
     }
  },
 
  getUserInfo: function(callback) {
    var self = this

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
function handleOverTime(datas,finishes){
 
    var dataCur=new Date();
    dataCur.setHours(0,0,0,0);
    var dataCurrent=dataCur.valueOf();
    console.log('valueOf1',dataCurrent);
    for(var i=datas.length-1;i>=0;i--){
    console.log('sssss',datas);
      var dataPlan=new Date(datas[i].time).valueOf();
      console.log('valuOf2',dataPlan);

      if (dataCurrent > dataPlan){
      var finish=new Object();
      finish.text=datas[i].text;
      finish.time=datas[i].time;
      finish.completeTime=-1;
      finishes.push(finish);
      datas.splice(i,1);
    }
  }
      console.log('fin', finishes);
      console.log('da',datas);
      wx.setStorageSync('key', datas);
      wx.setStorageSync('finishdata', finishes);
    
}
function calculateRemain(list) {
  list.map(function (value, index, array) {
    var finishTime = new Date(value.time);
    var currentTime = new Date();
    var remain = finishTime - currentTime;
    array[index].remainTime = Math.floor(remain / 1000 / 60 / 60 / 24);
  });
}