<template>
  <div class="citySelect">
    <div class="citySelectInput" @click="toSelectCity">
      <span class="selectTitle">选择工作城市</span>
      <div class="selectTip">
        <span :class="curSelectedCity != null ? 'selectTipHasSelected' : ''">{{curSelectedCity != null ? curSelectedCity : '点击选择'}}</span>
        <i class="cityArrow iconfont">&#xe633;</i>
      </div>
    </div>
    <div class="needInfoWrap">
      <div class="needTitle">
        <span>请提前准备好以下资料</span>
        <span>方便您上传使用</span>
      </div>
      <div class="needDataWrap">
        <div class="needItem" v-for="(nd, ndIndex) in needInfos" :key="ndIndex">{{nd}}</div>
      </div>
    </div>
    <div class="prepareOkBtn" @click="prepareOk">准备好了，去提交</div>
  </div>
</template>

<script>
export default {
  name: 'citySelect',
  data () {
    return {
      curSelectedCity: null,
      needInfos: [
        '身份证（头像面、国徽面）', '手持身份证照片', '驾驶证照片', '行驶证照片', '网约车从业资格证（非必传）', '人车合影', '运输证（非必传）'
      ]
    }
  },
  created () {
    let dataSubmitOk = this.$store.state.pageData.data && this.$store.state.pageData.data.dataSubmitOk
    if (dataSubmitOk === true) {
      this.$router.back()
    } else {
      let cityName = this.$store.state.pageData.data.cityName
      if (cityName) {
        this.curSelectedCity = cityName
        this.$store.commit('addFormData', {
          key: 'userJobCity',
          value: {
            cityName: this.$store.state.pageData.data.cityName,
            cityCode: this.$store.state.pageData.data.cityCode,
            cityId: this.$store.state.pageData.data.id
          }
        })
      }
    }
  },
  methods: {
    toSelectCity () {
      this.$router.push('/jiameng/citySelectHandler')
    },
    prepareOk () {
      this.$router.push('/jiameng/userInfoForm')
    }
  }
}
</script>

<style lang="less" scoped>
@pageTop: 2.2rem;
@pageBottom: 1.2rem;
@pageSlide: 1.4rem;
@needInfoWrapTop: 1.6rem;
@prepareOkBtnTop: 1.2rem;
.citySelect {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .citySelectInput {
    position: relative;
    margin: @pageTop @pageSlide 0;
    padding-bottom: 10px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #BFBFBF;
    .selectTitle {
      position: relative;
      font-size: 0.9rem;
    }
    .selectTip {
      position: relative;
      color: #999999;
      font-size: 0.8rem;
      .selectTipHasSelected {
        color: #3d3d3d;
      }
      .cityArrow {
        position: relative;
        font-size: 0.8rem;
        margin-left: 0.4rem;
      }
    }
  }
  .needInfoWrap {
    position: relative;
    margin: @needInfoWrapTop @pageSlide @pageBottom;
    flex: 1;
    text-align: left;
    .needTitle {
      position: relative;
      span {
        position: relative;
        display: block;
        font-size: 1.4rem;
      }
    }
    .needDataWrap {
      position: relative;
      margin-top: 1.4rem;
      .needItem {
        position: relative;
        line-height: 2.4rem;
        color: #333333;
        padding-left: 1.4rem;
      }
      .needItem::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto 0;
        width: 3px;
        height: 1.2rem;
        background: #FF5252;
      }
    }
  }
  .prepareOkBtn {
    position: relative;
    margin: @prepareOkBtnTop @pageSlide @pageBottom;
    background: #FF5252;
    color: #ffffff;
    font-size: 0.8rem;
    padding: 0.6rem 0;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(30, 30, 30, .1);
    letter-spacing: 0.2rem;
    text-indent: 0.2rem;
    // -webkit-font-smoothing: antialiased;
    // -webkit-text-stroke-width: 0.2px;
    // -moz-osx-font-smoothing: grayscale;
  }
}
</style>
