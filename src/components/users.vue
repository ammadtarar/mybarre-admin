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

						<a class="bt_container" v-if="keyword !== ''" @click="clearSearch">
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
							<th  style="width : 2">ID</th>
		          <th  style="width : 20">NAME</th>
		          <th  style="width : 20%">EMAIL</th>
		          <th  style="width : 20%">PHONE</th>
							<th  style="width : 13%">GENDER</th>
							<th  style="width : 15%">ACTIONS</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr  v-bind:key="user.id" v-for="user in applicants">
							<td >{{user.id || 'N/A'}}</td>
							<td >{{user.name || 'N/A'}}</td>
		          <td >{{user.email || 'N/A'}}</td>
							<td >{{user.phone || 'N/A'}}</td>
		          <td >{{user.gender ? user.gender.toUpperCase() : 'N/A' || 'N/A'}}</td>
							<td>
								<a :href="user.cv_url">
									<button
									@click="$emit('showUserDetail' , user.id)"
										class="btAction purple"
									>DETAILS</button>
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
					</div>
					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" >
							<button type="button" class="bt neg" @click="clearSearch">Clear</button>
							<button type="button" class="bt pos" @click="search">Search</button>
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
		name: 'users',
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
	    };
	  },
		methods:{
			search(){
				this.showSeachModal = false
				this.getUsers()
			},
			clearSearch(){
				console.log("clearSearch");
				this.keyword = "";
				this.type = "null";
				this.level = "null";
				this.status = "null";
				this.getUsers()
				this.showSeachModal = false;
			},
			onPageChanged(page){
				this.page = page;
	      this.getUsers();
			},
			getUsers(){
				const ctx = this;
				var url = URLS.USER.LIST_ALL;
				url = url + "?limit=" + this.resultsPerPage;
				url = url + "&page=" + this.page;
				if (this.keyword !== undefined && this.keyword !== null && this.keyword !== "" ) {
					url = url + "&keyword=" + this.keyword;
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


.options_container{
	width: 100%;
	height: 52px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-bottom: 10px;
}

.modalBody{
	text-align: left;
	display: flex;
	flex-direction: column;
}


.options_container .bt_container{
	height: 54px;
	width: 200px;
	background: #4E08F0;
	border-radius: 10px;;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 16px;
	color: white;
	justify-content: center;
	margin-left: 10px;
}
.options_container .bt_container:hover{
	font-family: bold;
}

.options_container .bt_container .icon{
	width: 30px;
	height: 30px;
	margin-right: 0 auto;
}



.applicant_avatar{
	width: 100px;
	height: 100px;
	overflow: hidden;
	margin-left: 2.5px;
	margin-right: 2.5px;
	margin-top: 5px;
}

.title_container{
	width: 100%;
	height: 50px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
}

.title_container .back{
	width: 20px;
	height: 20px;
	background: #4E08F0;
	padding: 10px;
	border-radius: 50%;
}

.title_container .title{

	font-size: 18px;
	font-family: 'ExtraBold';
	font-size: 24px;
	color: white;
	margin-left: 10px;
}

.companyCardContainer{
  display: flex;
  flex-direction: column;
  width: 1000px;
  background: white;
  padding: 40px;
  border-radius: 4px;
}

.btPurple{
  background: #4E08F0
}


.horizontalGridContainer{
	width: 100%;
	display: flex;
	flex-direction: row;
}

.horizontalContainer{
	width: 50%;
	text-align: left;
	display: flex;
	flex-direction: column;
}

.languageTitle{
	width: 100%;
	font-size: 14px;
	color: #4E08F0;
	font-family: bold;
}

.placeholder{
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

.placeholder .sad{
	width: 200px;
	margin-bottom: 20px;
}


</style>
