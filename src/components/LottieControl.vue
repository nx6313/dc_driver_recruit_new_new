<template>
  <div class="lottieControlWrap">
    <div class="lottieControl" ref="lottieControl"></div>
  </div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'lottie-control',
  props: {
    loop: {
      default: true
    },
    autoplay: {
      default: true
    },
    path: {
      default: null
    },
    animationData: {
      default: null
    }
  },
  data () {
    return {
      control: null
    }
  },
  created () {
    this.$nextTick(() => {
      this.control = lottie.loadAnimation({
        container: this.$refs.lottieControl,
        renderer: 'svg',
        loop: this.loop,
        autoplay: this.autoplay,
        path: this.path,
        animationData: this.animationData
      })
    })
  }
}
</script>

<style lang="less" scoped>
.lottieControlWrap {
  position: relative;
  height: 100%;
  .lottieControl {
    position: relative;
    height: 100%;
  }
}
</style>
