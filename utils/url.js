var util = require('/util.js')
var md5 = require('/md5.js')
const app = getApp()
// http://host:port/api/所属系统/{能力名称}/{服务名称}/{版本号}?APP_ID=value1&TIMESTAMP=value2&TRANS_ID=value3&TOKEN=value4
function formatBaseUrl(APIName){
  var baseUrl = ''
  var myDate = new Date();
  //APP_ID
  var APP_ID = app.globalData.appId;
  //TIMESTAMP
  var TIMESTAMP = util.formatTimeStamp(myDate);
  var randomNum6 = randomNum(6);
  //TRANS_ID
  var TRANS_ID = util.formatTimeTransId(myDate) + randomNum6;
  //计算token
  var app_secret = app.globalData.appSecret;
  var parmas = "APP_ID" + APP_ID + "TIMESTAMP" + TIMESTAMP + "TRANS_ID" + TRANS_ID + app_secret
  var token = md5.hexMD5(parmas);
  baseUrl = 'https://open.chinaunicom.cn/api/microservice/demandassist/'+APIName+'/v1?APP_ID=' + APP_ID + "&TIMESTAMP=" + TIMESTAMP + "&TRANS_ID=" + TRANS_ID + "&TOKEN=" + token;
  return baseUrl;
}

/**
 * 获取验证码
 * 
 * 入参：
 * LOGIN_NAME 手机号
 * 
 */
function getVerificationCodeUrl(SERIAL_NUMBER){
  var verificationCodeUrl = formatBaseUrl("captcha") + "&SERIAL_NUMBER=" + SERIAL_NUMBER;
  return verificationCodeUrl
}
/**
 * 注册
 * 
 * 入参：
 * LOGIN_NAME 手机号
 * CAPTCHA 验证码
 * PASSWORD 密码
 * 
 */
function getRegistUrl(LOGIN_NAME, CAPTCHA, PASSWORD) {
  var registUrl = formatBaseUrl("register") + "&LOGIN_NAME=" + LOGIN_NAME + "&CAPTCHA=" + CAPTCHA + "&PASSWORD=" + PASSWORD;
  return registUrl
}
/**
 * 登陆
 * 
 * 入参：
 * LOGIN_NAME 手机号
 * PASSWORD 密码
 * 
 */
function getLoginUrl(LOGIN_NAME, PASSWORD){
  var loginUrl = formatBaseUrl("login") + "&LOGIN_NAME=" + LOGIN_NAME + "&PASSWORD=" + PASSWORD;
  return loginUrl
}
/**
 * 我的
 * 
 * 入参：
 * LOGIN_NAME 手机号
 * 
 */
function getOwnOrigin(SERIAL_NUMBER){
  var url = formatBaseUrl("ownOrigin") + "&SERIAL_NUMBER=" + SERIAL_NUMBER;
  return url
}

/**
 * 首页列表
 * 
 * 入参：
 * LOGIN_NAME 手机号
 * 
 */
function getMainList(SERIAL_NUMBER) {
  var url = formatBaseUrl("originShow") + "&SERIAL_NUMBER=" + SERIAL_NUMBER;
  return url
}
/**
 * 需求详情
 * 
 * 入参：
 * LOGIN_NAME 手机号
 * 
 */
function getDetail(ORIGIN_REQUIREMENT_ID) {
  var url = formatBaseUrl("detailOrigin") + "&ORIGIN_REQUIREMENT_ID=" + ORIGIN_REQUIREMENT_ID;
  return url
}

// 生成指定位数的随机数 
function randomNum(n) {
  var t = '';
  for (var i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10);
  }
  return t;
}

module.exports = {
  getVerificationCodeUrl: getVerificationCodeUrl,
  getRegistUrl: getRegistUrl,
  getLoginUrl: getLoginUrl,
  getOwnOrigin: getOwnOrigin,
  getMainList: getMainList,
  getDetail: getDetail
}
