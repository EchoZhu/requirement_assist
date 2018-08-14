// pages/my/my.js
var url = require('../../utils/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [{
      avatarUrl: "../../images/usernamepic.png",
      phone: 18611881816
    }],
    myRequestNumber: 108,
    approvedRequestNumber: 256,

    unacceptedNumber: 3, //待接收需求
    unassignedNumber: 2, //待分配方案负责人
    unpreanalysisNumber: 43, //待需求预分析
    unratifiedNumber: 123, //待集团批准
    unfeedbackNumber: 1, //待反馈需求分析结果
    uncreatedNumber: 333 //待创建业务需求
  },
  changeAccount() {

    var SERIAL_NUMBER = '18611881816';
    var requestUrl = url.getVerificationCodeUrl(SERIAL_NUMBER);    
    var result =""
    // 发起请求
    wx.request({
      url: requestUrl,
      success: function (res) {
        var RESP_DESC = res.data.UNI_BSS_HEAD.RESP_DESC;
        var TRANS_ID = res.data.UNI_BSS_HEAD.TRANS_ID;
        var TIMESTAMP = res.data.UNI_BSS_HEAD.TIMESTAMP;
        var RESP_CODE = res.data.UNI_BSS_HEAD.RESP_CODE;
        var APP_ID = res.data.UNI_BSS_HEAD.APP_ID;

        result = "RESP_DESC: " + RESP_DESC + "\nTRANS_ID:" + TRANS_ID + "\nTIMESTAMP:" + TIMESTAMP + "\nRESP_CODE:" + RESP_CODE + "\nAPP_ID:" + APP_ID;
        console.info(result)

        wx.showToast({
          title: result,
          icon:"none",
          duration:10000
        })

      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})