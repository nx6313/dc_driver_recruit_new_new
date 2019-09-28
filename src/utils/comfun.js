import { LoadingManager, DialogDistance } from '@/utils/http-config.js'

var picker = null // picker选择器
var signPanel = null // 签名板

export default {
  install: function (Vue) {
    var ComFun = {
      // 显示loading
      showLoading: function (context, tag, canCancelFlag, onCancelCallBack, container) {
        if (canCancelFlag === undefined) canCancelFlag = true
        if (onCancelCallBack === undefined) onCancelCallBack = () => {}
        let loader = context.$loading.show({
          container: container,
          canCancel: canCancelFlag,
          onCancel: onCancelCallBack,
          color: '#C51A20',
          loader: 'bars', // spinner 、 dots 、 bars
          backgroundColor: '#2C2C2C',
          opacity: 0.4
        })
        LoadingManager.set(tag, loader)
      },
      // 隐藏loading
      hideLoading: function (tag, callBack) {
        let loader = LoadingManager.get(tag)
        loader.hide()
        LoadingManager.delete(tag)
        if (callBack) callBack()
      },
      // dialog弹出框
      showDialogForLogin: function (context, title, message, rule, ruleOkTip, ruleErrorTip, sendSmsCodeCallBack, okCallBack) {
        if (title === undefined) title = '未定义标题'
        if (sendSmsCodeCallBack === undefined) sendSmsCodeCallBack = () => {}
        if (okCallBack === undefined) okCallBack = () => {}
        let btns = [
          {
            label: '取消登录',
            onClick: () => {}
          },
          {
            label: '确认登录',
            onClick: (phone, code) => {
              DialogDistance = null
              return okCallBack(phone, code)
            }
          }
        ]
        DialogDistance = context.$dialog_prompt({
          title: title,
          msg: message,
          showCancel: true,
          rule: rule,
          ruleOkTip: ruleOkTip,
          ruleErrorTip: ruleErrorTip,
          buttons: btns,
          sendSmsCodeCallBack: sendSmsCodeCallBack,
          isLogin: true
        })
        return DialogDistance
      },
      // 显示Toast
      showToast: function(context, msg, duration, htmlFlag = false) {
        if (msg === undefined) msg = 'toast 内容未定义'
        if (duration === undefined) duration = 2200
        context.$dialog_msg({
          msg: msg,
          duration: duration,
          html: htmlFlag
        })
      },
      // 显示签名面板
      showSignPanel: function(context, callBack) {
        if (callBack === undefined) callBack = () => {}
        signPanel = context.$dialog_sign({
          callBack: callBack
        })
      },
      closeSignPanel: function() {
        if (signPanel !== null) {
          signPanel.destorySign()
          signPanel = null
        }
      },
      // 弹出picker选择
      // data 为双层数组结构
      showPicker: function(title, data, onSelect, onChange, value) {
        const WheelPicker = require('wheel-picker')
        value = value || []
        picker = new WheelPicker({
          title: title,
          data: data,
          value: value,
          hideOnBackdrop: true,
          onSelect: (result) => {
            if (onSelect) onSelect(result)
            setTimeout(() => {
              if (picker != null) picker.destory()
              picker = null
            }, 300)
          },
          onCancel: () => {
            setTimeout(() => {
              if (picker != null) picker.destory()
              picker = null
            }, 300)
          },
          onChange: onChange
        })
        picker.show()
        return picker
      },
      // 日期格式转字符串，指定格式
      // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
      // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
      // 例子：
      // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      // (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
      formatDate: function (date, fmt) {
        if (date) {
          var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
          }
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
          }
          for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
          }
          return fmt
        }
        return null
      },
      // 获取指定日期几天前或几天后的日期，未指定日期按照当前日期计算
      getTargetDate (diff, date) {
        var today = new Date()
        if (date !== undefined) {
          today = date
        }
        var targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * Number(diff)
        var targetday = new Date()
        targetday.setTime(targetdayMilliseconds)
        return targetday
      },
      // 获取指定周的起止日期
      getWeekStartEnd (addWeekCount) {
        if (!addWeekCount) {
          addWeekCount = 0
        }
        var startEnd = []
        var milliSecond = 1000 * 60 * 60 * 24
        var currentDate = new Date()
        currentDate = new Date(currentDate.getTime() + (milliSecond * 7 * addWeekCount))
        var week = currentDate.getDay()
        var minusDay = week !== 0 ? week - 1 : 6
        var currentWeekFirstDay = new Date(currentDate.getTime() - (milliSecond * minusDay))
        var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (milliSecond * 6))
        startEnd.push(currentWeekFirstDay)
        startEnd.push(currentWeekLastDay)
        return startEnd
      },
      // 获取指定月的起止日期
      getMonthStartEnd (addMonthCount) {
        if (!addMonthCount) {
          addMonthCount = 0
        }
        var startEnd = []
        var currentDate = new Date()
        currentDate.setDate(1)
        currentDate.setMonth(currentDate.getMonth() + addMonthCount)
        var year = currentDate.getFullYear()
        var month = currentDate.getMonth()
        var currentMonthLastDay = null
        if (year === new Date().getFullYear() && month === new Date().getMonth()) {
          currentMonthLastDay = new Date()
        } else {
          currentMonthLastDay = this.getLastDay(year, month + 1)
        }
        startEnd.push(currentDate)
        startEnd.push(currentMonthLastDay)
        return startEnd
      },
      // 获取指定年的起止日期
      getYearStartEnd (addYearCount, currentDate = null) {
        if (!addYearCount) {
          addYearCount = 0
        }
        var startEnd = []
        if (currentDate === null) currentDate = new Date()
        currentDate.setDate(1)
        currentDate.setFullYear(currentDate.getFullYear() + addYearCount)
        var year = currentDate.getFullYear()
        var currentYearLastDay = null
        if (year === new Date().getFullYear()) {
          currentYearLastDay = new Date()
        } else {
          currentYearLastDay = this.getLastDay(year, 12)
        }
        startEnd.push(currentDate)
        startEnd.push(currentYearLastDay)
        return startEnd
      },
      // 获取指定年的几年后的日期
      getYearAfter (addYearCount, currentDate = null) {
        if (!addYearCount) {
          addYearCount = 0
        }
        if (currentDate === null) currentDate = new Date()
        currentDate.setFullYear(currentDate.getFullYear() + addYearCount)
        return currentDate
      },
      // 获取某月最后一天日期
      getLastDay (year, month) {
        var newYear = year
        var newMonth = month++
        if (newMonth > 12) {
          newMonth -= 12
          newYear++
        }
        var newDate = new Date(newYear, newMonth, 1)
        return new Date(newDate.getTime() - 1000 * 60 * 60 * 24)
      },
      // 判断设备类型
      isAndroidIos: function () {
        var p = navigator.platform
        var u = navigator.userAgent
        var app = navigator.appVersion
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        var isWeixin = !!/MicroMessenger/i.test(u) // 微信终端
        return {
          isAndroid: isAndroid,
          isiOS: isiOS,
          platform: p,
          isMobile: isAndroid || isiOS,
          deviceInfo: app,
          isWeixin: isWeixin
        }
      },
      // 获取路由页面对应服务器地址
      getPagePath: function (path) {
        return location.origin + location.pathname + '#/' + path
      },
      // 自动判断是以普通方式跳转页面传值还是通过hash值方式，并获取网址中的参数
      getRequestAuto: function (key) {
        let paramInHash = this.getRequestHash(key)
        let paramInSearch = this.getRequest(key)
        return paramInHash || paramInSearch
      },
      // 获取网址中的参数
      getRequest: function (key) {
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)")
        let url = location.search
        let str = decodeURIComponent(url.substr(1))
        let matchParams = str.match(reg)
        if (matchParams != null) return matchParams[2]
        return null
      },
      // 获取网址中的hash值
      getRequestHash: function (key) {
        var hash = location.hash
        var theRequest = {}
        var str = decodeURIComponent(hash.split('?')[1])
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
        if (key) {
          return theRequest[key]
        }
        return null
      },
      // 根据指定键返回json的数组中与所查找的值相同的数据位置
      getIndexInJsonArr (jsonArr, key, search) {
        var index = -1
        for (let i = 0; i < jsonArr.length; i++) {
          if (jsonArr[i][key] === search) {
            index = i
            break
          }
        }
        return index
      },
      // 判断是否为空对象
      isEmptyObject: function(obj) {
        // eslint-disable-next-line
        for (let key in obj) {
          return false
        }
        return true
      },
      // 深拷贝
      deepCopy: function(obj) {
        let resultObject = {}
        for (let o in obj) {
          if (typeof obj[o] === 'object' && !Array.isArray(obj[o])) {
            let x = {}
            x[o] = this.deepCopy(obj[o])
            Object.assign(resultObject, x)
          } else {
            let x = {}
            x[o] = obj[o]
            Object.assign(resultObject, x)
          }
        }
        return resultObject
      },
      // 关闭当前页面可能存在的弹出框
      closeCurDialog: function() {
        if (picker != null) {
          picker.destory()
          picker = null
        }
        if (DialogDistance != null) {
          DialogDistance.destory()
          DialogDistance = null
        }
      },
      // 拨打电话
      callPhone: function(context, phoneNumber) {
        context.$webapp.sendUrlToApp(`call?phone=${phoneNumber}`)
      },
      // 复制文本
      copyTxt (context, ref, txt, successTip = '复制成功', failTip = '复制失败') {
        const ClipboardJS = require('clipboard')
        let clipboard = new ClipboardJS(ref, {
          text: function() {
            return txt
          }
        })
        let _that = this
        clipboard.on('success', () => {
          _that.showToast(context, successTip)
        })
        clipboard.on('error', () => {
          _that.showToast(context, failTip)
        })
      },
      // 数字转大写
      toChinesNum: function(num) {
        let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
        let unit = ['', '十', '百', '千', '万']
        num = parseInt(num)
        let getWan = (temp) => {
          let strArr = temp.toString().split('').reverse()
          let newNum = ''
          for (var i = 0; i < strArr.length; i++) {
            newNum = (i === 0 && strArr[i] === 0 ? '' : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? '' : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum
          }
          return newNum
        }
        let overWan = Math.floor(num / 10000)
        let noWan = num % 10000
        if (noWan.toString().length < 4) noWan = '0' + noWan
        return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
      },
      // 处理访问地址栏中的参数
      disposeVisitArguments (key, callBack) {
        if (typeof key === 'string') {
          let argumentss = this.getRequestAuto(key)
          if (callBack) callBack(argumentss)
          return false
        } else {
          let argumentsArr = {}
          for (let k of key) {
            let argumentss = this.getRequestAuto(k)
            if (argumentss) argumentsArr[k] = argumentss
          }
          if (callBack) callBack(argumentsArr)
          return false
        }
      },
      // 将json数据转为table富文本代码
      convertDataToTabelHtml (data, tabelClass) {
        if (typeof data == 'object' && Object.keys(data).length > 0) {
          let tabelTrHtml = ``
          for (let key in data) {
            tabelTrHtml += `<tr><td>${key}</td><td>${data[key]}</td></tr>`
          }
          return `<table class="${tabelClass}">${tabelTrHtml}</table>`
        }
        return ''
      },
      checkHasKey (obj, keys) {
        if (typeof keys === 'string') {
          return Object.keys(obj).indexOf(keys) >= 0
        } else {
          let allInclude = true
          for (let i in keys) {
            if (Object.keys(obj).indexOf(keys[i]) < 0 || (Object.keys(obj).indexOf(keys[i]) >= 0 && !obj[keys[i]])) {
              allInclude = false
              break
            }
          }
          return allInclude
        }
      }
    }

    Object.defineProperty(Vue.prototype, '$comfun', { value: ComFun })
  }
}
