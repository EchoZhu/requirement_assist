// pages/himan/himan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt: "",
    resultTxt: "123"
  },
  tellTheTrue: function() {
    var that = this
    wx.request({
      url: 'https://120.52.49.67:9000/api/microservice/demandassist/captcha/v1?SERIAL_NUMBER=18650212483&APP_ID=CBSSXQZ8SF&TRANS_ID=20180726190516680783898&TIMESTAMP=2018-07-26%2019:05:16%20680&TOKEN=7cf66d950548bea17285a0d836d16f53',

      success: function(res) {
        var result = res.data.UNI_BSS_HEAD.RESP_DESC
        console.log(res.data.UNI_BSS_HEAD.RESP_DESC)
        that.setData({
          resultTxt: result
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.tellTheTrue()
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