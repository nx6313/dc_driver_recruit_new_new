<template>
  <div class="simulate-order-doing" @click="clickFullSimulatePage">
    <div class="mainContent">
    </div>
    <div class="footerWrap">
    </div>
    <div class="shadeWrap" :style="{ background: `rgba(30, 30, 30, ${shadeLimit})` }"></div>
    <img :class="['tipForUserImg', tipInTopCenter ? 'tipInTopCenter' : '', tipInBottomCenter ? 'tipInBottomCenter' : '', tipInCenter ? 'tipInCenter' : '']" v-if="tipSrc != null" :src="tipSrc" :style="{ top: tipTop != null ? tipTop : '', bottom: tipBottom != null ? tipBottom : '', left: tipLeft != null ? tipLeft : '', right: tipRight != null ? tipRight : '', width: tipWidth != null ? tipWidth : '' }">
    <img v-if="showFinger" :class="['userFingerImg', fingerInTopCenter ? 'fingerInTopCenter' : '', fingerInBottomCenter ? 'fingerInBottomCenter' : '', fingerInCenter ? 'fingerInCenter' : '', fingerIsSlide ? 'fingerIsSlide' : '']" :src="require('@/static/images/user_hand.png')" :style="{ top: fingerTop != null ? fingerTop : '', bottom: fingerBottom != null ? fingerBottom : '', left: fingerLeft != null ? fingerLeft : '', right: fingerRight != null ? fingerRight : '' }">
  </div>
</template>

<script>
export default {
  name: 'simulate-order-doing',
  props: {
    shadeLimit: {
      default: 0.6
    },
    clickElem: {
      default: 'beginOnline' // beginOnline
    },
    tipSrc: {
      default: null
    },
    tipTop: {
      default: null
    },
    tipBottom: {
      default: null
    },
    tipLeft: {
      default: null
    },
    tipRight: {
      default: null
    },
    tipInTopCenter: {
      default: false
    },
    tipInBottomCenter: {
      default: false
    },
    tipInCenter: {
      default: false
    },
    tipWidth: {
      default: null
    },
    fingerTop: {
      default: null
    },
    fingerBottom: {
      default: null
    },
    fingerLeft: {
      default: null
    },
    fingerRight: {
      default: null
    },
    fingerInTopCenter: {
      default: false
    },
    fingerInBottomCenter: {
      default: false
    },
    fingerInCenter: {
      default: false
    },
    showFinger: {
      default: true
    },
    fingerIsSlide: {
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    clickFullSimulatePage () {
      if (!this.showFinger) {
        this.$emit('clickThis')
      }
    },
    simulateClickEvent () {
      if (this.clickElem) {
        this.$emit(this.clickElem)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.simulate-order-doing {
  position: relative;
  text-align: left;
  height: 100%;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .mainContent {
    position: relative;
    flex: 1;
    background: #f5f5f5;
    color: rgb(9, 29, 59);
  }
  .footerWrap {
    position: relative;
    background: #1F2E44;
  }
  .shadeWrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .tipForUserImg {
    position: absolute;
    width: 100%;
  }
  .tipInTopCenter {
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
  }
  .tipInBottomCenter {
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0;
  }
  .tipInCenter {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .userFingerImg {
    position: absolute;
    width: 4rem;
    z-index: 99999999;
    pointer-events: none;
  }
  .fingerInTopCenter {
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
  }
  .fingerInBottomCenter {
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0;
  }
  .fingerInCenter {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .fingerIsSlide {
    animation: slideToRight 2s infinite;
  }
}

@keyframes slideToRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(140px);
    opacity: 0.8;
  }
}
</style>
