<template>
  <div v-if="isShow" id="dialog-sign-wrap" class="dialog-sign-wrap">
    <div v-if="showDirectionTip" class="equipment-direction-tip-shade animated fadeIn">
      <img v-lazy="require('@/assets/icon_phone_direction_tip.png')">
      <span>请您横握手机进行签名操作</span>
    </div>
    <div v-if="!showDirectionTip" class="sign-content animated zoomInLeft" ref="sign-content">
      <div class="canvasWrap" ref="canvasHW">
        <canvas @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseup="mouseUp" ref="canvasSign"></canvas>
          <span class="signClose" @click="closeSign"></span>
          <span class="signClear" @click="clear"></span>
          <span class="signComplate" @click="commit"><img v-lazy="require('@/assets/sign_complate.png')"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog-sign',
  data () {
    return {
      showDirectionTip: true,
      isShow: true,
      points: [],
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      endX: 0,
      endY: 0,
      w: null,
      h: null,
      isDown: false,
      canvasBoard: null,
      canvasContext: null,
      lineWidth: 4,
      lineColor: '#303030',
      callBack: () => {}
    }
  },
  beforeMount () {
    let dialogSign = document.querySelector('#dialog-sign-wrap')
    if (dialogSign && dialogSign.parentNode) {
      dialogSign.parentNode.removeChild(dialogSign)
    }
  },
  mounted() {
    setTimeout(() => {
      this.showDirectionTip = false
    }, 1900)
  },
  methods: {
    destorySign () {
        this.isShow = false
    },
    closeSign () {
        if (this.$refs['sign-content']) this.$refs['sign-content'].classList.remove('zoomInLeft')
        if (this.$refs['sign-content']) this.$refs['sign-content'].classList.add('zoomOutLeft')
        setTimeout(() => {
            this.isShow = false
        }, 0.5 * 1000)
    },
    touchStart: function(ev) {
      ev = ev || event
      ev.preventDefault()
      let obj = {
        x: ev.targetTouches[0].clientX,
        y: ev.targetTouches[0].clientY
      }
      this.startX = obj.x
      this.startY = obj.y
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(this.startX, this.startY)
      this.canvasContext.lineTo(obj.x, obj.y)
      this.canvasContext.lineWidth = this.lineWidth
      this.canvasContext.strokeStyle = this.lineColor
      this.canvasContext.stroke()
      this.canvasContext.closePath()
      this.points.push(obj)
    },
    touchMove: function(ev) {
      ev = ev || event
      ev.preventDefault()
      let obj = {
        x: ev.targetTouches[0].clientX,
        y: ev.targetTouches[0].clientY
      }
      this.moveX = obj.x
      this.moveY = obj.y
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(this.startX, this.startY)
      this.canvasContext.lineTo(obj.x, obj.y)
      this.canvasContext.lineWidth = this.lineWidth
      this.canvasContext.strokeStyle = this.lineColor
      this.canvasContext.stroke()
      this.canvasContext.closePath()
      this.startX = obj.x
      this.startY = obj.y
      this.points.push(obj)
    },
    touchEnd: function(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length > 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY
        }
        this.canvasContext.beginPath()
        this.canvasContext.moveTo(this.startX, this.startY)
        this.canvasContext.lineTo(obj.x, obj.y)
        this.canvasContext.lineWidth = this.lineWidth
        this.canvasContext.strokeStyle = this.lineColor
        this.canvasContext.stroke()
        this.canvasContext.closePath()
        this.points.push(obj)
        this.points.push({ x: -1, y: -1 })
      }
    },
    mouseDown: function(ev) {
      ev = ev || event
      ev.preventDefault()
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY
      }
      this.startX = obj.x
      this.startY = obj.y
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(this.startX, this.startY)
      this.canvasContext.lineTo(obj.x, obj.y)
      this.canvasContext.lineWidth = this.lineWidth
      this.canvasContext.strokeStyle = this.lineColor
      this.canvasContext.stroke()
      this.canvasContext.closePath()
      this.points.push(obj)
      this.isDown = true
    },
    mouseMove: function(ev) {
      ev = ev || event
      ev.preventDefault()
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.moveX = obj.x
        this.moveY = obj.y
        this.canvasContext.beginPath()
        this.canvasContext.moveTo(this.startX, this.startY)
        this.canvasContext.lineTo(obj.x, obj.y)
        this.canvasContext.lineWidth = this.lineWidth
        this.canvasContext.strokeStyle = this.lineColor
        this.canvasContext.stroke()
        this.canvasContext.closePath()
        this.startX = obj.x
        this.startY = obj.y
        this.points.push(obj)
      }
    },
    mouseUp: function(ev) {
      ev = ev || event
      ev.preventDefault()
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY
      }
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(this.startX, this.startY)
      this.canvasContext.lineTo(obj.x, obj.y)
      this.canvasContext.lineWidth = this.lineWidth
      this.canvasContext.strokeStyle = this.lineColor
      this.canvasContext.stroke()
      this.canvasContext.closePath()
      this.points.push(obj)
      this.points.push({ x: -1, y: -1 })
      this.isDown = false
    },
    clear: function() {
      this.canvasContext.clearRect(0, 0, this.$refs.canvasSign.width, this.$refs.canvasSign.height)
      this.points = []
    },
    commit: function() {
      if (this.points.length > 0) {
        let imgData = this.$refs.canvasSign.toDataURL('image/png')
        let imgFile = this.dataURLToFile(imgData, `sign_${this.$comfun.formatDate(new Date(), 'yyMdhmsS')}`)
        this.callBack(imgData, imgFile)
        this.closeSign()
      } else {
        this.$comfun.showToast(this, '您还没有写任何东西呢')
      }
    },
    dataURLToFile: function(dataUrl, fileName) {
      let arr = dataUrl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], fileName, { type: mime })
    }
  },
  watch: {
    showDirectionTip(val) {
      if (!val) {
        this.$nextTick(() => {
          if (this.isShow) {
            this.canvasBoard = this.$refs.canvasSign
            this.canvasContext = this.canvasBoard.getContext('2d')
            this.canvasBoard.height = this.$refs.canvasHW.offsetHeight
            this.canvasBoard.width = this.$refs.canvasHW.offsetWidth
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sign-content {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  font-weight: bold;
  z-index: 999999;
  -vendor-animation-duration: 0.5s;
  animation-duration: 0.5s;
  user-select: none;
  div.canvasWrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
    background-color: #bedf9f;
    color: #ffffff;
    box-shadow: 0 0 8px #33333336;
    canvas {
      position: relative;
    }
    .signClose {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: block;
      width: 1.4rem;
      height: 1.4rem;
      background-image: url('./../../assets/sign_close.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transform: rotate(90deg);
      animation: signCloseRotate 20s infinite;
    }
    .signClear {
      position: absolute;
      bottom: 1.6rem;
      left: 1.6rem;
      display: block;
      width: 2rem;
      height: 2rem;
      background-image: url('./../../assets/sign_clear.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transform: rotate(90deg);
      animation: signClearShake 6s infinite alternate;
    }
    .signComplate {
      position: absolute;
      bottom: 1.6rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      display: block;
      width: 5rem;
      height: 5rem;
      background-image: url('./../../assets/sign_complate.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transform: rotate(90deg);
      img {
        width: 100%;
        animation: scaleout 1.3s infinite ease-in-out;
      }
    }
  }
}

@keyframes signCloseRotate {
  from,
  to {
    -webkit-transform: rotate(0deg);
    transform: rotate(180deg);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: rotate(0deg);
    transform: rotate(180deg);
  }

  20%,
  40%,
  60%,
  80%,
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(-180deg);
  }
}
@keyframes signClearShake {
  from,
  to {
    -webkit-transform: rotate(90deg) translate3d(0, 0, 0);
    transform: rotate(90deg) translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: rotate(90deg) translate3d(-3px, 4px, 0);
    transform: rotate(90deg) translate3d(-3px, 4px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: rotate(90deg) translate3d(3px, -4px, 0);
    transform: rotate(90deg) translate3d(3px, -4px, 0);
  }
}
@keyframes scaleout {
    0% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    } 100% {
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
      opacity: 0;
    }
}

.equipment-direction-tip-shade {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999999;
  background-image: url('./../../assets/black_point_bg.png');
  background-color: #242424;
  text-align: center;
  img {
    display: block;
    height: 10rem;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: calc((100% - 10rem) / 2 - 3rem);
    animation: directionRotate 1.5s ease-in-out;
    animation-fill-mode: forwards;
  }
  span {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: calc((100% - 10rem) / 2 + 10rem);
    display: block;
    color: #ffffff;
    font-size: 0.9rem;
    text-shadow: rgba(117, 117, 117, 0.3) 0px 1px 2px;
  }
}

@keyframes directionRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-90deg);
  }
}
</style>
