<template>
  <div class="simulate-order-doing" @click="clickFullSimulatePage">
    <div class="mainContent" :style="{ backgroundImage: `url(${require('@/static/images/map_bg.jpg')})` }"></div>
    <div class="topInfoPanel">
      <div class="userToEndAddress">
        <span>目的地</span>
        <span>鸿泰国际大厦</span>
      </div>
      <div>
        全程
        <span>1.38</span>
        公里
        <span>4</span>
        分钟
        &nbsp;&nbsp;请尽快到达乘客上车点
      </div>
    </div>
    <div class="pageSlideBtnWrap">
      <img class="pageSlideBtnIcon weather" :src="require('@/static/images/icon_weather.png')">
      <img class="pageSlideBtnIcon orderLocation" :src="require('@/static/images/icon_order_location.png')">
      <img class="pageSlideBtnIcon orderSet" :src="require('@/static/images/icon_order_set.png')">
      <img class="pageSlideBtnIcon ref" :src="require('@/static/images/icon_ref.png')">
    </div>
    <div class="footerInfoPanel">
      <div class="userHead">
        <img class="headImg" :src="require('@/static/images/icon_head.png')">
        <span class="userPhoneEnd">尾号4193</span>
      </div>
      <div class="userAddress">
        <span>鸿泰国际大厦</span>
        <span>迎泽公园</span>
      </div>
      <img class="userPhoneImg" :src="require('@/static/images/chengke_phone.png')" :style="{ zIndex: clickElem == 'phoneCallToUser' ? '9999' : '' }" @click.stop="simulateClickEvent">
    </div>
    <div class="footerWrap">
      <div class="bottomSlideBtn" :style="{ zIndex: clickElem == 'hasToOrderAddress' ? '9999' : '' }" @click.stop="simulateClickEvent">
        <div class="slideBtnWrap" ref="slideBtnWrap" v-touch:moveLeftRight="[hasToOrderStartAddress, hasToOrderStartAddressUp]">
          <img class="slideBtnIcon" :src="require('@/static/images/icon_slide_btn.png')">
          <span>已到达预约地点</span>
        </div>
      </div>
    </div>
    <div class="shadeWrap" :style="{ background: `rgba(30, 30, 30, ${shadeLimit})` }"></div>
    <img :class="['tipForUserImg', tipInTopCenter ? 'tipInTopCenter' : '', tipInBottomCenter ? 'tipInBottomCenter' : '', tipInCenter ? 'tipInCenter' : '']" v-if="tipSrc != null" :src="tipSrc" :style="{ top: tipTop != null ? tipTop : '', bottom: tipBottom != null ? tipBottom : '', left: tipLeft != null ? tipLeft : '', right: tipRight != null ? tipRight : '', width: tipWidth != null ? tipWidth : '' }">
    <img v-if="showFinger" ref="userFingerImg" :class="['userFingerImg', fingerInTopCenter ? 'fingerInTopCenter' : '', fingerInBottomCenter ? 'fingerInBottomCenter' : '', fingerInCenter ? 'fingerInCenter' : '', fingerIsSlide && !isSlideing ? 'fingerIsSlide' : '']" :src="require('@/static/images/user_hand.png')" :style="{ top: fingerTop != null ? fingerTop : '', bottom: fingerBottom != null ? fingerBottom : '', left: fingerLeft != null ? fingerLeft : '', right: fingerRight != null ? fingerRight : '' }">
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
      default: 'phoneCallToUser' // phoneCallToUser、hasToOrderAddress
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
    },
    canSlide: {
      default: true
    }
  },
  data () {
    return {
      isSlideing: false
    }
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
    },
    hasToOrderStartAddress (v) {
      if (this.$refs.slideBtnWrap.style.transitionDuration == '0.5s') {
        this.$refs.slideBtnWrap.style.transitionDuration = '0s'
      }
      this.$refs.slideBtnWrap.style.transform = `translateX(${(v < 0 ? 0 : (v > 500 ? 500 : v)) * 0.6}px)`
      this.isSlideing = true
      this.$refs.userFingerImg.style.opacity = 0
    },
    hasToOrderStartAddressUp (v) {
      if (this.canSlide && v > 240) {
        this.$emit(this.clickElem)
      } else {
        this.$refs.slideBtnWrap.style.transitionDuration = '0.5s'
        this.$refs.slideBtnWrap.style.transform = `translateX(0px)`
        this.isSlideing = false
        this.$refs.userFingerImg.style.opacity = 1
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
  font-family: "simulation-all-content";
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  .mainContent {
    position: relative;
    flex: 1;
    color: rgb(9, 29, 59);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .topInfoPanel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0.8rem 1rem 0.4rem;
    background: #ffffff;
    box-shadow: 0 0 8px rgba(30, 30, 30, .2);
    line-height: 2.4rem;
    font-size: 0.84rem;
    div {
      position: relative;
    }
    div:first-of-type {
      span:last-of-type {
        position: absolute;
        display: inline-block;
        left: 3.6rem;
        font-weight: bold;
        color: #2c2c2c;
      }
    }
    div:last-of-type {
      margin-bottom: 0.5rem;
      font-size: 0.76rem;
      padding-left: 3.6rem;
      span {
        color: #1A85FF;
      }
    }
  }
  .topInfoPanel::after {
    content: '';
    display: block;
    width: 3rem;
    height: 0.3rem;
    border-radius: 10rem;
    left: 0;
    right: 0;
    bottom: 0.4rem;
    margin: 0 auto;
    background: #969696;
  }
  .pageSlideBtnWrap {
    position: absolute;
    bottom: 11.4rem;
    left: 0;
    right: 0;
    .pageSlideBtnIcon {
      position: absolute;
      width: 3.2rem;
      bottom: 0rem;
    }
    .weather {
      right: 0.8rem;
      bottom: 6rem;
    }
    .orderLocation {
      right: 0.8rem;
      bottom: 3rem;
    }
    .orderSet {
      right: 0.8rem;
    }
    .ref {
      left: 0.8rem;
    }
  }
  .footerInfoPanel {
    position: absolute;
    bottom: 4.8rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    box-shadow: 0 0 8px rgba(30, 30, 30, .2);
    border-radius: 4px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #ffffff;
    width: calc(100% - 4rem);
    padding: 0.6rem 1rem;
    .userHead {
      position: relative;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #2c2c2c;
      font-size: 0.8rem;
      .headImg {
        position: relative;
        width: 3rem;
      }
      .userPhoneEnd {
        margin-top: 0.2rem;
      }
    }
    .userAddress {
      position: relative;
      flex: 1;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: 1.2rem;
      span {
        position: relative;
        display: inline-block;
        padding-left: 1.2rem;
        line-height: 1.8rem;
        font-size: 0.94rem;
        color: #2c2c2c;
      }
      span::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: 0;
        width: 8px;
        height: 8px;
        background: #1A85FF;
        border-radius: 20rem;
      }
      span:nth-of-type(2)::before {
        background: rgb(230, 15, 15);
      }
    }
    .userPhoneImg {
      position: relative;
      width: 2.6rem;
    }
  }
  .footerWrap {
    position: relative;
    .bottomSlideBtn {
      position: relative;
      height: 4rem;
      background: #1A85FF;
      .slideBtnWrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        color: #ffffff;
        font-size: 1.2rem;
        font-weight: bold;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(0);
        transition-property: all;
        transition-timing-function: ease;
        transition-duration: 0s;
        .slideBtnIcon {
          position: absolute;
          top: 0;
          bottom: 0;
          height: 1.1rem;
          margin: auto 0;
          left: 1.3rem;
        }
      }
    }
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
    transition: all 0.4s;
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
