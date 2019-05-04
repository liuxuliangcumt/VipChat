//app.js
var Bmob = require('dist/Bmob-1.7.0.min.js');
Bmob.initialize("6e9a2d2d15495c7b901aa7b8937cc92c", "d491a2e2fb39e4764ee041ae68d13efc");
 
App({
  onLaunch: function () {
    
    Bmob.User.auth().then(res => {
      console.log(res)
      console.log('一键登陆成功')
      wx.setStorageSync('objectId', res.objectId)
      wx.setStorageSync('openId', res.authData.weapp.openid)

    }).catch(err => {
      console.log('一键登陆shibai')
      console.log(err)
    });
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})