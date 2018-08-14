// pages/login/login.js
var url = require('../../utils/url.js')
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titlelogo: '../../images/titile_log.png',
    himanimag: '../../images/himan.png',
    username_pic: '../../images/usernamepic.png',
    pwd_pic: '../../images/pwdpic.png',
    phoneNumber:'',
    pwd:''


  },
  // 登录
  login:function(){
    // 调登录接口，传入用户名手机号、密码
    var phoneNumber = this.data.phoneNumber;
    var pwd = this.data.pwd;
    if (util.validatemobile(phoneNumber) && pwd !=""){
      var requestUrl = url.getLoginUrl(phoneNumber, pwd);
      wx.request({
        url: requestUrl,
        success: function (res) {
          var RSP_DESC = res.data.UNI_BSS_BODY.LOGIN_RSP.RSP.RSP_DESC
          var RSP_CODE = res.data.UNI_BSS_BODY.LOGIN_RSP.RSP.RSP_CODE
          wx.showToast({
            title: RSP_DESC,
            icon: "none",
            duration: 3000
          })
          if (RSP_CODE == "0000" | RSP_CODE == "0002") {
            wx.setStorageSync("logintag", true)
            wx.setStorageSync("phoneNumber", phoneNumber)
            wx.switchTab({
              url: '../../pages/main/main',
            })
          }
        }
      })
    } else if (util.validatemobile(phoneNumber) && pwd == ""){
      wx.showToast({
        title: '请输入密码',
        icon: "none",
        duration: 3000
      })
    }
    
   

    // // 失败调失败提示
    // wx.showToast({
    //   title: '登录失败，请重试',
    //   icon:'none',
    //   duration:2000
    // })

    // 测试用
    // wx.navigateTo({
    //   url: '../../pages/main/main',
    // })
  },
  // 注册
  regist:function(){
    wx.navigateTo({
      url: '../../pages/regist/regist?fromTag=regist',
    })
  },
// 忘记密码,跳转到密码重置页面
  forgetpwd: function(){
    wx.navigateTo({
      url: '../../pages/regist/regist?fromTag=forgetpwd',
    })
  },
  getPhoneNumber:function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  getPWD:function(e){
    this.setData({
      pwd: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var logintag = wx.getStorageSync("logintag")
    //如果没有登录，则跳转到登录界面
    if (logintag == "" || logintag == false) {
      // console.info("not login:")
    } else if (logintag == true) {//如果已经登录则直接跳转到主页面
      wx.switchTab({
        url: '../../pages/main/main',
      })
    }
    console.info("onLoad")

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
    console.info("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.info("onHide")
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