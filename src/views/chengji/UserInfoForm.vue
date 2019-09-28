<template>
  <div class="userInfoForm">
    <div class="pageTitle">个人信息</div>
    <div class="formInputItemWrap">
      <label class="label">姓名</label>
      <input type="text" placeholder="请输入真实姓名" v-model="userName">
    </div>
    <div class="formInputItemWrap">
      <label class="label">身份证号</label>
      <input type="text" placeholder="请输入真实身份证号" v-model="userIdCardNo">
    </div>
    <div class="formRadioItemWrap">
      <label class="label">性别</label>
      <form-radio class="radioSelect" :items="['男士', '女士']" v-model="userSex"></form-radio>
    </div>
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
    <div class="stepToNextBtn" @click="stepToNext">提交审核</div>
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
  </div>
</template>

<script>
import { SOME_RULES } from '@/utils/rules'
import FullPageModal from '@/components/FullPageModal'

export default {
  name: 'userInfoForm',
  components: {
    FullPageModal
  },
  data () {
    return {
      showJobStatusPageModal: false,
      showDriveRegisterDatePicker: false,
      userName: '',
      userIdCardNo: '',
      userSex: 0,
      idCardABase64: null,
      idCardBBase64: null,
      driveCardBase64: null,
      driveRegisterDate: '',
      hasJobStatus: 0,
      jobStatusImgBase64: null,
      needHelpJobStatus: false
    }
  },
  created () {
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
        case 'drive_card':
          this.driveCardBase64 = imgData
          break;
        case 'job_status_img':
          this.jobStatusImgBase64 = imgData
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
    stepToNext () {
      this.verifyData(() => {
        this.$store.commit('addFormData', {
          key: 'userName',
          value: this.userName.trim()
        })
        this.$store.commit('addFormData', {
          key: 'userIdCardNo',
          value: this.userIdCardNo.trim()
        })
        this.$store.commit('addFormData', {
          key: 'userSex',
          value: this.userSex
        })
        this.$store.commit('addFormData', {
          key: 'driveRegisterDate',
          value: this.driveRegisterDate
        })
        this.$store.commit('addFormData', {
          key: 'hasJobStatus',
          value: this.hasJobStatus
        })
        this.$store.commit('addFormData', {
          key: 'needHelpJobStatus',
          value: this.needHelpJobStatus
        })
        this.$http.postForm(this, this.$api.saveIntercityInfo, {
          'driver.d_type': 5,
          'driver.phone': this.$store.state.userBaseInfo.phone,
          'driver.real_name': this.$store.state.formData.data['userName'],
          'driver.gender': this.$store.state.formData.data['userSex'] == 0 ? '男' : '女',
          'driver.certificate_no': this.$store.state.formData.data['userIdCardNo'],
          'credentials.idcard_positive': this.$store.state.formData.data['id_card_b'],
          'credentials.idcard_reverse': this.$store.state.formData.data['id_card_a'],
          'credentials.driverlicense_positive': this.$store.state.formData.data['drive_card'],
          // 'credentials.driverlicense_reverse': this.$store.state.driverRecruitData.cardInfo.driveCardB,
          // 'member_apply_driver.driver_license_time': this.$store.state.formData.data['driveRegisterDate'],
          // 'member_apply_driver.address_detail': this.$store.state.formData.data['userJobCity'].cityName,
          'credentials.cert_type': this.$store.state.formData.data['hasJobStatus'] == 0 ? 1 : this.$store.state.formData.data['hasJobStatus'] == 1 ? 2 : 0,
          'credentials.qualification_certificate': this.$store.state.formData.data['hasJobStatus'] == 0 ? this.$store.state.formData.data['job_status_img'] : '',
          'driver.join_business_id': this.$store.state.formData.data['userJobCity'].cityId,
          'credentials.status': this.$store.state.formData.data['needHelpJobStatus'] ? 1 : 0
          // 'credentials.id': this.$store.state.driverRecruitData.baseInfoComplete.driverCredentials_id || ''
        }).then(userInfoResult => {
          this.$comfun.showToast(this, '信息提交完成，请等待审核')
          this.$store.commit('setPageData', {
            data: {
              dataSubmitOk: true
            }
          })
          this.$router.back()
        })
      })
    },
    verifyData (callBack) {
      if (this.userName == '') { this.$comfun.showToast(this, '姓名不能为空'); return false }
      if (this.userName.trim().length > 5) { this.$comfun.showToast(this, '姓名内容过长，不得超过5个字符'); return false }
      if (SOME_RULES.emoji.test(this.userName.trim())) { this.$comfun.showToast(this, '姓名中不能含有特殊字符'); return false }
      if (this.userIdCardNo == '') { this.$comfun.showToast(this, '身份证号不能为空'); return false }
      if (!SOME_RULES.idCard.test(this.userIdCardNo.trim())) { this.$comfun.showToast(this, '请输入正确的身份证号'); return false }
      if (this.idCardABase64 == null) { this.$comfun.showToast(this, '身份证头像面不能为空'); return false }
      if (this.idCardBBase64 == null) { this.$comfun.showToast(this, '身份证国徽面不能为空'); return false }
      if (this.driveCardBase64 == null) { this.$comfun.showToast(this, '驾驶证主页不能为空'); return false }
      if (this.driveRegisterDate == '') { this.$comfun.showToast(this, '驾驶证注册时间不能为空'); return false }
      if (this.hasJobStatus == 0 && this.jobStatusImgBase64 == null) { this.$comfun.showToast(this, '网约车从业资格证照片不能为空'); return false }
      if (callBack) callBack()
    },
    onDriveRegisterDatePickerChange (e) {
      this.showDriveRegisterDatePicker = false
      this.driveRegisterDate = e.format('YYYY-MM-DD')
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
@seeJobCertificationBottom: 2.6rem;
@stepToNextBtnTop: 1.2rem;
.userInfoForm {
  position: relative;
  text-align: left;
  .pageTitle {
    position: relative;
    margin: @pageTop @pageSlide 1.2rem;
    font-size: 2rem;
    color: #FF5252;
  }
  .seeJobCertificationBtn {
    position: relative;
    margin: @stepToNextBtnTop @pageSlide @seeJobCertificationBottom;
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
  .stepToNextBtn {
    position: relative;
    margin: @stepToNextBtnTop @pageSlide @pageBottom;
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
