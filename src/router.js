import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  // base: '/h5/driver_recruit_simulate/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/applyIndex',
      name: 'applyIndex',
      component: () => import(/* webpackChunkName: "applyIndex" */ './views/ApplyIndex.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/auditStatus',
      name: 'auditStatus',
      component: () => import(/* webpackChunkName: "auditStatus" */ './views/AuditStatus.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/dataCompletion',
      name: 'dataCompletion',
      component: () => import(/* webpackChunkName: "dataCompletion" */ './views/DataCompletion.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/dataCompletionDetail',
      name: 'dataCompletionDetail',
      component: () => import(/* webpackChunkName: "dataCompletionDetail" */ './views/DataCompletionDetail.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/orderSimulationJoin',
      name: 'orderSimulationJoin',
      component: () => import(/* webpackChunkName: "orderSimulationJoin" */ './views/OrderReceivingSimulation.vue'),
      meta: {
        pageBg: '#1F2E44',
        title: '模拟接单'
      }
    },
    {
      path: '/orderSimulationSelf',
      name: 'orderSimulationSelf',
      component: () => import(/* webpackChunkName: "orderSimulationSelf" */ './views/OrderReceivingSimulationSelfRun.vue'),
      meta: {
        pageBg: '#1F2E44',
        title: '模拟接单'
      }
    },
    {
      path: '/commonIssue',
      name: 'commonIssue',
      component: () => import(/* webpackChunkName: "commonIssue" */ './views/CommonIssue.vue'),
      meta: {
        pageBg: '#f2f2f2',
        title: '常见问题'
      }
    },
    {
      path: '/jiameng/citySelect',
      name: 'jiameng-citySelect',
      component: () => import(/* webpackChunkName: "jiameng-citySelect" */ './views/jiameng/CitySelect.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/jiameng/citySelectHandler',
      name: 'jiameng-citySelectHandler',
      component: () => import(/* webpackChunkName: "jiameng-citySelectHandler" */ './views/jiameng/CitySelectHandler.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/jiameng/userInfoForm',
      name: 'jiameng-userInfoForm',
      component: () => import(/* webpackChunkName: "jiameng-userInfoForm" */ './views/jiameng/UserInfoForm.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/jiameng/carInfoForm',
      name: 'jiameng-carInfoForm',
      component: () => import(/* webpackChunkName: "jiameng-carInfoForm" */ './views/jiameng/CarInfoForm.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/chengji/citySelect',
      name: 'chengji-citySelect',
      component: () => import(/* webpackChunkName: "chengji-citySelect" */ './views/chengji/CitySelect.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/chengji/citySelectHandler',
      name: 'chengji-citySelectHandler',
      component: () => import(/* webpackChunkName: "chengji-citySelectHandler" */ './views/chengji/CitySelectHandler.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    },
    {
      path: '/chengji/userInfoForm',
      name: 'chengji-userInfoForm',
      component: () => import(/* webpackChunkName: "chengji-userInfoForm" */ './views/chengji/UserInfoForm.vue'),
      meta: {
        pageBg: '#ffffff'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})
router.beforeResolve((to, from, next) => {
  if (to.meta.keepAliveName) {
    if (from.name == to.meta.keepAliveName) {
      to.meta.keepData = true
    } else {
      to.meta.keepData = false
    }
  }
  refForVuexData()
  document.body.parentNode.style['backgroundImage'] = ''
  document.body.parentNode.style['backgroundRepeat'] = ''
  document.body.parentNode.style['backgroundSize'] = ''
  document.body.parentNode.style['backgroundPosition'] = ''
  if (to.meta.pageBg) {
    if (router.app.$vctool.isObject(to.meta.pageBg)) {
      for (let styleKey in to.meta.pageBg) {
        document.body.parentNode.style[styleKey] = to.meta.pageBg[styleKey]
      }
    } else {
      document.body.parentNode.style.backgroundColor = to.meta.pageBg
    }
  } else {
    document.body.parentNode.style.backgroundColor = '#F5F5F5'
  }
  if (to.meta.isFullPage === true) {
    document.body.parentNode.style.overflow = 'hidden'
  } else {
    document.body.parentNode.style.overflow = 'auto'
  }
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = document.querySelector('meta[name="web-describe"]').getAttribute('content')
  }
  next()
})

let refForVuexData = function() {
  Store.replaceState(Object.assign({}, Store.state, JSON.parse(sessionStorage.getItem('store'))))
  sessionStorage.clear()
}

export default router
