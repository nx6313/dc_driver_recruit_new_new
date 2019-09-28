<template>
  <div class="simulate-realtime-order-get" @click="clickFullSimulatePage">
    <div class="mainContent">
      <img :class="['orderGaipai', !showGaipaiBtn ? 'orderGaipaiHidden' : '']" :src="require('@/static/images/gaipai.png')" :style="{ zIndex: clickElem == 'orderGaipai' ? '9999' : '' }">
      <div class="orderContent">
        <div class="title">实时</div>
        <div class="orderTime">
          <span>{{$comfun.formatDate(new Date(), 'yyyy.MM.dd')}}</span>
          <span class="time">{{$comfun.formatDate(new Date(), 'hh:mm:ss')}}</span>
        </div>
        <div class="address">
          <div>鸿泰国际大厦</div>
          <div>迎泽公园</div>
        </div>
        <div class="priceAbout">
          <div>
            <span>预估价格：</span>
            <span>23.20元</span>
          </div>
          <div>
            <span>优惠券：</span>
            <span>无优惠 折</span>
          </div>
          <div>
            <span>预计收益：</span>
            <span><span class="wran">23.20</span>元</span>
          </div>
          <div>以乘客最终支付金额为准</div>
        </div>
        <div class="contentFooterTip">
          您距离乘客约
          <span>11.91</span>
          公里，大约
          <span>1</span>
          分钟
        </div>
      </div>
    </div>
    <div class="footerWrap" :style="{ zIndex: clickElem == 'goToTakePassenger' ? '9999' : '' }" @click.stop="simulateClickEvent">
      <span class="getThisOrder">接单</span>
      <span class="getOrderTime">5秒</span>
    </div>
    <div class="shadeWrap" :style="{ background: `rgba(30, 30, 30, ${shadeLimit})` }"></div>
    <img :class="['tipForUserImg', tipInTopCenter ? 'tipInTopCenter' : '', tipInBottomCenter ? 'tipInBottomCenter' : '', tipInCenter ? 'tipInCenter' : '']" v-if="tipSrc != null" :src="tipSrc" :style="{ top: tipTop != null ? tipTop : '', bottom: tipBottom != null ? tipBottom : '', left: tipLeft != null ? tipLeft : '', right: tipRight != null ? tipRight : '', width: tipWidth != null ? tipWidth : '' }">
    <img v-if="showFinger" :class="['userFingerImg', fingerInTopCenter ? 'fingerInTopCenter' : '', fingerInBottomCenter ? 'fingerInBottomCenter' : '', fingerInCenter ? 'fingerInCenter' : '']" :src="require('@/static/images/user_hand.png')" :style="{ top: fingerTop != null ? fingerTop : '', bottom: fingerBottom != null ? fingerBottom : '', left: fingerLeft != null ? fingerLeft : '', right: fingerRight != null ? fingerRight : '' }">
  </div>
</template>

<script>
/**
 * 回调事件：
 * beginOnline
 */
export default {
  name: 'simulate-realtime-order-get',
  props: {
    shadeLimit: {
      default: 0.6
    },
    clickElem: {
      default: 'orderGaipai' // orderGaipai、goToTakePassenger
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
    showGaipaiBtn: {
      default: true
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
.simulate-realtime-order-get {
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
    background: #f5f5f5;
    color: rgb(9, 29, 59);
    .orderGaipai {
      position: absolute;
      width: 8rem;
      top: 0;
      right: 0;
    }
    .orderGaipaiHidden {
      display: none;
    }
    .orderContent {
      position: relative;
      margin-top: 5rem;
      .title {
        position: relative;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
      }
      .orderTime {
        position: relative;
        text-align: center;
        margin-top: 0.8rem;
        font-size: 0.8rem;
        .time {
          position: relative;
          margin-left: 0.6rem;
        }
      }
      .address {
        position: relative;
        margin: 2.6rem 3rem 0;
        line-height: 2.8rem;
        font-size: 1.1rem;
        font-weight: bold;
        div {
          position: relative;
          padding-left: 1.2rem;
        }
        div::before {
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
        div:nth-of-type(2)::before {
          background: rgb(230, 15, 15);
        }
      }
      .priceAbout {
        position: relative;
        margin: 1rem 4.2rem 0;
        line-height: 2rem;
        font-size: 0.96rem;
        color: #707070;
        div {
          span:last-of-type {
            color: #2c2c2c;
            font-weight: bold;
          }
          span.wran {
            color: #f50c0c;
          }
        }
        div:last-of-type {
          transform: scale(0.7);
          transform-origin: 0;
          margin-top: 0.2rem;
          color: #a0a0a0;
        }
      }
      .contentFooterTip {
        position: relative;
        margin: 1rem 4.2rem 0;
        color: #5f5f5f;
        span {
          color: #1A85FF;
        }
      }
    }
  }
  .footerWrap {
    position: relative;
    background: #1A85FF;
    color: #ffffff;
    height: 5.8rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .getThisOrder {
      position: relative;
      font-size: 1rem;
      font-weight: bold;
    }
    .getOrderTime {
      position: relative;
      margin-top: 0.4rem;
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
}
</style>
