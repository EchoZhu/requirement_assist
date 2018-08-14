// pages/regist/regist.js
var url = require('../../utils/url.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registtitle: '注册账号',
    str_phonenumber: '手机号',
    str_pwd: '密码',
    str_confirmpwd: '密码确认',
    str_confirmcode: '验证码',
    str_getconfirmcode: '获取验证码',
    str_confirm: '确定',
    phonenumber: '',
    pwd: '',
    confirmpwd: '',
    confirmcode: ''
  },
  // 获取用户输入手机号
  getInputPhoneNumber: function(e) {
    this.setData({
      phonenumber: e.detail.value
    })
  },

  // 获取用户输入密码
  getInputPWD: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  // 获取用户再次输入密码
  getConfirmPWD: function(e) {
    this.setData({
      confirmpwd: e.detail.value
    })
  },

  // 获取用户输入验证码
  getConfirmCode: function(e) {
    this.setData({
      confirmcode: e.detail.value
    })
  },
  // 点击获取验证码按钮
  getConfirmCodeAct: function() {
    //如果是合法的手机号
    if (util.validatemobile(this.data.phonenumber)) {
      var phoneNumber = this.data.phonenumber
      console.log("phoneNumber:", phoneNumber)
    }
    // 调用获取验证码接口
    var SERIAL_NUMBER = this.data.phonenumber;
    var requestUrl = url.getVerificationCodeUrl(SERIAL_NUMBER);
    console.info("requestUrl:" + requestUrl)
    var result = ''
    wx.request({
      url: requestUrl,
      success: function(res) {
        var RSP_DESC = res.data.UNI_BSS_BODY.CAPTCHA_RSP.RSP.RSP_DESC
        wx.showToast({
          title: RSP_DESC,
          icon: "none",
          duration: 3000
        })
      }
    })

  },
  // 点击确认按钮
  confirm: function() {
    var phonenumber = this.data.phonenumber
    var pwd = this.data.pwd
    var repwd = this.data.confirmpwd
    var confirmcode = this.data.confirmcode
    if (this.validateinputinfo(phonenumber, pwd, repwd, confirmcode)) {
      //请求注册接口
      // console.log("test:", this.data.phonenumber + " " + this.data.pwd + " " + this.data.confirmpwd + " " + this.data.confirmcode)
      var requestUrl = url.getRegistUrl(phonenumber, confirmcode, pwd);
      console.info("requestUrl==" + requestUrl)
      wx.request({
        url: requestUrl,
        success: function (res) {
          var RSP_DESC = res.data.UNI_BSS_BODY.REGISTER_RSP.RSP.RSP_DESC
          var RSP_CODE = res.data.UNI_BSS_BODY.REGISTER_RSP.RSP.RSP_CODE

          wx.showToast({
            title: RSP_DESC,
            icon: "none",
            duration: 3000
          })
          if (RSP_CODE == "0000" | RSP_CODE == "0002"){
            wx.setStorageSync("logintag", true)
            wx.setStorageSync("phoneNumber", phonenumber)
            wx.switchTab({
              url: '../../pages/main/main',
            })
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //根据登录页面中不同点击传递不同值
    var fromTag = options.fromTag
    var nbtitle = ''
    if (fromTag == 'regist') {
      nbtitle = '注册账号'
    } else if (fromTag == 'forgetpwd') {
      nbtitle = '密码重置'
    }
    wx.setNavigationBarTitle({
      title: nbtitle,
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

  // 点击按钮时进行用户输入信息是否合法的判断
  validateinputinfo: function(phonenumber, pwd, repwd, confirmcode) {
    //如果输入的手机号合法
    if (util.validatemobile(phonenumber)) {
      if ((pwd != "") && (repwd != "") && (pwd == repwd)) {
        if (confirmcode != "") {
          return true;
        } else {
          wx.showToast({
            title: '请输入验证码',
            icon: 'none',
            duration: 1500
          })
          return false;
        }
      } else {
        wx.showToast({
          title: '两次密码输入不一致！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
    } else {
      return false;
    }

  }
})