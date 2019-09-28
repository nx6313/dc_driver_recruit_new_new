<template>
  <div class="dataCompletion">
    <div class="completionDataWrap">
      <div class="completionItem" v-for="(need, needIndex) in needCompletions" :key="needIndex">
        <div class="leftContent">
          <div class="title">{{need.type | typeFilter}}</div>
          <div class="needReason">{{need.reason}}</div>
        </div>
        <span v-waves :class="['completionBtn', need.isComplete ? 'completionBtnIsOk' : '']" @click="toComplateThis(need)">
          <template v-if="!need.isComplete">
            {{need.type | typeBtnFilter}}
          </template>
          <template v-if="need.isComplete">
            <img class="isCompleteOkImg" :src="require('@/assets/complate_ok.png')">
          </template>
        </span>
      </div>
    </div>
    <div class="joinToSubmitBtn" @click="joinToSubmit">提交审核</div>
  </div>
</template>

<script>
export default {
  name: 'dataCompletion',
  data () {
    return {
      needCompletions: []
    }
  },
  filters: {
    typeFilter (v) {
      let typeName = ''
      switch (String(v).trim()) {
        case '1':
          typeName = '身份证号'
          break;
        case '2':
          typeName = '银行卡信息'
          break;
        case '3':
          typeName = '行驶证'
          break;
        case '4':
          typeName = '驾驶证'
          break;
        case '5':
          typeName = '人车合影'
          break;
        case '6':
          typeName = '身份证（国徽面）'
          break;
        case '7':
          typeName = '身份证（正面）'
          break;
        case '8':
          typeName = '网约车资格证'
          break;
        case '9':
          typeName = '手持身份证'
          break;
        case '10':
          typeName = '运输证'
          break;
        case '11':
          typeName = '车型'
          break;
        default:
          typeName = '未定义资料'
          break;
      }
      return typeName
    },
    typeBtnFilter (v) {
      if (String(v).trim() == '1' || String(v).trim() == '11') {
        return '修改'
      } else {
        return '上传'
      }
    }
  },
  created () {
    this.needCompletions = this.$store.state.completionData.data && this.$store.state.completionData.data.needCompletions || []
    let dataSubmitOk = this.$store.state.pageData.data && this.$store.state.pageData.data.dataSubmitOk
    if (dataSubmitOk === true && this.needCompletions.length > 0) {
      // let dataSubmitOkType = this.$store.state.pageData.data.type
      let dataSubmitOkId = this.$store.state.pageData.data.id
      let inNeedIndex = this.needCompletions.map(v => { return v.id }).indexOf(dataSubmitOkId)
      this.needCompletions[inNeedIndex].isComplete = true
      this.$store.dispatch('clearPageData')
    }
  },
  methods: {
    toComplateThis (complateInfo) {
      if (!complateInfo.isComplete) {
        this.$router.push({
          path: '/dataCompletionDetail',
          query: {
            type: complateInfo.type,
            id: complateInfo.id
          }
        })
      }
    },
    joinToSubmit () {
      let allIsComplate = true
      for (let needIndex in this.needCompletions) {
        if (!this.needCompletions[needIndex].isComplete) {
          allIsComplate = false
          break
        }
      }
      if (allIsComplate) {
        this.$http.postForm(this, this.$api.conserveDriver, {
          phone: this.$store.state.userBaseInfo.phone
        }).then(result => {
          this.$comfun.showToast(this, '提交成功，请您耐心等待进一步审核')
          this.$store.dispatch('clearCompletionData')
          this.$router.back()
        })
      } else {
        this.$comfun.showToast(this, '请先完善所有的资料')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@pageTop: 2.2rem;
@pageBottom: 0.8rem;
@pageSlide: 1.8rem;
@completionDataWrapTop: 0.8rem;
@joinToSubmitBtnTop: 0.8rem;
.dataCompletion {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .completionDataWrap {
    position: relative;
    flex: 1;
    margin: @completionDataWrapTop @pageSlide 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .completionItem {
      position: relative;
      text-align: left;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      .leftContent {
        position: relative;
        flex: 1;
        .title {
          position: relative;
          font-size: 1rem;
          font-weight: bold;
          color: #000;
        }
        .needReason {
          position: relative;
          margin-top: 0.6rem;
          color: #999999;
          font-size: 0.8rem;
          line-height: 1.2rem;
        }
      }
      .completionBtn {
        position: relative;
        display: inline-block;
        width: 5rem;
        height: 2.6rem;
        line-height: 2.6rem;
        text-align: center;
        background: #F4F4F8;
        color: #43434A;
        margin-left: 2.4rem;
        border-radius: 4px;
        transition: all 0.4s;
        .isCompleteOkImg {
          position: absolute;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          transform: scale(0.6);
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
      .completionBtnIsOk {
        background: #2FD585;
      }
    }
    .completionItem:nth-of-type(n + 2)::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      background: #BFBFBF;
    }
  }
  .joinToSubmitBtn {
    position: relative;
    margin: @joinToSubmitBtnTop @pageSlide @pageBottom;
    background: #FF5252;
    color: #ffffff;
    font-size: 1rem;
    text-align: center;
    padding: 0.6rem 0;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(30, 30, 30, .1);
    letter-spacing: 0.2rem;
    text-indent: 0.2rem;
  }
}
</style>
