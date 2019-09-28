<template>
  <div class="home">
    <swiper :options="bannerOption" class="bannerWrap">
      <swiper-slide v-for="(banner, bannerIndex) in banners" v-bind:key="bannerIndex">
        <div class="bannerContentWrap" :style="{ backgroundImage: `url(${banner})` }"></div>
      </swiper-slide>
    </swiper>
    <div class="footerInfoWrap">
      <div>
        <span class="line1_1">我们希望你能了解一些</span>
        <span class="line1_2 linkTip" @click="showDcDriverApplyCommonQuestion">常见问题</span>
      </div>
      <div>
        <span class="line2_1">有问题时，也可以</span>
        <span class="line2_2 linkTip" @click="dcDriverApplyContactServer">联系客服</span>
        <span class="line2_3">进行咨询</span>
      </div>
    </div>
    <div class="joinInBtn" @click="toJoinDcDriver">加入大昌优驾</div>
    <div class="outLoginLink" @click="loginOut">退出登录</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      bannerOption: {
        autoplay: {
          disableOnInteraction: false,
          delay: 8000
        },
        effect: 'fade',
        lazy: true,
        loop: true
      },
      banners: [
        require('@/assets/index_banner_1.png'),
        require('@/assets/index_banner_2.png'),
        require('@/assets/index_banner_3.png')
      ]
    }
  },
  created () {
  },
  methods: {
    showDcDriverApplyCommonQuestion () {
      this.$comfun.showToast(this, '常见问题页面还没开发了')
    },
    dcDriverApplyContactServer () {
      this.$comfun.showToast(this, '这个打电话用原生实现吗，敲定一下')
    },
    toJoinDcDriver () {
      this.$router.push('/applyIndex')
    },
    loginOut () {
      this.$comfun.showToast(this, '还没开发了')
    }
  }
}
</script>

<style lang="less" scoped>
@pageTop: 2.2rem;
@pageBottom: 0.4rem;
@pageSlide: 2.4rem;
@tipInfoTop: 1rem;
@tipInfoBottom: 1rem;
@joinInBtnTop: 1rem;
@joinInBtnBottom: 1rem;
@outLoginLinkTop: 0.4rem;
.home {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .bannerWrap {
    position: relative;
    flex: 1;
    width: calc(100% - 2 * @pageSlide);
    margin-top: @pageTop;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(30, 30, 30, .2);
    .bannerContentWrap {
      position: relative;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #ffffff;
    }
  }
  .footerInfoWrap {
    position: relative;
    margin: @tipInfoTop @pageSlide @tipInfoBottom;
    text-align: left;
    line-height: 1.8rem;
    color: #494949;
    .linkTip {
      position: relative;
      display: inline-block;
      color: #FF5252;
      margin: 0 0.4rem;
    }
    .line1_1 {
      font-family: "home-tip-line1_1";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .line1_2 {
      font-family: "home-tip-line1_2";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .line2_1 {
      font-family: "home-tip-line2_1";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .line2_2 {
      font-family: "home-tip-line2_2";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .line2_3 {
      font-family: "home-tip-line2_3";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
  }
  .joinInBtn {
    position: relative;
    margin: @joinInBtnTop @pageSlide @joinInBtnBottom;
    background: #FF5252;
    color: #ffffff;
    font-size: 1rem;
    padding: 0.6rem 0;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(30, 30, 30, .1);
    letter-spacing: 0.2rem;
    text-indent: 0.2rem;
    font-family: "home-join-btn";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .outLoginLink {
    position: relative;
    margin: @outLoginLinkTop @pageSlide @pageBottom;
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    color: #999999;
    align-self: center;
    font-family: "home-join-outLogin";
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
