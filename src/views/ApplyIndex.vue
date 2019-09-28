<template>
  <div class="applyIndex">
    <div class="topTipBar">成为大昌出行司机</div>
    <div class="topTipTitle">收入更稳定，更多上升空间，更多权益保障</div>
    <div class="topTipTitleDes">稳定体面的事业选择，为你和家人带来更好的生活。</div>
    <div class="applyCarTypeSelect">
      <div :class="['carTypeSelectItem', selectCarKey == 1 ? 'carTypeSelectCurrent' : '']" @click="selectThisCarType(1)">
        <span>加盟</span>
        <span>快车</span>
      </div>
      <div :class="['carTypeSelectItem', selectCarKey == 2 ? 'carTypeSelectCurrent' : '']" @click="selectThisCarType(2)">
        <span>大昌</span>
        <span>专车</span>
      </div>
      <div :class="['carTypeSelectItem', selectCarKey == 3 ? 'carTypeSelectCurrent' : '']" @click="selectThisCarType(3)">
        <span>城际</span>
        <span>专线</span>
      </div>
    </div>
    <div class="applyCarSwiper">
      <img :class="['carTypeItem', moveingKey == 1 ? 'carTypeItemMoving' : moveingKey == 11 ? 'carTypeItemMovingRecover' : selectCarKey == 1 ? 'carTypeItemCurrent' : '']" v-lazy="require('@/assets/car_type_jiameng.png')">
      <img :class="['carTypeItem', moveingKey == 2 ? 'carTypeItemMoving' : moveingKey == 12 ? 'carTypeItemMovingRecover' : selectCarKey == 2 ? 'carTypeItemCurrent' : '']" v-lazy="require('@/assets/car_type_zhuanche.png')">
      <img :class="['carTypeItem', moveingKey == 3 ? 'carTypeItemMoving' : moveingKey == 13 ? 'carTypeItemMovingRecover' : selectCarKey == 3 ? 'carTypeItemCurrent' : '']" v-lazy="require('@/assets/cat_type_chengji.png')">
    </div>
    <div class="applyCarInfoWrap">
      <template v-if="selectCarKey == 1">
        <div class="animated fadeIn">
          <span>带车加盟我们</span>
          <span class="keyPointEnd">海量订单</span>
        </div>
      </template>
      <template v-if="selectCarKey == 2">
        <div class="animated fadeIn">
          <span class="keyPointStart">公车公营</span>
          <span>由我们提供车辆</span>
        </div>
      </template>
      <template v-if="selectCarKey == 3">
        <div class="animated fadeIn">
          <span>城际专线、跨城行程</span>
        </div>
        <div class="animated fadeIn">
          <span class="keyPoint">有车无车都可加入</span>
        </div>
      </template>
    </div>
    <div class="applyJoinInBtn" @click="toApplyJoinDcDriver">申请加入</div>
  </div>
</template>

<script>
export default {
  name: 'applyIndex',
  data () {
    return {
      autoShowLoginPage: true, // 是否在h5方式访问时，显示登录弹框
      selectCarKey: 1, // 1: 加盟快车   2: 大昌专车   3: 城际专线
      moveingKey: 0,
      carMoveTimer: null
    }
  },
  created () {
    this.$store.commit('updateUserBaseInfoDType', {
      dType: this.selectCarKey
    })
  },
  methods: {
    selectThisCarType (typeKey) {
      if (this.moveingKey == 0) this.selectCarKey = typeKey
      this.$store.commit('updateUserBaseInfoDType', {
        dType: typeKey
      })
    },
    toApplyJoinDcDriver () {
      if (!this.$appData.hasAuthInfoInUrl(this) && !this.$appData.hasAuthInfo(this) && this.autoShowLoginPage) {
        console.log('正在通过 h5 方式访问，没有检测到登陆信息')
        this.$router.push('/login')
        return false
      }
      if (this.selectCarKey == 1) {
        this.$http.postForm(this, this.$api.getJoinDriverStatus, {
          phone: this.$store.state.userBaseInfo.phone
        }).then(statusResult => {
          if (statusResult.data.num == -1) {
            this.$router.push('/jiameng/citySelect')
          } else {
            this.$router.push({
              path: '/auditStatus',
              query: {
                status: statusResult.data.num
              }
            })
          }
        })
      } else if (this.selectCarKey == 2) {
        this.$comfun.showToast(this, '新版专车逻辑正在开发，请使用旧版')
      } else if (this.selectCarKey == 3) {
        this.$http.postForm(this, this.$api.getIntercityStatus, {
          phone: this.$store.state.userBaseInfo.phone
        }).then(statusResult => {
          if (statusResult.data.num == -1) {
            this.$router.push('/chengji/citySelect')
          } else {
            this.$router.push({
              path: '/auditStatus',
              query: {
                status: statusResult.data.num
              }
            })
          }
        })
      }
    }
  },
  watch: {
    selectCarKey (v, ov) {
      this.moveingKey = ov
      clearTimeout(this.carMoveTimer)
      this.carMoveTimer = setTimeout(() => {
        this.moveingKey = 10 + ov
        setTimeout(() => {
          this.moveingKey = 0
        }, 100)
      }, 400)
    }
  }
}
</script>

<style lang="less" scoped>
@pageTop: 2.2rem;
@pageBottom: 1.2rem;
@pageSlide: 1.4rem;
@titleTop: 0.6rem;
@titleBottom: 0.2rem;
@titleDesTop: 0.4rem;
@titleDesBottom: 0.2rem;
@applyJoinInBtnTop: 0.4rem;
@applyCarTypeSelectTop: 0.4rem;
@applyCarTypeSelectBottom: 0.8rem;
.applyIndex {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .topTipBar {
    position: relative;
    margin: @pageTop @pageSlide 0;
    align-self: flex-start;
    font-size: 0.85rem;
    transform: scaleY(1.1);
    color: #ffffff;
    padding: 0.3rem 0.5rem 0.24rem;
    font-family: "applyIndex-topTipBar";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    background: -webkit-linear-gradient(left, #F94343 , #F98C43); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #F94343, #F98C43); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #F94343, #F98C43); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #F94343 , #F98C43); /* 标准的语法 */
  }
  .topTipTitle {
    position: relative;
    text-align: left;
    margin: @titleTop @pageSlide @titleBottom;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #000000;
    font-family: "applyIndex-topTipTitle";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .topTipTitleDes {
    position: relative;
    text-align: left;
    margin: @titleDesTop @pageSlide @titleDesBottom;
    font-size: 0.82rem;
    line-height: 1.9rem;
    color: #666666;
    font-family: "applyIndex-topTipTitleDes";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .applyCarTypeSelect {
    position: relative;
    flex: 1;
    margin: @applyCarTypeSelectTop @pageSlide @applyCarTypeSelectBottom;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-family: "applyIndex-carTypeSelect";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    .carTypeSelectItem {
      position: relative;
      transition: all 0.4s;
      color: #9B9898;
      background-color: rgb(250, 246, 246);
      width: calc(100% / 3 - 1.4rem);
      height: 7rem;
      border-radius: 8px;
      // box-shadow: 0 0 8px rgba(30, 30, 30, .2);
      transform: translateZ(0);
      span {
        position: relative;
        display: block;
        font-size: 1.2rem;
        line-height: 1.8rem;
      }
      span:first-of-type {
        margin-top: 1.8rem;
      }
    }
    .carTypeSelectCurrent {
      background-color: #FF8383;
      color: #ffffff;
      box-shadow: 0 0 20px rgba(209, 75, 75, 0.8);
      transform: translateZ(20rem);
    }
  }
  .applyCarSwiper {
    position: relative;
    height: 5.4rem;
    margin-bottom: 0.4rem;
    pointer-events: none;
    .carTypeItem {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 100%;
      padding: 0 2rem;
      transform: translateX(100vw);
      transition: all 0.6s;
    }
    .carTypeItemCurrent {
      z-index: 999;
      transform: translateX(0);
    }
    .carTypeItemMoving {
      transition: all 0.4s;
      transform: translateX(-100vw);
    }
    .carTypeItemMovingRecover {
      transition: all 0s;
      transform: translateX(100vw);
    }
  }
  .applyCarInfoWrap {
    position: relative;
    height: 5rem;
    color: #494949;
    font-size: 0.92rem;
    line-height: 1.4rem;
    font-family: "applyIndex-applyCarInfo";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    .keyPoint {
      color: #FF544D;
    }
    .keyPointStart {
      color: #FF544D;
      margin-right: 0.6rem;
    }
    .keyPointEnd {
      color: #FF544D;
      margin-left: 0.6rem;
    }
  }
  .applyJoinInBtn {
    position: relative;
    margin: @applyJoinInBtnTop @pageSlide @pageBottom;
    background: #FF5252;
    color: #ffffff;
    font-size: 1rem;
    padding: 0.6rem 0;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(30, 30, 30, .1);
    letter-spacing: 0.2rem;
    text-indent: 0.2rem;
    font-family: "applyIndex-applyJoinInBtn";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>