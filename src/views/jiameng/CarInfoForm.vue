<template>
  <div class="carInfoForm">
    <div class="pageTitle">车辆信息</div>
    <div class="formInputItemWrap">
      <label class="label">车牌号</label>
      <span class="carPlateSelect" @click="showCarPlatePicker">{{carPlate}}</span>
      <input type="text" placeholder="请输入车牌号" v-model="carPlateNo">
    </div>
    <div class="formPickerItemWrap" @click="showCarModelPicker">
      <label class="label">车型</label>
      <input type="text" disabled="false" placeholder="点击选择车型" v-model="carModelShow">
    </div>
    <div class="formPickerItemWrap" @click="showCarColorPicker">
      <label class="label">车身颜色</label>
      <input type="text" disabled="false" placeholder="点击选择颜色" v-model="carColor">
    </div>
    <div class="formInputItemWrap">
      <label class="label">车主姓名</label>
      <input type="text" placeholder="请填写车主姓名" v-model="carOwner">
    </div>
    <div class="formDatePickerItemWrap">
      <label class="label">注册信息</label>
      <calendar ref="myCalendar" :show.sync="showCarRegisterDatePicker" mode="single" :maxDate="new Date()" @change="onCarRegisterDatePickerChange" @touchmove.native.prevent/>
      <input type="text" disabled="false" placeholder="行驶证注册时间" v-model="carRegisterDate">
      <div class="handlerWrap" @click="showCarRegisterDatePicker = true"></div>
    </div>
    <div class="formImageItemWrap">
      <span class="title">行驶证上传</span>
      <span class="des">需车龄不超过8年</span>
      <div class="imgSelectWrap">
        <img :src="require('@/assets/car_info_run.png')">
        <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'run_card')" v-if="runCardBase64 == null">
        <span v-if="runCardBase64 != null" class="imgPreview" :style="runCardBase64 != null ? { 'background-image': `url(${runCardBase64})` } : {}"></span>
        <div class="imgReDoWrap" v-if="runCardBase64 != null">
          <div class="doItem" @click="runCardBase64 = null; clearPhotoSelect('run_card')">
            <img :src="require('@/assets/card_photo_delete.png')">
            <span>清空</span>
          </div>
          <div class="doItem">
            <img :src="require('@/assets/card_photo_repat.png')">
            <span>重拍</span>
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'run_card')">
          </div>
        </div>
      </div>
    </div>
    <div class="formImageItemWrap">
      <div class="title">
        <span>人车合影上传</span>
        <span>查看示范照</span>
      </div>
      <span class="des">请司机本人打开左侧车门，站在左侧车门前、右手手扶发动机盖拍照，确保需司机头像、车牌号清晰可辨认</span>
      <div class="imgSelectWrap">
        <img :src="require('@/assets/car_info_people_car_together.png')">
        <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'person_and_car')" v-if="personCarBase64 == null">
        <span v-if="personCarBase64 != null" class="imgPreview" :style="personCarBase64 != null ? { 'background-image': `url(${personCarBase64})` } : {}"></span>
        <div class="imgReDoWrap" v-if="personCarBase64 != null">
          <div class="doItem" @click="personCarBase64 = null; clearPhotoSelect('person_and_car')">
            <img :src="require('@/assets/card_photo_delete.png')">
            <span>清空</span>
          </div>
          <div class="doItem">
            <img :src="require('@/assets/card_photo_repat.png')">
            <span>重拍</span>
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'person_and_car')">
          </div>
        </div>
      </div>
    </div>
    <div class="formImageItemWrap">
      <span class="title">运输证上传</span>
      <form-radio class="radioSelect" :items="['已有', '暂无']" v-model="runCertificate" @change="runCertificateBase64 = null; clearPhotoSelect('run_certificate_img')"></form-radio>
      <div class="imgSelectWrap" v-if="runCertificate == 0">
        <img :src="require('@/assets/car_info_run_card.png')">
        <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'run_certificate_img')" v-if="runCertificateBase64 == null">
        <span v-if="runCertificateBase64 != null" class="imgPreview" :style="runCertificateBase64 != null ? { 'background-image': `url(${runCertificateBase64})` } : {}"></span>
        <div class="imgReDoWrap" v-if="runCertificateBase64 != null">
          <div class="doItem" @click="runCertificateBase64 = null; clearPhotoSelect('run_certificate_img')">
            <img :src="require('@/assets/card_photo_delete.png')">
            <span>清空</span>
          </div>
          <div class="doItem">
            <img :src="require('@/assets/card_photo_repat.png')">
            <span>重拍</span>
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'run_certificate_img')">
          </div>
        </div>
      </div>
    </div>
    <div class="submitToCheckBtn" @click="submitToCheck">提交审核</div>
  </div>
</template>

<script>
import { SOME_RULES } from '@/utils/rules'

export default {
  name: 'carInfoForm',
  data () {
    return {
      carBrands: [],
      carModels: {},
      showCarRegisterDatePicker: false,
      carPlate: '晋A',
      carPlateNo: '',
      carModelShow: '',
      carBrand: '',
      carModel: '',
      carColor: '',
      carOwner: '',
      carRegisterDate: '',
      runCardBase64: null,
      personCarBase64: null,
      runCertificate: 0,
      runCertificateBase64: null
    }
  },
  created () {
    this.initCarModelData()
  },
  methods: {
    initCarModelData (callBack) {
      this.$http.post(this, this.$api.getCarBrands).then(brands => {
        let bModel = {}
        for (let brandKey in brands.data) {
          this.carBrands.push({
            text: brandKey.split('-')[1],
            value: String(brandKey.split('-')[0])
          })
          let itemModel = []
          for (let m in brands.data[brandKey]) {
            itemModel.push({
              text: brands.data[brandKey][m].name,
              value: String(brands.data[brandKey][m].id)
            })
          }
          bModel[brandKey.split('-')[0]] = itemModel
        }
        this.carModels = bModel
      })
    },
    selectFile: function(event, type) {
      this.uploadCardFile(event.target.files[0], type)
    },
    uploadCardFile: function(file, type) {
      if (!file || !window.FileReader) return false
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = (event) => {
        this.$http.file(this, this.$api.file, file).then((request) => {
          this.setImgPreview(type, event.target.result)
          this.$store.commit('addFormData', {
            key: type,
            value: request.data.path
          })
        }, error => {
          this.setImgPreview(type, null)
        })
      }
    },
    setImgPreview (type, imgData) {
      switch (type) {
        case 'run_card':
          this.runCardBase64 = imgData
          break;
        case 'person_and_car':
          this.personCarBase64 = imgData
          break;
        case 'run_certificate_img':
          this.runCertificateBase64 = imgData
          break;
        default:
          break;
      }
    },
    clearPhotoSelect (type) {
      this.$store.commit('addFormData', {
        key: type,
        value: null
      })
    },
    showCarPlatePicker () {
      this.$comfun.showPicker('选择车牌号前缀', this.$appData.carPlatePre(), (result) => {
        this.carPlate = result[0].value
      }, null, [this.carPlate])
    },
    showCarModelPicker () {
      this.carModelDataVerify(() => {
        let thisModel = this.carBrand === '' ? this.carModels[String(this.carBrands[0].value)] : this.carModels[String(this.carBrand)]
        let madelPicker = this.$comfun.showPicker('选择车型', [this.carBrands, thisModel], (result) => {
          this.carModelShow = result[0].text + ' ' + result[1].text
          this.carBrand = result[0].value
          this.carModel = result[1].value
        }, (changeIndex, changeValue) => {
          if (changeIndex == 0) {
            let thisModel = this.carModels[String(changeValue.value)]
            madelPicker.setData(thisModel, 1)
          }
        }, [this.carBrand, this.carModel])
      })
    },
    carModelDataVerify (callBack) {
      if (this.carBrands.length > 0) {
        callBack()
      } else {
        this.initCarModelData(() => {
          callBack()
        })
      }
    },
    showCarColorPicker () {
      this.$comfun.showPicker('选择车身颜色', this.$appData.carColor(), (result) => {
        this.carColor = result[0].value
      }, null, [this.carColor])
    },
    onCarRegisterDatePickerChange (e) {
      this.showCarRegisterDatePicker = false
      this.carRegisterDate = e.format('YYYY-MM-DD')
    },
    submitToCheck () {
      if (this.carPlateNo.trim().length > 6) {
        this.$comfun.showToast(this, '请输入正确的车牌号')
        return false
      }
      this.verifyData(() => {
        this.$store.commit('addFormData', {
          key: 'carPlate',
          value: this.carPlate.trim()
        })
        this.$store.commit('addFormData', {
          key: 'carPlateNo',
          value: this.carPlateNo.trim().toUpperCase()
        })
        this.$store.commit('addFormData', {
          key: 'carBrand',
          value: this.carBrand
        })
        this.$store.commit('addFormData', {
          key: 'carModel',
          value: this.carModel
        })
        this.$store.commit('addFormData', {
          key: 'carColor',
          value: this.carColor.trim()
        })
        this.$store.commit('addFormData', {
          key: 'carOwner',
          value: this.carOwner.trim()
        })
        this.$store.commit('addFormData', {
          key: 'carRegisterDate',
          value: this.carRegisterDate.trim()
        })
        this.$store.commit('addFormData', {
          key: 'runCertificate',
          value: this.runCertificate
        })
      })
      this.$http.postForm(this, this.$api.saveCarInfo, {
        car_personal_pic: this.$store.state.formData.data['person_and_car'],
        'car.car_running_time': this.$store.state.formData.data['carRegisterDate'],
        'car.phone': this.$store.state.userBaseInfo.phone,
        'car.plate_no': this.$store.state.formData.data['carPlate'] + this.$store.state.formData.data['carPlateNo'],
        'car.brand': this.$store.state.formData.data['carBrand'],
        'car.model_type': this.$store.state.formData.data['carModel'],
        'car.color': this.$store.state.formData.data['carColor'],
        'car.OwnerName': this.$store.state.formData.data['carOwner'],
        'car.vehicle_license_positive': this.$store.state.formData.data['run_card'],
        'car.transportation_certificate': this.$store.state.formData.data['runCertificate'] == 0 ? this.$store.state.formData.data['run_certificate_img'] : '',
        'city_code': this.$store.state.formData.data['userJobCity'].cityCode
      }).then(carInfoResult => {
        this.$comfun.showToast(this, '信息提交完成，请等待审核')
        this.$store.commit('setPageData', {
          data: {
            dataSubmitOk: true
          }
        })
        this.$router.replace({
          path: '/auditStatus',
          query: {
            selectCarKey: 1,
            status: 0
          }
        })
      })
    },
    verifyData (callBack) {
      if (this.carPlateNo == '') { this.$comfun.showToast(this, '车牌号不能为空'); return false }
      if (SOME_RULES.emoji.test(this.carPlateNo.trim())) { this.$comfun.showToast(this, '车牌号中不能含有特殊字符'); return false }
      if (this.carModel == '') { this.$comfun.showToast(this, '车型不能为空'); return false }
      if (this.carColor == '') { this.$comfun.showToast(this, '车身颜色不能为空'); return false }
      if (this.carOwner == '') { this.$comfun.showToast(this, '车主姓名不能为空'); return false }
      if (this.carOwner.trim().length > 5) { this.$comfun.showToast(this, '车主姓名内容过长，不得超过5个字符'); return false }
      if (SOME_RULES.emoji.test(this.carOwner.trim())) { this.$comfun.showToast(this, '车主姓名中不能含有特殊字符'); return false }
      if (this.carRegisterDate == '') { this.$comfun.showToast(this, '车辆注册信息不能为空'); return false }
      if (this.runCardBase64 == null) { this.$comfun.showToast(this, '行驶证照片不能为空'); return false }
      if (this.personCarBase64 == null) { this.$comfun.showToast(this, '人车合影照片不能为空'); return false }
      if (this.runCertificate == 0 && this.runCertificateBase64 == null) { this.$comfun.showToast(this, '运输证照片不能为空'); return false }
      if (callBack) callBack()
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
@submitToCheckBtnTop: 1.2rem;
.carInfoForm {
  position: relative;
  text-align: left;
  .pageTitle {
    position: relative;
    margin: @pageTop @pageSlide 1.2rem;
    font-size: 2rem;
    color: #FF5252;
  }
  .submitToCheckBtn {
    position: relative;
    margin: @submitToCheckBtnTop @pageSlide @pageBottom;
    background: #FF5252;
    color: #ffffff;
    font-size: 1rem;
    text-align: center;
    padding: 0.6rem 0;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(30, 30, 30, .1);
    letter-spacing: 0.2rem;
    text-indent: 0.2rem;
    // font-family: "applyIndex-applyJoinInBtn";
    // -webkit-font-smoothing: antialiased;
    // -webkit-text-stroke-width: 0.2px;
    // -moz-osx-font-smoothing: grayscale;
  }
}
</style>
