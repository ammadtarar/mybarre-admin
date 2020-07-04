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


						<a class="bt_container" @click="showAddModal = true">
							<img class="icon" src="../assets/ic_add_white.png">
							Add New Bundle
						</a>
					</div>

					<div v-if="bundles.length < 1" class="placeholder">
							<img src="../assets/ic_no_results.png" class="sad">
							<label >No bundles were found...</label>
					</div>

					<table v-if="bundles.length >= 1">
		      <thead>
		        <tr >
							<th  style="width : 2">ID</th>
		          <th  style="width : 25">NAME</th>
		          <th  style="width : 40%">DESCRIPTION</th>
		          <th  style="width : 10%">PRICE</th>
							<th  style="width : 20%">ACTIONS</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr  v-bind:key="user.id" v-for="user in bundles">
							<td >{{user.id || 'N/A'}}</td>
							<td >{{user.name || 'N/A'}}</td>
		          <td >{{user.description || 'N/A'}}</td>
							<td >{{user.price || 'N/A'}}</td>
							<td>
								<a @click="showBundleDetail(user)">
									<button
										class="btAction green"
									>DETAILS</button>
								</a>

								<button
								@click="displayDeleteModal(user)"
									class="btAction red"
								>DELETE</button>
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
					<h3 slot="header" style="text-align : left;">Are you sure ?</h3>
					<div slot="body" class="modalBody">
						<label style="color : #37474f">You sure you want to delete <b style="color : #4E08F0 ; font-family : 'Bold'">{{deletableBundleObject.name}}</b> from bundles ? Once you delete this bundle , all relevant data and files will be delete.</label>
					</div>
					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" >
							<button type="button" class="bt neg" @click="showDeleteModal = false ; deletableBundleObject = null">Abort</button>
							<button type="button" class="bt pos" @click="deleteBundle">Yes , Delete Bundle</button>
						</div>
					</div>
			</modal>

			<modal v-if="showAddModal"  @close="showAddModal = false" size="size">
					<h3 slot="header" style="text-align : left;">Add New Bundle ...</h3>
					<div slot="body" class="modalBody">
						<label class="inputTitle spacing30">Name</label>
						<input type="text" v-model="form.name" placeholder="Enter a name here" class="textInput" style="width : 100%"/>

						<label class="inputTitle spacing30">PRICE</label>
						<input type="number" v-model="form.price" placeholder="Enter price here" class="textInput" style="width : 100%"/>

						<label class="inputTitle spacing30">DESCRIPTION</label>
						<textarea type="text"  v-model="form.description" placeholder="Enter bundle description her" class="descText"  />

						<label class="inputTitle spacing30">COVER IMAGE</label>
						<img  v-if="!url" src="../assets/image_placeholder.jpg" class="imgPreviewSmall">
						<img v-if="url" :src="url" class="imgPreview">


					</div>

					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" style="width : 100% !important">
							<div style="width : 50% ; height : 100% ; display : flex ; margin-left : 10px">
								<label class="prodImgPicker">
									Select Files
									<input type="file" @change="onFileChange" />
								</label>
							</div>
							<button type="button" class="bt neg" @click="showAddModal = false ; form = {}">Abort</button>
							<button type="button" class="bt pos"  style="width : 200px !important" @click="uploadFile">Save & Upload File</button>
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
var OSS = require('ali-oss');

  export default {
		name: 'celist',
	  components: {
			Modal,
			Pager,
			FilesUploadModal
	  },
		props:{

		},
	  data() {
	    return {
				bundles : [],
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
	    };
	  },
		methods:{
			async uploadFile(){
				if (this.imgFile === null) {
					return;
				}
				const ctx = this;
				NotificationsController.showActivityIndicator();



				  let client = new OSS({
          region: 'oss-accelerate',
          accessKeyId: 'LTAI4GFTLJTB2U4J9mXzWP9n',
          accessKeySecret: 'yq6W4oN6pG5mxq07M23kwjeBAaoaRj',
          bucket: 'mybarre'
        });

				


				let r1 = await client.put('thumb' + String(new Date().getMilliseconds()),this.imgFile); 
				var url = r1.url;
				ctx.saveBundle(url)
					NotificationsController.hideActivityIndicator();



			},
			displayDeleteModal(bundle){
				this.deletableBundleObject = bundle;
				this.showDeleteModal = true;
			},
			onFileChange(e) {
				const file = e.target.files[0];
      	this.url = URL.createObjectURL(file);
				this.imgFile = file;
			 },
			deleteBundle(){
				NotificationsController.showActivityIndicator();
				const ctx = this;

				HTTP.delete(URLS.BUNDLE.BY_ID.replace(':id' , this.deletableBundleObject.id) , {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
						.then(function(res) {
							ctx.getBundels();
							ctx.showDeleteModal = false;
							ctx.deletableBundleObject = null;
							NotificationsController.hideActivityIndicator();
							NotificationsController.showNotification('success' , 'Bundle deleted successfully')
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
				this.getBundels();
			},
			showBundleDetail(model){
				console.log("inside showBundleDetail in celist");
				console.log(model);
				this.$emit('showBundleDetail' , model.id)
			},
			saveBundle(cover_url){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				this.form.cover_url = cover_url;
				this.form.type = "ce";

				HTTP.post(URLS.BUNDLE.CREATE , this.form , {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
						.then(function(res) {
							console.log(res.data);
							console.log(res.data.data);
							ctx.newBundle = res.data.data;
							console.log(ctx.newBundle);
							ctx.showAddModal = false;
							ctx.form = {};
							ctx.url = null;
							ctx.imgFile = null;
							NotificationsController.hideActivityIndicator();
							ctx.showFilesModal = true;
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});


			},
			search(){
				this.showSeachModal = false
				this.getBundels()
			},
			clearSearch(){
				console.log("clearSearch");
				this.keyword = "";
				this.type = "null";
				this.level = "null";
				this.status = "null";
				this.getBundels()
				this.showSeachModal = false;
			},
			onPageChanged(page){
				this.page = page;
	      this.getBundels();
			},
			getBundels(){
				const ctx = this;
				var url = URLS.BUNDLE.LIST_ALL;
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
								var ces = []
								data.rows.forEach(function(ce){
									if (ce.id !== 1) {
										ces.push(ce)
									}
								});
								ctx.bundles = ces;
								ctx.limit = Math.ceil(res.data.data.count/ctx.resultsPerPage)
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			}
		},
    mounted() {
			console.log("bundles mounted");
			this.getBundels();
    }
  }
</script>

<style>

.descText{
  width: 100%;
	height: 200px;
	min-height: 200px;
  color: black;
  height: 40px;
  font-size: 18px;
  border : 0px solid transparent;
  border-bottom: 1px solid #bdbdbd;
  outline: none;
}

</style>
