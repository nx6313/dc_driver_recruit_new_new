<template>
  <div class="orderReceivingSimulation">
    <audio ref="welcome" :src="require('@/static/sounds/welcome.mp3')" preload hidden></audio>
    <audio ref="startOrder" :src="require('@/static/sounds/startOrder.mp3')" preload hidden></audio>
    <audio ref="waitOrder" :src="require('@/static/sounds/waitOrder.mp3')" preload hidden></audio>
    <audio ref="orderGaipai" :src="require('@/static/sounds/orderGaipai.mp3')" preload hidden></audio>
    <audio ref="jieDan" :src="require('@/static/sounds/jieDan.mp3')" preload hidden></audio>
    <audio ref="callToUser" :src="require('@/static/sounds/callToUser.mp3')" preload hidden></audio>
    <audio ref="hasArrStartAddress" :src="require('@/static/sounds/hasArrStartAddress.mp3')" preload hidden></audio>
    <audio ref="hasGetUser" :src="require('@/static/sounds/hasGetUser.mp3')" preload hidden></audio>
    <audio ref="hasArrEndAddress" :src="require('@/static/sounds/hasArrEndAddress.mp3')" preload hidden></audio>
    <audio ref="sureToIn" :src="require('@/static/sounds/sureToIn.mp3')" preload hidden></audio>
    <audio ref="todayLiushui" :src="require('@/static/sounds/todayLiushui.mp3')" preload hidden></audio>
    <audio ref="todayOnlineTime" :src="require('@/static/sounds/todayOnlineTime.mp3')" preload hidden></audio>
    <audio ref="todayOrderCount" :src="require('@/static/sounds/todayOrderCount.mp3')" preload hidden></audio>
    <audio ref="workStage" :src="require('@/static/sounds/workStage.mp3')" preload hidden></audio>
    <audio ref="endIsEasy" :src="require('@/static/sounds/endIsEasy.mp3')" preload hidden></audio>
    <div class="loadResourceWrap animated fadeIn faster" ref="loadResourceWrap">
      <div class="loadingBar">
        <div class="outBg">
          <div class="inBg">
            <div class="bar" ref="loadingBar"></div>
          </div>
        </div>
      </div>
      <div class="loadingTip">资源加载中，请稍后...</div>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 0">
      <img class="startLogo" :src="require('@/static/images/page1_logo.png')">
      <div class="startTip">
        <div class="title">欢迎体验模拟接单</div>
        <div class="des">请提高音量体验接单过程</div>
        <div class="des">该引导为虚拟乘客，无需真实接送</div>
      </div>
      <img class="startBtn" :src="require('@/static/images/page1_start_btn.png')" @click="toNextStep">
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 1">
      <simulateIndex key="1" clickElem="beginOnline" tipWidth="12rem" :tipInBottomCenter="true" tipBottom="5.2rem" :tipSrc="require('@/static/images/tip_start.png')"
      fingerBottom="-1rem" fingerRight="1.4rem"
       @beginOnline="toNextStep"></simulateIndex>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 2">
      <simulateIndex key="2" clickElem="waitOrder" :shadeLimit="0" :showFinger="false" @clickThis="toNextStep"></simulateIndex>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 3">
      <simulateRealTimeOrderGet clickElem="orderGaipai" tipWidth="12rem" tipTop="4.2rem" tipRight="4rem" :tipSrc="require('@/static/images/tip_gaipai.png')" :showFinger="false"
      @clickThis="toNextStep"></simulateRealTimeOrderGet>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 4">
      <simulateRealTimeOrderGet clickElem="goToTakePassenger" tipWidth="12rem" :tipInBottomCenter="true" tipBottom="6.6rem" :tipSrc="require('@/static/images/tip_jiechengke.png')"
      fingerBottom="0rem" fingerRight="3rem"
      @goToTakePassenger="toNextStep"></simulateRealTimeOrderGet>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 5">
      <simulateArriveUserOrderAddress clickElem="phoneCallToUser" tipWidth="12rem" tipRight="4.4rem" tipBottom="9.4rem" :tipSrc="require('@/static/images/tip_lianxi.png')"
      fingerBottom="3.7rem" fingerRight="-0.4rem"
      @phoneCallToUser="toNextStep"></simulateArriveUserOrderAddress>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 6">
      <simulateArriveUserOrderAddress clickElem="hasToOrderAddress" tipWidth="12rem" :tipInBottomCenter="true" tipBottom="4.4rem" :tipSrc="require('@/static/images/tip_daoyuyuedi.png')"
      fingerBottom="-2.4rem" fingerLeft="2.6rem" :fingerIsSlide="true" :canSlide="canToNext"
      @hasToOrderAddress="toNextStep"></simulateArriveUserOrderAddress>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 7">
      <simulateUserGetOnCar clickElem="hasToOrderAddress" tipWidth="12rem" :tipInBottomCenter="true" tipBottom="4.4rem" :tipSrc="require('@/static/images/tip_chengkeshangche.png')"
      fingerBottom="-2.4rem" fingerLeft="2.6rem" :fingerIsSlide="true" :canSlide="canToNext"
      @hasToOrderAddress="toNextStep"></simulateUserGetOnCar>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 8">
      <simulateArriveUserEndAddress key="1" clickElem="hasToOrderAddress" tipWidth="12rem" :tipInBottomCenter="true" tipBottom="4.4rem" :tipSrc="require('@/static/images/tip_daomudidi.png')"
      fingerBottom="-2.4rem" fingerLeft="2.6rem" :fingerIsSlide="true" :canSlide="canToNext"
      @hasToOrderAddress="toNextStep"></simulateArriveUserEndAddress>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 9">
      <simulateArriveUserEndAddress key="2" clickElem="endToCost" tipWidth="12rem" :tipInCenter="true" tipTop="24rem" :tipSrc="require('@/static/images/tip_jieshuxingcheng.png')"
      fingerBottom="10rem" fingerRight="0.9rem"
      @endToCost="toNextStep"></simulateArriveUserEndAddress>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 10">
      <simulateIndex key="3" clickElem="todayIncome" tipWidth="12rem" tipLeft="6.5rem" tipTop="7rem" :tipSrc="require('@/static/images/tip_orderliushui.png')"
      fingerBottom="14rem" fingerRight="0rem" :showFinger="false"
      @clickThis="toNextStep"></simulateIndex>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 11">
      <simulateIndex key="4" clickElem="onlineTime" tipWidth="12rem" :tipInTopCenter="true" tipTop="7rem" :tipSrc="require('@/static/images/tip_onlinetime.png')"
      fingerBottom="14rem" fingerRight="0rem" :showFinger="false"
      @clickThis="toNextStep"></simulateIndex>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 12">
      <simulateIndex key="5" clickElem="todayOrderCount" tipWidth="12rem" tipRight="6.5rem" tipTop="7rem" :tipSrc="require('@/static/images/tip_jiedancount.png')"
      fingerBottom="14rem" fingerRight="0rem" :showFinger="false"
      @clickThis="toNextStep"></simulateIndex>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 13">
      <simulateIndex key="6" clickElem="workStage" tipWidth="12rem" tipLeft="1.2rem" tipTop="2.4rem" :tipSrc="require('@/static/images/tip_worktai.png')"
      fingerBottom="14rem" fingerRight="0rem" :showFinger="false" :showPageTitle="true"
      @clickThis="toNextStep"></simulateIndex>
    </div>
    <div class="stepItemWrap animated fadeIn faster" v-if="step == 14">
      <img class="startLogo" :src="require('@/static/images/end_logo.png')">
      <div class="startTip">
        <div class="title">操作就是这么简单</div>
        <div class="des">快去接单赚钱吧！</div>
      </div>
      <div class="endLearnBtn" @click="learnEnd">完成学习</div>
      <div class="lookAgainBtn" @click="learnAgain">再来一遍</div>
    </div>
  </div>
</template>

<script>
import simulateIndex from '@/components/simulate/UserIndex'
import simulateRealTimeOrderGet from '@/components/simulate/RealTimeOrderGet'
import simulateArriveUserOrderAddress from '@/components/simulate/ArriveUserOrderAddress'
import simulateUserGetOnCar from '@/components/simulate/UserGetOnCar'
import simulateArriveUserEndAddress from '@/components/simulate/ArriveUserEndAddress'

export default {
  name: 'orderReceivingSimulation',
  components: {
    simulateIndex,
    simulateRealTimeOrderGet,
    simulateArriveUserOrderAddress,
    simulateUserGetOnCar,
    simulateArriveUserEndAddress
  },
  data () {
    return {
      loadTimer: null,
      loadDur: 10,
      loadCount: 0,
      loadPercent: 0,
      imgLength: 0,
      step: -1,
      curPlayingSound: null,
      playSoundSet: {
        'step_0': { // 欢迎页
          autoNext: false,
          nextTimeLimit: 7500
        },
        'step_1': { // 提示上线
          autoNext: false,
          nextTimeLimit: 3700
        },
        'step_2': { // 等待接单
          autoNext: true,
          nextTimeLimit: 3000
        },
        'step_3': { // 改派
          autoNext: false,
          nextTimeLimit: 5100
        },
        'step_4': { // 接取订单
          autoNext: false,
          nextTimeLimit: 2800
        },
        'step_5': { // 联系乘客
          autoNext: false,
          nextTimeLimit: 9100
        },
        'step_6': { // 到达预约地
          autoNext: false,
          nextTimeLimit: 3700
        },
        'step_7': { // 乘客上车了
          autoNext: false,
          nextTimeLimit: 3000
        },
        'step_8': { // 到达目的地
          autoNext: false,
          nextTimeLimit: 2800
        },
        'step_9': { // 确认行程并收费
          autoNext: false,
          nextTimeLimit: 2800
        },
        'step_10': { // 今日收入
          autoNext: false,
          nextTimeLimit: 2800
        },
        'step_11': { // 在线时长
          autoNext: false,
          nextTimeLimit: 2800
        },
        'step_12': { // 接单数量
          autoNext: false,
          nextTimeLimit: 2800
        },
        'step_13': { // 工作台
          autoNext: false,
          nextTimeLimit: 4400
        },
        'step_14': { // 完毕
          autoNext: false,
          nextTimeLimit: 3300
        }
      },
      toNextTimer: null,
      canToNext: true
    }
  },
  mounted () {
    this.preload()
  },
  created () {
  },
  methods: {
    preload () {
      let imgs = [
        require('@/static/images/page1_logo.png'),
        require('@/static/images/page1_start_btn.png'),
        require('@/static/images/user_hand.png'),
        require('@/static/images/tip_start.png'),
        require('@/static/images/gaipai.png'),
        require('@/static/images/tip_gaipai.png'),
        require('@/static/images/tip_jiechengke.png'),
        require('@/static/images/tip_lianxi.png'),
        require('@/static/images/chengke_phone.png'),
        require('@/static/images/tip_daoyuyuedi.png'),
        require('@/static/images/tip_chengkeshangche.png'),
        require('@/static/images/tip_daomudidi.png'),
        require('@/static/images/jiesuan_dialog.png'),
        require('@/static/images/tip_jieshuxingcheng.png'),
        require('@/static/images/tip_orderliushui.png'),
        require('@/static/images/tip_onlinetime.png'),
        require('@/static/images/tip_jiedancount.png'),
        require('@/static/images/tip_worktai.png'),
        require('@/static/images/end_logo.png'),
        require('@/static/images/icon_hot.png'),
        require('@/static/images/icon_map.png'),
        require('@/static/images/icon_more_order.png'),
        require('@/static/images/icon_order_location.png'),
        require('@/static/images/icon_order_set.png'),
        require('@/static/images/icon_ref.png'),
        require('@/static/images/icon_set.png'),
        require('@/static/images/icon_time.png'),
        require('@/static/images/icon_to_next.png'),
        require('@/static/images/icon_weather.png'),
        require('@/static/images/icon_work_group.png'),
        require('@/static/images/icon_head.png'),
        require('@/static/images/icon_offline.png'),
        require('@/static/images/icon_msg.png'),
        require('@/static/images/icon_slide_btn.png'),
        require('@/static/images/map_bg.jpg')
      ]
      this.imgLength = imgs.length
      clearTimeout(this.loadTimer)
      this.startLoadTimer(imgs)
    },
    startLoadTimer (imgs) {
      this.loadTimer = setTimeout(() => {
        this.loadImage(imgs[this.loadCount], (image) => {
          this.loadCount++
          let percentNum = Math.floor(this.loadCount / this.imgLength * 100)
          this.loadPercent = percentNum
          console.log('资源加载进度：' + this.loadPercent + '%')
          this.$refs.loadingBar.style.width = `${percentNum}%`
          if (this.loadCount < this.imgLength) this.startLoadTimer(imgs)
        })
      }, this.loadDur)
    },
    loadImage (url, callback) {
      let image = new Image()
      image.onload = function () {
        callback(image)
        image.onload = null
      }
      image.src = url
    },
    toNextStep () {
      if (!this.canToNext) return false
      this.step += 1
      this.playSound(this.step)
    },
    learnEnd () {
      if (!this.canToNext) return false
      if (this.curPlayingSound !== null) {
        this.curPlayingSound.pause()
        this.curPlayingSound = null
      }
      this.$router.back()
    },
    learnAgain () {
      if (!this.canToNext) return false
      this.step = 0
      this.playSound(this.step)
    },
    playSound (key) {
      if (this.curPlayingSound !== null) {
        this.curPlayingSound.pause()
      }
      if (key === 0) {
        // 播放 欢迎语
        this.curPlayingSound = this.$refs.welcome
      } else if (key === 1) {
        // 播放 点击按钮开始接单
        this.curPlayingSound = this.$refs.startOrder
      } else if (key === 2) {
        // 播放 正在等待接单中
        this.curPlayingSound = this.$refs.waitOrder
      } else if (key === 3) {
        // 播放 改派说明
        this.curPlayingSound = this.$refs.orderGaipai
      } else if (key === 4) {
        // 播放 点击按钮去接乘客
        this.curPlayingSound = this.$refs.jieDan
      } else if (key === 5) {
        // 播放 点击按钮联系乘客
        this.curPlayingSound = this.$refs.callToUser
      } else if (key === 6) {
        // 播放 到达预约地点后滑动按钮
        this.curPlayingSound = this.$refs.hasArrStartAddress
      } else if (key === 7) {
        // 播放 接到乘客滑动按钮
        this.curPlayingSound = this.$refs.hasGetUser
      } else if (key === 8) {
        // 播放 到达目的地
        this.curPlayingSound = this.$refs.hasArrEndAddress
      } else if (key === 9) {
        // 播放 确认结算
        this.curPlayingSound = this.$refs.sureToIn
      } else if (key === 10) {
        // 播放 这里是今日订单流水
        this.curPlayingSound = this.$refs.todayLiushui
      } else if (key === 11) {
        // 播放 这里是今日在线时长
        this.curPlayingSound = this.$refs.todayOnlineTime
      } else if (key === 12) {
        // 播放 这里是今日接单数量
        this.curPlayingSound = this.$refs.todayOrderCount
      } else if (key === 13) {
        // 播放 这里是今日接单数量
        this.curPlayingSound = this.$refs.workStage
      } else if (key === 14) {
        // 播放 结束语
        this.curPlayingSound = this.$refs.endIsEasy
      }
      if (this.curPlayingSound != null) {
        this.curPlayingSound.load()
        this.curPlayingSound.play()
      }
      clearTimeout(this.toNextTimer)
      if (this.playSoundSet[`step_${key}`] && this.playSoundSet[`step_${key}`].nextTimeLimit) {
        this.canToNext = false
        this.toNextTimer = setTimeout(() => {
          this.canToNext = true
          if (this.playSoundSet[`step_${key}`].autoNext === true) {
            this.toNextStep()
          }
        }, this.playSoundSet[`step_${key}`].nextTimeLimit)
      } else {
        this.canToNext = true
      }
    }
  },
  watch: {
    loadCount (v) {
      if (v == this.imgLength) {
        clearTimeout(this.loadTimer)
        this.$refs.loadResourceWrap.classList.remove('fadeIn', 'faster')
        this.$refs.loadResourceWrap.classList.add('fadeOut')
        this.$refs.loadResourceWrap.addEventListener('animationend', () => {
          this.$refs.loadResourceWrap.style.zIndex = 0
          this.step = 0
          this.playSound(this.step)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.orderReceivingSimulation {
  position: relative;
  height: 100vh;
  overflow: hidden;
  text-align: left;
  .loadResourceWrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1F2E44;
    z-index: 999;
    .loadingBar {
      position: absolute;
      width: 80%;
      height: 0.6rem;
      border-radius: 10rem;
      overflow: hidden;
      box-shadow: 0 0 8px rgba(49, 49, 49, 0.2);
      top: 0;
      left: 0;
      right: 0;
      bottom: 8rem;
      margin: auto;
      .outBg {
        position: relative;
        width: 100%;
        height: 100%;
        .inBg {
          position: relative;
          width: 100%;
          height: 100%;
          box-shadow: inset 1px 1px 10px #131313;
          .bar {
            position: relative;
            width: 0%;
            height: 100%;
            background-color: #ffffff;
            border-radius: 10rem;
            box-shadow: inset 1px 8px 10px #a7a7a7;
          }
        }
      }
    }
    .loadingTip {
      position: absolute;
      width: 100%;
      height: 1.8rem;
      line-height: 1.8rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 3rem;
      margin: auto;
      color: #ffffff;
      text-align: center;
      letter-spacing: 0.2rem;
      text-indent: 0.2rem;
      font-size: 0.9rem;
      font-family: "simulation-resource-loading";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
  }
  .stepItemWrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1F2E44;
    z-index: 9;
    text-align: center;
    .startLogo {
      position: relative;
      width: 8rem;
      margin-top: 7.5rem;
    }
    .startTip {
      position: relative;
      margin-top: 1.2rem;
      .title {
        position: relative;
        color: #FFF3EF;
        margin-bottom: 1.4rem;
        font-size: 1.3rem;
        font-family: "simulation-page1-title";
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
      }
      .des {
        position: relative;
        color: #6F737A;
        font-family: "simulation-page1-des";
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    .startBtn {
      position: absolute;
      width: 8.4rem;
      left: 0;
      right: 0;
      bottom: 5.4rem;
      margin: 0 auto;
      animation: startAnim 2s linear infinite alternate;
      transition: all 0.4s;
    }

    @keyframes startAnim {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(0.9);
      }
    }

    .endLearnBtn {
      position: absolute;
      width: 70%;
      height: 3rem;
      line-height: 3rem;
      left: 0;
      right: 0;
      bottom: 9.6rem;
      margin: 0 auto;
      border-radius: 4px;
      box-shadow: 0 0 8px rgba(30, 30, 30, .2);
      background: #1A85FF;
      color: #ffffff;
      font-family: "simulation-btn-word";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .lookAgainBtn {
      position: absolute;
      width: 70%;
      height: 3rem;
      line-height: 3rem;
      left: 0;
      right: 0;
      bottom: 5.4rem;
      margin: 0 auto;
      border-radius: 4px;
      box-shadow: 0 0 8px rgba(30, 30, 30, .2);
      background: #424F61;
      color: #ffffff;
      font-family: "simulation-btn-word";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
  }
}
</style>
