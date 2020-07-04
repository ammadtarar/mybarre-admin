<template lang="html">
  <div class="order">

    <div class="top">
      <img src="../assets/ic_left_black.png" class="goBack" @click="goBack">
      <label class="pageDesc" style="font-family : 'Bold' ; font-size : 24px">Course Detail</label>

      <div class="btnsContainer" >

        <div class="btAction btActionCentered orange" @click="isEditing = true" v-if="!isEditing">
          EDIT
        </div>



        <div class="btAction btActionCentered green" v-if="!isEditing" @click="showCheckInQe" >
          CHECK IN QR
        </div>

        <div class="btAction btActionCentered green" v-if="!isEditing" @click="downloadUserList" >
          DOWNLOAD USERS LIST
        </div>

        <div class="btAction btActionCentered green" v-if="!isEditing && course.welcome_doc_url" @click="downloadDoc" >
          DOWNLOAD WELCOME DOCUMENT
        </div>

        <div class="btAction btActionCentered green" @click="showUploadModal = true" v-if="!isEditing">
          UPLOAD WELCOME DOCUMENT
        </div>

        <div class="btAction btActionCentered red" @click="showDeleteModal = true" v-if="!isEditing">
          DELETE
        </div>

        <div class="btAction btActionCentered green" @click="updateCourse" v-if="isEditing">
          SAVE
        </div>

        <div class="btAction btActionCentered red" @click="isEditing = false" v-if="isEditing">
          CENCEL
        </div>

      </div>

    </div>

    <expandBtn title="Course Information" @onToggle="expandBasicInfo = $event" default="true" style="margin-top : 20px"/>

    <div v-if="expandBasicInfo && course" class="cont">
      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Name</label>
          <label class="val" v-if="!isEditing">{{course.name || 'N/A'}}</label >
          <input type="text" v-model="course.name"  placeholder="Enter title here" v-if="isEditing"/>
        </div>
        <div class="keyValCont">
          <label class="key">Price</label>
          <label class="val" v-if="!isEditing">¥{{course.price || 'N/A'}}</label>
          <input type="number" v-model="course.price"  placeholder="Enter price here" v-if="isEditing"/>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">START</label>
          <label class="val" v-if="!isEditing">{{course.start || 'N/A'}}</label>
          <input type="date" v-model="course.start"  placeholder="Select start time here" v-if="isEditing"/>
        </div>
        <div class="keyValCont">
          <label class="key">END</label>
          <label class="val" v-if="!isEditing">{{course.end || 'N/A'}}</label>
          <input type="date" v-model="course.end"  placeholder="Select end time here" v-if="isEditing"/>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Last SignUp Date</label>
          <label class="val" v-if="!isEditing">{{course.last_signup_date || 'N/A'}}</label>
          <input type="date" v-model="course.last_signup_date"  placeholder="Select last sign up date" v-if="isEditing"/>
        </div>
        <div class="keyValCont">
          <label class="key">License Fee</label>
          <label class="val" v-if="!isEditing">¥{{course.license_fee || 'N/A'}}</label>
          <input type="number" v-model="course.license_fee"  placeholder="Enter license fee" v-if="isEditing"/>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Available Seats</label>
          <label class="val" v-if="!isEditing">{{course.available_seats || 'N/A'}}</label>
          <input type="number" v-model="course.available_seats"  placeholder="Enter available seat" v-if="isEditing"/>
        </div>
        <div class="keyValCont">
          <label class="key">Remaining Seats</label>
          <label class="val" >{{course.seats || 'N/A'}}</label>
          <!-- <input type="number" v-model="course.available_seats"  placeholder="Enter title here" v-if="isEditing"/> -->
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">VENUE</label>
          <label class="val" v-if="!isEditing">{{course.venue || 'N/A'}}</label>
          <input type="text" v-model="course.venue"  placeholder="Enter course venue" v-if="isEditing"/>
        </div>
        <div class="keyValCont">
          <label class="key">Welcome Document URL</label>
          <label class="val">{{course.welcome_doc_url || 'N/A'}}</label>
        </div>

      </div>




    </div>

    <expandBtn title="Trainings" @onToggle="expandMemberships = $event" style="margin-top : 20px"/>

    <div v-if="expandMemberships && course" class="cont">
      <div class="empty" v-if="course.memberships.length <= 0">
        No Trainings
      </div>


      <table style="margin-top : 10px" v-if="course.memberships.length >= 1">
      <thead>
		        <tr >
							<th  style="width : 5%">#</th>
							<th  style="width : 13%">DATE </br>(Start / Expiry)</th>
		          <th  style="width : 16%">NAME (First/Family/Nick)</th>
		          <th  style="width : 8%">EMAIL</th>
		          <th  style="width : 8%">PHONE</th>
							<th  style="width : 8%">WECHAT ID</th>
							<th  style="width : 8%">GENDER</th>
							<th  style="width : 12%">STATUS</th>
              <th  style="width : 12%">OUT TRADE #</th>
							<th  style="width : 14%">ACTIONS</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr  v-bind:key="membership.id" v-for="(membership , index) in course.memberships">
              <td>{{index+1}}</td>
              <td>{{getStartDate(membership)}} </br> {{getExpiry(membership)}}</td>
              <td>{{membership.user.first_name || 'N/A'}} / {{membership.user.last_name || 'N/A'}} / {{membership.user.nickname || 'N/A'}}</td>
		          <td >{{membership.user.email || 'N/A'}}</td>
              <td >{{membership.user.phone || 'N/A'}}</td>
              <td >{{membership.user.wechat_id || 'N/A'}}</td>
              <td >{{membership.user.gender ? membership.user.gender.toUpperCase() : 'N/A' || 'N/A'}}</td>
              <td>{{membership.status.toUpperCase().replaceAll("-" , " ")}}</td>
              <td>{{membership.out_trade_no || 'N/A'}}</td>
							<td>
								<a >
									<button
									@click="$emit('onMembershipClick' , membership.id)"
										class="btAction green"
									>DETAILS</button>


                  <button
									@click="onClickUpdateMembership(membership)"
										class="btAction green"
									>UPDATE STATUS</button>

                  
								</a>
							</td>
		        </tr>
		      </tbody>
    </table>
		</div>





    <modal v-if="showUploadModal"  @close="showUploadModal = false" size="size">
        <h3 slot="header" style="text-align : left;">Upload Welcome Document...</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">
            You can upload the Weclome Document for this course. This document will show up under 'Training' section in the Wechat MiniProgram.
          </label>

          <label class="inputTitle spacing30" v-if="file">File Name</label>
          <label style="color : #37474f" v-if="file">{{file.name}}</label>



        </div>

        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">
            <div style="width : 50% ; height : 100% ; display : flex ; margin-left : 10px">
              <label class="prodImgPicker">
                Select Files
                <input type="file" accept="application/pdf" @change="onFileChange" />
              </label>
            </div>
            <button type="button"  class="bt neg" @click="showUploadModal = false ; file = null">Abort</button>
            <button type="button" class="bt " @click="uploadFile" :disabled="!file" v-bind:class="{pos : file ,neg : !file }"  style="width : 190px !important; margin-left : 10px" >Upload</button>
          </div>
        </div>

    </modal>


    <modal v-if="showDeleteModal"  @close="showDeleteModal = false " size="size">
        <h3 slot="header" style="text-align : left;">Delete Course ...</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">You can only delete a course that does not have any memberships</label>

          <label class="inputTitle spacing30">Course Name</label>
          <label style="color : #37474f;" >{{course.name}}</label>


          <label style="color : #f44336; font-family : 'Bold'; font-size : 12px; margin-top : 14px;" v-if="course.memberships.length > 0">
            You cannot delete this course. This course already has
            <b style="color : #4E08F0; font-family : 'Black'; font-size : 18px;">{{course.memberships.length}}</b>
             memberships
          </label>


        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">
            <button type="button" class="bt neg" @click="showDeleteModal = false ; deletableCourse = null">Abort</button>
            <button type="button" class="bt pos" v-if="course.memberships.length <= 0" @click="deleteCourse()">Delete</button>
          </div>
        </div>
    </modal>



    <modal v-if="displayCheckInQrModal"  @close="hideQrModal()" size="size">
        <h3 slot="header" style="text-align : left;">Course Check In QR Code</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">Below is the check in QR code that users can scan with Wechat MiniProgram.</label>

          <label class="inputTitle spacing30">Course Name</label>
          <label style="color : #37474f;" >{{course.name}}</label>

          <label class="inputTitle spacing30">QR Cpde</label>
          <div class="qrCont" ref="qrCont">
            <vue-qr :text="qrStr" :callback="onQrGenerated" qid="testid"  :size="qrSize"></vue-qr>
          </div>



        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">



            <button type="button" class="bt neg" @click="displayCheckInQrModal = false">Close</button>
            <button type="button" class="bt pos" @click="downloadQr">Download</button>
          </div>
        </div>
    </modal>



     <modal v-if="showUpdateStatusModal"  @close="showUpdateStatusModal = false" size="size">
        <h3 slot="header" style="text-align : left;">Update Status</h3>
        <div slot="body" class="modalBody">
          <label style="color : #37474f">You can update exam training status i.e., Pass or Fail</label>


          <label class="inputTitle spacing30">Current Status</label>
          <label style="color : #e91e63; text-transform: capitalize;">{{membership.status.replace('-' , ' ')}}</label>

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

  </div>
</template>

<script>
import Modal from "../components/modal.vue";
import ExpandBtn from "../components/expadBtn.vue";
import VueQr from "vue-qr";
import { HTTP, URLS } from "../network/http";
var NotificationsController = require("../components/NotificationsController.js");
var OSS = require('ali-oss');
export default {
  name: "courseDetail",
  components: {
    Modal,
    ExpandBtn,
    VueQr
  },
  props: ["courseId"],
  data() {
    return {
      course: null,
      expandBasicInfo: true,
      expandMemberships: true,
      showUploadModal: false,
      file: null,
      isEditing: false,
      showDeleteModal: false,
      checkinModel: null,
      displayCheckInQrModal: false,
      qrStr: "",
      qrDataUrl: "",
      qrSize: 300,
      showUpdateStatusModal: false,
      membership : null,
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
    };
  },
  methods: {
    onClickUpdateMembership(membership){
      this.membership = membership;
      this.newStatus = this.membership.status; 
      console.log(this.membership);
      
      this.showUpdateStatusModal = true
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
          ctx.getCourse()
          ctx.showUpdateStatusModal = false;
          ctx.membership = null;
          NotificationsController.showNotification('success' , 'Membership status updated');
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          ctx.showUpdateStatusModal = false;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });

      },
    getExpiry(membership) {
      if (membership === null) {
        return "N/A";
      }
      const expiry = membership.end || null;
      if (expiry === null) {
        return "N/A";
      }
      return expiry;
    },
    getStartDate(membership) {
      if (membership === null) {
        return "N/A";
      }
      const start = membership.start || null;
      if (start === null) {
        return "N/A";
      }
      return start;
    },
    downloadUserList() {
      const course = this.course;
      if (course === null || course === undefined) {
        NotificationsController.showNotification("danger", "Course is null");
        return;
      }

      NotificationsController.showActivityIndicator();
      const ctx = this;
      HTTP.get(URLS.COURSE.REPORT.replace(":id", course.id), {
        headers: {
          Authorization: localStorage.getItem("token")
        },
        responseType: "blob"
      })
        .then(function(res) {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "MYbarre-course-" + course.name + "users-list.xls"
          );
          document.body.appendChild(link);
          link.click();
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(
            error.response.statusText
          );
        });
    },
    downloadQr() {
      var link = document.createElement("a");
      link.download = "mybarre_course_%id_checkin_qrcode.png".replace(
        "%id",
        this.course.id
      );
      link.href = this.qrDataUrl;
      link.click();
    },
    downloadDoc() {
      var link = document.createElement("a");
      link.href = this.course.welcome_doc_url;
      link.click();
    },
    showCheckInQe() {
      this.checkinModel = this.course;
      this.qrStr = JSON.stringify({
        courseId: this.course.id,
        courseName: this.course.name,
        start: this.course.start,
        end: this.course.end
      });
      this.displayCheckInQrModal = true;
    },
    updateCourse() {
      const ctx = this;
      HTTP.patch(
        URLS.COURSE.BY_ID.replace(":id", ctx.courseId),
        {
          name: ctx.course.name,
          price: ctx.course.price,
          start: ctx.course.start,
          available_seats: ctx.course.available_seats,
          seats: ctx.course.seats,
          venue: ctx.course.venue
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
        .then(function(res) {
          ctx.file = null;
          ctx.showUploadModal = false;
          NotificationsController.showNotification(
            "success",
            "Course updated successfully"
          );
          ctx.isEditing = false;
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          ctx.isEditing = false;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
    },
    deleteCourse() {
      NotificationsController.showActivityIndicator();
      const ctx = this;
      HTTP.delete(URLS.COURSE.BY_ID.replace(":id", this.course.id), {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(res) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showNotification(
            "success",
            "Course deleted successfully"
          );
          ctx.goBack();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
    },
    async uploadFile() {
      console.log("uploadFile");
      const ctx = this;
      NotificationsController.showActivityIndicator();




      	let client = new OSS({
          region: 'oss-accelerate',
          accessKeyId: 'LTAI4GFTLJTB2U4J9mXzWP9n',
          accessKeySecret: 'yq6W4oN6pG5mxq07M23kwjeBAaoaRj',
          bucket: 'mybarre'
        });

				


				let r1 = await client.put('welcomeDoc_bundle_' + String(ctx.courseId) + "_stamp_" + String(new Date().getMilliseconds()),this.file); 
        var url = r1.url;


        HTTP.patch(
            URLS.COURSE.BY_ID.replace(":id", ctx.courseId),
            {
              welcome_doc_url: url
            },
            {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }
          )
            .then(function(res) {
              ctx.file = null;
              ctx.showUploadModal = false;
              NotificationsController.showNotification(
                "success",
                "Document uploaded successfully"
              );
              ctx.getCourse();
              NotificationsController.hideActivityIndicator();
            })
            .catch(function(error) {
              ctx.showUploadModal = false;
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
        


     
    },
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    goBack() {
      this.$emit("hideCourseDetail");
    },
    getCourse: function() {
      const ctx = this;
      HTTP.get(URLS.COURSE.BY_ID.replace(":id", this.courseId), {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(res) {
          ctx.course = res.data.data;
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          ctx.loadingCourse = false;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
    }
  },
  mounted() {
    if (this.id === undefined || this.id === null || this.id <= 0) {
      const ctx = this;
      const params = new URLSearchParams(window.location.search);
      const lv3TabRaw = params.get("lv3Tab");
      const lv3Tab = lv3TabRaw.substring(0, lv3TabRaw.indexOf("?")) || null;
      console.log("lv3Tab = ", lv3Tab);
      if (lv3Tab === "course") {
        var id = lv3TabRaw.substring(
          lv3TabRaw.indexOf("=") + 1,
          lv3TabRaw.length
        );
        this.id = id;
      }
    }
    console.log("MOUNTED");
    
    this.getCourse();
  }
};
</script>

<style lang="css">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.goBack {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border: 2px solid white;
  border-radius: 30px;
  transition: all 0.5s;
}

.goBack:hover {
  background: #4e08f0;
}

.cont {
  width: 100%;
}

.half-half {
  width: 100%;
  height: 60px;
  display: inline-block;
  margin-bottom: 20px;
}

.tripleKeyValCont {
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: left;
  margin-top: 20px;
  transition: all 0.25s;
}

.tripleKeyValCont:nth-of-type(1) {
  margin-right: 0.3%;
}

.empty {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 14px;
  color: #e91e63;
}

.tripleKeyValCont:nth-of-type(2) {
  margin-right: 0.3%;
}

.keyValCont {
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: left;
  margin-top: 20px;
  transition: all 0.25s;
}

.qAndACont {
  width: 100%;
  height: auto !important;
  min-height: 60px !important;
}

.answer {
  min-height: 40px !important;
  height: auto !important;
}

.keyValCont:nth-child(2) {
  float: right;
}

.key {
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-family: "Thin";
  font-size: 14px;
  color: black;
  text-align: left;
}

.val {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-family: "Medium";
  font-size: 16px;
  color: black;
  text-align: left;
  border-bottom: 0.5px solid #424242;
}
.order {
  width: calc(100vw - 40px);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.order .top {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.order .top .pageDesc {
  width: auto !important;
  color: black;
  font-size: 18px;
  font-family: "Thin";
  text-align: left;
}

.order .top .btnsContainer {
  width: auto !important;
  margin-left: auto;
}

.order .top .btnsContainer .btn {
  width: auto !important;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #4e08f0;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-family: "Medium";
  margin-left: 10px;
  transition: all 0.25s;
  padding: 2px 10px 2px 10px;
}

.order .top .btn {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #4e08f0;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-family: "Medium";
  margin-left: 10px;
  transition: all 0.25s;
}

.order .top .btn:hover {
  font-family: "Bold";
}

.order .grid {
  display: inline-block;
  text-align: center;
  float: left;
  /* flex-direction: row; */
}

.order .grid .item {
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

.order .grid .whiteCard {
  height: auto !important;
  padding: 8px;
  box-shadow: 0px 0px 4px 0px gray !important;
}

.order .gird .checkCont {
  width: 100%;
  height: 50px;
}

.tick {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  float: right;
  border: 1px solid #999999;
}

.order .grid .item > img {
  width: 100%;
  height: 200px;
  background: pink;
}

.order .grid .item .infoView {
  width: calc(100% - 20px);
  height: 30px;
  display: inline-block;
  margin-left: 10px;
}

.order .grid .item .infoView .key {
  width: auto;
  height: 30px;
  line-height: 30px;
  float: left;
  text-align: left;
  font-size: 12px;
  color: black;
  font-family: "Medium";
}

.order .grid .item .infoView .value {
  width: auto;
  height: 30px;
  line-height: 30px;
  float: right;
  text-align: right;
  font-size: 16px;
  color: black;
  font-family: "BOld";
}

.productsList {
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-top: 6px;
}

.productsList .item {
  height: auto;
}

.productsList .item .name {
  height: auto;
  line-height: 20px;
  float: left;
  width: 50%;
  font-size: 14px;
  color: #616161;
  text-align: left;
  font-family: "Bold";
}

.productsList .item .count {
  height: 20px;
  line-height: 20px;
  float: left;
  width: 10%;
  font-size: 12px;
  color: #616161;
  font-family: "Bold";
  text-align: right;
}

.productsList .item .price {
  height: 20px;
  line-height: 20px;
  float: left;
  width: 20%;
  font-size: 12px;
  color: #616161;
  font-family: "Bold";
  text-align: right;
}

.productsList .item .heading {
  font-size: 12px;
  color: #4e08f0;
  font-family: "Bold";
  text-align: right;
}
/* .training .grid .rename:hover{
  background: #fec60a;
  color: white;
} */

.hori_cont {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
}

.actions_cont {
  display: flex;
  flex-direction: row;
  margin-left: auto;
}
.action_btn {
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

.action_btn:hover {
  background: #4e08f0;
  color: white;
  font-weight: 800;
  border-radius: 20px;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
