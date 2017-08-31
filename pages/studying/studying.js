//index.js
//获取应用实例
var app = getApp()
var datas;
var finishdatas;
var that;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    haha:'my var',
    list:[],
    textresult:"sdfsfsdf",

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../myview/myview'
    })
  },
  onLoad: function () {
     that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })   
    }
    )
  },
 onShow:function(){
  var date=new Date();
  var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
  var str = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + week[date.getDay()];
  this.setData({
    date: str
  });
  datas = wx.getStorageSync('key');
  console.log(datas);
  calculateRemain(datas);
  finishdatas = wx.getStorageSync('finishdata');
  if(datas){
    this.setData({list:datas});
  } 
 },
  addPlan:function(){
    var path = '../addplan/addplan'
      wx.navigateTo(
        { url:path}
      )
  },
  tapList:function(event){
  
    var id= event.currentTarget.id;
  
    var flag=!datas[id].isShow;
    for(var i=0;i<datas.length;i++){
      datas[i].isShow=false;
    }
    datas[id].isShow=flag;
    this.setData({list:datas});
  },
  tapFinish:function(event){
 
    finish(event.currentTarget.id);
  },
  tapAbandon:function(event){
    console.log('tapAbandon')
    abandon(event.currentTarget.id);
  }
})
 function finish(id){
   wx.showModal({
     title: '完成任务',
     content: '请确认您已经完成了任务，不要作弊哦',
     success:function(res){
        if(res.confirm){
          var data = datas.splice(id, 1);
    
          if (!finishdatas) {
            finishdatas = new Array();
          }
          data[0].completTime=new Date().getDate;
          var d=new Object();
          d.text=data[0].text;
          d.time=data[0].time;
          var dt=new Date();
          d.completeTime=dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
          console.log('d',d);
          finishdatas.push(d);
          wx.setStorageSync('key', datas);
          wx.setStorageSync('finishdata', finishdatas);
          that.setData({ list: datas });
          
        }
     }
   })
 }
 function calculateRemain(list){
   list.map(function (value, index, array) {
     console.log(value.time);
     var finishTime = new Date(value.time);
     var currentTime = new Date();
     var remain = finishTime - currentTime;
     array[index].remainTime = Math.floor(remain / 1000 / 60 / 60 / 24);

   });
   console.log('list', list);
 }
 function abandon(id){
   wx.showModal({
     title: '放弃任务',
     content: '坚持就是胜利，真的放弃该计划？',
     success: function (res) {
       if (res.confirm) {
         var data = datas.splice(id, 1);
         wx.setStorageSync('key', datas);
         that.setData({ list: datas });
       }
     }
   })
 }