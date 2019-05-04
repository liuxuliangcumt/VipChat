// pages/main/main.js
var Bmob = require('../../dist/Bmob-1.7.0.min.js');
Bmob.initialize("6e9a2d2d15495c7b901aa7b8937cc92c", "d491a2e2fb39e4764ee041ae68d13efc");
var QRCode = require('../../utils/weapp-qrcode.js');
var qrcode;
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
const app = getApp()
// 300rpx 在6s上为 150px
const qrcode_w = 300 / rate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode_w: qrcode_w,
    balance: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }



    var objectId = wx.getStorageSync('objectId');
    if (objectId) {

      const query = Bmob.Query('_User');
      query.get(objectId).then(res => {
        console.log("获取数据 objectId  ")
        console.log(res)
        this.setData({
          balance: res.balance

        })
        qrcode = new QRCode('canvas', {
          // usingIn: this,
          text: res.objectId,
          image: '/images/index.png',
          width: qrcode_w,
          height: qrcode_w,
          colorDark: "#1CA4FC",
          colorLight: "white",
          correctLevel: QRCode.CorrectLevel.H,
        });


      }).catch(err => {
        console.log("获取数据9cb4f2d08c失败  ")
        console.log(err)
      })
    } else {

    }

  },
  /**
   * 生成二维码
   */
  changeQrcode: function() {
    var objectId = wx.getStorageSync('objectId');
    const query = Bmob.Query('_User');
    query.get(objectId).then(res => {
      console.log("获取数据 objectId  ")
      console.log(res)
      this.setData({
        balance: res.balance

      })
      qrcode = new QRCode('canvas', {
        // usingIn: this,
        text: res.objectId,
        image: '/images/index.png',
        width: qrcode_w,
        height: qrcode_w,
        colorDark: "#1CA4FC",
        colorLight: "white",
        correctLevel: QRCode.CorrectLevel.H,
      });


    }).catch(err => {
      console.log("获取数据9cb4f2d08c失败  ")
      console.log(err)
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


})