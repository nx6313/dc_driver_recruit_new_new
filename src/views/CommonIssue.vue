<template>
  <div class="openupEWalletCommonIssue">
    <div class="groupWrap" v-for="(group, groupIndex) in commonIssues" :key="groupIndex">
      <div class="groupItem" v-waves @click="toggleThisGroup(group)">
        <span class="groupTitle">{{group.groupTxt}}</span>
        <div class="arrowWrap">
          <span>{{group.isOpen ? '收起' : '展开'}}</span>
          <img :class="['arrowIcon', group.isOpen ? 'arrowIconIsOpen' : '']" :src="require('@/assets/item_arrow.png')">
        </div>
      </div>
      <div :class="['questionsWrap', group.isOpen ? '' : 'questionsWrapIsClose']">
        <div class="questionItem" v-for="(ques, quesIndex) in group.questions" :key="quesIndex" v-waves>
          <div class="questionWrap">
            <span class="red">Q{{quesIndex + 1}}</span>
            <span>{{ques.q}}</span>
          </div>
          <div class="answerWrap">
            <span class="red">答：</span>
            <span v-html="ques.a"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'openupEWalletCommonIssue',
  data () {
    return {
      commonIssues: []
    }
  },
  created () {
    this.initCommonIssues()
  },
  methods: {
    initCommonIssues () {
      this.commonIssues = [
        {
          groupTxt: '大昌出行 司机招募相关问题',
          isOpen: false,
          questions: [
            {
              q: '司机招募需要提供哪些信息？',
              a: '用户申请司机招募时需要按照页面提示，提供本人的姓名、身份证号、身份证地址信息、本人手机号、职业、身份证签发日期、身份证失效日期。'
            }
          ]
        }
      ]
    },
    toggleThisGroup (group) {
      group.isOpen = !group.isOpen
    }
  }
}
</script>

<style lang="less">
.openupEWalletCommonIssue {
  position: relative;
  padding: 0.8rem 1.2rem;
  .groupWrap {
    position: relative;
    text-align: left;
    border-radius: 6px;
    .groupItem {
      position: relative;
      background: #fff;
      padding: 0.8rem 1.2rem;
      font-size: 0.9rem;
      color: #43434A;
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;
      align-items: center;
      .groupTitle {
        position: relative;
        font-weight: bold;
      }
      .arrowWrap {
        position: relative;
        font-size: 0.8rem;
        color: #9B9BA5;
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        .arrowIcon {
          position: relative;
          width: 5px;
          margin-left: 0.5rem;
          transform: rotate(90deg);
          transition: all 0.3s;
        }
        .arrowIconIsOpen {
          transform: rotate(270deg);
        }
      }
    }
    .questionsWrap {
      position: relative;
      margin-top: 0.8rem;
      overflow: hidden;
      .questionItem {
        position: relative;
        background: #fff;
        border-radius: 6px;
        padding: 0.8rem 1.2rem;
        .questionWrap {
          position: relative;
          font-weight: bold;
          color: #43434A;
          font-size: 0.8rem;
          padding: 0 0 0.8rem;
          .red {
            position: relative;
            color: #FF5252;
            display: inline-block;
            margin-right: 0.6rem;
          }
        }
        .questionWrap::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: #E5E5E5;
        }
        .answerWrap {
          position: relative;
          margin-top: 0.4rem;
          font-size: 0.8rem;
          color: #9B9BA5;
          .red {
            position: relative;
            color: #FF5252;
            display: inline-block;
            margin-right: 0.4rem;
          }
        }
      }
      .questionItem:nth-of-type(n + 2) {
        margin-top: 0.8rem;
      }
    }
    .questionsWrapIsClose {
      height: 0;
      margin-top: 0;
    }
  }
  .groupWrap:nth-of-type(n + 2) {
    margin-top: 0.8rem;
  }
}
</style>
