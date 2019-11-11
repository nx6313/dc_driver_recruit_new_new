import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    // eslint-disable-next-line
    clearAll({ commit, state }) {
      for (let mudule in state) {
        if (Object.prototype.toString.call(state[mudule]) == '[object Object]') {
          for (let key in state[mudule]) {
            if (Object.prototype.toString.call(state[mudule][key]) == '[object Object]') {
              for (let nextKey in state[mudule][key]) {
                state[mudule][key][nextKey] = null
              }
            } else {
              state[mudule][key] = null
            }
          }
        } else {
          state[mudule] = null
        }
      }
    }
  },
  modules: {
    // 用户auth登陆认证信息
    auth: {
      state: {
        secret: null,
        token: null,
        byLogin: null
      },
      getters: {},
      mutations: {
        updateAuth (state, payload) {
          state.secret = payload.secret
          state.token = payload.token
        },
        updateAuthLoginType (state, payload) {
          state.byLogin = payload
        }
      },
      actions: {}
    },
    // 接口key值
    apiDcsnt: {
      state: {
        dcsnt: null
      },
      getters: {},
      mutations: {
        updateDcsnt (state, payload) {
          state.dcsnt = payload
        }
      },
      actions: {}
    },
    // 用户选择司机招募的类型以及用户手机号信息
    userBaseInfo: {
      state: {
        phone: null,
        dType: null
      },
      getters: {},
      mutations: {
        updateUserBaseInfoPhone (state, payload) {
          state.phone = payload.phone
        },
        updateUserBaseInfoDType (state, payload) {
          state.dType = payload.dType
        }
      },
      actions: {
        // eslint-disable-next-line
        clearUserBaseInfo({ commit, state }) {
          state.phone = null
          state.dType = null
        }
      }
    },
    // 页面缓存数据
    pageData: {
      state: {
        data: null
      },
      getters: {},
      mutations: {
        setPageData (state, payload) {
          state.data = payload.data
        }
      },
      actions: {
        // eslint-disable-next-line
        clearPageData({ commit, state }) {
          state.data = null
        }
      }
    },
    // 表单提交数据
    formData: {
      state: {
        data: null
      },
      getters: {},
      mutations: {
        setFormData (state, payload) {
          state.data = payload.data
        },
        addFormData (state, payload) {
          if (state.data == null) state.data = {}
          state.data[payload.key] = payload.value
        }
      },
      actions: {
        // eslint-disable-next-line
        clearFormData({ commit, state }) {
          state.data = null
        }
      }
    },
    // 表单提交数据
    completionData: {
      state: {
        data: null
      },
      getters: {},
      mutations: {
        setCompletionData (state, payload) {
          state.data = payload.data
        },
        addCompletionData (state, payload) {
          if (state.data == null) state.data = {}
          state.data[payload.key] = payload.value
        }
      },
      actions: {
        // eslint-disable-next-line
        clearCompletionData({ commit, state }) {
          state.data = null
        }
      }
    }
  }
})
