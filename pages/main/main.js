// pages/main/main.js
var url = require('../../utils/url.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoginTag: '',
    clickId: -1,
    hideTips: 'none',
    fileterHide: 'flex',
    listArray: [
      // {
      //   TITLE: "中国联通职工创新成果展示需求中国联通职工创新成果展示需求",
      //   EXPRESSOR: "张三",
      //   CREATE_TIME: "20170710",
      //   STATE: "待需求分析",
      //   ORIGIN_REQUIREMENT_ID: "111111"
      // }, {
      //   TITLE: "新成果展示需求中国联通职工创",
      //   EXPRESSOR: "三张",
      //   CREATE_TIME: "20170710",
      //   STATE: "求分析待需",
      //   ORIGIN_REQUIREMENT_ID: "222222"
      // }, {
      //   TITLE: "新成果展示需求中国联通职工创",
      //   EXPRESSOR: "三张",
      //   CREATE_TIME: "20170710",
      //   STATE: "求分析待需",
      //   ORIGIN_REQUIREMENT_ID: "222222"
      // }, {
      //   TITLE: "新成果展示需求中国联通职工创",
      //   EXPRESSOR: "三张",
      //   CREATE_TIME: "20170710",
      //   STATE: "求分析待需",
      //   ORIGIN_REQUIREMENT_ID: "222222"
      // }
    ],
    //list的item背景，默认颜色#fff（白色），点击状态颜色：#f8655a（橙色）
    requst_container_background_color: '#fff',
    requst_container_background_color_clicked: '#f8655a',
    //item中需求标题默认颜色#000（黑色），点击态颜色：#fff(白色)
    request_container_txt_color: "#000",
    request_container_txt_color_clicked: "#fff",
    //item中需求提出人，需求创建时间 默认颜色：#9f9f9f（灰色），点击态颜色：#fff（白色）
    request_content_txt_color: '#9f9f9f',
    request_content_txt_color_clicked: '#fff',
    //item中状态和需求id，默认颜色#f7776a（橙色），点击态颜色：#fff（白色）
    statusAndID_txt_color: '#f7776a',
    statusAndID_txt_color_clicked: '#fff',

    currentMonth: '', //当前月份
    status: ['全部', '待预接收需求', '待分配方案负责人', '待需求预分析', '待集团批准', '已创建业务需求', '原始需求取消']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    util.showLoading()
    var logintag = wx.getStorageSync("logintag")
    //如果没有登录，则跳转到登录界面
    if (logintag == "" || logintag == false) {
      // console.info("logintag", logintag)
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    } else if (logintag == true) {
      // console.info("isLogin:", logintag)
      that.loadData()
    }
  },
  directToRequestDetail: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../../pages/detail/detail?requestID=' + this.data.listArray[index].ORIGIN_REQUIREMENT_ID,
    })
    this.setData({
      clickId: index
    })
  },
  loadData: function() {
    var that = this;
    var phoneNumber = wx.getStorageSync("phoneNumber")
    if (phoneNumber != '') {
      var requestUrl = url.getMainList(phoneNumber);
      wx.request({
        url: requestUrl,
        success: function(res) {
          var RSP = res.data.UNI_BSS_BODY.ORIGIN_SHOW_RSP.RSP
          var RSP_CODE = RSP.RSP_CODE
          // 调用成功
          if (RSP_CODE == "0000") {
            var DATA = RSP.DATA
            if (DATA.length == 0) {
              that.setData({
                hideTips: 'flex',
                fileterHide: 'none'
              })
            } else {
              that.setData({
                hideTips: 'none',
                fileterHide: 'flex'
              })
            }
            that.setData({
              listArray: DATA,

            })
          } else {
            wx.showToast({
              title: '数据加载失败',
              icon: 'none',
              duration: 3000
            })
          }
          util.hideLoading()
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      })
    }

  },

  //时间选择控件
  bindDateChange: function(e) {
    console.log(e.detail.value)
  },
   //状态选择控件
  bindStatusChange:function(e) {
    console.log(e.detail.value)
  },
  // 跳到顶端
  goUp: function() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 获取当前月份
  getCurrentMonth: function() {
    var date = new Date();
    var currentDate = util.formatTimeYYYYMMDD(date)
    this.setData({
      currentMonth: currentDate
    })
    console.info("currentDate--" + this.data.currentMonth)
  },
  bindDateChange: function(e) {
    console.log(e.detail.value)
    var date = e.detail.value
    //请求筛选接口，传入时间
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var logintag = wx.getStorageSync("logintag")
    // console.info(logintag)
    var logintag = wx.getStorageSync("logintag")
    //如果没有登录，则跳转到登录界面
    if (logintag == "" || logintag == false) {
      // console.info("logintag", logintag)
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    } else if (logintag == true) {
      // console.info("isLogin:", logintag)
      this.loadData()
    }
    this.getCurrentMonth()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    util.hideLoading()
    // 停止下拉动作
    wx.stopPullDownRefresh();
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
    util.showLoading()
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