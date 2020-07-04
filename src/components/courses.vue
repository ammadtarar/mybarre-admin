<template lang="html">
  <div class="courses">

    <div class="options_container">
      <pager :limit="limit" @onPageChanged="onPageChanged"></pager>
      <a class="bt_container" @click="showSeachModal = true">
        <img class="icon" src="../assets/ic_search.png">
        Search
      </a>

      <a class="bt_container" v-if="keyword !== '' || price > 0" @click="clearSearch">
        Clear Search
      </a>


      <a class="bt_container" @click="type = 'create' ; showAddModal = true">
        <img class="icon" src="../assets/ic_add_white.png">
        Add New Course
      </a>
    </div>

    <table v-if="courses.length >= 1">
    <thead>
      <tr >
        <th  style="width : 5">ID</th>
        <th  style="width : 15">NAME</th>
        <th  style="width : 15%">TIME</th>
        <th  style="width : 10%">LAST SIGN UP DATE</th>
        <th  style="width : 20%">VENUE</th>
        <th  style="width : 6%">PRICE</th>
        <th  style="width : 7%">LICENSE FEE</th>
        <th  style="width : 7%">SIGNUP COUNT</th>
        <th  style="width : 15%">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-bind:key="course.id" v-for="course in courses">
        <td >{{course.id || 'N/A'}}</td>
        <td >{{course.name || 'N/A'}}</td>
        <td >{{course.start || 'N/A'}} - {{course.end || 'N/A'}}</td>
        <td >{{course.last_signup_date || 'N/A'}}</td>
        <td >{{course.venue || 'N/A'}}</td>
        <td >{{course.price || 'N/A'}}</td>
        <td >{{course.license_fee || 'N/A'}}</td>
        <td >{{course.memberships.length || "0"}}</td>
        <td style="text-align : center">


          <button
              class="btAction green"
              @click="downloadUserList(course)"
            >DOWNLOAD USERS LIST</button>

            <button
                class="btAction green"
                @click="showDetail(course.id)"
              >DETAILS</button>

              <button
                  class="btAction green"
                  @click="showCheckInQe(course)"
                >CHECK IN QR</button>
            <button
                class="btAction red"
                @click="deletableCourse = course; showDeleteModal = true;"
              >DELETE</button>
              <button
                class="btAction orange"
                @click="displayEditModal(course)"
              >EDIT</button>
        </td>
      </tr>
    </tbody>
  </table>

  <modal v-if="showSeachModal"  @close="showSeachModal = false" size="size">
      <h3 slot="header" style="text-align : left;">Search & Filters</h3>
      <div slot="body" class="modalBody">
        <label style="color : #37474f">You can search courses by name , price , start and end time.</label>
        <label class="inputTitle spacing30">Course Name</label>
        <input type="text" v-model="keyword" placeholder="Enter course name" class="textInput" />


        <label class="inputTitle spacing30">Price</label>
        <input type="number" min="0" v-model="price" placeholder="Enter price here" class="textInput" style="width : 100%"/>
      </div>
      <div class="buttonsWrapper" slot="footer">
        <div class="bottonsContainer" >
          <button type="button" class="bt neg" @click="clearSearch">Clear</button>
          <button type="button" class="bt pos" @click="search">Search</button>
        </div>
      </div>
  </modal>

		<modal v-if="showAddModal"  @close="showAddModal = false " size="size">
	      <h3 slot="header" style="text-align : left;">Add New Course ...</h3>
	      <div slot="body" class="modalBody">


	        <label class="inputTitle spacing30">Name</label>
	        <input type="text" v-model="course.name" placeholder="Enter a name for this course" class="textInput" />

	        <label class="inputTitle spacing30">Seats Count</label>
	        <input type="number" v-model="course.seats" placeholder="Enter seats count" class="textInput" />

	        <label class="inputTitle spacing30">Price in RMB</label>
	        <input type="number" v-model="course.price" placeholder="Enter course price" class="textInput" />

          <label class="inputTitle spacing30">License Fee in RMB</label>
	        <input type="number" v-model="course.license_fee" placeholder="Enter license fee" class="textInput" />

          <label class="inputTitle spacing30">Venue</label>
          <input v-model="course.venue" placeholder="Enter the venue for this course" class="textInput" />

	        <label class="inputTitle spacing30">Start Time</label>
	        <input type="date" v-model="course.start" placeholder="Select a start time for the course" class="textInput" />

	        <label class="inputTitle spacing30">End Time</label>
	        <input type="date" v-model="course.end" placeholder="Select an end time for the course" class="textInput" />

          <label class="inputTitle spacing30">Last SingUp Date</label>
	        <input type="date" v-model="course.last_signup_date" placeholder="Select a time for last sign up" class="textInput" />

	      </div>
	      <div class="buttonsWrapper" slot="footer">
	        <div class="bottonsContainer" >
	          <button type="button" class="bt neg" @click="showAddModal = false ; course = {}">Abort</button>
	          <button type="button" class="bt pos" @click="saveCourse">Save</button>
	        </div>
	      </div>
	  </modal>


    <modal v-if="showDeleteModal"  @close="showDeleteModal = false ; deletableCourse = null" size="size">
        <h3 slot="header" style="text-align : left;">Delete Course ...</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">You can only delete a course that does not have any memberships</label>

          <label class="inputTitle spacing30">Course Name</label>
          <label style="color : #37474f;" >{{deletableCourse.name}}</label>


          <label style="color : #f44336; font-family : 'Bold'; font-size : 12px; margin-top : 14px;" v-if="deletableCourse.memberships.length > 0">
            You cannot delete this course. This course already has
            <b style="color : #4E08F0; font-family : 'Black'; font-size : 18px;">{{deletableCourse.memberships.length}}</b>
             memberships
          </label>


        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">
            <button type="button" class="bt neg" @click="showDeleteModal = false ; deletableCourse = null">Abort</button>
            <button type="button" class="bt pos" v-if="deletableCourse.memberships.length <= 0" @click="deleteCourse()">Delete</button>
          </div>
        </div>
    </modal>


    <modal v-if="showEditModal"  @close="showEditModal = false ; editableCourse = null" size="size">
        <h3 slot="header" style="text-align : left;">Edit Course ...</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">You can only edit price for the course that does not already have memberships</label>

          <label class="inputTitle spacing30">Name</label>
         <input type="text" v-model="editableCourse.name" placeholder="Enter a name for this course" class="textInput" />

         <label class="inputTitle spacing30">Seats Count</label>
         <input type="number" v-model="editableCourse.seats" placeholder="Enter seats count" class="textInput" />

         <label class="inputTitle spacing30">Venue</label>
         <input v-model="editableCourse.venue" placeholder="Enter the venue for this course" class="textInput" />

         <label class="inputTitle spacing30">Price in RMB</label>
         <input
          type="number"
          v-bind:class="{ disabledInput : editableCourse.memberships.length > 0 }"
          v-model="editableCourse.price"
          placeholder="Enter course price"
          class="textInput"
          :disabled="editableCourse.memberships.length > 0"
          />

          <label style="color : #fec60a; font-family : 'Bold'; font-size : 12px;" v-if="editableCourse.memberships.length > 0">
            Cannot change price for this course. This course already has
            <b style="color : #e91e63; font-family : 'Black'; font-size : 18px;">{{editableCourse.memberships.length}}</b>
             membership(s)
          </label>

          <label class="inputTitle spacing30">License Fee in RMB</label>
          <input
           type="number"
           v-bind:class="{ disabledInput : editableCourse.memberships.length > 0 }"
           v-model="editableCourse.license_fee"
           placeholder="Enter license fee"
           class="textInput"
           :disabled="editableCourse.memberships.length > 0"
           />





          <label style="color : #fec60a; font-family : 'Bold'; font-size : 12px;" v-if="editableCourse.memberships.length > 0">
            Cannot change price for this course. This course already has
            <b style="color : #e91e63; font-family : 'Black'; font-size : 18px;">{{editableCourse.memberships.length}}</b>
             membership(s)
          </label>

         <label class="inputTitle spacing30">Start Time</label>
         <input type="date" v-model="editStart" placeholder="Enter a name for this course" class="textInput" />

         <label class="inputTitle spacing30">End Time</label>
         <input type="date" v-model="editEnd" placeholder="Enter a name for this course" class="textInput" />

         <label class="inputTitle spacing30">Last SignUp Date</label>
         <input type="date" v-model="editSignUpDate" placeholder="Enter a name for this course" class="textInput" />


        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">
            <button type="button" class="bt neg" @click="showEditModal = false ; editableCourse = null">Abort</button>
            <button type="button" class="bt pos" @click="editCourse()">Update</button>
          </div>
        </div>
    </modal>

    <modal v-if="displayCheckInQrModal"  @close="hideQrModal()" size="size">
        <h3 slot="header" style="text-align : left;">Course Check In QR Code</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">Below is the check in QR code that users can scan with Wechat MiniProgram.</label>

          <label class="inputTitle spacing30">Course Name</label>
          <label style="color : #37474f;" >{{checkinModel.name}}</label>

          <label class="inputTitle spacing30">QR Cpde</label>
          <div class="qrCont" ref="qrCont">
            <vue-qr :text="qrStr" :callback="onQrGenerated" qid="testid"  :size="qrSize"></vue-qr>
          </div>



        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">



            <button type="button" class="bt neg" @click="hideQrModal()">Close</button>
            <button type="button" class="bt pos" @click="downloadQr">Download</button>
          </div>
        </div>
    </modal>

  </div>
</template>

<script>
import {
    HTTP, URLS
}
from '../network/http';
var NotificationsController = require("../components/NotificationsController.js");
import Modal from "../components/modal.vue";
import Pager from "../components/pager.vue";
import VueQr from 'vue-qr'
  export default {
		name : "courses",
		data()  {
			return {
				courses : [],
        course : {},
        showAddModal: false,
        page : 1,
        limit : 0,
        resultsPerPage : 25,
        keyword:"",
        price: 0,
        showSeachModal:false,
        deletableCourse : null,
        showDeleteModal : null,
        showEditModal : false,
        editableCourse: null,
        editStart : '',
        editEnd : '',
        editSignUpDate: '',
        checkinModel : null,
        displayCheckInQrModal: false,
        qrStr : '',
        qrDataUrl:'',
        qrSize : 300
			}
		},
		components:{
			Modal,
      Pager,
      VueQr
		},
		methods : {
      downloadUserList(course){
        if (course === null || course === undefined) {
          NotificationsController.showNotification('danger' , 'Course is null');
          return
        }

        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.get(URLS.COURSE.REPORT.replace(':id' , course.id) , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
            responseType : 'blob'
          })
            .then(function(res) {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'MYbarre-course-'+ course.name +'users-list.xls');
              document.body.appendChild(link);
              link.click();
              NotificationsController.hideActivityIndicator();
            })
            .catch(function(error) {
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error.response.statusText);
            });
      },
      hideQrModal(){
        this.qrDataUrl = ""; this.qrStr = ""; this.checkinModel = null; this.displayCheckInQrModal = false;
      },
      onQrGenerated(dataUrl,id){
        this.qrDataUrl = dataUrl;
      },
      downloadQr(){
        var link = document.createElement('a');
        link.download = 'mybarre_course_%id_checkin_qrcode.png'.replace('%id' , this.checkinModel.id);
        link.href = this.qrDataUrl
        link.click();
      },
      showCheckInQe(model){
        this.checkinModel  = model;
        this.qrStr = JSON.stringify({
          courseId : model.id ,
          courseName : model.name,
          start : model.start,
          end : model.end
        })
        this.displayCheckInQrModal = true
      },
      showDetail(id){
        console.log("showDetail = " , id);
        this.$emit('showCourseDetail' , id);
        this.$emit("showCourseDetail" , id);
      },
      displayEditModal(course){
        this.editableCourse = course;
        this.editStart = course.start.replace('/' , '-').replace('/' , '-')
        this.editEnd = course.end.replace('/' , '-').replace('/' , '-')
        this.editSignUpDate = course.last_signup_date.replace('/' , '-').replace('/' , '-')
        this.showEditModal = true;
      },
      editCourse(){
        NotificationsController.showActivityIndicator();
        const ctx = this;
        this.editableCourse.start = this.editStart;
        this.editableCourse.end = this.editEnd;
        this.editableCourse.last_signup_date = this.editSignUpDate;
        HTTP.patch(URLS.COURSE.BY_ID.replace(':id' , this.editableCourse.id) , this.editableCourse, {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'Course deleted successfully');
                ctx.editableCourse = null;
                ctx.showEditModal = false
                ctx.getCourses();
            })
            .catch(function(error) {
              ctx.editableCourse = null;
              ctx.showEditModal = false
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      deleteCourse(){
        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.delete(URLS.COURSE.BY_ID.replace(':id' , this.deletableCourse.id) , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'Course deleted successfully');
                ctx.deletableCourse = null;
                ctx.showDeleteModal = false
                ctx.getCourses();
            })
            .catch(function(error) {
              ctx.deletableCourse = null;
              ctx.showDeleteModal = false
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      onPageChanged(page){
        this.page = page;
        this.getCourses();
      },
      search(){
        this.showSeachModal = false
        this.getCourses()
      },
      clearSearch(){
				console.log("clearSearch");
				this.keyword = "";
        this.showSeachModal = false;
        this.price = 0;
				this.getCourses();
			},
			saveCourse(){
        console.log(this.course);
        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.post(URLS.COURSE.CREATE , this.course , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'Course created successfully');
                ctx.course = {};
                ctx.showAddModal = false;
                ctx.getCourses();
            })
            .catch(function(error) {
              ctx.course = {};
              ctx.showAddModal = false;
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      getCourses: function(){
        const ctx = this;
        var url = URLS.COURSE.LIST_ALL;
        url = url + "?limit=" + this.resultsPerPage;
				url = url + "&page=" + this.page;
        if (this.keyword !== undefined && this.keyword !== null && this.keyword !== "" ) {
					url = url + "&name=" + this.keyword;
				}
        if (this.price !== undefined && this.price > 0) {
          url = url + "&price=" + this.price
        }
        HTTP.get(url,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.courses = res.data.data.rows;
          ctx.limit = Math.ceil(res.data.data.count/ctx.resultsPerPage)
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      }
		},
    mounted() {
			this.getCourses();
    }
  }
</script>

<style lang="css">

.disabledInput{
  background: #f5f5f5;
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100% - 60px);
  border-bottom: 0.5px solid #fec60a
}

.qrCont{
  width: 300px;
  height: 300px;
  margin-top: 10px;
}
</style>
