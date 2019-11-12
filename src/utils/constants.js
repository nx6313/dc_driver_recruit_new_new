export const APP_CONFIG = {
  isTest: true, // 设置h5是否为测试环境，将忽略内置环境 开启顶部服务器提示调试工具
  localhostServerBaseUrl: 'http://172.18.4.73:8080/' // 默认环境 仅影响本地
  // localhostServerBaseUrl: 'https://test.dcchuxing.com/'
}

export const APP_DATA = {
  hasAuthInfoInUrl: function (context) {
    let token = context.$comfun.getRequestAuto('token')
    let secret = context.$comfun.getRequestAuto('secret')
    if (token && secret) {
      return true
    }
    return false
  },
  // 判断当前是否有用户登陆认证信息
  hasAuthInfo: function (context) {
    return this.hasAuthInfoInUrl(context) || (context.$store.state.auth.token && context.$store.state.auth.secret)
  },
  // 车牌号前缀数据
  carPlatePre: function () {
    return [
      [
        // 山西 太原
        { text: '晋A', value: '晋A' },
        // 山西 大同
        { text: '晋B', value: '晋B' },
        // 山西 阳泉
        { text: '晋C', value: '晋C' },
        // 山西 长治
        { text: '晋D', value: '晋D' },
        // 山西 晋城
        { text: '晋E', value: '晋E' },
        // 山西 朔州
        { text: '晋F', value: '晋F' },
        // 山西 雁北
        { text: '晋G', value: '晋G' },
        // 山西 忻州
        { text: '晋H', value: '晋H' },
        // 山西 吕梁
        { text: '晋J', value: '晋J' },
        // 山西 晋中
        { text: '晋K', value: '晋K' },
        // 山西 临汾
        { text: '晋L', value: '晋L' },
        // 山西 运城
        { text: '晋M', value: '晋M' }
      ]
    ]
  },
  // 车辆颜色数据
  carColor: function () {
    return [
      [
        { text: '白色', value: '白色' },
        { text: '黑色', value: '黑色' },
        { text: '灰色', value: '灰色' },
        { text: '银色', value: '银色' },
        { text: '蓝色', value: '蓝色' },
        { text: '红色', value: '红色' },
        { text: '金色', value: '金色' },
        { text: '棕色', value: '棕色' },
        { text: '紫色', value: '紫色' },
        { text: '绿色', value: '绿色' },
        { text: '粉色', value: '粉色' },
        { text: '黄色', value: '黄色' }
      ]
    ]
  }
}
