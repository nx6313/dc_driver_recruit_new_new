<template>
  <div class="formCheckboxWrap">
    <div class="checkboxItem" @click="selectThis">
      <i :class="['checkboxHandler', value ? 'checkboxHandlerSelected' : '']"></i>
      <div class="checkboxContentWrap"><slot></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-check-box',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    selectThis () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>
.formCheckboxWrap {
  position: relative;
  display: -webkit-flex; /* Safari */
  display: flex;
  align-items: center;
  .checkboxItem {
    position: relative;
    display: inline-block;
    color: #000000;
    font-size: 0.8rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items: center;
    .checkboxHandler {
      position: relative;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid #6b6b6b;
      box-sizing: border-box;
      border-radius: 100%;
      margin-right: 0.5rem;
    }
    .checkboxHandlerSelected {
      border: 0px solid #6b6b6b;
      background-image: url('./../assets/radio_selected.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .checkboxContentWrap {
      position: relative;
      display: inline-block;
      flex: 1;
    }
  }
}
</style>
