<template lang="html">

<div >



  <div class="order" v-if="index === 1">

    <div class="top">
      <img src="../assets/ic_back.png" class="goBack" @click="goBack">
      <label class="pageDesc" style="font-family : 'Bold' ; font-size : 24px">User Detail</label>
    </div>

    <expandBtn title="Basic Information" @onToggle="expandBasicInfo = $event" default="true" style="margin-top : 20px"/>

    <div v-if="expandBasicInfo && user" class="cont">
      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">User ID</label>
          <label class="val">{{user.user.id || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Name</label>
          <label class="val">{{user.user.name || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Email</label>
          <label class="val">{{user.user.email || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Phone</label>
          <label class="val">{{user.user.phone || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Gender</label>
          <label class="val">{{user.user.gender ? user.user.gender.toUpperCase() : 'N/A' || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Date of Birth</label>
          <label class="val">{{user.user.dob || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">City</label>
          <label class="val">{{user.user.city || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Address</label>
          <label class="val">{{user.user.address || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Nationality</label>
          <label class="val">{{user.user.nationality || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Preffered Language</label>
          <label class="val">{{user.user.preffered_language || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Ocuupation</label>
          <label class="val">{{user.user.occupation || 'N/A'}}</label>
        </div>

      </div>

    </div>


    <expandBtn title="Studio Information" @onToggle="expandStudioInfo = $event" style="margin-top : 20px"/>

    <div v-if="expandStudioInfo" class="cont">
      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Studio Name</label>
          <label class="val">{{user.user.studio_name || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Studio Address</label>
          <label class="val">{{user.user.studio_address || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Studio Manager's Name</label>
          <label class="val">{{user.user.studio_manager_name || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Studio Phone</label>
          <label class="val">{{user.user.studio_phone || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Studio Website</label>
          <label class="val">{{user.user.studio_website || 'N/A'}}</label>
        </div>
      </div>
    </div>


    <expandBtn title="Background & Motivation" @onToggle="expandBgInfo = $event" style="margin-top : 20px"/>

    <div v-if="expandBgInfo" class="cont">
      <div class="keyValCont qAndACont">
        <label class="key">How did you find out about the MYbarre Instructor Training Course?</label>
        <label class="val answer">{{user.user.find_out || 'N/A'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">Please elaborate on your motivation for joining the training?</label>
        <label class="val answer">{{user.user.motivation || 'N/A'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">Are you already teaching? so which classes? Full or Part time?</label>
        <label class="val answer">{{user.user.current_status || 'N/A'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">What is your goal after taking the training? (example to teach, to open studio, only for personal learning)</label>
        <label class="val answer">{{user.user.goals || 'N/A'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">How many barre or MYbarre classes have you taken and where?</label>
        <label class="val answer">{{user.user.mybarre_before || 'N/A'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">Do you have any prior MYbarre, ballet or pilates experience?</label>
        <label class="val answer">{{user.user.prior_experience || 'N/A'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">Is there anything else you would like to share with us about yourself or fitness / dance experience?</label>
        <label class="val answer">{{user.user.anything_else || 'N/A'}}</label>
      </div>

		</div>


    <expandBtn title="Medical Information" @onToggle="expandMedInfo = $event" style="margin-top : 20px"/>

    <div v-if="expandMedInfo" class="cont">
      <div class="keyValCont qAndACont">
        <label class="key">Have you ever been told you have a heart condition？</label>
        <label class="val answer">{{user.user.heart_condition ? 'Yes' : 'No'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">Have you ever experienced chest pain, dizziness or loss of consciousness during or after a physical exercise workout?</label>
        <label class="val answer">{{user.user.chest_pain_or_blackouts ? 'Yes' : 'No'}}</label>
      </div>

      <div class="keyValCont qAndACont">
        <label class="key">Have you or do you currently take any medicines for high blood pressure？</label>
        <label class="val answer">{{user.user.meds_for_bp ? 'Yes' : 'No'}}</label>
      </div>

		</div>

    <div class="hori_cont" style="margin-top : 20px">
      <expandBtn title="Membership Information" @onToggle="expandMembershipInfo = $event"/>




<!--
      <div class="actions_cont" v-if="expandMembershipInfo">
        <div class="action_btn" @click="displayExtendModal">
          Extend Videos Submission Date
        </div>

        <div class="action_btn" @click="displayMoveToCourseModal">
          Move to Another Course
        </div>

        <div class="action_btn" @click="showUpdateStatusModal = true">
          Update  Status
        </div>

        <div class="action_btn" @click="showUploadLicenseModal = true">
          Upload Certificate
        </div>

        <div class="action_btn" v-if="membership.certificate_url" @click="showCertificate()">
          View Certificate
        </div>

      </div> -->



    </div>


    <div v-if="expandMembershipInfo && memberships" class="cont">
      <div class="empty" v-if="memberships.length <= 0">
        No Memberships
      </div>
      <table style="margin-top : 10px" v-if="memberships.length > 0">
        <thead>
          <tr >
            <th  style="width : 5%">ID</th>
            <th  style="width : 15%">START</th>
            <th  style="width : 15%">END</th>
            <th  style="width : 15%">STATUS</th>

            <th  style="width : 15%">OUT TRADE #</th>
            <th  style="width : 10%">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-bind:key="item.id" v-for="item in memberships">
            <td >{{item.id || 'N/A'}}</td>
            <td >{{item.start || 'N/A'}}</td>
            <td >{{item.end || 'N/A'}}</td>
            <td >{{item.status ? item.status.replace('_' , ' ').toUpperCase() : 'N/A'}}</td>
            <td >{{item.out_trade_no || 'N/A'}}</td>
            <td >
              <button
                  @click="onMembershipClick(item)"
                  class="btAction purple"
                >DETAILS</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div v-if="expandMembershipInfo && membership" class="cont">

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
          <label class="val" style="text-transform: capitalize;">{{membership.status.replace('-' , ' ') || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Price Paid</label>
          <label class="val">{{membership.price || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Wechat Payment Out-Trade-No</label>
          <label class="val">{{membership.out_trade_no || 'N/A'}}</label>
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


    </div> -->

    <!-- <expandBtn v-if="expandMembershipInfo" title="Training Videos" @onToggle="expandTrainingVideos = $event"/>



    <div v-if="expandTrainingVideos" class="cont">
      <div class="empty" v-if="membership.training_videos.length <= 0">
        No Training Videos Found
      </div>

      <div class="grid" v-if="membership.training_videos.length > 0">
  			<div class="item" v-for="item in membership.training_videos">
  				<VideoCard :model="item" @showPreview="displayVideoPreview"></VideoCard>
  			</div>
  		</div>


    </div> -->

    <expandBtn title="Orders" @onToggle="expandOrders = $event" style="margin-top : 20px"/>

    <div v-if="expandOrders" class="cont">
      <div class="empty" v-if="user.orders.length <= 0">
        No Orders
      </div>
      <table style="margin-top : 10px" v-if="user.orders.length > 0">
        <thead>
          <tr >
            <th  style="width : 5%">ID</th>
            <th  style="width : 75">Products
              <div class="productsList">
                <div class="item" >
                  <label class="name heading" style="text-align : left">Product Name</label>
                  <label class="count heading"># Of Pieces</label>
                  <label class="price heading">Unit Price</label>
                  <label class="price heading">Sub Total</label>
                </div>
              </div>

            </th>
            <th  style="width : 10%">Status</th>
            <th  style="width : 10%">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-bind:key="user.id" v-for="order in user.orders">
            <td >{{order.id || 'N/A'}}</td>
            <td >
              <div class="productsList">
                <div class="item" v-for="product in order.items">
                  <label class="name">{{product.product.name}}</label>
                  <label class="count">x{{product.count}}</label>
                  <label class="price">¥ {{product.product.price}}</label>
                  <label class="price">¥ {{getSubTotal(product)}}</label>
                </div>
              </div>
            </td>
            <td >{{order.status.replace('_' , ' ').toUpperCase()}}</td>
            <td >¥ {{getTotalAmount(order)}}</td>
          </tr>
        </tbody>
      </table>
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
    <membershipDetail v-if="index === 2" :membershipId="membershipId" @hideMembershipDetails="hideMembershipDetails"/>

  </div>
</template>

<script>

import Modal from "../components/modal.vue";
import ExpandBtn from "../components/expadBtn.vue";
import VideoCard from "../components/videoCard.vue";
import MembershipDetail from "./membershipDetail.vue";
import {
    HTTP, URLS
}
from '../network/http';
var NotificationsController = require("../components/NotificationsController.js");

  export default {
		name : 'user',
		components: {
      Modal,
      ExpandBtn,
      VideoCard,
      MembershipDetail
	 },
		props: ['id'],
	 data() {
		 return {
       user : null,
       expandBasicInfo : true,
       expandStudioInfo: false,
       expandBgInfo: false,
       expandMedInfo: false,
       expandOrders : false,
       expandMembershipInfo: false,
       expandTrainingVideos: false,
       membership : null,
       showExtendModal : false,
       new_submission_date: '',
       today : '',
       showMoveToCourseModal : false,
       courses : [],
       loadingCourse: false,
       selectedCourseId : -1,
       showUpdateStatusModal: false,
       statuses: [
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
      index: 1,
      membershipId: -1
		 };
	 },
		methods:{
      hideMembershipDetails: function(){
        this.index = 1;
      },
      showCertificate(){
        this.$root.$emit('showImage' , {
          url : this.membership.certificate_url
        });
      },
      onMembershipClick(item){
        this.$router.push('home?lv1Tab=user&lv2Tab=detail?id=' + this.id +'&lv4Tab=membership?id=' + item.id);
        this.membershipId = item.id ;
        this.index = 2;
      },
      uploadNewLicense(){
        const ctx = this;
        NotificationsController.showActivityIndicator();
        var formData = new FormData();
        formData.append("file", this.imgFile);
        var url = URLS.FILE.UPLOAD;
        url = url + "?type=certificates";
        var axios = HTTP.post(url, formData, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(response){
          console.log(response);
          var url = response.data.url;
          console.log("URL = " , url);
          NotificationsController.hideActivityIndicator();

          HTTP.post(URLS.MEMBERSHIP.UPDATE_CERTIFICATE_URL.replace(':id' , ctx.membership.id) , {certificate_url : url} , {
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



        })
        .catch(function(err){
          NotificationsController.hideActivityIndicator();
          console.log(err);
          NotificationsController.showErrorNotification(err);
        })
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
        HTTP.post(mUrl,  {
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
          console.log(error);
          ctx.showUpdateStatusModal = false;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });

      },
      moveToCourse(){
        const ctx = this;
        var mUrl = URLS.MEMBERSHIP.CHANGE.replace(':userId' , this.user.user.id);
        mUrl = mUrl.replace(':courseId' , ctx.selectedCourseId);
        HTTP.post(mUrl,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.getMembership()
          ctx.showMoveToCourseModal = false;
          NotificationsController.showNotification('success' , 'User moved to the new course successfully');
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          console.log(error);
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
        HTTP.patch(mUrl,  {
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
          console.log(error);
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
        this.$emit('hideUserDetail')
      },
      getTrainingData: function(){
        const ctx = this;
        HTTP.get(URLS.USER.BY_ID.replace(':id' , this.id) ,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.user = res.data.data;
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      },
      getMembership: function(){
        const ctx = this;
        HTTP.get(URLS.MEMBERSHIP.BY_ID.replace(':id' , this.id) ,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.membership = res.data.data[0];
          ctx.memberships = res.data.data;
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
          console.log(courses);
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
      this.getTrainingData();
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
  color: white;
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
  color: white;
  text-align: left;
}

.val{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-family: 'Medium';
  font-size: 16px;
  color: white;
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
	color: white;
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


</style>
