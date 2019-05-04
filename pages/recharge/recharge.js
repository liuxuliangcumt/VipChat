// pages/recharge/recharge.js
const way = '1、点击充值金额 \n2、向收银员展示充值二维码\n3、用微信或支付宝扫码完成付款\n4、刷新余额确认'
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
    way: way,
    charges: [{ charge_number: 50, sell_number: 47.5 }, { charge_number: 100, sell_number: 90 }]
  },
  chargeQr:function(e){

    console.log(e.currentTarget.dataset.type)
    var amount = e.currentTarget.dataset.type;
    var objectId=  wx.getStorageSync('objectId');
    var openId = wx.getStorageSync('openId');
    console.log(objectId+"   "+openId )
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: '{userObjectId:' + objectId + ',openId:' + openId + ',amonut:' + amount+'}',
      image: '/images/index.png',
      width: qrcode_w,
      height: qrcode_w,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  }
})