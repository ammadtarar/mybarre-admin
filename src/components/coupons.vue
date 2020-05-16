<template lang="html">
  <div class="courses" style="margin-top : 20px;">

    <div class="options_container">
      <pager :limit="limit" @onPageChanged="onPageChanged"></pager>
      <a class="bt_container" @click="showSeachModal = true">
        <img class="icon" src="../assets/ic_search.png">
        Search
      </a>

      <a class="bt_container" v-if="name !== null || code !== null || value !== null || couponType !== 'null'" @click="clearSearch">
        Clear Search
      </a>


      <a class="bt_container" @click="type = 'create' ; showAddModal = true">
        <img class="icon" src="../assets/ic_add_white.png">
        Add New Coupon
      </a>
    </div>

		<div v-if="courses.length < 1" class="placeholder">
				<img src="../assets/ic_no_results.png" class="sad">
				<label >No coupons were found...</label>
		</div>

    <table v-if="courses.length >= 1">
    <thead>
      <tr >
        <th  style="width : 2">ID</th>
        <th  style="width : 23">NAME</th>
        <th  style="width : 20%">CODE</th>
        <th  style="width : 10%">TYPE</th>
        <th  style="width : 10%">VALUE</th>
        <th  style="width : 10%">MAX USE COUNT</th>
				<th  style="width : 10%">TIMES REDEEMED</th>
        <th  style="width : 15%">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-bind:key="course.id" v-for="course in courses">
        <td >{{course.id || 'N/A'}}</td>
        <td >{{course.name || 'N/A'}}</td>
        <td >{{course.code || 'N/A'}}</td>
        <td style="text-transform: capitalize;">{{course.type || 'N/A'}}</td>
				<td >{{course.value || 'N/A'}}</td>
        <td >{{course.use_count || 'N/A'}}</td>
				<td >{{course.users.length || '0'}}</td>
        <td style="text-align : center">

						<button class="btAction" v-bind:class="{ grey : course.users.length <= 0, green : course.users.length > 0}" @click="downloadUserList(course)">
								EXPORT USERS LIST
						</button>

            <button class="btAction green" @click="couponsObj = course; showUsersModal = true;">
								USERS LIST
						</button>

            <button class="btAction red" @click="deletableCoupon = course; showDeleteModal = true;">
							DELETE
						</button>

        </td>
      </tr>
    </tbody>
  </table>

  <modal v-if="showSeachModal"  @close="showSeachModal = false" size="size">
      <h3 slot="header" style="text-align : left;">Search & Filters</h3>
      <div slot="body" class="modalBody">
        <label style="color : #37474f">You can search coupon by name , type and value.</label>

			  <label class="inputTitle spacing30">Coupon Name</label>
        <input type="text" v-model="name" placeholder="Enter coupon name" class="textInput" />

        <label class="inputTitle spacing30">Value</label>
        <input type="number" min="0" v-model="value" placeholder="Enter coupon value here" class="textInput" style="width : 100%"/>

				<label class="inputTitle spacing30">Code</label>
        <input v-model="code" placeholder="Enter coupon code here" class="textInput" style="width : 100%"/>

				<label class="inputTitle spacing30">Type</label>
				<select v-model="couponType" >
					<option disabled value="null">Select one type</option>
						<option
						v-for="item in types"
							v-bind:value="item"
							v-bind:key="item">
							<span>{{item.toUpperCase()}}</span>
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

		<modal v-if="showAddModal"  @close="showAddModal = false " size="size">
	      <h3 slot="header" style="text-align : left;">Add New Coupon ...</h3>
	      <div slot="body" class="modalBody">


	        <label class="inputTitle spacing30">Name</label>
	        <input type="text" v-model="coupon.name" placeholder="Enter a name " class="textInput" />

	        <label class="inputTitle spacing30">Max Users Count</label>
	        <input type="number" v-model="coupon.max_count" placeholder="Enter max users count" class="textInput" />

					<label class="inputTitle spacing30">Code</label>
	        <input v-model="coupon.code" placeholder="Enter a code " class="textInput" />

          <label class="inputTitle spacing30">Type</label>
					<select v-model="coupon.type" >
						<option disabled value="null">Select one type</option>
							<option
							v-for="item in types"
								v-bind:value="item"
								v-bind:key="item">
								<span>{{item.toUpperCase()}}</span>
							</option>
					</select>

					<label class="inputTitle spacing30">Value</label>
	        <input type="number"  v-model="coupon.value" placeholder="Enter course value" class="textInput" />


	      </div>
	      <div class="buttonsWrapper" slot="footer">
	        <div class="bottonsContainer" >
	          <button type="button" class="bt neg" @click="showAddModal = false ; coupon = {type : 'null'}">Abort</button>
	          <button type="button" class="bt pos" @click="saveCoupon">Save</button>
	        </div>
	      </div>
	  </modal>


    <modal v-if="showDeleteModal"  @close="showDeleteModal = false ; deletableCoupon = null" size="size">
        <h3 slot="header" style="text-align : left;">Delete Coupon ...</h3>
        <div slot="body" class="modalBody">

          <label style="color : #37474f">Are you sure you want to delete this coupon?</label>

          <label class="inputTitle spacing30">Coupon Name</label>
          <label style="color : #37474f;" >{{deletableCoupon.name}}</label>



        </div>
        <div class="buttonsWrapper" slot="footer">
          <div class="bottonsContainer" style="width : 100% !important">
            <button type="button" class="bt neg" @click="showDeleteModal = false ; deletableCoupon = null">Abort</button>
            <button type="button" class="bt pos"  @click="deleteCoupon()">Delete</button>
          </div>
        </div>
    </modal>

		<modal v-if="showUsersModal"  @close="showUsersModal = false ; couponsObj = null" size="big">
				<h3 slot="header" style="text-align : left;">Redeemed Users List for {{couponsObj.name}}</h3>
				<div slot="body" class="modalBody">


					<div v-if="couponsObj.users.length < 1" class="placeholder" style="height : 300px !important; margin-top : 0px !important">
							<img src="../assets/ic_no_results.png" class="sad" >
							<label style="color : black">Nobody Has Redeemed This Coupon...</label>
					</div>

					<table v-if="couponsObj.users.length >= 1">
					<thead>
						<tr style="text-align : center">
							<th  style="width : 5">ID</th>
							<th  style="width : 10">FIRST NAME</th>
							<th  style="width : 10">FAMILY NAME</th>
							<th  style="width : 10">NICKNAME</th>
							<th  style="width : 15%">EMAIL</th>
							<th  style="width : 15%">PHONE</th>
							<th  style="width : 10%">GENDER</th>
							<th  style="width : 10%">WECHAT ID</th>
              <th  style="width : 15%">Course Name</th>
						</tr>
					</thead>
					<tbody>
						<tr  v-bind:key="user.id" v-for="user in couponsObj.users" style="text-align : center">
							<td >{{user.id || 'N/A'}}</td>
							<td >{{user.first_name || 'N/A'}}</td>
							<td >{{user.last_name || 'N/A'}}</td>
							<td >{{user.nickname || 'N/A'}}</td>
							<td >{{user.email || 'N/A'}}</td>
							<td >{{user.phone || 'N/A'}}</td>
							<td >{{user.gender ? user.gender.toUpperCase() : 'N/A' || 'N/A'}}</td>
							<td >{{user.wechat_id || 'N/A'}}</td>
              <td >{{getCourse(user)}}</td>
						</tr>
					</tbody>
				</table>




				</div>
				<div class="buttonsWrapper" slot="footer">
					<div class="bottonsContainer" style="width : 100% !important">
						<button type="button" class="bt neg" @click="showUsersModal = false ; couponsObj = null">Close</button>
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

export default {
		name : "coupons",
		data()  {
			return {
				courses : [],
        showAddModal: false,
        page : 1,
        limit : 0,
        resultsPerPage : 25,
        showSeachModal:false,
        deletableCoupon : null,
        showDeleteModal : null,
				coupon : {type : ''},
				code: null,
				name : null ,
				value : null,
				couponType: 'null',
				types: [
					'percentage',
					'amount'
				],
				usersModal: null,
				showUsersModal: false
			}
		},
		components:{
			Modal,
      Pager
		},
		methods : {
      getCourse(user){
        if (user === undefined || user === null) {
          return "N/A";
        }

        const memberships = user.memberships || null;
        if (memberships === null) {
          return 'N/A';
        }
        if (memberships.length <= 0) {
          return 'N/A';
        }
        const active = memberships[memberships.length -1] || null;
        if (active === null) {
          return 'N/A';
        }

        const course = active.course || null;
        if (course === null) {
          return 'N/A';
        }
        return course.name;
      },
			downloadUserList(coupon){
				if (coupon.users.length <= 0) {
					NotificationsController.showNotification('warning' , 'Nobody has redeemed this coupon yet');
					return;
				}

        if (coupon === null || coupon === undefined) {
          NotificationsController.showNotification('danger' , 'Coupon is null');
          return
        }

        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.get(URLS.COUPON.USERS_REPORT.replace(':id' , coupon.id) , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
            responseType : 'blob'
          })
            .then(function(res) {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'MYbarre-coupon-'+ coupon.name +'users-list.xls');
              document.body.appendChild(link);
              link.click();
              NotificationsController.hideActivityIndicator();
            })
            .catch(function(error) {
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error.response.statusText);
            });
      },
      deleteCoupon(){
        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.delete(URLS.COUPON.BY_ID.replace(':id' , this.deletableCoupon.id) , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'Coupon deleted successfully');
                ctx.deletableCoupon = null;
                ctx.showDeleteModal = false
                ctx.getCoupons();
            })
            .catch(function(error) {
              ctx.deletableCoupon = null;
              ctx.showDeleteModal = false
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      onPageChanged(page){
        this.page = page;
        this.getCoupons();
      },
      search(){
        this.showSeachModal = false
        this.getCoupons()
      },
      clearSearch(){
				this.name = null;
				this.value = null;
				this.code = null;
				this.couponType = "null";
        this.showSeachModal = false;
				this.getCoupons();
			},
			saveCoupon(){
				if (!this.coupon.name) {
					NotificationsController.showNotification('danger' , 'Please enter a name for the coupon');
					return
				}

				if (!this.coupon.max_count) {
					NotificationsController.showNotification('danger' , 'Please enter max user for the coupon');
					return
				}

				if (!this.coupon.code) {
					NotificationsController.showNotification('danger' , 'Please enter a code for the coupon');
					return
				}

				if (!this.coupon.type || this.coupon.type === '' || this.coupon.type === 'null') {
					NotificationsController.showNotification('danger' , 'Please select a coupon type');
					return
				}

				if (!this.coupon.value) {
					NotificationsController.showNotification('danger' , 'Please enter a value for the coupon');
					return
				}

				if (this.coupon.type === 'percentage' && this.coupon.value > 100) {
					NotificationsController.showNotification('danger' , 'Coupon value for percentage type can maximum be 100');
					return
				}

        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.post(URLS.COUPON.CREATE , this.coupon , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'Coupon created successfully');
                ctx.coupon = {type : 'null'};
                ctx.showAddModal = false;
                ctx.getCoupons();
            })
            .catch(function(error) {
              ctx.coupon = {type : 'null'};
              ctx.showAddModal = false;
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      getCoupons: function(){
        const ctx = this;
        var url = URLS.COUPON.LIST_ALL;
        url = url + "?limit=" + this.resultsPerPage;
				url = url + "&page=" + this.page;
        if (this.name !== undefined && this.name !== null && this.name !== "" ) {
					url = url + "&name=" + this.name;
				}
        if (this.value !== undefined && this.value > 0) {
          url = url + "&value=" + this.value
        }
				if (this.couponType !== undefined && this.couponType !== null && this.couponType !== "null" ) {
          url = url + "&type=" + this.couponType
        }
				if (this.code !== undefined && this.code !== null && this.code !== "" ) {
          url = url + "&code=" + this.code
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
			this.getCoupons();
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
