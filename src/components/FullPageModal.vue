<template>
  <div :class="['fullPageModalWrap', show && !isCloseing ? 'fullPageModalShow' : (isCloseing ? 'fullPageModalShow' : '')]" @click="close" @touchmove.prevent>
    <div :class="['fullPageModalShade animated', isCloseing ? 'fadeOut' : 'fadeIn']"></div>
    <div :class="['fullPageModalMainWrap animated', isCloseing ? outAnim : inAnim]" @click.stop="() => {}" :style="{ left: slideDistance, right: slideDistance, borderRadius: radius, top: location == 'top' || location == 'center' ? '0px' : '', bottom: location == 'bottom' || location == 'center' ? '0px' : '', margin: location == 'center' ? 'auto 0' : '', height: location == 'center' ? modalHeight : '' }">
      <div class="modalSlotWrap"><slot></slot></div>
      <div class="modalCloseBtnWrap" v-if="showClose" @click="close">关闭</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'full-page-modal',
  props: {
    show: {
      default: false,
      required: true
    },
    showClose: {
      default: true
    },
    extend: {
      default: null
    },
    inAnim: {
      default: 'fadeInUp'
    },
    outAnim: {
      default: 'slideOutDown'
    },
    slideDistance: {
      default: '0px'
    },
    radius: {
      default: '0px'
    },
    location: {
      default: 'center' // top、center、bottom
    },
    modalHeight: {
      default: '20rem' // location 为 center 时有效
    }
  },
  data () {
    return {
      isCloseing: false
    }
  },
  created () {
  },
  methods: {
    close () {
      if (!this.isCloseing) {
        this.$emit('closeStart')
        this.isCloseing = true
        setTimeout(() => {
          this.isCloseing = false
          this.$emit('update:show', false)
          this.$emit('close', this.extend)
        }, 410)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.fullPageModalWrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -9999999999;
  display: none;
  .fullPageModalShade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 10, 10, 0.2);
    -vendor-animation-duration: 400ms;
    animation-duration: 400ms;
  }
  .fullPageModalMainWrap {
    position: absolute;
    left: 0;
    right: 0;
    min-height: 10.6rem;
    max-height: 100vh;
    background-color: #fff;
    -vendor-animation-duration: 400ms;
    animation-duration: 400ms;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    font-size: 0.8rem;
    border-radius: 0px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
    justify-content: center;
    .modalSlotWrap {
      position: relative;
      flex: 1;
    }
    .modalCloseBtnWrap {
      position: relative;
      padding: 1.4rem 0;
      text-align: center;
      color: #FF5252;
      font-size: 1rem;
      font-family: "fullPageModalCloseBtn";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
  }
}
.fullPageModalShow {
  z-index: 9999999999;
  display: block;
}
</style>
