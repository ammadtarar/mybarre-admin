<template lang="html">
  <div class="order" v-if="membership">

    <div class="top">
      <img src="../assets/ic_left_black.png" class="goBack" @click="goBack">
      <label class="pageDesc" style="font-family : 'Bold' ; font-size : 24px">Training Detail</label>
    </div>



		<div class="hori_cont" style="margin-top : 20px">
			<expandBtn title="Student Information" @onToggle="expandUserInfo = $event"/>

			<div class="actions_cont">

        

        <div class="btAction btActionCentered green" @click="$emit('showUserDetail' , membership.user.id)">
          USER DETAILS
				</div>


				<div class="btAction btActionCentered orange" @click="displayExtendModal">
          EXTEND VIDEO SUBMISSION DATE
				</div>

				<div class="btAction btActionCentered orange" @click="displayMoveToCourseModal">
          MOVE TO ANOTHER COURSE
				</div>

				<div class="btAction btActionCentered orange" @click="showUpdateStatusModal = true">
          UPDATE STATUS
				</div>

				<div class="btAction btActionCentered green" @click="showUploadLicenseModal = true">
          UPLOAD CERTIFICATE
				</div>

				<div class="btAction btActionCentered purple" v-if="membership.certificate_url" @click="showCertificate()">
          VIEW CERTIFICATE
				</div>

			</div>



		</div>

    <div v-if="expandUserInfo && membership && membership.user" class="cont">

      <div  >
        <div class="tripleKeyValCont">
          <label class="key">Headshot</label>
          <img  :src="membership.user.avatar_url"  class="dp" >
        </div>
      </div>


      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">First name</label>
          <label class="val">{{membership.user.first_name || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Family name</label>
          <label class="val">{{membership.user.last_name || '--'}}</label>
        </div>
      </div>

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Nickname</label>
          <label class="val">{{membership.user.nickname || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Name on Certificate</label>
          <label class="val">{{membership.user.certificate_name || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Email</label>
          <label class="val">{{membership.user.email || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Phone</label>
          <label class="val">{{membership.user.phone || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Gender</label>
          <label class="val">{{membership.user.gender ? membership.user.gender.toUpperCase() : 'N/A' || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Date of Birth</label>
          <label class="val">{{membership.user.dob || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">City</label>
          <label class="val">{{membership.user.city || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Address</label>
          <label class="val">{{membership.user.address || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Nationality</label>
          <label class="val">{{membership.user.nationality || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Wechat ID/Username</label>
          <label class="val">{{membership.user.wechat_id || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Ocuupation</label>
          <label class="val">{{membership.user.occupation || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">User ID</label>
          <label class="val">{{membership.user.id || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Training Top Size</label>
          <label class="val">{{membership.user.top_size || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Training Socks Size</label>
          <label class="val">{{membership.user.sock_size || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Preffered Manual Language</label>
          <label class="val">{{membership.user.manual_lang.toUpperCase() || 'N/A'}}</label>
        </div>
      </div>

    </div>





    


<expandBtn title="Membership Information" @onToggle="expandMembershipInfo = $event" style="margin-top : 20px"/>
    <div v-if="expandMembershipInfo && membership" class="cont">

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Start</label>
          <label class="val">{{membership.start || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">End</label>
          <label class="val">{{membership.end || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Videos Submission Date</label>
          <label class="val">{{membership.video_submission_date || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Status / Stage</label>
          <label class="val" style="text-transform: capitalize;">{{membership ? membership.status.replace('-' , ' ') : ''|| 'N/A'}}</label>
        </div>
      </div>



      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Amount Paid</label>
          <label class="val">¥{{membership.price}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Wechat Payment Out-Trade-No</label>
          <label class="val">{{membership.out_trade_no || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Was Coupon Redeemed</label>
          <label class="val">{{membership.coupon ? 'Yes' : 'No'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Coupon Name / Coupon Value</label>
          <label class="val">{{membership.coupon ? getCouponInfo(membership.coupon) : 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Enrolled Course ID</label>
          <label class="val">{{membership.course.id || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Enrolled Course Name</label>
          <label class="val">{{membership.course.name || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Enrolled Course Start Date</label>
          <label class="val">{{membership.course.start || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Enrolled Course End Date</label>
          <label class="val">{{membership.course.end || 'N/A'}}</label>
        </div>
      </div>


    </div>

    <expandBtn v-if="expandMembershipInfo" title="Training Videos" @onToggle="expandTrainingVideos = $event" style="margin-top : 20px"/>



    <div v-if="expandTrainingVideos" class="cont">
      <div class="empty" v-if="membership.training_videos.length <= 0">
        No Training Videos Found
      </div>

      <div class="grid" v-if="membership.training_videos.length > 0">
  			<div class="item" v-for="item in membership.training_videos">
  				<VideoCard :model="item" @showPreview="displayVideoPreview"></VideoCard>
  			</div>
  		</div>


    </div>




    <modal v-if="showExtendModal"  @close="showExtendModal = false" size="size">
        <h3 slot="header" style="text-align : left;">Extend Training Videos Submission Date</h3>
        <div slot="body" class="modalBody">
          <label style="color : #37474f">Please select a new training videos submission date below</label>


          <label class="inputTitle spacing30">Original Submission Date</label>
          <label style="color : #37474f">{{membership.video_submission_date}}</label>

          <label class="inputTitle spacing30">New Submission Date</label>
          <input type="date" id="datePicker" v-model="new_submission_date" class="textInput" />
        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" >
            <button type="button" class="bt neg" @click="new_submission_date = ''; showExtendModal = false">Clear</button>
            <button type="button" class="bt pos" @click="extendSubmissionDate">Extend</button>
          </div>
        </div>
    </modal>

    <modal v-if="showMoveToCourseModal"  @close="showMoveToCourseModal = false" size="big">
        <h3 slot="header" style="text-align : left;">Move To Another Course</h3>
        <div slot="body" class="modalBody">
          <label style="color : #37474f">Please select a course below to move the user to. </br><span style="font-weight : 800; font-family: 'Black'">Note :</span> Once moved to another course , all current membership data will be lost</label>

          <label class="inputTitle spacing30">Courses</label>

          <label v-if="loadingCourse" class="empty" style="color : #37474f">Loading courses ...</label>

          <label v-if="!loadingCourse && courses.length <= 0" class="empty" style="color : #37474f">No courses available</label>


          <div v-if="!loadingCourse && courses.length > 0" class="grid" >
            <div class="item whiteCard" v-for="item in courses" @click="onClickCourse(item.id)">
              <div class="checkCont">
                <img v-if="!item.selected" class="tick" src="../assets/ic_check_gray.png" ></img>
                <img v-if="item.selected" class="tick" src="../assets/ic_check_purple_circle.png" ></img>

              </div>

              <label class="inputTitle">Name</label>
              <label style="color : #37474f ; text-align:left">{{item.name}}</label>

              <label class="inputTitle spacing30">Training Start Date</label>
              <label style="color : #37474f; text-align:left">{{item.start}}</label>

              <label class="inputTitle spacing30">Training End Date</label>
              <label style="color : #37474f; text-align:left">{{item.end}}</label>

            </div>
          </div>

        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" >
            <button type="button" class="bt neg" @click="loadingCourse = false; showMoveToCourseModal = false">Abort</button>
            <button type="button" class="bt pos" @click="moveToCourse">Move</button>
          </div>
        </div>
    </modal>

    <modal v-if="showUpdateStatusModal"  @close="showUpdateStatusModal = false" size="size">
        <h3 slot="header" style="text-align : left;">Update Training Exam Status</h3>
        <div slot="body" class="modalBody">
          <label style="color : #37474f">You can update exam training status i.e., Pass or Fail</label>


          <label class="inputTitle spacing30">Current Status</label>
          <label style="color : #37474f; text-transform: capitalize;">{{membership.status.replace('-' , ' ')}}</label>

          <label class="inputTitle spacing30">New Status</label>
          <select v-model="newStatus" >
            <option disabled value="null">Select one status</option>
              <option
              v-for="item in statuses"
                v-bind:value="item"
                v-bind:key="item">
                <span style="text-transform: capitalize;">{{item.replace("-" , " ").replace("-" , " ").toUpperCase()}}</span>

              </option>
          </select>
        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" >
            <button type="button" class="bt neg" @click="showUpdateStatusModal = false">Clear</button>
            <button type="button" class="bt pos" @click="updateMembershipStatus">Update</button>
          </div>
        </div>
    </modal>



    <modal v-if="showUploadLicenseModal"  @close="showUploadLicenseModal = false" size="size">
        <h3 slot="header" style="text-align : left;">Upload License Certificate</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">You can upload training license certificate here</label>

          <label class="inputTitle spacing30">Current License</label>
          <label style="color : #37474f;" v-if="!membership.certificate_url">No license certificate was found</label>
          <img  :src="membership.certificate_url" class="imgPreview" v-if="membership.certificate_url">


          <label class="inputTitle spacing30">New License</label>
          <img  v-if="!url" src="../assets/image_placeholder.jpg" class="imgPreviewSmall">
          <img v-if="url" :src="url" class="imgPreview">

        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">
            <div style="width : 100% ; height : 100% ; display : flex">
              <label class="prodImgPicker">
                Select Files
                <input type="file" @change="onFileChange" />
              </label>
            </div>
            <button type="button" class="bt neg" @click="showUploadLicenseModal = false ">Abort</button>
            <button type="button" class="bt pos" @click="uploadNewLicense">Upload</button>
          </div>
        </div>
    </modal>



  </div>
</template>

<script>

import Modal from "../components/modal.vue";
import ExpandBtn from "../components/expadBtn.vue";
import VideoCard from "../components/videoCard.vue";

import {
    HTTP, URLS
}
from '../network/http';
var NotificationsController = require("../components/NotificationsController.js");
var OSS = require('ali-oss');

  export default {
		name : 'user',
		components: {
      Modal,
      ExpandBtn,
      VideoCard
	 },
		props: ['membershipId'],
	 data() {
		 return {
       user : null,
			 expandUserInfo:true,
       expandMembershipInfo: true,
       expandTrainingVideos: true,
       membership : {
				 certificate_url : null
			 },
       showExtendModal : false,
       new_submission_date: '',
       today : '',
       showMoveToCourseModal : false,
       courses : [],
       loadingCourse: false,
       selectedCourseId : -1,
       showUpdateStatusModal: false,
       statuses: [
        'temporary-freeze',
				'pre-instructor', // MEANS USER PAIDED AND SIGNED UP
				'pre-instructor-tbc', //USER DID NOT ATTEND TRAINING CLASSES
				'instructor-in-training', // USER ATTENDED THE TRAINING CLASSES
				'training-videos-submitted', // USER SUBMITTED TRAINING VIDEOS AFTER TRAINING CLASSES
				'exam-passed', // SUBMITTED TRAINING VIDEOS PASSED
				'exam-failed', // SUBMITTED TRAINING VIDEOS FAILED
        'license-fee-paid',
				'licensed-instructor' // USER PASSED THE EXAM AND PAID THE LICENSE FEE
			],
      newStatus : '',
      showUploadLicenseModal: false,
      url: null,
      imgFile :null,
		 };
	 },
		methods:{
      getCouponInfo(coupon){
        if (!coupon) {
          return 'N/A';
        }

        const type = coupon.type;
        const value = coupon.value;
        var str = "";
        if (type === 'percentage') {
          str =  value + "% Discount";
        }else{
          str =  '¥' + value + " Discount";
        }

        return coupon.name + " / " + str
      },
      showCertificate(){
        this.$root.$emit('showImage' , {
          url : this.membership.certificate_url
        });
      },
      async uploadNewLicense(){
        const ctx = this;
        NotificationsController.showActivityIndicator();


        let client = new OSS({
          region: 'oss-accelerate',
          accessKeyId: 'LTAI4GFTLJTB2U4J9mXzWP9n',
          accessKeySecret: 'yq6W4oN6pG5mxq07M23kwjeBAaoaRj',
          bucket: 'mybarre'
        });

				


				let r1 = await client.put('certificate_membership_' + String(ctx.membershipId) + "_stamp_" + String(new Date().getMilliseconds()),this.imgFile); 
				var url = r1.url;

        HTTP.post(URLS.MEMBERSHIP.UPDATE_CERTIFICATE_URL.replace(':id' , ctx.membershipId) , {certificate_url : url} , {
  					headers: {
  						Authorization: localStorage.getItem("token")
  					}
  				})
  						.then(function(res) {
  							ctx.showUploadLicenseModal = false;
                ctx.imgFile = null;
                ctx.url = "";
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'License ceriticate url updated successfully')
  							ctx.getMembership();
  						})
  						.catch(function(error) {
  							NotificationsController.hideActivityIndicator();
  							NotificationsController.showErrorNotification(error);
  						});


      },
      onFileChange(e) {
				const file = e.target.files[0];
      	this.url = URL.createObjectURL(file);
				this.imgFile = file;
			 },
      updateMembershipStatus(){
        if (this.newStatus === this.membership.status) {
          NotificationsController.showNotification('warning' , 'Please select a new status');
          return;
        }
        const ctx = this;
        var mUrl = URLS.MEMBERSHIP.UPDATE_STATUS.replace(':id' , this.membership.id);
        mUrl = mUrl.replace(':status' , this.newStatus);
        HTTP.post(mUrl, {} , {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.getMembership()
          ctx.showUpdateStatusModal = false;
          NotificationsController.showNotification('success' , 'Membership status updated');
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          ctx.showUpdateStatusModal = false;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });

      },
      moveToCourse(){
        const ctx = this;
        var mUrl = URLS.MEMBERSHIP.CHANGE.replace(':userId' , this.membership.user.id);
        mUrl = mUrl.replace(':courseId' , ctx.selectedCourseId);
        HTTP.post(mUrl, {},  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          const newMembership = res.data.data;
          ctx.membershipId = newMembership.id;
          ctx.mmebership = newMembership;
          ctx.getMembership()
          ctx.showMoveToCourseModal = false;
          NotificationsController.showNotification('success' , 'User moved to the new course successfully');
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          ctx.showMoveToCourseModal = false;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      },
      onClickCourse(item){
        this.selectedCourseId = item;
        var courses = []
        this.courses.forEach(function(course){
          if (course.id === item) {
            course.selected = true
          }else{
            course.selected = false
          }
          courses.push(course);
        });
        this.courses = courses;
      },
      displayMoveToCourseModal(){
        this.loadingCourse = true;
        this.showMoveToCourseModal = true;
        this.getAllCourses();
      },
      displayExtendModal(){
        this.showExtendModal = true;
        let today = new Date(),
          day = today.getDate(),
          month = today.getMonth()+1, //January is 0
          year = today.getFullYear();
          if(day<10){
            day='0'+day
          }
          if(month<10){
            month='0'+month
          }
          today = year+'-'+month+'-'+day;
        this.$nextTick(function () {
          this.new_submission_date = today;
          document.getElementById('datePicker').min = today
        });
      },
      extendSubmissionDate(){
        const ctx = this;
        var mUrl = URLS.MEMBERSHIP.EXTEND_VIDEO_SUBMISSION_DATE.replace(':id' , this.membership.id);
        mUrl = mUrl.replace(':date' , ctx.new_submission_date);
        HTTP.patch(mUrl,  {} ,{
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.getMembership()
          ctx.showExtendModal = false;
          NotificationsController.showNotification('success' , 'Training video submission date updated successfully');
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      },
      getSubTotal(item){
        return item.count * item.product.price;
      },
      getTotalAmount(order){
        var amount = 0;
        order.items.forEach(function(item){
          var count = item.count;
          var price = item.product.price;
          amount = amount + (count * price)
        })
        return amount;
      },
      goBack(){
        this.$emit('hideMembershipDetails')
      },
      getMembership: function(){
        const ctx = this;
        HTTP.get(URLS.MEMBERSHIP.DETAIL_BY_ID.replace(':id' , this.membershipId) ,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.membership = res.data.data;
          ctx.newStatus = ctx.membership.status;
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      },
      getAllCourses: function(){
        const ctx = this;
        var url = URLS.COURSE.LIST_ALL;
        url = url + "?limit=" + 9999999;
				url = url + "&page=" + this.page;
        HTTP.get(url ,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.courses = res.data.data.rows;
          var courses = [];
          res.data.data.rows.forEach(function(course){
            if (course.id !== ctx.membership.course.id) {
              course.selected = false;
              courses.push(course)
            }
          });
          ctx.courses = courses;
          ctx.loadingCourse = false
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          ctx.loadingCourse = false
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      }
    },
    mounted() {
      if (this.id === undefined || this.id === null || this.id <= 0) {
        const ctx = this;
        const params = new URLSearchParams(window.location.search);
        const lv4TabRaw = params.get('lv4Tab');
        const lv4Tab = lv4TabRaw.substring(0 , lv4TabRaw.indexOf('?')) || null;
        if (lv4Tab === 'membership') {
          var id = lv4TabRaw.substring(lv4TabRaw.indexOf("=") + 1 , lv4TabRaw.length)
          this.id = id;
        }
      }
      this.getMembership();
    }
  }
</script>

<style lang="css">

.form{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.goBack{
  width : 30px ;
  height : 30px;
  margin-right : 10px ;
  border : 2px solid white ;
  border-radius : 30px;
  transition : all 0.5s;
}

.goBack:hover{
  background: #4E08F0;
}

.cont{
  width: 100%;
}

.half-half{
  width: 100%;
  height: 60px;
  display: inline-block;
  margin-bottom: 20px;
}


.tripleKeyValCont{
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: left;
  margin-top: 20px;
  transition: all 0.25s;
}

.tripleKeyValCont:nth-of-type(1){
  margin-right: 0.3%;
}

.empty{
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 14px;
  color: #e91e63;
}

.tripleKeyValCont:nth-of-type(2){
  margin-right: 0.3%;
}

.keyValCont{
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: left;
  margin-top: 20px;
  transition: all 0.25s;
}

.qAndACont{
  width: 100%;
  height: auto !important;
  min-height: 60px !important;
}

.answer{
  min-height: 40px !important;
  height: auto !important;
}

.keyValCont:nth-child(2){
  float: right;
}

.key{
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-family: 'Thin';
  font-size: 14px;
  color: black;
  text-align: left;
}

.val{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-family: 'Medium';
  font-size: 16px;
  color: black;
  text-align: left;
  border-bottom: 0.5px solid #424242;
}
.order{
	width: calc(100vw - 40px);
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.order .top{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.order .top .pageDesc{
  width: calc(100% - 120px);
	color: black;
	font-size: 18px;
	font-family: 'Thin';
  text-align: left;
}


.order .top .btn{
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #4E08F0;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    font-family: 'Medium';
    margin-left: 10px;
    transition: all 0.25s;
}

.order .top .btn:hover{
  font-family: 'Bold';
}



.order .grid{
	display: inline-block;
	text-align: center;
  float: left;
	/* flex-direction: row; */
}

.order .grid .item{
	width: 200px;
	height: 270px;
	margin-right: 10px;
	float: left;
	margin-top: 10px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.order .grid .whiteCard{
  height: auto !important;
  padding: 8px;
  box-shadow: 0px 0px 4px 0px gray !important;
}

.order .gird .checkCont{
  width: 100%;
  height: 50px;
}

.tick{
  width: 30px;
  height: 30px;
  border-radius: 20px;
  float: right;
  border: 1px solid #999999;
}

.order .grid .item > img{
  width: 100%;
  height: 200px;
  background: pink;
}

.order .grid .item .infoView{
  width: calc(100% - 20px);
  height: 30px;
  display: inline-block;
  margin-left: 10px;
}

.order .grid .item .infoView .key{
  width: auto;
  height: 30px;
  line-height: 30px;
  float: left;
  text-align: left;
  font-size: 12px;
  color: black;
  font-family: 'Medium'
}


.order .grid .item .infoView .value{
  width: auto;
  height: 30px;
  line-height: 30px;
  float: right;
  text-align: right;
  font-size: 16px;
  color: black;
  font-family: 'BOld'
}



.productsList{
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-top: 6px;
}

.productsList .item{
  height: auto;
}

.productsList .item .name{
  height: auto;
  line-height: 20px;
  float: left;
  width: 50%;
  font-size: 14px;
  color: #616161;
  text-align: left;
  font-family: 'Bold';
}

.productsList .item .count{
  height: 20px;
  line-height: 20px;
  float: left;
  width: 10%;
  font-size: 12px;
  color: #616161;
  font-family: 'Bold';
  text-align: right;
}

.productsList .item .price{
  height: 20px;
  line-height: 20px;
  float: left;
  width: 20%;
  font-size: 12px;
  color: #616161;
  font-family: 'Bold';
  text-align: right;
}


.productsList .item  .heading{
  font-size: 12px;
  color: #4E08F0;
  font-family: 'Bold';
  text-align: right;
}
/* .training .grid .rename:hover{
  background: #fec60a;
  color: white;
} */

.hori_cont{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
}

.actions_cont{
  display: flex;
  flex-direction: row;
  margin-left: auto;
}
.action_btn{
  min-width: 100px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  font-size: 14px;
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  transition: all 0.5s;
  line-height: 40px;
  margin-top: 5px;
  margin-left: 10px;
}

.action_btn:hover{
  background: #4E08F0;
  color: white;
  font-weight: 800;
  border-radius: 20px;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
}

.storeContent{
	height: 100% !important
}

</style>
