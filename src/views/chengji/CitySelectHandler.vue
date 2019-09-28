<template>
  <div class="citySelect">
    <div class="citySelectInput">
      <span class="selectTitle">选择加入城市</span>
    </div>
    <div class="selectCitysWrap">
      <template v-for="(city, cityIndex) in cityList">
        <span :class="['cityItem', cityIndex % lineCount == 0 ? 'cityItemIsLineFirst' : 'cityItemNotIsLineFirst', curSelectCityId != null && city.id == curSelectCityId ? 'curSelected' : '']" :key="cityIndex" v-if="city.city_name != ''" :style="{ width: `calc((100% - 2rem) / ${lineCount})` }" @click="selectThisCity(city)">{{city.city_name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'citySelectHandler',
  data () {
    return {
      lineCount: 3,
      cityList: [],
      curSelectCityId: null
    }
  },
  created () {
    this.$store.dispatch('clearPageData')
    this.initIntercityCity()
  },
  methods: {
    initIntercityCity () {
      this.$http.post(this, this.$api.getIntercityCityList).then(cityData => {
        this.cityList = cityData.data
      })
    },
    selectThisCity (city) {
      this.curSelectCityId = city.id
      this.$store.commit('setPageData', {
        data: {
          cityCode: city.city,
          cityName: city.city_name,
          id: city.id
        }
      })
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@pageTop: 2.2rem;
@pageBottom: 1.2rem;
@pageSlide: 1.4rem;
@needInfoWrapTop: 1.6rem;
@prepareOkBtnTop: 1.2rem;
.citySelect {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .citySelectInput {
    position: relative;
    margin: @pageTop @pageSlide 0;
    padding-bottom: 10px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #BFBFBF;
    .selectTitle {
      position: relative;
      font-size: 0.9rem;
    }
  }
  .selectCitysWrap {
    position: relative;
    margin: @needInfoWrapTop @pageSlide @pageBottom;
    text-align: left;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .cityItem {
      position: relative;
      display: inline-block;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      background: #F4F4F8;
      color: #43434A;
      border-radius: 20rem;
      margin-bottom: 1.2rem;
    }
    .cityItemNotIsLineFirst {
      margin-left: 1rem;
    }
    .curSelected {
      background: rgb(245, 214, 204);
    }
  }
}
</style>
