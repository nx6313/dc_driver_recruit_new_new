<template>
  <div class="auditStatus" v-if="status != null">
    <div class="mainContent">
      <img class="statusImg" :src="require('@/assets/status_auditing.png')" v-if="status == 0">
      <img class="statusImg" :src="require('@/assets/status_is_driver.png')" v-if="status == 1 || status == 4">
      <img class="statusImg" :src="require('@/assets/status_audit_fail.png')" v-if="status == 2">
      <img class="statusImg" :src="require('@/assets/status_data_perfect.png')" v-if="status == 3">
      <div class="contentTip" v-if="status == 0">预计1-3个工作日内审核完成，结果将以短信形式通知您，请耐心等待~</div>
      <div class="contentTip" v-if="status == 1">资料审核通过，您可以通过下方按钮下载大昌优驾APP开始接单啦</div>
      <div class="contentTip" v-if="status == 2">非常抱歉，您提交的资料未通过审核，感谢您的参与</div>
      <div class="contentTip" v-if="status == 3">您有资料需要完善，点击按钮前往上传</div>
      <div class="contentTip" v-if="status == 4">您当前已经是大昌司机了，无法再申请注册加盟司机</div>
      <div v-waves class="downloadBtn" v-if="status == 1" @click="toDownloadApp">下载大昌优驾APP</div>
      <div v-waves class="downloadBtn" v-if="status == 2" @click="toReapply">重新申请</div>
      <div v-waves class="downloadBtn" v-if="status == 3" @click="dataCompletion">完善资料</div>
    </div>
    <div class="footerData">
      <div class="infoItem">
        <span>我们希望你能了解一些</span>
        <span class="link" @click="showDcDriverApplyCommonQuestion">常见问题</span>
      </div>
      <div class="infoItem">
        <span>有问题时，也可以</span>
        <span class="link" @click="dcDriverApplyContactServer">联系客服</span>
        <span>进行咨询</span>
      </div>
      <img class="footerImg" :src="require('@/assets/get_order_learn.png')" @click="toOrderReceivingSimulation">
    </div>
  </div>
</template>

<script>
export default {
  name: 'auditStatus',
  data () {
    return {
      selectCarKey: null,
      status: null
    }
  },
  created () {
    this.selectCarKey = this.$route.query.selectCarKey
    this.status = this.$route.query.status
  },
  methods: {
    dataCompletion () {
      this.$http.postForm(this, this.$api.driverDataSupply, {
        phone: this.$store.state.userBaseInfo.phone
      }).then(dataResult => {
        let needCompletions = []
        for (let comIndex in dataResult.data) {
          needCompletions.push({
            type: dataResult.data[comIndex].type,
            id: dataResult.data[comIndex].id,
            reason: dataResult.data[comIndex].audit_remark,
            isComplete: false
          })
        }
        this.$store.commit('setCompletionData', {
          data: {
            needCompletions: needCompletions
          }
        })
        this.$router.replace('/dataCompletion')
      })
    },
    toOrderReceivingSimulation () {
      if (this.selectCarKey === 1) {
        this.$router.push('/orderSimulationJoin')
      } else if (this.selectCarKey === 2) {
        this.$router.push('/orderSimulationSelf')
      } else {
        this.$router.push('/orderSimulationSelf')
      }
    },
    showDcDriverApplyCommonQuestion () {
      this.$router.push('/commonIssue')
    },
    dcDriverApplyContactServer () {
      this.$webapp.sendUrlToApp('tel:4000568888', true)
    },
    toDownloadApp () {
      window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.delelong.dachangcxdr'
    },
    toReapply () {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="less" scoped>
@pageTop: 2.2rem;
@pageBottom: 0.8rem;
@pageSlide: 1.8rem;
.auditStatus {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .mainContent {
    position: relative;
    flex: 1;
    .statusImg {
      position: relative;
      width: 10rem;
      margin-top: 4rem;
    }
    .contentTip {
      position: relative;
      margin: 0 2rem;
      line-height: 1.6rem;
      color: #999999;
      font-size: 0.9rem;
    }
    .downloadBtn {
      position: relative;
      display: inline-block;
      padding: 0.8rem 2.2rem;
      background: rgb(239, 239, 241);
      color: #43434A;
      border-radius: 20rem;
      font-size: 0.8rem;
      margin-top: 1.8rem;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    }
  }
  .footerData {
    position: relative;
    margin: 0 @pageSlide @pageBottom;
    .infoItem {
      position: relative;
      text-align: left;
      line-height: 1.8rem;
      span {
        position: relative;
        color: #494949;
      }
      .link {
        position: relative;
        color: #FF5252;
        margin: 0.8rem;
      }
    }
    .footerImg {
      position: relative;
      width: 100%;
      margin-top: 0.8rem;
    }
  }
}
</style>
