<template>
  <div v-if="isShow" id="dialog-msg-wrap" class="dialog-msg-wrap">
    <div class="msg-shade animated fadeIn" @click="closeMsg"></div>
    <div class="msg-content animated fadeIn" ref="msg-content">
      <div v-if="html" v-html="msg"></div>
      <div v-if="!html">{{msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog-msg',
  data () {
    return {
      isShow: true,
      shadeClose: true,
      duration: 2200,
      autoCloseTimer: null,
      msg: '',
      html: false
    }
  },
  beforeMount () {
    clearTimeout(this.autoCloseTimer)
    let dialogMsg = document.querySelector('#dialog-msg-wrap')
    if (dialogMsg && dialogMsg.parentNode) {
      dialogMsg.parentNode.removeChild(dialogMsg)
    }
  },
  mounted () {
    this.autoCloseTimer = setTimeout(() => {
      this.closeMsg()
    }, this.duration)
  },
  methods: {
    closeMsg () {
      clearTimeout(this.autoCloseTimer)
      this.$refs['msg-content'].classList.remove('fadeIn')
      this.$refs['msg-content'].classList.add('fadeOut')
      setTimeout(() => {
        this.isShow = false
      }, 0.2 * 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.msg-shade {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 99999;
  -vendor-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -vendor-animation-delay: 0.1s;
  animation-delay: 0.1s;
  display: none;
}
.msg-content {
  position: fixed;
  bottom: 10vh;
  width: 100%;
  text-align: center;
  min-height: 2rem;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 999999;
  -vendor-animation-duration: 0.2s;
  animation-duration: 0.2s;
  user-select: none;
  div {
    position: relative;
    display: inline-block;
    background-color: #117fb3;
    color: #ffffff;
    border-radius: 3px;
    padding: 0 0.9rem;
    box-shadow: 0 0 8px #33333336;
    max-width: 80%;
    line-height: 1.4rem;
  }
}
</style>
