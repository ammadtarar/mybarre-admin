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


						<a class="bt_container" @click="type = 'create' ; showAddModal = true">
							<img class="icon" src="../assets/ic_add.png">
							Add New Product
						</a>
					</div>

					<div v-if="applicants.length < 1" class="placeholder">
							<img src="../assets/ic_no_results.png" class="sad">
							<label >No products were found...</label>
					</div>

					<table v-if="applicants.length >= 1">
		      <thead>
		        <tr >
							<th  style="width : 2">ID</th>
		          <th  style="width : 20">NAME</th>
		          <th  style="width : 25%">DESCRIPTION</th>
		          <th  style="width : 13%">PRICE</th>
							<th  style="width : 13%">PIECES IN STOCK</th>
							<th  style="width : 12%">STATUS</th>
							<th  style="width : 15%">ACTIONS</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr  v-bind:key="user.id" v-for="user in applicants">
							<td >{{user.id || 'N/A'}}</td>
							<td >{{user.name || 'N/A'}}</td>
		          <td >{{user.description || 'N/A'}}</td>
							<td >{{user.price || 'N/A'}}</td>
							<td >{{user.count || 'N/A'}}</td>
							<td >{{user.status ? user.status.toUpperCase() : 'N/A' || 'N/A'}}</td>
							<td>
								<button @click="previewImage(user)"
										class="btAction purple"
									>PREVIEW IMAGE</button>
								<button @click="editProduct(user)"
										class="btAction purple"
									>EDIT</button>
								<button
								@click="displayDeleteModal(user)"
									class="btAction"
									v-bind:class="{red : user.status === 'active' , purple : user.status !== 'active'}"
								>{{user.status === 'active' ? 'RETIRE' : 'ACTIVATE'}}</button>
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


			<modal v-if="showDeleteModal"  @close="showDeleteModal = false ; deletableBundleObject = null" size="size">
					<h3 slot="header" style="text-align : left;">{{deletableBundleObject.status === 'active' ? 'Retire' : 'Activate'}} Product ?</h3>
					<div slot="body" class="modalBody">
						<label style="color : #37474f">You sure you want to retire <b style="color : #4E08F0 ; font-family : 'Bold'">{{deletableBundleObject.name}}</b> from products list ? Once you retire this product , users will not be able to see this product in the app.</label>
					</div>
					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" >
							<button type="button" class="bt neg" @click="showDeleteModal = false ; deletableBundleObject = null">Abort</button>
							<button type="button" class="bt pos" @click="deleteBundle">Yes , {{deletableBundleObject.status === 'active' ? 'Retire' : 'Activate'}} This Product</button>
						</div>
					</div>
			</modal>

			<modal v-if="showAddModal"  @close="showAddModal = false" size="size">
					<h3 slot="header" style="text-align : left;">{{type === 'create' ? 'Add New Product ...' : 'Edit Product ...'}}</h3>
					<div slot="body" class="modalBody">
						<label class="inputTitle spacing30">Name</label>
						<input type="text" v-model="form.name" placeholder="Enter a name here" class="textInput" style="width : 100%"/>

						<label class="inputTitle spacing30">PRICE</label>
						<input type="number" v-model="form.price" placeholder="Enter price here" class="textInput" style="width : 100%"/>

						<label class="inputTitle spacing30">PIECES IN STOCK</label>
						<input type="number" v-model="form.count" placeholder="Enter stock count here" class="textInput" style="width : 100%"/>

						<label class="inputTitle spacing30">DESCRIPTION</label>
						<textarea type="text"  v-model="form.description" placeholder="Enter some description about the product here" class="descText"  />

						<label class="inputTitle spacing30">IMAGE</label>
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
							<button type="button" class="bt neg" @click="showAddModal = false ; form = {}">Abort</button>
							<button type="button" class="bt pos" @click="uploadFile">{{type === 'create' ? 'Save' : 'Update'}}</button>
						</div>
					</div>
			</modal>

			<FilesUploadModal v-if="showFilesModal" @uploadSuccess="filesUploadSuccess" :bundleId='newBundle.id'/>

    </div>
</template>

<script>
import {
    HTTP, URLS
}
from '../network/http';

import Modal from "../components/modal.vue";
import Pager from "../components/pager.vue";
import FilesUploadModal from "../components/filesUploadModal.vue";
var NotificationsController = require("../components/NotificationsController.js");
  export default {
		name: 'products',
	  components: {
			Modal,
			Pager,
			FilesUploadModal
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
				form : {},
				showAddModal:false,
				newBundle:null,
				showFilesModal:false,
				deletableBundleObject : null,
				showDeleteModal : false,
				url: null,
				imgFile :null,
				type : 'create',
				updateId : -1
	    };
	  },
		methods:{
			previewImage(product){
				this.$root.$emit('showImage' , {url  : product.thumbnail_url});
			},
			editProduct(product){
				this.type = 'edit';
				this.updateId = product.id;
				this.form = {
					name : product.name ,
					price : product.price ,
					description : product.description ,
					count : product.count
				};
				this.url = product.thumbnail_url;
				this.showAddModal = true;
			},
			onFileChange(e) {
				const file = e.target.files[0];
      	this.url = URL.createObjectURL(file);
				this.imgFile = file;
			 },
			displayDeleteModal(bundle){
				this.deletableBundleObject = bundle;
				this.showDeleteModal = true;
			},
			deleteBundle(){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				var url = "";
				if (this.deletableBundleObject.status === 'active') {
					url = URLS.PRODUCT.RETIRE;
				}else{
					url = URLS.PRODUCT.ACTIVATE;
				}
				HTTP.post(url.replace(':id' , this.deletableBundleObject.id) , {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
						.then(function(res) {
							ctx.getUsers();
							ctx.showDeleteModal = false;
							ctx.deletableBundleObject = null;
							NotificationsController.hideActivityIndicator();
							NotificationsController.showNotification('success' , 'Product updated successfully')
						})
						.catch(function(error) {
							ctx.showDeleteModal = false;
							ctx.deletableBundleObject = null;
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
			filesUploadSuccess: function(){
				this.showFilesModal = false;
				this.newBundle = null;
				this.getUsers();
			},
			showBundleDetail(model){
				console.log("inside showBundleDetail in celist");
				console.log(model);
				this.$emit('showBundleDetail' , model.id)
			},
			uploadFile(){
				if (this.type !== 'create' && this.imgFile === null) {
					this.updateProduct(null);
				}else{
					const ctx = this;
					NotificationsController.showActivityIndicator();
					var formData = new FormData();
					formData.append("file", this.imgFile);
					var url = URLS.FILE.UPLOAD;
					url = url + "?type=others";
					var axios = HTTP.post(url, formData, {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
					.then(function(response){
						console.log(response);
						if (ctx.type === 'create') {
							ctx.saveProduct(response.data.url)
						}else{
							ctx.updateProduct(response.data.url)
						}
						NotificationsController.hideActivityIndicator();
					})
					.catch(function(err){
						NotificationsController.hideActivityIndicator();
						console.log(err);
						NotificationsController.showErrorNotification(err);
					})
				}
			},
			updateProduct(imgUrl){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				if (imgUrl === null) {
						this.form.thumbnail_url = this.url;
				}else{
						this.form.thumbnail_url = imgUrl;
				}
				HTTP.patch(URLS.PRODUCT.BY_ID.replace(':id' , this.updateId) , this.form , {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
						.then(function(res) {
							ctx.showAddModal = false;
							ctx.form = {};
							ctx.url = null;
							ctx.imgFile = null;
							ctx.updateId = -1;
							ctx.url = null;
							ctx.getUsers();
							NotificationsController.hideActivityIndicator();
							NotificationsController.showNotification('success' , 'Product updated successfully')
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
			saveProduct(imgUrl){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				this.form.thumbnail_url = imgUrl;
				HTTP.post(URLS.PRODUCT.CREATE , this.form , {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
						.then(function(res) {
							ctx.showAddModal = false;
							ctx.form = {};
							ctx.url = null;
							ctx.imgFile = null;
							ctx.getUsers();
							NotificationsController.hideActivityIndicator();
							NotificationsController.showNotification('success' , 'Product created successfully')
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
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
				var url = URLS.PRODUCT.LIST_ALL;
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
 height: 40px;
	line-height: 40px;
 text-align: center;
 border-radius: 4px;
 font-size: 15px;
 transition: all 0.25s;
	color: #4E08F0;
	border: 2px solid #4E08F0;
	font-family: black;
	margin-left: 10px;
}

.prodImgPicker:hover{
	background: #4E08F0;
	color: white;
}

</style>
