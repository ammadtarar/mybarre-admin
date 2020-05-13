<template lang="html">


		<div style="display : inline-block ; width : 100% ">
      <transition name="slide-fade">

				<div class="full_container">

					<div class="options_container">
						<pager :limit="limit" @onPageChanged="onPageChanged"></pager>
						<a class="bt_container" @click="showSeachModal = true">
							<img class="icon" src="../assets/ic_search.png">
							Search
						</a>

						<a class="bt_container" v-if="keyword !== '' || orderStatus !== 'null'" @click="clearSearch">
							Clear Search
						</a>

					</div>

					<div v-if="applicants.length < 1" class="placeholder">
							<img src="../assets/ic_no_results.png" class="sad">
							<label >No orders were found...</label>
					</div>

					<table v-if="applicants.length >= 1">
		      <thead>
		        <tr >
							<th  style="width : 2">ID</th>
		          <th  style="width : 20">RECIEPIENT NAME</th>
		          <th  style="width : 15%">PHONE</th>
		          <th  style="width : 23%">ADDRESS</th>
							<th  style="width : 13%">CITY</th>
							<th  style="width : 12%">STATUS</th>
							<th  style="width : 15%">ACTIONS</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr  v-bind:key="user.id" v-for="user in applicants">
							<td >{{user.id || 'N/A'}}</td>
							<td >{{user.reciepient_name || 'N/A'}}</td>
		          <td >{{user.phone || 'N/A'}}</td>
							<td >{{user.address || 'N/A'}}</td>
							<td >{{user.city || 'N/A'}}</td>
							<td >{{user.status ? user.status.replace('_' , ' ').toUpperCase() : 'N/A' || 'N/A'}}</td>
							<td>
								<button
								@click="$emit('showOrderDetail' , user.id)"
										class="btAction green"
									>DETAILS</button>

									<button
									v-if="user.status  === 'pending_dispatch'"
									@click="displayChecklistModal(user)"
											class="btAction green"
										>MARK AS DISPATCHED</button>
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

						<label class="inputTitle spacing30">Status</label>
						<select v-model="orderStatus" >
							<option disabled value="null">Select one type</option>
								<option
								v-for="item in statuses"
									v-bind:value="item"
									v-bind:key="item">
									{{item.replace("_" , " ").toUpperCase()}}
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


			<modal v-if="showStatusModal"  @close="showStatusModal = false ; updateableOrderObject = null" size="size">
					<h3 slot="header" style="text-align : left;">Mark As Dispatched ...</h3>
					<div slot="body" class="modalBody">
						<label style="color : #37474f">Please provide courier details below. User will be able to see the name of the courier company and tracking number.</label>

						<label class="inputTitle spacing30">Order #</label>
						<label style="color : #37474f ; ">{{updateableOrderObject.id}}</label>

						<label class="inputTitle spacing30">Reciepient's Name</label>
						<label style="color : #37474f ;">{{updateableOrderObject.reciepient_name}}</label>

						<label class="inputTitle spacing30">Courier Company :</label>
						<input type="text" v-model="courierCompany" placeholder="Enter courier company's name" class="textInput" />

						<label class="inputTitle spacing30">Tracking #</label>
						<input type="text" v-model="trackingNumber" placeholder="Enter courier tracking number" class="textInput" />


					</div>
					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" >
							<button type="button" class="bt neg" @click="showStatusModal = false ; updateableOrderObject = null">Abort</button>
							<button type="button" class="bt pos" @click="updateStatus">Update</button>
						</div>
					</div>
			</modal>


			<modal v-if="showChecklistModal"  @close="showChecklistModal = false ; updateableOrderObject = null" size="big">
					<h3 slot="header" style="text-align : left;">Products Checklist</h3>
					<div slot="body" class="modalBody">
						<label style="color : #37474f">Please refer to this products checklist and mark all the item to continue</label>

						<table  style="margin-top : 20px">
						<thead style="text-align : center">
							<tr >
								<th  style="width : 10%">Check</th>
								<th  style="width : 30">Item Name</th>
								<th  style="width : 20">Quantity</th>
								<th  style="width : 20%">Color</th>
								<th  style="width : 20%">Size</th>
							</tr>
						</thead>
						<tbody>
							<tr  v-bind:key="item.id" v-for="item in updateableOrderObject.items" style="text-align : center">
								<td >
									<input type="checkbox" :value="item.selected"  v-model="item.selected" @click="item.selected = !item.selected;"></input>
								</td>
								<td >{{item.product.name || 'N/A'}}</td>
								<td >{{item.count || 'N/A'}}</td>
								<td >{{item.color.name_en || 'N/A'}}</td>
								<td >{{item.size.name_en || 'N/A'}}</td>
							</tr>
						</tbody>
					</table>


					</div>
					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" >
							<button type="button" class="bt neg" @click="showChecklistModal = false ; updateableOrderObject = null">Abort</button>
							<button type="button" class="bt pos" @click="itemsChecked">Update</button>
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

import Modal from "../components/modal.vue";
import Pager from "../components/pager.vue";
var NotificationsController = require("../components/NotificationsController.js");
  export default {
		name: 'orders',
	  components: {
			Modal,
			Pager
	  },
		props:{

		},
	  data() {
	    return {
				applicants : [],
				page : 1,
	      limit : 0,
	      resultsPerPage : 25,
				showSeachModal:false,
				keyword: "",
				updateableOrderObject : null,
				showStatusModal : false,
				status: 'dispatched',
				courierCompany: null,
				trackingNumber: null,
				orderStatus : 'null',
				statuses: ['all' , 'pending_payment', 'pending_dispatch', 'dispatched', 'completed'],
				showChecklistModal: false
	    };
	  },
		methods:{
			itemsChecked(){
				 var total = this.updateableOrderObject.items.length;
				 var count = 0;
				this.updateableOrderObject.items.forEach((item, i) => {
					if (item.selected) {
						count++;
					}
				});
				if (total === count) {
					this.showChecklistModal = false;
					this.displayUpdateStatusModal(this.updateableOrderObject);
				}else{
					NotificationsController.showNotification('warning' , 'Please check mark all the products in the list')
				}
			},
			displayChecklistModal(order){
				console.log(order)
				this.updateableOrderObject = order;
				this.showChecklistModal = true;
			},
			displayUpdateStatusModal(bundle){
				console.log("displayUpdateStatusModal");
				this.updateableOrderObject = bundle;
				this.showStatusModal = true;
			},
			updateStatus(){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				HTTP.post(URLS.ORDER.UPDATE_STATUS.replace(':id' , this.updateableOrderObject.id) , {status : 'dispatched' , courier_company : this.courierCompany , tacking_number : this.trackingNumber}, {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
						.then(function(res) {
							ctx.getUsers();
							ctx.showStatusModal = false;
							ctx.updateableOrderObject = null;
							ctx.courierCompany = null;
							ctx.trackingNumber = null;
							NotificationsController.hideActivityIndicator();
							NotificationsController.showNotification('success' , 'Order updated successfully')
						})
						.catch(function(error) {
							ctx.showStatusModal = false;
							ctx.courierCompany = null;
							ctx.trackingNumber = null;
							ctx.updateableOrderObject = null;
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
			showBundleDetail(model){
				console.log("inside showBundleDetail in celist");
				console.log(model);
				this.$emit('showBundleDetail' , model.id)
			},
			search(){
				this.showSeachModal = false
				this.getUsers()
			},
			clearSearch(){
				console.log("clearSearch");
				this.keyword = "";;
				this.orderStatus = "null";
				this.getUsers()
				this.showSeachModal = false;
			},
			onPageChanged(page){
				this.page = page;
	      this.getUsers();
			},
			getUsers(){
				const ctx = this;
				var url = URLS.ORDER.LIST_ALL;
				url = url + "?limit=" + this.resultsPerPage;
				url = url + "&page=" + this.page;
				if (this.keyword !== undefined && this.keyword !== null && this.keyword !== "" ) {
					url = url + "&keyword=" + this.keyword;
				}

				if (this.orderStatus !== undefined && this.orderStatus !== null && this.orderStatus !== "null" && this.orderStatus !== "all") {
					url = url + "&status=" + this.orderStatus;
				}

				HTTP.get(url ,  {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
						.then(function(res) {

								const data = res.data.data;
								ctx.applicants = data.rows
								ctx.limit = Math.ceil(res.data.data.count/ctx.resultsPerPage)
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
  }
</script>

<style>


.descText{
  width: 100%;
	height: 100px;
	min-height: 100px;
  color: black;
  height: 40px;
  font-size: 18px;
  border : 0px solid transparent;
  border-bottom: 1px solid #bdbdbd;
  outline: none;
}

.imgPreviewSmall{
	width: 150px;
	height: 150px;
}
.imgPreview{
	min-width: 150px;
	min-height: 150px;
	max-width: 200px;
	margin-top: 10px;
}

.prodImgPicker {
 width: 150px;
 height: 38px;
	line-height: 38px;
 text-align: center;
 border-radius: 4px;
 font-size: 15px;
 transition: all 0.25s;
	color: #e91e63;
	border: 2px solid #e91e63;
	font-family: black;
	margin-left: 10px;
}

.prodImgPicker:hover{
	background: #e91e63;
	color: white;
}


select {
	width: 100%;

	cursor:pointer;
 display:inline-block;
 position:relative;
 color:black;
 border: 0px;
 border-bottom: 1px solid #ccc;
 height: 40px;
 font-size: 16px;
 font-family: medium;
 text-align: center;
 outline: none;
}

</style>
