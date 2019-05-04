//index.js
//获取应用实例
const app = getApp()
var Bmob = require('../../dist/Bmob-1.7.0.min.js');
Bmob.initialize("6e9a2d2d15495c7b901aa7b8937cc92c", "d491a2e2fb39e4764ee041ae68d13efc");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
    if (app.globalData.userInfo) {
      console.log("onShow:" + app.globalData.userInfo)
      wx.redirectTo({
        url: '../main/main'
      })
    }
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
     
      console.log("已经获取过："+app.globalData.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      console.log("callback 以防止这种情况")
    } else {
      console.log("在没有 open-type=getUserInfo 版本的兼容处理")
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log("getUserInfo"+e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })

    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      
      Bmob.User.upInfo(e.detail.userInfo).then(result => {
        console.log(result)
      }).catch(err => {
        console.log(err)
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }else{
      //退出小程序
      console.log("getUserInfo 退出小程序")
    }
  }
})