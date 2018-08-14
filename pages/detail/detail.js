// pages/detail/detail.js
var url = require('../../utils/url.js')
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    requestTitle: "",
    requestID: "000000",
    requestPoster: "", //需求提出人
    requestPosterOrgnization: "", //提出人所属组织
    requestOwner: "", //需求负责人
    requestStatus: "", //状态
    requestPosterPhone: "", //需求提出人电话
    requestCatalog: "", //需求分类
    versionPlan: "", //版本计划
    createdTime: "", //需求创建时间
    finshedTime: "", //需求结束时间
    latestUpdateTime: "", //记录最后更新时间
    onlineTime: "", //版本上线时间
    actualOnlineTime: "", //版本实际上线时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    util.showLoading()
    var that = this
    that.setData({
      requestID: options.requestID
    })
    var requestUrl = url.getDetail(that.data.requestID);
    wx.request({
      url: requestUrl,
      success: function(res) {
        var RSP = res.data.UNI_BSS_BODY.DETAIL_ORIGIN_RSP.RSP
        var RSP_CODE = RSP.RSP_CODE
        // 调用成功
        if (RSP_CODE == "0000") {
          var DATA = RSP.DATA
          that.setData({
            requestTitle: DATA[0].TITLE, //需求标题
            requestPoster: DATA[0].EXPRESSOR, //需求提出人
            requestPosterOrgnization: DATA[0].DEPARTMENT, //提出人所属组织
            requestOwner: DATA[0].BELONGER, //需求负责人
            requestStatus: DATA[0].STATE, //状态
            requestPosterPhone: DATA[0].SERIAL_NUMBER, //需求提出人电话
            requestCatalog: DATA[0].CATEGORY, //需求分类
            versionPlan: DATA[0].VERSION_PLAN, //版本计划
            createdTime: DATA[0].CREATE_TIME, //需求创建时间
            finshedTime: DATA[0].FINISH_TIME, //需求结束时间
            latestUpdateTime: DATA[0].UPDATE_TIME, //记录最后更新时间
            actualOnlineTime: DATA[0].RELEASE_TIME, //版本上线时间
          })
        } else {
          wx.showToast({
            title: '数据加载失败,稍后重试',
            icon: 'none',
            duration: 3000
          })
        }
        util.hideLoading()
      },
      fail: function() {
        util.hideLoading()
        wx.showToast({
          title: '数据加载失败,稍后重试',
          icon: 'none',
          duration: 3000
        })
      }
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
    // console.info("requstID:", this.data.requestID)
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