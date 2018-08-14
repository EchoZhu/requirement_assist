const formatTimeStamp = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const milliseconds = date.getMilliseconds();//获取毫秒（3位）

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':') + " " + [milliseconds].map(formatMilliseconds).join('')
}

const formatTimeTransId = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const milliseconds = date.getMilliseconds();//获取毫秒（3位）
  return [year, month, day, hour, minute, second].map(formatNumber).join('') + [milliseconds].map(formatMilliseconds).join('')
}
// YYYY-MM-DD
const formatTimeYYYYMMDD = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 格式化毫秒 保证有三位
const formatMilliseconds = n => {
  n = n.toString()
  return n[2] ? n : '0' + n
}
//页面显示加载动画
 function showLoading() {
  wx.showLoading({
    title: '数据加载中...',
  })
}

//页面隐藏加载动画
function hideLoading() {
  wx.hideLoading()
}

// 判断输入手机号码是否合法
function validatemobile(mobile) {
  if (mobile.length == 0) {
    wx.showToast({
      title: '请输入手机号！',
      icon: 'none',
      duration: 1500
    })
    return false;
  }
  if (mobile.length != 11) {
    wx.showToast({
      title: '手机号长度有误！',
      icon: 'none',
      duration: 1500
    })
    return false;
  }
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if (!myreg.test(mobile)) {
    wx.showToast({
      title: '手机号有误！',
      icon: 'none',
      duration: 1500
    })
    return false;
  }
  return true;
}

module.exports = {
  formatTimeStamp: formatTimeStamp,
  formatTimeTransId: formatTimeTransId,
  showLoading: showLoading,
  hideLoading, hideLoading,
  validatemobile:validatemobile,
  formatTimeYYYYMMDD: formatTimeYYYYMMDD
}
