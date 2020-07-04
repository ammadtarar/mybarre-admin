<template lang="html">


		<div style="display : inline-block ; width : 100% ; margin-top : 20px">
      <transition name="slide-fade">

				<div class="full_container">

					<div class="options_container">
						<pager :limit="limit" @onPageChanged="onPageChanged"></pager>
						<a class="bt_container" @click="showSeachModal = true">
							<img class="icon" src="../assets/ic_search.png">
							Search
						</a>

						<a class="bt_container" v-if="keyword !== '' || userStatus !== 'null' || userGender !== 'null' || userWxId !== 'null'" @click="clearSearch">
							Clear Search
						</a>
					</div>

					<div v-if="applicants.length < 1" class="placeholder">
							<img src="../assets/ic_no_results.png" class="sad">
							<label >No users were found...</label>
					</div>

					<table v-if="applicants.length >= 1">
		      <thead>
		        <tr >
							<th  style="width : 5%">#</th>
							<th  style="width : 10%">DATE </br>(Start / Expiry)</th>
		          <th  style="width : 12%">NAME (First/Family/Nick)</th>
		          <th  style="width : 8%">EMAIL</th>
		          <th  style="width : 8%">PHONE</th>
							<th  style="width : 8%">WECHAT ID</th>
							<th  style="width : 7%">GENDER</th>
							<th  style="width : 15%">COURSE</th>
							<th  style="width : 12%">STATUS</th>
							<!-- <th  style="width : 10%">EXPIRY</th> -->
							<th  style="width : 15%">ACTIONS</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr  v-bind:key="user.id" v-for="(user , index) in applicants">

							<td >{{getIndex(index)}}</td>
							<td >{{getStartDate(user)}} </br> {{getExpiry(user)}}</td>
							<td >{{user.first_name || 'N/A'}} / {{user.last_name || 'N/A'}} / {{user.nickname || 'N/A'}}</td>
		          			<td >{{user.email || 'N/A'}}</td>
							<td >{{user.phone || 'N/A'}}</td>
							<td >{{user.wechat_id || 'N/A'}}</td>
		          			<td >{{user.gender ? user.gender.toUpperCase() : 'N/A' || 'N/A'}}</td>
							<td ><span style="white-space: pre-wrap;">{{getCourse(user)}}</span></td>
							<td >{{getMembershipStatus(user)}}</td>
							<!-- <td>{{getExpiry(user)}}</td> -->
							<td>
								<a >
									<button
									@click="$emit('showUserDetail' , user.id)"
										class="btAction green"
									>DETAILS</button>

                  <button
									@click="onClickUpdateMembership(user.memberships[0])"
										class="btAction green"
									>UPDATE STATUS</button>

								</a>
							</td>
		        </tr>
		      </tbody>
		    </table>

		    </div>

      </transition>



			<modal v-if="showSeachModal"  @close="showSeachModal = false" size="size">
					<h3 slot="header" style="text-align : left;">Search & Filters</h3>
					<div slot="body" class="modalBody">
						<label style="color : #37474f">You can search user by using keywords or use any of the filters below. A keyword could be part of the name , email etc</label>
						<label class="inputTitle spacing30">Keyword</label>
						<input type="text" v-model="keyword" placeholder="Enter a keyword here" class="textInput" />

            <label class="inputTitle spacing30">Gender</label>
            <select v-model="userGender" >
							<option disabled value="null">Select one gender</option>
								<option
								v-for="item in genders"
									v-bind:value="item"
									v-bind:key="item">
									{{item.replaceAll("-" , " ").toUpperCase()}}
								</option>
						</select>


            <label class="inputTitle spacing30">Have Wechat ID</label>
            <select v-model="userWxId" >
							<option disabled value="null">Select one case</option>
								<option
								v-for="item in wechatIdCases"
									v-bind:value="item"
									v-bind:key="item">
									{{item.replaceAll("-" , " ").toUpperCase()}}
								</option>
						</select>


						<label class="inputTitle spacing30">Status</label>
						<select v-model="userStatus" >
							<option disabled value="null">Select one type</option>
								<option
								v-for="item in statuses"
									v-bind:value="item"
									v-bind:key="item">
									{{item.replaceAll("-" , " ").toUpperCase()}}
								</option>
						</select>
					</div>
					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" >
							<button type="button" class="bt neg" @click="clearSearch">Clear</button>
							<button type="button" class="bt pos" @click="search">Search</button>
						</div>
					</div>
			</modal>


       <modal v-if="showUpdateStatusModal"  @close="showUpdateStatusModal = false" size="size">
        <h3 slot="header" style="text-align : left;">Update Status</h3>
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

    </div>
</template>

<script>
import { HTTP, URLS } from "../network/http";

import Modal from "../components/modal.vue";
import Pager from "../components/pager.vue";
var NotificationsController = require("../components/NotificationsController.js");
export default {
  name: "users",
  components: {
    Modal,
    Pager
  },
  props: {},
  data() {
    return {
	  usersCount : 0,
      applicants: [],
      page: 1,
      limit: 0,
      resultsPerPage: 25,
      showSeachModal: false,
      keyword: "",
      userStatus: "null",
      userGender: "null",
      genders: [
        'male',
        'female'
      ],
      userWxId: "null",
      wechatIdCases : [
        'yes',
        'no'
      ],
      statuses: [
        "temporary-freeze",
        "pre-instructor", // MEANS USER PAIDED AND SIGNED UP
        "pre-instructor-tbc", //USER DID NOT ATTEND TRAINING CLASSES
        "instructor-in-training", // USER ATTENDED THE TRAINING CLASSES
        "training-videos-submitted", // USER SUBMITTED TRAINING VIDEOS AFTER TRAINING CLASSES
        "exam-passed", // SUBMITTED TRAINING VIDEOS PASSED
        "exam-failed", // SUBMITTED TRAINING VIDEOS FAILED
        "license-fee-paid", // USER PASSED THE EXAM AND PAID THE LICENSE FEE
        "licensed-instructor" // USER PASSED THE EXAM AND PAID THE LICENSE FEE
      ],
      showUpdateStatusModal: false,
     membership : null,
      newStatus : '',
      
    };
  },
  methods: {
   onClickUpdateMembership(membership){
     if(membership === null || membership === undefined){
       NotificationsController.showNotification('warning' , 'Membership not found. Please try again later');
       return;
     }
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
          ctx.getUsers()
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
	getIndex(index){

		if(this.page === 1) {
			return this.usersCount - index
		}else{
			return (this.usersCount - ((this.page - 1) * this.resultsPerPage)) - index
		}
		
	},
    getMembershipStatus(user) {
      const memberships = user.memberships || null;
      if (memberships === null) {
        return "Not Enrolled Yet";
      }
      if (memberships.length <= 0) {
        return "Not Enrolled Yet";
      }
      const active = memberships[memberships.length - 1] || null;
      if (active === null) {
        return "Not Enrolled Yet";
      }

      const status = active.status || null;
      if (status === null) {
        return "Not Enrolled Yet";
      }

      var membershipStatus = status.replaceAll("-", " ").toUpperCase();
      return membershipStatus;
    },
    getExpiry(user) {
      const memberships = user.memberships || null;
      if (memberships === null) {
        return "N/A";
      }
      if (memberships.length <= 0) {
        return "N/A";
      }
      const active = memberships[memberships.length - 1] || null;
      if (active === null) {
        return "N/A";
      }

      const expiry = active.end || null;
      if (status === null) {
        return "N/A";
      }
      return expiry;
	},
	getStartDate(user) {
      const memberships = user.memberships || null;
      if (memberships === null) {
        return "N/A";
      }
      if (memberships.length <= 0) {
        return "N/A";
      }
      const active = memberships[memberships.length - 1] || null;
      if (active === null) {
        return "N/A";
      }

      const start = active.start || null;
      if (start === null) {
        return "N/A";
      }
      return start;
    },
    getCourse(user) {
      const memberships = user.memberships || null;
      if (memberships === null) {
        return "Not Enrolled Yet";
      }
      if (memberships.length <= 0) {
        return "Not Enrolled Yet";
      }
      const active = memberships[memberships.length - 1] || null;
      if (active === null) {
        return "Not Enrolled Yet";
      }

      const course = active.course || null;

      if (course === null) {
        return "Not Enrolled Yet";
      }

      return course.name + " \n ( " + course.start + " ) ";
    },
    search() {
      this.showSeachModal = false;
      this.getUsers();
    },
    clearSearch() {
      console.log("clearSearch");
      this.keyword = "";
      this.type = "null";
      this.level = "null";
      this.userStatus = "null";
      this.userGender = "null";
      this.userWxId = "null";
      this.getUsers();
      this.showSeachModal = false;
    },
    onPageChanged(page) {
	  this.page = page;
      this.getUsers();
    },
    getUsers() {
      const ctx = this;
      var url = URLS.USER.LIST_ALL;
      url = url + "?limit=" + this.resultsPerPage;
      url = url + "&page=" + this.page;
      if (
        this.keyword !== undefined &&
        this.keyword !== null &&
        this.keyword !== ""
      ) {
        url = url + "&keyword=" + this.keyword;
      }
      if (
        this.userStatus !== undefined &&
        this.userStatus !== null &&
        this.userStatus !== "" &&
        this.userStatus !== "null"
      ) {
        url = url + "&status=" + this.userStatus;
      }
      if (
        this.userGender !== undefined &&
        this.userGender !== null &&
        this.userGender !== "" &&
        this.userGender !== "null"
      ) {
        url = url + "&gender=" + this.userGender;
      }

      if (
        this.userWxId !== undefined &&
        this.userWxId !== null &&
        this.userWxId !== "" &&
        this.userWxId !== "null"
      ) {
        url = url + "&have_wechat_id=" + this.userWxId;
      }

      HTTP.get(url, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(res) {
          const data = res.data.data;
		  ctx.applicants = data.rows;
		  ctx.usersCount = res.data.data.count;
          ctx.limit = Math.ceil(res.data.data.count / ctx.resultsPerPage);
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
    }
  },
  mounted() {
    console.log("applicants mounted");
    this.getUsers();
  }
};
</script>

<style>
.options_container {
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.modalBody {
  text-align: left;
  display: flex;
  flex-direction: column;
}

.options_container .bt_container {
  height: 54px;
  width: 200px;
  background: black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: white;
  justify-content: center;
  margin-left: 10px;
  box-shadow: 0px 0px 10px 0px #bdbdbd;
}
.options_container .bt_container:hover {
  font-family: bold;
}

.options_container .bt_container .icon {
  width: 30px;
  height: 30px;
  margin-right: 0 auto;
}

.applicant_avatar {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin-left: 2.5px;
  margin-right: 2.5px;
  margin-top: 5px;
}

.title_container {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.title_container .back {
  width: 20px;
  height: 20px;
  background: #4e08f0;
  padding: 10px;
  border-radius: 50%;
}

.title_container .title {
  font-size: 18px;
  font-family: "ExtraBold";
  font-size: 24px;
  color: white;
  margin-left: 10px;
}

.companyCardContainer {
  display: flex;
  flex-direction: column;
  width: 1000px;
  background: white;
  padding: 40px;
  border-radius: 4px;
}

.btPurple {
  background: #4e08f0;
}

.horizontalGridContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.horizontalContainer {
  width: 50%;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.languageTitle {
  width: 100%;
  font-size: 14px;
  color: #4e08f0;
  font-family: bold;
}

.placeholder {
  display: flex;
  flex-direction: column;
  height: 500px;
  color: white;
  font-size: 18px;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: white;
  width: 500px;
  font-family: bold;
  border-radius: 250px;
  margin: 0 auto;
  margin-top: 200px;
}

.placeholder .sad {
  width: 200px;
  margin-bottom: 20px;
}
</style>
