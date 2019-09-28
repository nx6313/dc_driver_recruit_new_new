import axios from 'axios'
import DialogMsg from '@/plugins/dialogBox/msg.js'
import store from '@/store'

var LoadingManagerDistance = new Map() // 管理loading对象
var DialogDist = null // dialog弹窗

const Axios = axios.create({
  timeout: 20000
})
const AxiosForm = axios.create({
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      if (data[it]) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
    }
    return ret != '' ? ret.substr(0, ret.length - 1) : ret
  }],
  timeout: 20000
})
Axios.interceptors.request.use(config => {
  config.headers['appType'] = 2  // 请求的类型 1：司机、2：普通会员
  config.headers['devicetype'] = 5
  if (store.state.auth.token) {
    config.headers['token'] = store.state.auth.token
  }
  if (store.state.auth.secret) {
    config.headers['secret'] = store.state.auth.secret
  }
  return config
})
AxiosForm.interceptors.request.use(config => {
  config.headers['appType'] = 2  // 请求的类型 1：司机、2：普通会员
  config.headers['devicetype'] = 5
  if (store.state.auth.token) {
    config.headers['token'] = store.state.auth.token
  }
  if (store.state.auth.secret) {
    config.headers['secret'] = store.state.auth.secret
  }
  return config
})
Axios.interceptors.response.use((response) => {
  if (response.headers.secret && response.headers.token) {
    store.commit('updateAuth', {
      secret: response.headers.secret,
      token: response.headers.token
    })
  }
  return response.data
}, (error) => {
  // eslint-disable-next-line
  console.log(error)
  LoadingManagerDistance.forEach((loader) => {
    loader.hide()
  })
  LoadingManagerDistance.clear()
  if (axios.isCancel(error)) {
    DialogMsg.installMsg({
      msg: '请求已取消',
      duration: 2000
    })
  } else {
    if (error.message.includes('timeout')) {
      DialogMsg.installMsg({
        msg: '请求超时',
        duration: 2000
      })
    } else {
      // eslint-disable-next-line
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        DialogMsg.installMsg({
          msg: `请求出错，错误码：${error.response.status}，请联系客服`,
          duration: 2000
        })
      } else if (error.request) {
        DialogMsg.installMsg({
          msg: '请求未响应，请检查您的网络连接',
          duration: 2000
        })
      } else {
        DialogMsg.installMsg({
          msg: '请求出错',
          duration: 2000
        })
      }
    }
  }
  if (DialogDist != null) {
    DialogDist.destory()
    DialogDist = null
  }
  return Promise.reject(error)
})
AxiosForm.interceptors.response.use((response) => {
  if (response.headers.secret && response.headers.token) {
    store.commit('updateAuth', {
      secret: response.headers.secret,
      token: response.headers.token
    })
  }
  return response.data
}, (error) => {
  // eslint-disable-next-line
  console.log(error)
  LoadingManagerDistance.forEach((loader) => {
    loader.hide()
  })
  LoadingManagerDistance.clear()
  if (axios.isCancel(error)) {
    DialogMsg.installMsg({
      msg: '请求已取消',
      duration: 2000
    })
  } else {
    if (error.message.includes('timeout')) {
      DialogMsg.installMsg({
        msg: '请求超时',
        duration: 2000
      })
    } else {
      // eslint-disable-next-line
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        DialogMsg.installMsg({
          msg: `请求出错，错误码：${error.response.status}，请联系客服`,
          duration: 2000
        })
      } else if (error.request) {
        DialogMsg.installMsg({
          msg: '请求未响应，请检查您的网络连接',
          duration: 2000
        })
      } else {
        DialogMsg.installMsg({
          msg: '请求出错',
          duration: 2000
        })
      }
    }
  }
  if (DialogDist != null) {
    DialogDist.destory()
    DialogDist = null
  }
  return Promise.reject(error)
})
const FileAxios = axios.create({
  timeout: 20000
})
FileAxios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // eslint-disable-next-line
  console.log(error)
  LoadingManagerDistance.forEach((loader) => {
    loader.hide()
  })
  LoadingManagerDistance.clear()
  if (axios.isCancel(error)) {
    DialogMsg.installMsg({
      msg: '文件上传请求已取消',
      duration: 2000
    })
  } else {
    if (error.message.includes('timeout')) {
      DialogMsg.installMsg({
        msg: '文件上传超时',
        duration: 2000
      })
    } else {
      DialogMsg.installMsg({
        msg: '文件上传出错',
        duration: 2000
      })
    }
  }
  return Promise.reject(error)
})

let http_get = (context, url, params, source) => {
  let headers = {}
  let axiosOptions = {
    method: 'GET',
    headers: headers,
    url: context.$BASE_URL + url
  }
  if (source) axiosOptions.cancelToken = source.token
  if (params) {
    axiosOptions.params = params
  }
  return Axios(axiosOptions)
}
let http_get_ = (url, params, source) => {
  let headers = {}
  let axiosOptions = {
    method: 'GET',
    headers: headers,
    url: url
  }
  if (source) axiosOptions.cancelToken = source.token
  if (params) {
    axiosOptions.params = params
  }
  return Axios(axiosOptions)
}
let http_post = (context, url, params, source) => {
  let headers = {}
  headers['Content-Type'] = 'application/json;charset=UTF-8'
  let axiosOptions = {
    method: 'POST',
    headers: headers,
    url: context.$BASE_URL + url
  }
  if (source) axiosOptions.cancelToken = source.token
  if (params) {
    axiosOptions.data = params
  }
  return Axios(axiosOptions)
}
let http_post_ = (url, params, source) => {
  let headers = {}
  headers['Content-Type'] = 'application/json;charset=UTF-8'
  let axiosOptions = {
    method: 'POST',
    headers: headers,
    url: url
  }
  if (source) axiosOptions.cancelToken = source.token
  if (params) {
    axiosOptions.data = params
  }
  return Axios(axiosOptions)
}
let http_post_form = (context, url, params, source) => {
  let headers = {}
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  let axiosOptions = {
    method: 'POST',
    headers: headers,
    url: context.$BASE_URL + url
  }
  if (source) axiosOptions.cancelToken = source.token
  if (params) {
    axiosOptions.data = params
  }
  return AxiosForm(axiosOptions)
}
let http_post_form_ = (url, params, source) => {
  let headers = {}
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  let axiosOptions = {
    method: 'POST',
    headers: headers,
    url: url
  }
  if (source) axiosOptions.cancelToken = source.token
  if (params) {
    axiosOptions.data = params
  }
  return AxiosForm(axiosOptions)
}
let http_file = (context, url, file, source) => {
  let headers = {}
  headers['Content-Type'] = 'multipart/form-data'
  let axiosOptions = {
    method: 'POST',
    headers: headers,
    url: context.$BASE_URL + url,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        let percentCompleted = progressEvent.loaded / progressEvent.total * 100 | 0
        // eslint-disable-next-line
        console.log(`文件【${file.name}】上传进度：${percentCompleted}%`)
      }
    }
  }
  if (source) axiosOptions.cancelToken = source.token
  let formData = new FormData()
  formData.append('file', file)
  axiosOptions.data = formData
  return FileAxios(axiosOptions)
}
let http_file_ = (url, params, source) => {
  let headers = {}
  headers['Content-Type'] = 'multipart/form-data'
  let axiosOptions = {
    method: 'POST',
    headers: headers,
    url: url,
    contentType: false,
    processData: false
  }
  if (source) axiosOptions.cancelToken = source.token
  let formData = new FormData()
  for (let key in params) {
    formData.append(key, params[key])
  }
  axiosOptions.data = formData
  return FileAxios(axiosOptions)
}

export const LoadingManager = LoadingManagerDistance
export const DialogDistance = DialogDist
export const get = http_get
export const getFull = http_get_
export const post = http_post
export const postFull = http_post_
export const postForm = http_post_form
export const postFormFull = http_post_form_
export const file = http_file
export const fileFull = http_file_
export const cancelTokenSocurceFactory = () => {
  let CancelToken = axios.CancelToken
  return CancelToken.source()
}
