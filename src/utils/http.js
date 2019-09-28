/* eslint-disable */
import { get, getFull, post, postFull, postForm, postFormFull, file, fileFull, cancelTokenSocurceFactory } from '@/utils/http-config.js'

let getTokenInfo = (context) => {
  context.$comfun.disposeVisitArguments(['secret', 'token'], data => {
    if (data['secret'] && data['token']) {
      context.$store.commit('updateAuth', {
        secret: data['secret'],
        token: data['token']
      })
    }
  })
}

export default {
  get: async (context, url, params, showLoading = true, canCancel = true, silent = false, needState = false) => {
    getTokenInfo(context)
    let cancelTokenSocurce = null
    if (showLoading && canCancel) cancelTokenSocurce = cancelTokenSocurceFactory()
    if (showLoading === true) context.$comfun.showLoading(context, url, canCancel, () => {
      if (cancelTokenSocurce !== null) cancelTokenSocurce.cancel(`接口 ${url} 请求被用户取消`)
    })
    console.time(url)
    const request = await get(context, url, params, cancelTokenSocurce)
    console.timeEnd(url)
    if (showLoading === true) context.$comfun.hideLoading(url)
    if (needState) return request
    if (request.status == 'OK') {
      return request
    } else {
      if (!silent) context.$comfun.showToast(context, request.msg || '请求出错')
      throw request.msg || '请求出错'
    }
  },
  getWithState: async (context, url, params, showLoading = true, canCancel = true, silent = false) => {
    context.$store.dispatch('clearState')
    context.$store.commit('startLoad')
    const request = await context.$http.get(context, url, params, showLoading, canCancel, silent, true)
    if (request.status == 'OK') {
      context.$store.commit('loadFinish')
      return request
    } else {
      context.$store.commit('loadErr', { errCode: request.code || -1, errTip: request.msg || '' })
      if (!silent) context.$comfun.showToast(context, request.msg || '请求出错')
      throw request.msg || '请求出错'
    }
  },
  getFull: async (context, url, params, showLoading = true, canCancel = true) => {
    let cancelTokenSocurce = null
    if (showLoading && canCancel) cancelTokenSocurce = cancelTokenSocurceFactory()
    if (showLoading === true) context.$comfun.showLoading(context, url, canCancel, () => {
      if (cancelTokenSocurce !== null) cancelTokenSocurce.cancel(`接口 ${url} 请求被用户取消`)
    })
    console.time(url)
    const request = await getFull(url, params, cancelTokenSocurce)
    console.timeEnd(url)
    if (showLoading === true) context.$comfun.hideLoading(url)
    return request
  },
  post: async (context, url, params, showLoading = true, canCancel = true, silent = false, needState = false) => {
    getTokenInfo(context)
    let cancelTokenSocurce = null
    if (showLoading && canCancel) cancelTokenSocurce = cancelTokenSocurceFactory()
    if (showLoading === true) context.$comfun.showLoading(context, url, canCancel, () => {
      if (cancelTokenSocurce !== null) cancelTokenSocurce.cancel(`接口 ${url} 请求被用户取消`)
    })
    console.time(url)
    const request = await post(context, url, params, cancelTokenSocurce)
    console.timeEnd(url)
    if (showLoading === true) context.$comfun.hideLoading(url)
    if (needState) return request
    if (request.status == 'OK') {
      return request
    } else {
      if (!silent) context.$comfun.showToast(context, request.msg || '请求出错')
      throw request.msg || '请求出错'
    }
  },
  postWithState: async (context, url, params, showLoading = true, canCancel = true, silent = false) => {
    context.$store.dispatch('clearState')
    context.$store.commit('startLoad')
    const request = await context.$http.post(context, url, params, showLoading, canCancel, silent, true)
    if (request.status == 'OK') {
      context.$store.commit('loadFinish')
      return request
    } else {
      context.$store.commit('loadErr', { errCode: request.code || -1, errTip: request.msg || '' })
      if (!silent) context.$comfun.showToast(context, request.msg || '请求出错')
      throw request.msg || '请求出错'
    }
  },
  postForm: async (context, url, params, showLoading = true, canCancel = true, silent = false, needState = false) => {
    getTokenInfo(context)
    let cancelTokenSocurce = null
    if (showLoading && canCancel) cancelTokenSocurce = cancelTokenSocurceFactory()
    if (showLoading === true) context.$comfun.showLoading(context, url, canCancel, () => {
      if (cancelTokenSocurce !== null) cancelTokenSocurce.cancel(`接口 ${url} 请求被用户取消`)
    })
    console.time(url)
    const request = await postForm(context, url, params, cancelTokenSocurce)
    console.timeEnd(url)
    if (showLoading === true) context.$comfun.hideLoading(url)
    if (needState) return request
    if (request.status == 'OK') {
      return request
    } else {
      if (!silent) context.$comfun.showToast(context, request.msg || '请求出错')
      throw request.msg || '请求出错'
    }
  },
  postFormWithState: async (context, url, params, showLoading = true, canCancel = true, silent = false) => {
    context.$store.dispatch('clearState')
    context.$store.commit('startLoad')
    const request = await context.$http.postForm(context, url, params, showLoading, canCancel, silent, true)
    if (request.status == 'OK') {
      context.$store.commit('loadFinish')
      return request
    } else {
      context.$store.commit('loadErr', { errCode: request.code || -1, errTip: request.msg || '' })
      if (!silent) context.$comfun.showToast(context, request.msg || '请求出错')
      throw request.msg || '请求出错'
    }
  },
  file: async (context, url, params, showLoading = true, canCancel = true, silent = false, needState = false) => {
    getTokenInfo(context)
    let cancelTokenSocurce = null
    if (showLoading && canCancel) cancelTokenSocurce = cancelTokenSocurceFactory()
    if (showLoading === true) context.$comfun.showLoading(context, url, canCancel, () => {
      if (cancelTokenSocurce !== null) cancelTokenSocurce.cancel(`接口 ${url} 请求被用户取消`)
    })
    console.time(url)
    const request = await file(context, url, params, cancelTokenSocurce)
    console.timeEnd(url)
    if (showLoading === true) context.$comfun.hideLoading(url)
    if (needState) return request
    if (request.status == 'OK') {
      return request
    } else {
      if (!silent) context.$comfun.showToast(context, request.msg || '上传文件出错')
      throw request.msg || '上传文件出错'
    }
  }
}
