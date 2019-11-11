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
          groupTxt: 'e钱包 开户相关问题',
          isOpen: false,
          questions: [
            {
              q: '开通工商银行“e钱包”需要提供哪些信息？',
              a: '用户开通服务时需要按照页面提示，提供本人的姓名、身份证号、身份证地址信息、本人手机号、职业、身份证签发日期、身份证失效日期。'
            },
            {
              q: '手机号必须是本人的么？',
              a: '必须是。'
            },
            {
              q: '手机号与绑定的Ⅰ类银行卡预留号码不相同可以么？',
              a: '不可以。'
            },
            {
              q: 'APP登录手机号和“e钱包”填写手机号必须相同么？',
              a: '可以不同。'
            },
            {
              q: 'Ⅰ类银行卡预留手机号丢失或暂停使用等情况，无法接收验证码怎么办？',
              a: '首先修改银行预留手机号，并在“e钱包”开户时填写更改后的手机号。'
            },
            {
              q: '除了身份证外，还支持通过其它身份证件信息的开户么？',
              a: '开户时，暂不支持其它身份证件。'
            },
            {
              q: '开通工商银行“e钱包”有哪些要求？',
              a: '1.开通时，必须绑定本人的“中国六大银行Ⅰ类银行卡”。<br>2.本人名下的工商银行Ⅱ类账当前开通数量少于5个。<br>3.每日开户时间为早7:30至晚19:30，其它时段暂不提供开户服务。'
            },
            {
              q: '什么是“中国六大银行Ⅰ类银行卡”',
              a: '中国六大银行指的是：中国工商银行、中国农业银行、中国银行、中国建设银行、中国邮政储蓄银行、交通银行。<br>Ⅰ类银行卡一般指我们现在常用的借记卡；可以存取现金、理财、转账、缴费、支付等，使用时不受额度限制。同一人在同一家银行最多持1个Ⅰ类账户。'
            },
            {
              q: 'Ⅰ类银行卡可以绑定几个Ⅱ类银行卡？',
              a: '无限制。'
            },
            {
              q: 'Ⅱ类银行卡可以绑定几个Ⅰ类银行卡？',
              a: '最多同时绑定5个。'
            }
          ]
        },
        {
          groupTxt: '免密支付相关问题',
          isOpen: false,
          questions: [
            {
              q: '开通免密支付有什么条件限制么？',
              a: '无，即任何开通工商银行“e钱包”的用户皆可开通免密支付。'
            },
            {
              q: '使用免密支付有什么限制条件？',
              a: '免密支付使用必须满足以下所有条件：<br>①日累计支付少于2000元。<br>②日累计支付次数少于99次。'
            },
            {
              q: '到达免密支付上限后，如何进行支付？',
              a: '为保障您账号安全，到达上支付限后，将无法使用余额进行支付。'
            }
          ]
        },
        {
          groupTxt: '充值相关问题',
          isOpen: false,
          questions: [
            {
              q: '绑定银行卡有哪些限制条件？',
              a: '1.目前仅支持绑定六大银行Ⅰ类银行卡。<br>2.绑定银行卡数量上限为5张。已绑定5张银行卡后，需要解绑后才能重新绑定其它银行卡。'
            },
            {
              q: '怎么绑定和解新的银行卡？',
              a: '在“钱包-工行充值-银行卡管理”页面，可以进行银行卡的绑定和解绑操作。'
            },
            {
              q: '充值后，余额多久到账？',
              a: '立即到账。'
            }
          ]
        },
        {
          groupTxt: '其他问题',
          isOpen: false,
          questions: [
            {
              q: '怎么注销“工行e钱包”账户？',
              a: '可通过中国工商银行APP进行注销操作，将要注销的账户内不能有余额或欠款。'
            },
            {
              q: '使用工行余额支付后的订单，怎么申请退款？',
              a: '退款可以原路返回么？'
            },
            {
              q: '“工行e钱包”内的钱可以提现么？',
              a: '通过大昌出行APP充值金额，只能用于大昌出行APP内消费，不可提现。<br>其它渠道储蓄金额，可提现。'
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
