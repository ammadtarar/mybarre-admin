<template lang="html">

<div >



  <div class="order" v-if="index === 1">

    <div class="top">
      <img src="../assets/ic_left_black.png" class="goBack" @click="goBack">
      <label class="pageDesc" style="font-family : 'Bold' ; font-size : 24px">User Detail</label>
    </div>


    <div class="hori_cont" style="margin-top : 20px">

      <expandBtn title="Basic Information" @onToggle="expandBasicInfo = $event" default="true" style="margin-top : 20px"/>

			<div class="actions_cont" v-if="expandBasicInfo && user">
				<div class="btAction btActionCentered orange" v-if="!editBasicInfo" @click="editUser = user;editBasicInfo = true">
          UPDATE INFORMTION
				</div>


        <div class="btAction btActionCentered orange" v-if="user.user.type == 'legacy'"  @click="displayUserUpdateModal">
          UPDATE USER STATUS
				</div>


        <div class="btAction btActionCentered red" v-if="editBasicInfo" @click="editBasicInfo = false; editUser = null">
          CANCEL
				</div>

        <div class="btAction btActionCentered green" v-if="editBasicInfo" @click="onSaveUserInfo">
          SAVE
				</div>

			</div>



		</div>

    <div v-if="editUser && editBasicInfo" class="cont">

      

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">First name</label>
          <input type="text" v-model="editUser.user.first_name" placeholder="Enter first name" class="textInput" />
        </div>
        <div class="keyValCont">
          <label class="key">Family name</label>
          <input type="text" v-model="editUser.user.last_name" placeholder="Enter last name" class="textInput" />
        </div>
      </div>

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Nickname</label>
          <input type="text" v-model="editUser.user.nickname" placeholder="Enter nick name" class="textInput" />
        </div>
        <div class="keyValCont">
          <label class="key">Name on Certificate</label>
          <input type="text" v-model="editUser.user.certificate_name" placeholder="Enter certificate name" class="textInput" />
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Email</label>
          <input type="text" v-model="editUser.user.email" placeholder="Enter email" class="textInput" />
        </div>
        <div class="keyValCont">
          <label class="key">Phone</label>
          <input type="text" v-model="editUser.user.phone" placeholder="Enter phone" class="textInput" />
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Gender</label>
          <select class="selectRoundBorder" v-model="editUser.user.gender" >
							<option disabled value="null">Select one gender</option>
								<option
								v-for="item in genders"
									v-bind:value="item"
									v-bind:key="item">
									{{item.replaceAll("-" , " ").toUpperCase()}}
								</option>
					</select>

        </div>
        <div class="keyValCont">
          <label class="key">Date of Birth</label>
          <!-- <label class="val">{{editUser.user.dob || 'N/A'}}</label> -->
          <input type="date" v-model="editUser.user.dob"  placeholder="Select date of birth" class="textInput" />
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">City</label>
          <input type="text" v-model="editUser.user.city" placeholder="Enter city" class="textInput" />
        </div>
        <div class="keyValCont">
          <label class="key">Address</label>
          <input type="text" v-model="editUser.user.address" placeholder="Enter address" class="textInput" />
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Nationality</label>
          <input type="text" v-model="editUser.user.nationality" placeholder="Enter nationality" class="textInput" />
        </div>
        <div class="keyValCont">
          <label class="key">Wechat ID/Username</label>
          <input type="text" v-model="editUser.user.wechat_id" placeholder="Enter wechat id" class="textInput" />
        </div>
      </div>

       <div class="half-half">
        <div class="keyValCont">
          <label class="key">Training Top Size</label>

          <select class="selectRoundBorder" v-model="editUser.user.top_size" >
							<option disabled value="null">Select one top size</option>
								<option
								v-for="item in topSizes"
									v-bind:value="item"
									v-bind:key="item">
									{{item.replaceAll("-" , " ").toUpperCase()}}
								</option>
					</select>

        </div>
        <div class="keyValCont">
          <label class="key">Training Socks Size</label>

          <select class="selectRoundBorder" v-model="editUser.user.sock_size" >
							<option disabled value="null">Select one sock size</option>
								<option
								v-for="item in sockSizes"
									v-bind:value="item"
									v-bind:key="item">
									{{item}}
								</option>
					</select>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Ocuupation</label>
          <input type="text" v-model="editUser.user.occupation" placeholder="Enter occupation" class="textInput" />
        </div>
      </div>

     

    </div>

    <div v-if="expandBasicInfo && user && !editBasicInfo" class="cont">

      <div  >
        <div class="tripleKeyValCont">
          <label class="key">Headshot</label>
          <img  :src="user.user.avatar_url"  class="dp" >
        </div>
      </div>


      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">First name</label>
          <label class="val">{{user.user.first_name || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Family name</label>
          <label class="val">{{user.user.last_name || '--'}}</label>
        </div>
      </div>

      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Nickname</label>
          <label class="val">{{user.user.nickname || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Name on Certificate</label>
          <label class="val">{{user.user.certificate_name || 'N/A'}}</label>
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
          <label class="key">Wechat ID/Username</label>
          <label class="val">{{user.user.wechat_id || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Ocuupation</label>
          <label class="val">{{user.user.occupation || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">User ID</label>
          <label class="val">{{user.user.id || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Training Top Size</label>
          <label class="val">{{user.user.top_size || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Training Socks Size</label>
          <label class="val">{{user.user.sock_size || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Preffered Manual Language</label>
          <label class="val">{{user.user.manual_lang.toUpperCase() || 'N/A'}}</label>
        </div>
      </div>

    </div>


    <expandBtn title="Studio Information" v-if="!editBasicInfo" @onToggle="expandStudioInfo = $event" style="margin-top : 20px"/>

    <div v-if="expandStudioInfo && !editBasicInfo" class="cont">
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


    <expandBtn title="Background & Motivation" v-if="!editBasicInfo" @onToggle="expandBgInfo = $event" style="margin-top : 20px"/>

    <div v-if="expandBgInfo && !editBasicInfo" class="cont">
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


    <expandBtn title="Medical Information" v-if="!editBasicInfo" @onToggle="expandMedInfo = $event" style="margin-top : 20px"/>

    <div v-if="expandMedInfo && !editBasicInfo" class="cont">
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
      <expandBtn title="Training Information" v-if="!editBasicInfo"@onToggle="expandMembershipInfo = $event"/>

    </div>


    <div v-if="expandMembershipInfo && memberships && !editBasicInfo" class="cont">
      <div class="empty" v-if="memberships.length <= 0">
        No Trainings
      </div>
      <table style="margin-top : 10px" v-if="memberships.length > 0">
        <thead>
          <tr >
            <th  style="width : 5%">ID</th>
            <th  style="width : 10%">MEMBERSHIP (START - END)</th>
            <th  style="width : 10%">LICENSE (START - END)</th>
            <th  style="width : 10%">STATUS</th>
            <th  style="width : 15%">PAYMENT OUT TRADE #</th>
            <th  style="width : 15%">WAS COUPON USED</th>
            <th  style="width : 10%">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-bind:key="item.id" v-for="item in memberships">
            <td >{{item.id || 'N/A'}}</td>
            <td >{{item.start || 'N/A'}} - {{item.end || 'N/A'}}</td>
            <td >{{item.license_creation_date || 'N/A'}}</td>
            <td >{{item.status ? item.status.replace('-' , ' ').toUpperCase() : 'N/A'}}</td>
            <td >{{item.out_trade_no || 'N/A'}}</td>
            <td >{{item.couponId > 0  ? 'Yes' :  'No'}}</td>
            <td >
              <button
                  @click="onMembershipClick(item)"
                  class="btAction green"
                >DETAILS</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <expandBtn title="Orders" v-if="!editBasicInfo" @onToggle="expandOrders = $event" style="margin-top : 20px"/>

    <div v-if="expandOrders && !editBasicInfo" class="cont">
      <div class="empty" v-if="user.orders.length <= 0">
        No Orders
      </div>
      <table style="margin-top : 10px" v-if="user.orders.length > 0">
        <thead>
          <tr >
            <th  style="width : 65%">Products
              <div class="productsList">
                <div class="item" >
                  <label class="name heading" style="text-align : left">Product Name</label>
                  <label class="count heading">Color</label>
                  <label class="count heading">Size</label>
                  <label class="count heading"># Of Pieces</label>
                  <label class="price heading">Unit Price</label>
                  <label class="price heading">Sub Total</label>
                </div>
              </div>

            </th>
            <th  style="width : 15%">Status</th>
            <th  style="width : 10%">SHIPPING FEE</th>
            <th  style="width : 10%">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-bind:key="user.id" v-for="order in user.orders">
            <td >
              <div class="productsList">
                <div class="item" v-for="product in order.items">
                  <label class="name">{{product.product.name}}</label>
                  <label class="count">{{product.color ? product.color.name_en : 'N/A'}}</label>
                  <label class="count">{{product.size ? product.size.name_en : 'N/A'}}</label>
                  <label class="count">x{{product.count}}</label>
                  <label class="price">¥ {{product.product.price}}</label>
                  <label class="price">¥ {{getSubTotal(product)}}</label>
                </div>
              </div>
            </td>
            <td >{{order.status.replace('_' , ' ').toUpperCase()}}</td>
            <td >¥{{order.shipping_fee || '0.0'}}</td>
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
import moment from "moment";
import Modal from "../components/modal.vue";
import ExpandBtn from "../components/expadBtn.vue";
import VideoCard from "../components/videoCard.vue";
import MembershipDetail from "./membershipDetail.vue";
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
      VideoCard,
      MembershipDetail
	 },
		props: ['id'],
	 data() {
		 return {
       editUser: null,
       editBasicInfo : false,
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
      genders: [
        'male',
        'female'
      ],
      topSizes: [
        'small',
        'medium',
        'large'
      ],
      sockSizes: [
        '35-38',
        '38-40'
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
      onSaveUserInfo(){
        var user = this.editUser.user;
        const ctx = this;
        NotificationsController.showActivityIndicator();
        HTTP.post(URLS.USER.UPDATE_PROFILE.replace(":id" , user.id), user, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(response){
          console.log(response);
          ctx.editUser = null;
          ctx.editBasicInfo = false;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showNotification('success' , 'User information updated successfully')
          ctx.getTrainingData();
          ctx.getMembership();
        })
        .catch(function(err){
          NotificationsController.hideActivityIndicator();
          console.log(err);
          NotificationsController.showErrorNotification(err);
        })

        
      },
      hideMembershipDetails: function(){
        this.index = 1;
      },
      showCertificate(){
        this.$root.$emit('showImage' , {
          url : this.membership.certificate_url
        });
      },
      onMembershipClick(item){
        console.log("onMembershipClick");
        this.$router.push('home?lv1Tab=user&lv2Tab=detail?id=' + this.id +'&lv4Tab=membership?id=' + item.id);
        this.membershipId = item.id ;
        this.index = 2;
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

				


				let r1 = await client.put('license_membership_' + String(ctx.membership.id) + "_stamp_" + String(new Date().getMilliseconds()),this.imgFile); 
				var url = r1.url;


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




      },
      displayUserUpdateModal(){
        this.$root.$emit('displayUserUpdateModalInRoot' , this.user.user);
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
          NotificationsController.showNotification('success' , 'Training status updated');
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
          ctx.memberships = res.data.data;
          ctx.membership = res.data.data[ctx.memberships.length - 1];

          ctx.newStatus = ctx.membership.status;
          NotificationsController.hideActivityIndicator();

          if(ctx.goToMembership){
            ctx.onMembershipClick(ctx.membership);
          }
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
      let ctx = this;

      const urlParams = new URLSearchParams(window.location.search);
      const goToMembership = urlParams.get('goToMembership');
      this.goToMembership = goToMembership === 'true';


      ctx.getTrainingData();
      ctx.getMembership();

      this.$root.$on('onUserStatusUpdatedSuccessfully' , function(data){
          ctx.getTrainingData();
          ctx.getMembership();
      });
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
  width : 20px ;
  height : 20px;
  margin-right : 10px ;
  border : 2px solid black ;
  border-radius : 30px;
  transition : all 0.5s;
  padding: 5px;
}

.goBack:hover{
  background: #fce4ec;
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
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: left;
  margin-top: 20px;
  transition: all 0.25s;
}

.tripleKeyValCont:nth-of-type(1){
  margin-right: 20px;
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
  margin-right: 20px;
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
  display: flex;
  flex-direction: row;
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
  color: black;
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

.dp{
  /* width: 150px; */
  height: 150px;
  border-width: 1px solid gray;
  margin-top: 10px;
  background: gray;
  border: 1px solid gray;
}

.selectRoundBorder{
  background : transparent;  border : 0.5px solid black ; border-radius : 4px
}

</style>
