import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'es6-promise/auto'
import VueLazyload from 'vue-lazyload'
import Calendar from 'vue-mobile-calendar'
import '@/plugins/comm.less'
import '@/plugins/animate.css'
import ComFun from '@/utils/comfun.js'
import Directives from '@/utils/directives.js'
import VConsole from '@/utils/vconsole.js'
import Http from '@/utils/http.js'
import Api from '@/utils/api.js'
import WebApp from '@/utils/webapp.js'
import Dialogbox from '@/plugins/dialogBox/index.js'
import DialogMsg from '@/plugins/dialogBox/msg.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'wheel-picker/dist/wheelpicker.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import PageState from '@/components/PageState'
import LottieControl from '@/components/LottieControl'
import FormRadio from '@/components/FormRadio'
import FormCheckbox from '@/components/FormCheckbox'

import { APP_CONFIG, APP_DATA } from '@/utils/constants'

Vue.config.productionTip = false

Vue.use(VueLazyload)
Vue.use(VueAwesomeSwiper)
Vue.use(Calendar)
Vue.use(ComFun)
Vue.use(Directives)
Vue.use(Loading)
Vue.use(Dialogbox)

Vue.component('lottie-control', LottieControl)
Vue.component('page-state', PageState)
Vue.component('form-radio', FormRadio)
Vue.component('form-checkbox', FormCheckbox)

Vue.prototype.$http = Http
Vue.prototype.$api = Api
Vue.prototype.$webapp = WebApp
Vue.prototype.$appData = APP_DATA

Vue.prototype.$SCREEN_OPT = { width: document.body.clientWidth, height: document.body.clientHeight }

if (location.host.endsWith('.com')) {
  Vue.prototype.$BASE_URL = location.origin + '/'
  Vue.prototype.$BASE_HOST = location.host
  Vue.prototype.$SHOW_TEST_TOOL = location.host.startsWith('test.')
} else {
  Vue.prototype.$BASE_URL = APP_CONFIG.localhostServerBaseUrl
  Vue.prototype.$BASE_HOST = APP_CONFIG.localhostServerBaseUrl
  Vue.prototype.$SHOW_TEST_TOOL = APP_CONFIG.isTest
}

Vue.use(VConsole, { vuexStore: store, showToast: DialogMsg.installMsg, router: router })

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}).$mount('#app')
