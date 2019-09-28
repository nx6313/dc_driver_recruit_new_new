const mutuallyKey = 'dcapp://'

export default {
  // 通过事件对象调用
  callApp: () => {
    // eslint-disable-next-line
    console.log(window, this.isAndroidIos())
  },
  // 通过链接调用原生方法 ios android 通用
  sendUrlToApp: mutuallyPath => {
    if (window) window.location.href = mutuallyKey + mutuallyPath
  },
  // 判断设备类型
  isAndroidIos: () => {
    var p = navigator.platform
    var u = navigator.userAgent
    var app = navigator.appVersion
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    return {
      isAndroid: isAndroid,
      isiOS: isiOS,
      platform: p,
      isMobile: isAndroid || isiOS,
      deviceInfo: app
    }
  }
}

/**
 * 公共参数
token，所有页面都拼上，有就拼，没有就不拼

2、续保查询保单详情
	1）在线报价：dcapp://open/native/onlineQuote
	2）拜访记录：dcapp://open/native/visitrRecords 参数：customerID 客户id
3、询价单详情点重新报价
	dcapp://open/native/requote
4、支付成功页面查看保单
	dcapp://open/toInsureOrderList



其他
H5关闭：dcapp://close
H5完全重新打开新的webview：dcapp://open/h5 带参数returnUrl
分享：dcapp://share
微信支付：dcapp://pay/wechat?partnerId=&prepayId=&packageValue&nonceStr=&timeStamp&sign=
登录：dcapp://login
退出登录：dcapp://logout
拨打电话：dcapp://call?phone
打开h5支付外链：dcapp://open/payH5 带参数returnUrl

友盟：
iOS：5d103c384ca357a562000ab6
android：5d103c980cafb2ddd700107c
 */
