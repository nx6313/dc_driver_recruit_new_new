<template>
  <div class="dataCompletionDetail" v-if="type != null">
    <div class="completionDataWrap">
      <template v-if="type == 1">
        <div class="formInputItemWrap">
          <label class="label">身份证号</label>
          <input type="text" placeholder="请输入真实身份证号" v-model="userIdCardNo">
        </div>
      </template>
      <template v-if="type == 2">
        <div class="formImageItemWrap">
          <span class="title">银行卡信息</span>
          <span class="des">需上传建设银行银行卡信息</span>
          <form-radio class="radioSelect" :items="['已有', '办理中', '暂无']" v-model="hasBankCard" @change="bankCardBase64 = null; clearPhotoSelect('bank_card')"></form-radio>
          <div class="imgSelectWrap" v-if="hasBankCard == 0">
            <img :src="require('@/assets/user_info_band_card.png')">
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'bank_card')">
            <span v-if="bankCardBase64 != null" class="imgPreview" :style="bankCardBase64 != null ? { 'background-image': `url(${bankCardBase64})` } : {}"></span>
            <div class="imgReDoWrap" v-if="bankCardBase64 != null">
              <div class="doItem" @click="bankCardBase64 = null; clearPhotoSelect('bank_card')">
                <img :src="require('@/assets/card_photo_delete.png')">
                <span>清空</span>
              </div>
              <div class="doItem">
                <img :src="require('@/assets/card_photo_repat.png')">
                <span>重拍</span>
                <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'bank_card')">
              </div>
            </div>
          </div>
        </div>
        <div class="formInputItemWrap" v-if="hasBankCard == 0">
          <label class="label">建行银行卡号</label>
          <input type="text" placeholder="请输入银行卡号" v-model="bankCardNo">
        </div>
      </template>
      <template v-if="type == 3">
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
      </template>
      <template v-if="type == 4">
        <div class="formImageItemWrap">
          <span class="title">驾驶证主页</span>
          <span class="des">实际驾龄至少3年</span>
          <div class="imgSelectWrap">
            <img :src="require('@/assets/user_info_driver_main.png')">
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'drive_card')">
            <span v-if="driveCardBase64 != null" class="imgPreview" :style="driveCardBase64 != null ? { 'background-image': `url(${driveCardBase64})` } : {}"></span>
            <div class="imgReDoWrap" v-if="driveCardBase64 != null">
              <div class="doItem" @click="driveCardBase64 = null; clearPhotoSelect('drive_card')">
                <img :src="require('@/assets/card_photo_delete.png')">
                <span>清空</span>
              </div>
              <div class="doItem">
                <img :src="require('@/assets/card_photo_repat.png')">
                <span>重拍</span>
                <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'drive_card')">
              </div>
            </div>
          </div>
        </div>
        <div class="formDatePickerItemWrap">
          <label class="label">驾驶证注册时间</label>
          <calendar ref="myCalendar" :show.sync="showDriveRegisterDatePicker" mode="single" :maxDate="new Date()" @change="onDriveRegisterDatePickerChange" @touchmove.native.prevent/>
          <input type="text" disabled="false" placeholder="驾驶证注册时间" v-model="driveRegisterDate">
          <div class="handlerWrap" @click="showDriveRegisterDatePicker = true"></div>
        </div>
      </template>
      <template v-if="type == 5">
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
      </template>
      <template v-if="type == 6">
        <div class="formImageItemWrap">
          <span class="title">身份证国徽面</span>
          <span class="des">男性需在21-60周岁内，女性需在21-55周岁内</span>
          <div class="imgSelectWrap">
            <img :src="require('@/assets/user_info_id_b.png')">
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'id_card_b')">
            <span v-if="idCardBBase64 != null" class="imgPreview" :style="idCardBBase64 != null ? { 'background-image': `url(${idCardBBase64})` } : {}"></span>
            <div class="imgReDoWrap" v-if="idCardBBase64 != null">
              <div class="doItem" @click="idCardBBase64 = null; clearPhotoSelect('id_card_b')">
                <img :src="require('@/assets/card_photo_delete.png')">
                <span>清空</span>
              </div>
              <div class="doItem">
                <img :src="require('@/assets/card_photo_repat.png')">
                <span>重拍</span>
                <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'id_card_b')">
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type == 7">
        <div class="formImageItemWrap">
          <span class="title">身份证头像面</span>
          <span class="des">男性需在21-60周岁内，女性需在21-55周岁内</span>
          <div class="imgSelectWrap">
            <img :src="require('@/assets/user_info_id_a.png')">
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'id_card_a')">
            <span v-if="idCardABase64 != null" class="imgPreview" :style="idCardABase64 != null ? { 'background-image': `url(${idCardABase64})` } : {}"></span>
            <div class="imgReDoWrap" v-if="idCardABase64 != null">
              <div class="doItem" @click="idCardABase64 = null; clearPhotoSelect('id_card_a')">
                <img :src="require('@/assets/card_photo_delete.png')">
                <span>清空</span>
              </div>
              <div class="doItem">
                <img :src="require('@/assets/card_photo_repat.png')">
                <span>重拍</span>
                <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'id_card_a')">
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type == 8">
        <div class="formImageItemWrap">
          <span class="title">网约车从业资格证</span>
          <span class="des">是否拥有网约车司机从业资格证？</span>
          <form-radio class="radioSelect" :items="['已有', '办理中', '暂无']" v-model="hasJobStatus" @change="jobStatusImgBase64 = null; clearPhotoSelect('job_status_img')"></form-radio>
          <div class="imgSelectWrap" v-if="hasJobStatus == 0">
            <img :src="require('@/assets/user_info_job_status.png')">
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'job_status_img')">
            <span v-if="jobStatusImgBase64 != null" class="imgPreview" :style="jobStatusImgBase64 != null ? { 'background-image': `url(${jobStatusImgBase64})` } : {}"></span>
            <div class="imgReDoWrap" v-if="jobStatusImgBase64 != null">
              <div class="doItem" @click="jobStatusImgBase64 = null; clearPhotoSelect('job_status_img')">
                <img :src="require('@/assets/card_photo_delete.png')">
                <span>清空</span>
              </div>
              <div class="doItem">
                <img :src="require('@/assets/card_photo_repat.png')">
                <span>重拍</span>
                <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'job_status_img')">
              </div>
            </div>
          </div>
        </div>
        <div class="seeJobCertificationBtn" @click="showJobStatusPageModal = true" v-if="hasJobStatus == 2">查看《网约车从业资格证》办理流程</div>
        <FullPageModal slideDistance="1.5rem" radius="4px" inAnim="fadeIn" outAnim="fadeOut" modalHeight="25rem" :show.sync="showJobStatusPageModal">
          <div class="modalTitle">《网约车从业资格证》</div>
          <div class="modalTitleSecond">办理流程</div>
          <div class="modalContent">
            <p>1.司机提交姓名、身份证号、电话信息</p>
            <p>2.平台协助司机审核是否具备办理资质</p>
            <p>3.我们会通知您去当地驾驶员培训学校培训与考试（费用由司机承担，770元含照片，培训周期4天）</p>
          </div>
          <div class="modalFooterWrap">
            <form-checkbox v-model="needHelpJobStatus">需要帮我办理（大昌出行将免费协助您办理）</form-checkbox>
          </div>
        </FullPageModal>
      </template>
      <template v-if="type == 9">
        <div class="formImageItemWrap">
          <span class="title">手持身份证照片</span>
          <span class="des">请手持身份证人像面，保证司机面部、身份证头像、身份证号清晰可辨</span>
          <div class="imgSelectWrap">
            <img :src="require('@/assets/user_info_id_get.png')">
            <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'id_card_hand')">
            <span v-if="idCardHandBase64 != null" class="imgPreview" :style="idCardHandBase64 != null ? { 'background-image': `url(${idCardHandBase64})` } : {}"></span>
            <div class="imgReDoWrap" v-if="idCardHandBase64 != null">
              <div class="doItem" @click="idCardHandBase64 = null; clearPhotoSelect('id_card_hand')">
                <img :src="require('@/assets/card_photo_delete.png')">
                <span>清空</span>
              </div>
              <div class="doItem">
                <img :src="require('@/assets/card_photo_repat.png')">
                <span>重拍</span>
                <input type="file" accept="image/*" capture="camera" @change="selectFile($event, 'id_card_hand')">
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type == 10">
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
      </template>
      <template v-if="type == 11">
        <div class="formPickerItemWrap" @click="showCarModelPicker">
          <label class="label">车型</label>
          <input type="text" disabled="false" placeholder="点击选择车型" v-model="carModelShow">
        </div>
      </template>
    </div>
    <div class="saveToSubmitBtn" @click="saveToSubmit">保存</div>
  </div>
</template>

<script>
import FullPageModal from '@/components/FullPageModal'

export default {
  name: 'dataCompletionDetail',
  components: {
    FullPageModal
  },
  data () {
    return {
      type: null,
      id: null,
      carBrands: [],
      carModels: {},
      showDriveRegisterDatePicker: false,
      showJobStatusPageModal: false,
      userIdCardNo: '',
      hasBankCard: 0,
      bankCardBase64: null,
      bankCardNo: '',
      runCardBase64: null,
      driveCardBase64: null,
      driveRegisterDate: '',
      personCarBase64: null,
      idCardBBase64: null,
      idCardABase64: null,
      hasJobStatus: 0,
      jobStatusImgBase64: null,
      needHelpJobStatus: false,
      idCardHandBase64: null,
      runCertificate: 0,
      runCertificateBase64: null,
      carModelShow: '',
      carBrand: '',
      carModel: ''
    }
  },
  created () {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    if (String(this.type).trim() == '11') {
      this.initCarModelData()
    }
  },
  methods: {
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
        case 'id_card_a':
          this.idCardABase64 = imgData
          break;
        case 'id_card_b':
          this.idCardBBase64 = imgData
          break;
        case 'id_card_hand':
          this.idCardHandBase64 = imgData
          break;
        case 'drive_card':
          this.driveCardBase64 = imgData
          break;
        case 'bank_card':
          this.bankCardBase64 = imgData
          break;
        case 'run_card':
          this.runCardBase64 = imgData
          break;
        case 'person_and_car':
          this.personCarBase64 = imgData
          break;
        case 'job_status_img':
          this.jobStatusImgBase64 = imgData
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
    onDriveRegisterDatePickerChange (e) {
      this.showDriveRegisterDatePicker = false
      this.driveRegisterDate = e.format('YYYY-MM-DD')
    },
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
    saveToSubmit () {
      if (this.type) {
        let params = {
          id: this.id,
          type: this.type,
          phone: this.$store.state.userBaseInfo.phone
        }
        if (this.type == '1') {
          params['content'] = this.userIdCardNo.trim()
        } else if (this.type == '2') {
          params['content'] = this.$store.state.formData.data['bank_card']
          params['content2'] = this.bankCardNo.trim()
        } else if (this.type == '3') {
          params['content'] = this.$store.state.formData.data['run_card']
        } else if (this.type == '4') {
          params['content'] = this.$store.state.formData.data['drive_card']
          params['content2'] = this.driveRegisterDate.trim()
        } else if (this.type == '5') {
          params['content'] = this.$store.state.formData.data['person_and_car']
        } else if (this.type == '6') {
          params['content'] = this.$store.state.formData.data['id_card_b']
        } else if (this.type == '7') {
          params['content'] = this.$store.state.formData.data['id_card_a']
        } else if (this.type == '8') {
          params['content'] = this.$store.state.formData.data['job_status_img']
          params['content2'] = this.needHelpJobStatus
        } else if (this.type == '9') {
          params['content'] = this.$store.state.formData.data['id_card_hand']
        } else if (this.type == '10') {
          params['content'] = this.$store.state.formData.data['run_certificate_img']
          params['content2'] = this.runCertificate
        } else if (this.type == '11') {
          params['content'] = this.carBrand
          params['content2'] = this.carModel
        }
        this.verifyData(() => {
          this.$http.postForm(this, this.$api.updateDriverImgUrl, params).then(result => {
            this.submitOk()
          })
        })
      }
    },
    verifyData (callBack) {
      if (this.type == '1') {
        if (this.userIdCardNo.trim() == '') { this.$comfun.showToast(this, '身份证号不能为空'); return false }
        if (SOME_RULES.emoji.test(this.userIdCardNo.trim())) { this.$comfun.showToast(this, '身份证号中不能含有特殊字符'); return false }
        if (callBack) callBack()
      } else if (this.type == '2') {
        if (this.bankCardBase64 == null) { this.$comfun.showToast(this, '银行卡照片不能为空'); return false }
        if (this.bankCardNo.trim() == '') { this.$comfun.showToast(this, '银行卡卡号不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '3') {
        if (this.runCardBase64 == null) { this.$comfun.showToast(this, '行驶证照片不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '4') {
        if (this.driveCardBase64 == null) { this.$comfun.showToast(this, '驾驶证主页照片不能为空'); return false }
        if (this.driveRegisterDate == '') { this.$comfun.showToast(this, '驾驶证注册日期不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '5') {
        if (this.personCarBase64 == null) { this.$comfun.showToast(this, '人车合照不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '6') {
        if (this.idCardBBase64 == null) { this.$comfun.showToast(this, '身份证国徽面照片不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '7') {
        if (this.idCardABase64 == null) { this.$comfun.showToast(this, '身份证头像面照片不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '8') {
        if (this.jobStatusImgBase64 == null) { this.$comfun.showToast(this, '网约车从业资格证不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '9') {
        if (this.idCardHandBase64 == null) { this.$comfun.showToast(this, '手持身份证照片不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '10') {
        if (this.runCertificateBase64 == null) { this.$comfun.showToast(this, '运输证照片不能为空'); return false }
        if (callBack) callBack()
      } else if (this.type == '11') {
        if (this.carModelShow == '') { this.$comfun.showToast(this, '请您选择车型'); return false }
        if (callBack) callBack()
      }
    },
    submitOk () {
      this.$comfun.showToast(this, '信息保存完成')
      this.$store.commit('setPageData', {
        data: {
          dataSubmitOk: true,
          type: this.type,
          id: this.id
        }
      })
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@pageTop: 2.2rem;
@pageBottom: 0.8rem;
@pageSlide: 1.8rem;
@completionDataWrapTop: 1.8rem;
@saveToSubmitBtnTop: 0.8rem;
@seeJobCertificationBottom: 2.6rem;
@seeJobCertificationTop: 1.2rem;
.dataCompletionDetail {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
  .completionDataWrap {
    position: relative;
    flex: 1;
    margin: @completionDataWrapTop 0 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .seeJobCertificationBtn {
      position: relative;
      margin: @seeJobCertificationTop @pageSlide @seeJobCertificationBottom;
      background: #C9C9C9;
      color: #ffffff;
      font-size: 1rem;
      text-align: center;
      padding: 0.6rem 0;
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(30, 30, 30, .1);
      letter-spacing: 0.1rem;
      text-indent: 0.1rem;
      // font-family: "applyIndex-applyJoinInBtn";
      // -webkit-font-smoothing: antialiased;
      // -webkit-text-stroke-width: 0.2px;
      // -moz-osx-font-smoothing: grayscale;
    }
  }
  .saveToSubmitBtn {
    position: relative;
    margin: @saveToSubmitBtnTop @pageSlide @pageBottom;
    background: #FF5252;
    color: #ffffff;
    font-size: 1rem;
    text-align: center;
    padding: 0.6rem 0;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(30, 30, 30, .1);
    letter-spacing: 0.2rem;
    text-indent: 0.2rem;
  }
}
.modalTitle {
  position: relative;
  text-align: center;
  margin-top: 1.4rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.modalTitleSecond {
  position: relative;
  text-align: center;
  margin-top: 0.2rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.modalContent {
  position: relative;
  margin: 2rem 1.8rem;
  line-height: 1.5rem;
}
.modalFooterWrap {
  position: relative;
  margin: 1rem 1.8rem 0;
}
</style>
