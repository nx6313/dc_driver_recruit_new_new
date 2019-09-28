<template>
  <div class="simulate-index" @click="clickFullSimulatePage">
    <div class="pageTitle" v-if="showPageTitle">
      <img :src="require('@/static/images/icon_work_group.png')" :style="{ zIndex: clickElem == 'workStage' ? '9999' : '' }" @click.stop="simulateClickEvent">
      <span>大昌优驾</span>
      <img :src="require('@/static/images/icon_msg.png')">
    </div>
    <div class="mainContent">
      <div class="topTodayDataWrap">
        <div class="todayIncome" :style="{ zIndex: clickElem == 'todayIncome' ? '9999' : '' }" @click.stop="simulateClickEvent">
          <div>
            <span>0.</span>
            00
          </div>
          <div>今日收入（元）</div>
        </div>
        <div class="onlineTime" :style="{ zIndex: clickElem == 'onlineTime' ? '9999' : '' }" @click.stop="simulateClickEvent">
          <div>
            <span>0</span>
            小时
            <span>0</span>
            分钟
          </div>
          <div>在线时长</div>
        </div>
        <div class="todayOrderCount" :style="{ zIndex: clickElem == 'todayOrderCount' ? '9999' : '' }" @click.stop="simulateClickEvent">
          <div>
            <span>0</span>
          </div>
          <div>今日接单</div>
        </div>
      </div>
      <div class="myOrder">
        <div class="leftContent">
          <img :src="require('@/static/images/icon_time.png')">
          <span>我的预约单</span>
          <span>0个预约单</span>
        </div>
        <div class="rightContent">
          <span>查看</span>
          <img :src="require('@/static/images/icon_to_next.png')">
        </div>
      </div>
      <div class="moreOrder">
        <div class="leftContent">
          <img :src="require('@/static/images/icon_more_order.png')">
          <span>海量预约单</span>
        </div>
        <div class="rightContent">
          <span>抢单</span>
          <img :src="require('@/static/images/icon_to_next.png')">
        </div>
      </div>
    </div>
    <div class="footerWrap">
      <img class="slideBtn1" :src="require('@/static/images/icon_hot.png')">
      <img class="slideBtn2" :src="require('@/static/images/icon_map.png')">
      <div class="bottomBtnWrap">
        <div class="btnItem setBtn">
          <img :src="require('@/static/images/icon_set.png')">
          <span>设置</span>
        </div>
        <template v-if="clickElem == 'waitOrder'">
          <div class="btnItem offlineBtn">
            <img :src="require('@/static/images/icon_offline.png')">
            <span>下线</span>
          </div>
          <div class="waitOrderWrap">
            <span>接单中...</span>
            <i class="rippleWait ripple1"></i>
            <i class="rippleWait ripple2"></i>
            <i class="rippleWait ripple3"></i>
            <i class="rippleWait ripple4"></i>
          </div>
        </template>
        <template v-else>
          <div class="btnItem startOrderBtn" :style="{ zIndex: clickElem == 'beginOnline' ? '9999' : '' }" @click.stop="simulateClickEvent">
            <span>上线接单</span>
          </div>
        </template>
      </div>
    </div>
    <div class="shadeWrap" :style="{ background: `rgba(30, 30, 30, ${shadeLimit})` }"></div>
    <img :class="['tipForUserImg', tipInTopCenter ? 'tipInTopCenter' : '', tipInBottomCenter ? 'tipInBottomCenter' : '', tipInCenter ? 'tipInCenter' : '']" v-if="tipSrc != null" :src="tipSrc" :style="{ top: tipTop != null ? tipTop : '', bottom: tipBottom != null ? tipBottom : '', left: tipLeft != null ? tipLeft : '', right: tipRight != null ? tipRight : '', width: tipWidth != null ? tipWidth : '' }">
    <img v-if="showFinger" :class="['userFingerImg', fingerInTopCenter ? 'fingerInTopCenter' : '', fingerInBottomCenter ? 'fingerInBottomCenter' : '', fingerInCenter ? 'fingerInCenter' : '']" :src="require('@/static/images/user_hand.png')" :style="{ top: fingerTop != null ? fingerTop : '', bottom: fingerBottom != null ? fingerBottom : '', left: fingerLeft != null ? fingerLeft : '', right: fingerRight != null ? fingerRight : '' }">
  </div>
</template>

<script>
export default {
  name: 'simulate-index',
  props: {
    shadeLimit: {
      default: 0.6
    },
    clickElem: {
      default: 'beginOnline' // beginOnline、todayIncome、onlineTime、todayOrderCount、workStage
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
    showPageTitle: {
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
.simulate-index {
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
  .pageTitle {
    position: relative;
    height: 3rem;
    background: #1F2E44;
    color: #ffffff;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    img {
      position: relative;
      width: 1.2rem;
    }
  }
  .mainContent {
    position: relative;
    flex: 1;
    background: #f5f5f5;
    color: rgb(9, 29, 59);
    padding-top: 0.4rem;
    .topTodayDataWrap {
      position: relative;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      background: #ffffff;
      padding: 0 0.2rem;
      color: rgb(34, 34, 34);
      margin-bottom: 1px;
      .todayIncome {
        position: relative;
        flex: 1;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1.4rem 0;
        background: #ffffff;
        div:last-of-type {
          position: relative;
          font-size: 0.8rem;
          transform: scale(0.8);
          text-align: center;
        }
        div:first-of-type {
          position: relative;
          font-size: 0.8rem;
          text-align: center;
          span {
            font-size: 1.2rem;
            font-weight: bold;
          }
        }
      }
      .onlineTime {
        position: relative;
        flex: 1;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1.4rem 0;
        background: #ffffff;
        div:last-of-type {
          position: relative;
          font-size: 0.8rem;
          transform: scale(0.8);
          text-align: center;
          color: rgb(39, 39, 39);
        }
        div:first-of-type {
          position: relative;
          font-size: 0.8rem;
          text-align: center;
          span {
            font-size: 1.2rem;
            font-weight: bold;
          }
        }
      }
      .todayOrderCount {
        position: relative;
        flex: 1;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1.4rem 0;
        background: #ffffff;
        div:last-of-type {
          position: relative;
          font-size: 0.8rem;
          transform: scale(0.8);
          text-align: center;
          color: rgb(39, 39, 39);
        }
        div:first-of-type {
          position: relative;
          font-size: 0.8rem;
          text-align: center;
          span {
            font-size: 1.2rem;
            font-weight: bold;
          }
        }
      }
    }
    .myOrder {
      position: relative;
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      padding: 1.5rem 0.8rem;
      .leftContent {
        position: relative;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          position: relative;
          display: inline-block;
        }
        span:nth-of-type(n + 2) {
          margin-left: 0.6rem;
        }
        span:nth-of-type(2) {
          transform: scale(0.7);
        }
        img {
          position: relative;
          width: 1rem;
          margin-right: 0.4rem;
        }
      }
      .rightContent {
        position: relative;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          position: relative;
          display: inline-block;
        }
        span:nth-of-type(n + 2) {
          margin-left: 0.6rem;
        }
        img {
          position: relative;
          width: 0.5rem;
          margin-left: 0.4rem;
        }
      }
    }
    .moreOrder {
      position: relative;
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      margin-top: 1px;
      padding: 1.5rem 0.8rem;
      .leftContent {
        position: relative;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          position: relative;
          display: inline-block;
        }
        span:nth-of-type(n + 2) {
          margin-left: 0.6rem;
        }
        span:nth-of-type(2) {
          transform: scale(0.7);
        }
        img {
          position: relative;
          width: 1rem;
          margin-right: 0.4rem;
        }
      }
      .rightContent {
        position: relative;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          position: relative;
          display: inline-block;
        }
        span:nth-of-type(n + 2) {
          margin-left: 0.6rem;
        }
        img {
          position: relative;
          width: 0.5rem;
          margin-left: 0.4rem;
        }
      }
    }
  }
  .footerWrap {
    position: relative;
    background: #1F2E44;
    .slideBtn1 {
      position: absolute;
      width: 4rem;
      top: -8.6rem;
      right: 0.5rem;
    }
    .slideBtn2 {
      position: absolute;
      width: 4rem;
      top: -4.8rem;
      right: 0.5rem;
    }
    .bottomBtnWrap {
      position: relative;
      color: #ffffff;
      height: 4.5rem;
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .btnItem {
        position: relative;
        height: 3rem;
        line-height: 3rem;
        background: #1A85FF;
        border-radius: 3px;
      }
      .setBtn {
        background: #151D25;
        margin-right: 0.8rem;
        padding: 0 0.8rem;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        z-index: 9;
        img {
          position: relative;
          width: 1.5rem;
          margin-right: 0.4rem;
        }
      }
      .offlineBtn {
        background: #FF5252;
        margin-left: 0.8rem;
        padding: 0 0.8rem;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        z-index: 9;
        img {
          position: relative;
          width: 1.5rem;
          margin-right: 0.4rem;
        }
      }
      .waitOrderWrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(92, 163, 245);
        overflow: hidden;
        span {
          position: relative;
          font-size: 0.84rem;
          z-index: 99;
        }
        .rippleWait {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 5rem;
          height: 5rem;
          border-radius: 100rem;
          background: #1C4E89;
          transition: all 0.4s;
        }
        .ripple1 {
          animation: waitOrderRipple 3s linear 0s infinite;
        }
        .ripple2 {
          animation: waitOrderRipple 3s linear 700ms infinite;
        }
        .ripple3 {
          animation: waitOrderRipple 3s linear 1400ms infinite;
        }
        .ripple4 {
          animation: waitOrderRipple 3s linear 2100ms infinite;
        }
      }
      .startOrderBtn {
        flex: 1;
        text-align: center;
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

@keyframes waitOrderRipple {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  4% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
</style>
