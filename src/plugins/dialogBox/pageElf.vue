<template>
  <div :class="['pageElfWrap', top != null ? '' : 'pageElfWrapNoHasTop', position == 'right' ? 'pageElfWrapInRight' : 'pageElfWrapInLeft']" :style="{ top: top != null ? top : '0', backgroundPosition: backgroundPosition, left: position == 'left' ? `calc(-4px + ${overDistance}px)` : 'normal', right: position == 'right' ? `calc(-4px + ${overDistance}px - 68px)` : 'normal' }" @mouseover="elfHover" @mouseout="elfHoverEnd" @click="elfClick"></div>
</template>

<script>
export default {
  name: 'page-elf',
  props: {
    top: {
      default: null // 为空默认处于中间偏上一点点
    },
    position: {
      default: 'left' // left、right
    },
    overDistance: {
      default: 0 // 小精灵趴出来的距离，单位px
    }
  },
  data () {
    return {
      positon: 0,
      timer: null,
      hideTimer: null,
      showTimer: null,
      blinkTimer: null,
      initOutTimer: null,
      hoverEndOutTimer: null,
      clickOutTimer: null,
      backgroundPosition: '0 0'
    }
  },
  created () {
    this.initAnimatin()
  },
  methods: {
    initAnimatin () {
      this.timer && clearInterval(this.timer)
      this.initOutTimer && clearInterval(this.initOutTimer)
      this.timer = setInterval(() => {
        this.positon = 0
        this.show()
        this.initOutTimer = setTimeout(() => {
          this.positon = 11
          this.hide()
        }, 2500)
      }, 20000)
    },
    show (callBack) {
      this.hideTimer && clearTimeout(this.hideTimer)
      if (this.positon < 11) {
        this.backgroundPosition = `0 -${100 * this.positon++}px`
        this.showTimer = setTimeout(() => {
          this.show(callBack)
        }, 80)
      } else {
        if (callBack) callBack()
      }
    },
    hide () {
      this.showTimer && clearTimeout(this.showTimer)
      if (this.positon < 14) {
        this.backgroundPosition = `0 -${100 * this.positon++}px`
        this.hideTimer = setTimeout(() => {
          this.hide()
        }, 50)
      } else {
        this.backgroundPosition = `0 0`
        this.positon = 0
      }
    },
    blink () {
      this.timer && clearInterval(this.timer)
      this.initOutTimer && clearInterval(this.initOutTimer)
      this.blinkTimer && clearTimeout(this.blinkTimer)
      if (this.positon < 11) {
        this.backgroundPosition = `0 -${100 * this.positon++}px`
        this.blinkTimer = setTimeout(() => {
          this.blink()
        }, 80)
      } else {
        this.show(() => {
          this.showTimer && clearTimeout(this.showTimer)
          this.hideTimer && clearTimeout(this.hideTimer)
          this.positon = 4
          this.backgroundPosition = `0 -${100 * this.positon}px`
          this.blinkTimer = setTimeout(() => {
            this.blink()
          }, 1400)
        })
      }
    },
    elfHover () {
      this.blink()
    },
    elfHoverEnd () {
      this.timer && clearInterval(this.timer)
      this.initOutTimer && clearInterval(this.initOutTimer)
      this.showTimer && clearTimeout(this.showTimer)
      this.hideTimer && clearTimeout(this.hideTimer)
      this.blinkTimer && clearTimeout(this.blinkTimer)
      this.hoverEndOutTimer && clearTimeout(this.hoverEndOutTimer)
      this.hoverEndOutTimer = setTimeout(() => {
        this.hide()
        this.initAnimatin()
      }, 3000)
    },
    elfClick () {
      this.blinkTimer && clearTimeout(this.blinkTimer)
      this.timer && clearInterval(this.timer)
      this.initOutTimer && clearInterval(this.initOutTimer)
      this.clickOutTimer && clearInterval(this.clickOutTimer)
      this.hoverEndOutTimer && clearTimeout(this.hoverEndOutTimer)
      this.show()
      this.$emit('elf')
      this.clickOutTimer = setTimeout(() => {
        this.timer && clearInterval(this.timer)
        this.initOutTimer && clearInterval(this.initOutTimer)
        this.showTimer && clearTimeout(this.showTimer)
        this.hideTimer && clearTimeout(this.hideTimer)
        this.blinkTimer && clearTimeout(this.blinkTimer)
        this.initAnimatin()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.pageElfWrap {
  position: fixed;
  background-image: url(./../../assets/page_elf.png);
  background-size: 100% auto;
  background-repeat: no-repeat;
  width: 68px;
  height: 100px;
  clear: both;
  background-position: 0px 0px;
  transform: scale(0.72);
  transform-origin: 0 0;
}
.pageElfWrapNoHasTop {
  top: 0;
  bottom: 40px;
  margin: auto 0;
}
.pageElfWrapInLeft {
  left: -4px;
}
.pageElfWrapInRight {
  transform: scale(0.72) rotateY(180deg);
  right: calc(-4px - 68px);
}
</style>
