<template>
  <div :class="['pageStateWrap', !(!pageState || pageState == 'finish') ? 'pageStateWrapIsErr' : '']" v-datas-empty="!(!pageState || pageState == 'finish')">
    <template v-if="!pageState || pageState == 'finish'">
      <slot></slot>
    </template>
    <div class="__pageStateReplace__" v-else @click="pageState == 'err' ? refPageData(pageStateConfig.refFlag) : () => {}">
      <template v-if="pageState == 'loading'">
        <div class="dataStateLoadWrap animated fadeIn">
          <lottie-control class="dataStateLoadIc" :animationData="require('@/assets/data_load.json')"></lottie-control>
          <span class="dataStateLoadTip">数据正在加载中，请稍后</span>
        </div>
      </template>
      <template v-if="pageState == 'err'">
        <div class="dataStateErrWrap animated fadeIn">
          <lottie-control class="dataStateErrIc" :animationData="require('@/assets/no_data.json')"></lottie-control>
          <span class="dataStateErrTip" v-if="pageStateConfig.errTip">{{pageStateConfig.errTip}}{{pageStateConfig.errCode > 0 ? `，错误码：${pageStateConfig.errCode}` : ''}}</span>
          <span class="refDataTip" v-if="pageStateConfig.refFlag">点击重新获取数据</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-state',
  data () {
    return {}
  },
  computed: {
    pageState () {
      return this.$store.getters.getState
    },
    pageStateConfig () {
      return this.$store.getters.getStateConfig
    }
  },
  methods: {
    refPageData (refFlag) {
      if (refFlag) {
        this.$emit('reLoad')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pageStateWrap {
  position: relative;
  .__pageStateReplace__ {
    position: relative;
    height: 100%;
    .dataStateLoadWrap {
      position: absolute;
      text-align: center;
      top: calc(50% - 7rem);
      left: 0;
      right: 0;
      margin: 0 auto;
      pointer-events: none;
      -vendor-animation-duration: 0.2s;
      animation-duration: 0.2s;
      .dataStateLoadIc {
        position: relative;
        width: 10rem;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      .dataStateLoadTip {
        position: relative;
        display: block;
        font-size: 0.8rem;
        margin-top: -2.6rem;
        color: #808080;
        text-shadow: 3px 2px 10px rgba(0, 0, 0, 0.1);
      }
    }
    .dataStateErrWrap {
      position: absolute;
      text-align: center;
      top: 50%;
      transform: translateY(-100%);
      left: 0;
      right: 0;
      margin: 0 auto;
      pointer-events: none;
      -vendor-animation-duration: 0.2s;
      animation-duration: 0.2s;
      .dataStateErrIc {
        position: relative;
        width: 8rem;
      }
      .dataStateErrTip {
        position: relative;
        display: block;
        font-size: 0.8rem;
        margin-top: 1rem;
        color: #808080;
        text-shadow: 3px 2px 10px rgba(0, 0, 0, 0.1);
      }
      .refDataTip {
        position: relative;
        display: block;
        font-size: 0.8rem;
        margin-top: 0.2rem;
        color: #808080;
        text-shadow: 3px 2px 10px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.pageStateWrapIsErr {
  height: 100vh;
}
</style>
