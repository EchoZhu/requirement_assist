// pages/my/my.js
var url = require('../../utils/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [{
      avatarUrl: "../../images/avatar-my.png"
    }],
    phone: '-',
    onlineRequestNumber: '-',
    unonlineRequestNumber: '-',

    unaccepted: 0, //待预接收需求
    unassignedNumber: 0, //待分配方案负责人
    unpreanalysisNumber: 0, //待需求预分析
    unratifiedNumber: 0, //待集团批准
    canceled: 0, //原始需求取消
    createdRequsts: 0, //已创建业务需求
   
    dataList: []

  },
  //切换账户
  changeAccount: function() {
    wx.showModal({
      title: '是否要切换账户',
      content: '',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setStorageSync("logintag", false)
          wx.setStorageSync("phoneNumber", '')
          wx.navigateTo({
            url: '../../pages/login/login',
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData()

  },
  loadData: function() {
    wx.showNavigationBarLoading();
    var that = this;
    var phoneNumber = wx.getStorageSync("phoneNumber")
    console.info("phoneNumber---" + phoneNumber)
    var requestUrl = url.getOwnOrigin(phoneNumber);
    console.info("getOwnOrigin--" + requestUrl)
    wx.request({
      url: requestUrl,
      success: function(res) {
        var RSP_DESC = res.data.UNI_BSS_BODY.ORIGIN_SHOW_RSP.RSP.RSP_DESC
        var RSP_CODE = res.data.UNI_BSS_BODY.ORIGIN_SHOW_RSP.RSP.RSP_CODE
        if (RSP_CODE == "0000") {
          var DATA = res.data.UNI_BSS_BODY.ORIGIN_SHOW_RSP.RSP.DATA
          if (DATA.length == 0) {
            that.setData({
              unpreanalysisNumber: 0,
              unassignedNumber: 0,
              unaccepted: 0,
              createdRequsts: 0,
              unratifiedNumber: 0,
              canceled: 0,
            })
          } else {
            for (var i = 0; i < DATA.length; i++) {
              var STATE = DATA[i].STATE
              var count = DATA[i].COUNT
              switch (STATE) {

                case "待预接收需求":
                  that.setData({
                    unaccepted: count
                  })
                  break;

                case "待分配方案负责人":
                  that.setData({
                    unassignedNumber: count
                  })
                  break;
                case '待需求预分析':
                  that.setData({
                    unpreanalysisNumber: count
                  })
                  break;
                case "待集团批准":
                  that.setData({
                    unratifiedNumber: count
                  })
                  break;
                case "原始需求取消":
                  that.setData({
                    canceled: count
                  })
                  break;
                case "已创建业务需求":
                  that.setData({
                    createdRequsts: count
                  })
                  break;
                
               
               
                
              }
            }
          }

        } else {
          wx.showToast({
            title: "数据获取失败",
            icon: "none",
            duration: 3000
          })
        }
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
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
    var logintag = wx.getStorageSync("logintag")
    var phoneNumber = wx.getStorageSync("phoneNumber")
    //如果没有登录，则跳转到登录界面
    if (logintag == "" || logintag == false) {
      // console.info("logintag", logintag)
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    } else if (logintag == true) {
      // console.info("isLogin:", logintag)
    }

    this.setData({
      phone: phoneNumber
    })

    this.loadData()
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
    this.loadData()
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