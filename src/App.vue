<template>
  <div id="app">
    <template v-if="currentSupportDevice">
      <router-view v-if="isRouterAlive"/>
      <span v-if="isShowServiceTypeTool" class="currentServiceType" v-drag:config="{ about: ['top', 'right'], overstep: false, inertia: true, recover: true, tap: showLogVc }">
        <span class="tip">当前服务器</span>
        <span class="content">
          <Marquee :lists="[currentServiceType]"></Marquee>
        </span>
      </span>
    </template>
    <template v-if="!currentSupportDevice">
      <div class="noSupportDevice">
        <lottie-control class="deviceNoSupport" :animationData="require('@/assets/no_support_device.json')"></lottie-control>
        <div class="deviceNoSupportTip">
          <span>请在手机设备上查看</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Marquee from '@/components/Marquee.vue'

export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    isShowServiceTypeTool() {
      return this.$SHOW_TEST_TOOL
    },
    currentServiceType() {
      return this.$BASE_HOST
    },
    currentSupportDevice() {
      return this.$comfun.isAndroidIos().isMobile
    }
  },
  components: {
    Marquee
  },
  beforeCreate () {
    let appPageLoading = document.getElementById('appPageLoading')
    if (appPageLoading != null) document.body.removeChild(appPageLoading)
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    showLogVc() {
      if (this.$vconsole) this.$vconsole.show()
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.9rem;
  .currentServiceType {
    position: fixed;
    top: 0.5rem;
    right: 0.8rem;
    z-index: 999;
    background-color: #2c3e50;
    color: #e8e8e8;
    font-size: 0.6rem;
    padding: 0.2rem 0.8rem;
    border-radius: 10rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    .tip {
      display: inline-block;
      padding-right: 0.4rem;
      vertical-align: middle;
      text-shadow: 0 0 10px #c0a1a1;
    }
    .content {
      display: inline-block;
      max-width: 5rem;
      vertical-align: middle;
      color: #a3a3a3;
    }
  }
}

body, html {
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  outline: none;
  user-select: none;
  -webkit-appearance: none !important;
  -webkit-tap-highlight-color: transparent;
}

.noSupportDevice {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  background-image: url('./assets/black_point_bg.png');
  color: #e8e8e8;
  text-align: center;
  pointer-events: none;
  .deviceNoSupport {
    position: relative;
    display: inline-block;
    width: 14rem;
  }
  .deviceNoSupportTip {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: inline-block;
    width: 20rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    transform: translateY(4.2rem);
    font-size: 0.8rem;
    letter-spacing: 0.2rem;
    text-indent: 0.2rem;
    text-shadow: 1px 2px 8px rgba(255, 255, 255, .4);
  }
}
</style>
