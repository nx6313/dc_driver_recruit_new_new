<template>
  <div class="formRadioWrap">
    <div class="radioItem" v-for="(item, itemIndex) in items" :key="itemIndex" @click="selectThis(item, itemIndex)">
      <i :class="['radioHandler', value == itemIndex ? 'radioHandlerSelected' : '']"></i>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-radio',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {
    selectThis (radio, radioIndex) {
      if (this.value != radioIndex) this.$emit('change')
      this.$emit('input', radioIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.formRadioWrap {
  position: relative;
  display: -webkit-flex; /* Safari */
  display: flex;
  align-items: center;
  .radioItem {
    position: relative;
    display: inline-block;
    color: #000000;
    font-size: 0.8rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items: center;
    .radioHandler {
      position: relative;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid #6b6b6b;
      box-sizing: border-box;
      border-radius: 100%;
      margin-right: 0.5rem;
    }
    .radioHandlerSelected {
      border: 0px solid #6b6b6b;
      background-image: url('./../assets/radio_selected.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .radioItem:nth-of-type(n + 2) {
    margin-left: 1.8rem;
  }
}
</style>
