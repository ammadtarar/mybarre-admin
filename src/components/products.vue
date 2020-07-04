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
						<img class="icon" src="../assets/ic_add_white.png">
						Add New Product
					</a>
				</div>

				<div v-if="applicants.length < 1" class="placeholder">
					<img src="../assets/ic_no_results.png" class="sad">
					<label>No products were found...</label>
				</div>

				<table v-if="applicants.length >= 1">
					<thead>
						<tr>
							<th style="width : 2">ID</th>
							<th style="width : 13">NAME</th>
							<th style="width : 15%">DESCRIPTION</th>
							<th style="width : 10%">PRICE</th>
							<th style="width : 10%">PIECES IN STOCK</th>
							<th style="width : 10%">STATUS</th>
							<th style="width : 12.5%">COLORS</th>
							<th style="width : 12.5%">SIZES</th>
							<th style="width : 15%">ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						<tr v-bind:key="user.id" v-for="user in applicants">
							<td>{{user.id || 'N/A'}}</td>
							<td>{{user.name || 'N/A'}}</td>
							<td style="max-height : 60px; line-height: 20px; overflow : hidden">
								{{user.description || 'N/A'}}</td>
							<td>{{user.price || 'N/A'}}</td>
							<td>{{user.count || 'N/A'}}</td>
							<td>{{user.status ? user.status.toUpperCase() : 'N/A' || 'N/A'}}</td>

							<td style="padding : 10px">
								<div class="simpleTagsContainer">
									<div class="tag" v-for="item in user.colors">
										{{item.name_en}} | {{item.name_zh}}
									</div>
								</div>
							</td>

							<td style="padding : 10px">
								<div class="simpleTagsContainer">
									<div class="tag" v-for="item in user.sizes">
										{{item.name_en}} | {{item.name_zh}}
									</div>
								</div>
							</td>

							<td>
								<button @click="previewImage(user)" class="btAction green">PREVIEW IMAGE</button>
								<button @click="editProduct(user)" class="btAction orange">EDIT</button>
								<button @click="displayRetireModal(user)" class="btAction"
									v-bind:class="{red : user.status === 'active' , purple : user.status !== 'active'}">{{user.status === 'active' ? 'RETIRE' : 'ACTIVATE'}}</button>
								<button @click="deletableObject = user ; showDeleteModal = true" class="btAction red">DELETE</button>
							</td>
						</tr>
					</tbody>
				</table>

			</div>

		</transition>

		<modal v-if="showSeachModal" @close="showSeachModal = false" size="size">
			<h3 slot="header" style="text-align : left;">Search & Filters</h3>
			<div slot="body" class="modalBody">
				<label style="color : #37474f">You can search user by using keywords or use any of the filters below. A
					keyword could be part of the name , email etc</label>
				<label class="inputTitle spacing30">Keyword</label>
				<input type="text" v-model="keyword" placeholder="Enter a keyword here" class="textInput" />
			</div>
			<div class="buttonsWrapper" slot="footer">
				<div class="bottonsContainer">
					<button type="button" class="bt neg" @click="clearSearch">Clear</button>
					<button type="button" class="bt pos" @click="search">Search</button>
				</div>
			</div>
		</modal>

		<modal v-if="showRetireModal" @close="showRetireModal = false ; retirableBundleObject = null" size="size">
			<h3 slot="header" style="text-align : left;">
				{{retirableBundleObject.status === 'active' ? 'Retire' : 'Activate'}} Product ?</h3>
			<div slot="body" class="modalBody">
				<label style="color : #37474f">You sure you want to retire <b
						style="color : #4E08F0 ; font-family : 'Bold'">{{retirableBundleObject.name}}</b> from products
					list ? Once you retire this product , users will not be able to see this product in the app.</label>
			</div>
			<div class="buttonsWrapper" slot="footer">
				<div class="bottonsContainer">
					<button type="button" class="bt neg"
						@click="showRetireModal = false ; retirableBundleObject = null">Abort</button>
					<button type="button" class="bt pos" @click="retireBundle">Yes ,
						{{retirableBundleObject.status === 'active' ? 'Retire' : 'Activate'}} This Product</button>
				</div>
			</div>
		</modal>


		<modal v-if="showDeleteModal" @close="showDeleteModal = false ; deletableObject = null" size="size">
			<h3 slot="header" style="text-align : left;">
				Delete Product ?</h3>
			<div slot="body" class="modalBody">
				<label style="color : #37474f">Are you sure you want to delete  <b
						style="color : #4E08F0 ; font-family : 'Bold'">{{deletableObject.name}}</b> from products
					list ? Once you delete this product , users will not be able to see this product in the app and if this products has ever been sold , you sone sales records might be compromised.</label>
			</div>
			<div class="buttonsWrapper" slot="footer">
				<div class="bottonsContainer">
					<button type="button" class="bt neg"
						@click="showDeleteModal = false ; deletableObject = null">Abort</button>
					<button type="button" class="bt pos" @click="deleteProduct">Yes , Delete This Product</button>
				</div>
			</div>
		</modal>

		<modal v-if="showAddModal" @close="showAddModal = false" size="big">
			<h3 slot="header" style="text-align : left;">
				{{type === 'create' ? 'Add New Product ...' : 'Edit Product ...'}}</h3>
			<div slot="body" class="modalBody">

				<label class="inputTitle spacing30">Name</label>
				<input type="text" v-model="form.name" placeholder="Enter a name here" class="textInput"
					style="width : 100%" />

				<label class="inputTitle spacing30">PRICE</label>
				<input type="number" v-model="form.price" placeholder="Enter price here" class="textInput"
					style="width : 100%" />

				<label class="inputTitle spacing30">PIECES IN STOCK</label>
				<input type="number" v-model="form.count" placeholder="Enter stock count here" class="textInput"
					style="width : 100%" />

				<label class="inputTitle spacing30">DESCRIPTION</label>
				<textarea type="text" v-model="form.description"
					placeholder="Enter some description about the product here" class="descText" />

				<div class="titleActionContainer">
								<label class="inputTitle spacing30" style="width : auto !important">Colors</label>
								<div class="btAction purple" style="margin-top : 30px; width : 100px;text-align : center; margin-left : 10px" @click="showAddColorModal = true">
									Add New
								</div>
						</div>
						<div class="atttsTagsContainer">
							<div class="tagContainer" v-for="(item , index) in form.colors">
								<div class="tag">
									{{item.name_en}} | {{item.name_zh}}
								</div>
								<img class="remove" src="../assets/ic_close_white.png" @click="removeColor(index , item)"></img>
							</div>
						</div>

						<div class="titleActionContainer">
								<label class="inputTitle spacing30" style="width : auto !important">Sizes</label>
								<div class="btAction purple" style="margin-top : 30px; width : 100px;text-align : center; margin-left : 10px" @click="showAddSizeModal = true">
									Add New
								</div>
						</div>
						<div class="atttsTagsContainer">
							<div class="tagContainer" v-for="(item , index) in form.sizes">
								<div class="tag">
									{{item.name_en}} | {{item.name_zh}}
								</div>
								<img class="remove" src="../assets/ic_close_white.png" @click="removeSize(index , item)"></img>
							</div>
						</div>

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


			<modal v-if="showAddColorModal"  @close="showAddColorModal = false" size="small">

					<h3 slot="header" style="text-align : left;">Add New Color</h3>


					<div slot="body" class="modalBody">

						<label class="inputTitle spacing30">Name In English</label>
						<input type="text" v-model="color.name_en" placeholder="Enter color name in english here" class="textInput" style="width : 100%"/>

						<label class="inputTitle spacing30">Name in Mandarin</label>
						<input type="text" v-model="color.name_zh" placeholder="Enter color name in mandarin here" class="textInput" style="width : 100%"/>

					</div>


					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" style="width : 100% !important">
							<button type="button" class="bt neg" @click="showAddColorModal = false ">Abort</button>
							<button type="button" class="bt pos" @click="addColor">Add</button>
						</div>
					</div>

			</modal>



			<modal v-if="showAddSizeModal"  @close="showAddSizeModal = false" size="small">

					<h3 slot="header" style="text-align : left;">Add Size Color</h3>


					<div slot="body" class="modalBody">

						<label class="inputTitle spacing30">Name In English</label>
						<input type="text" v-model="size.name_en" placeholder="Enter size name in english here" class="textInput" style="width : 100%"/>

						<label class="inputTitle spacing30">Name in Mandarin</label>
						<input type="text" v-model="size.name_zh" placeholder="Enter size name in mandarin here" class="textInput" style="width : 100%"/>

					</div>


					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" style="width : 100% !important">
							<button type="button" class="bt neg" @click="showAddSizeModal = false ">Abort</button>
							<button type="button" class="bt pos" @click="addSize">Add</button>
						</div>
					</div>

			</modal>

    </div>
</template>

<script>
import { HTTP, URLS } from "../network/http";

import Modal from "../components/modal.vue";
import Pager from "../components/pager.vue";
import FilesUploadModal from "../components/filesUploadModal.vue";
var NotificationsController = require("../components/NotificationsController.js");

var OSS = require('ali-oss');

export default {
  name: "products",
  components: {
    Modal,
    Pager,
    FilesUploadModal
  },
  props: {},
  data() {
    return {
      applicants: [],
      page: 1,
      limit: 0,
      resultsPerPage: 25,
      showSeachModal: false,
      keyword: "",
      form: {},
      showAddModal: false,
      newBundle: null,
      showFilesModal: false,
      retirableBundleObject: null,
      showRetireModal: false,
      url: null,
      imgFile: null,
      type: "create",
      updateId: -1,
      showAddColorModal: false,
      color: {},
      size: {},
	  showAddSizeModal: false,
	  deletableObject: null,
    showDeleteModal: false,
    deletedColors : [],
    deletedSizes : []
    };
  },
  methods: {
    removeColor(index , item) { 
      console.log(item);
      
      if(item.id){
        this.deletedColors.push(item)
      }
      this.form.colors.splice(index, 1);
    },
    removeSize(index , item) {
      if(item.id){
        this.deletedSizes.push(item)
      }
      this.form.sizes.splice(index, 1);
    },
    addColor() {
      if (!this.color.name_en) {
        NotificationsController.showNotification(
          "warning",
          "Please enter color name in english"
        );
        return;
      }
      if (!this.color.name_zh) {
        NotificationsController.showNotification(
          "warning",
          "Please enter color name in mandarin"
        );
        return;
      }
      if (this.form.colors === undefined) {
        this.form.colors = [];
      }
      this.form.colors.push(this.color);
      this.showAddColorModal = false;
      this.color = {};
    },
    addSize() {
      if (!this.size.name_en) {
        NotificationsController.showNotification(
          "warning",
          "Please enter size name in english"
        );
        return;
      }
      if (!this.size.name_zh) {
        NotificationsController.showNotification(
          "warning",
          "Please enter size name in mandarin"
        );
        return;
      }
      if (this.form.sizes === undefined) {
        this.form.sizes = [];
      }
      this.form.sizes.push(this.size);
      this.showAddSizeModal = false;
      this.size = {};
    },
    previewImage(product) {
      this.$root.$emit("showImage", { url: product.thumbnail_url });
    },
    editProduct(product) {
      this.type = "edit";
      this.updateId = product.id;

      this.form = {
        name: product.name,
        price: product.price,
        description: product.description,
        count: product.count,
        sizes: product.sizes,
        colors: product.colors
      };
      this.url = product.thumbnail_url;
      this.showAddModal = true;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.imgFile = file;
    },
    displayRetireModal(bundle) {
      this.retirableBundleObject = bundle;
      this.showRetireModal = true;
    },
    retireBundle() {
      NotificationsController.showActivityIndicator();
      const ctx = this;
      var url = "";
      if (this.retirableBundleObject.status === "active") {
        url = URLS.PRODUCT.RETIRE;
      } else {
        url = URLS.PRODUCT.ACTIVATE;
      }
      HTTP.post(url.replace(":id", this.retirableBundleObject.id), {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(res) {
          ctx.getUsers();
          ctx.showRetireModal = false;
          ctx.retirableBundleObject = null;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showNotification(
            "success",
            "Product updated successfully"
          );
        })
        .catch(function(error) {
          ctx.showRetireModal = false;
          ctx.retirableBundleObject = null;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
	},
	deleteProduct(){
	  NotificationsController.showActivityIndicator();
      const ctx = this;
      HTTP.delete(URLS.PRODUCT.BY_ID.replace(":id", this.deletableObject.id), {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(res) {
          ctx.getProducts();
          ctx.showDeleteModal = false;
          ctx.deletableObject = null;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showNotification(
            "success",
            "Product deleted successfully"
          );
        })
        .catch(function(error) {
          ctx.showDeleteModal = false;
          ctx.deletableObject = null;
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
	},
    filesUploadSuccess: function() {
      this.showFilesModal = false;
      this.newBundle = null;
      this.getProducts();
    },
    showBundleDetail(model) {
      console.log("inside showBundleDetail in celist");
      console.log(model);
      this.$emit("showBundleDetail", model.id);
    },
    async uploadFile() {
      if (this.type !== "create" && this.imgFile === null) {
        this.updateProduct(null);
      } else {
        const ctx = this;
        NotificationsController.showActivityIndicator();




        	  let client = new OSS({
          region: 'oss-accelerate',
          accessKeyId: 'LTAI4GFTLJTB2U4J9mXzWP9n',
          accessKeySecret: 'yq6W4oN6pG5mxq07M23kwjeBAaoaRj',
          bucket: 'mybarre'
        });

				


				let r1 = await client.put('product_thumb_' + String(new Date().getMilliseconds()),this.imgFile); 
        var url = r1.url;
        
         if (ctx.type === "create") {
              ctx.saveProduct(url);
            } else {
              ctx.updateProduct(url);
            }
            NotificationsController.hideActivityIndicator();

      }
    },
    updateProduct(imgUrl) {
      NotificationsController.showActivityIndicator();
      const ctx = this;
      if (imgUrl === null) {
        this.form.thumbnail_url = this.url;
      } else {
        this.form.thumbnail_url = imgUrl;
      }
      this.form.deletedSizes = this.deletedSizes;
      this.form.deletedColors = this.deletedColors;
      HTTP.patch(URLS.PRODUCT.BY_ID.replace(":id", this.updateId), this.form, {
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
          ctx.color = {};
          ctx.size = {};
          ctx.imgUrl = null;
          ctx.deletedColors = [];
          ctx.deletedSizes = [];
          ctx.getProducts();
          NotificationsController.hideActivityIndicator();
          NotificationsController.showNotification(
            "success",
            "Product updated successfully"
          );
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
    },
    saveProduct(imgUrl) {
      NotificationsController.showActivityIndicator();
      const ctx = this;
      this.form.thumbnail_url = imgUrl;
      HTTP.post(URLS.PRODUCT.CREATE, this.form, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(res) {
          ctx.showAddModal = false;
          ctx.form = {};
          ctx.url = null;
          ctx.imgFile = null;
          ctx.color = {};
          ctx.size = {};
          ctx.getProducts();
          NotificationsController.hideActivityIndicator();
          NotificationsController.showNotification(
            "success",
            "Product created successfully"
          );
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
    },
    search() {
      this.showSeachModal = false;
      this.getProducts();
    },
    clearSearch() {
      console.log("clearSearch");
      this.keyword = "";
      this.type = "null";
      this.level = "null";
      this.status = "null";
      this.getProducts();
      this.showSeachModal = false;
    },
    onPageChanged(page) {
      this.page = page;
      this.getProducts();
    },
    getProducts() {
      const ctx = this;
      var url = URLS.PRODUCT.LIST_ALL;
      url = url + "?limit=" + this.resultsPerPage;
      url = url + "&page=" + this.page;
      if (
        this.keyword !== undefined &&
        this.keyword !== null &&
        this.keyword !== ""
      ) {
        url = url + "&keyword=" + this.keyword;
      }

      HTTP.get(url, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(res) {
          const data = res.data.data;
          ctx.applicants = data.rows;
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
    this.getProducts();
  }
};
</script>

<style>
.descText {
  width: 100%;
  height: 100px;
  min-height: 100px;
  color: black;
  height: 40px;
  font-size: 18px;
  border: 0px solid transparent;
  border-bottom: 1px solid #bdbdbd;
  outline: none;
}

.imgPreviewSmall {
  width: 150px;
  height: 150px;
}
.imgPreview {
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
  color: #4e08f0;
  border: 2px solid #4e08f0;
  font-family: black;
  margin-left: 10px;
}

.prodImgPicker:hover {
  background: #4e08f0;
  color: white;
}

.halfHalf-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
}

.halfHalf-container .half {
  width: 49%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.titleActionContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btAddNew {
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background: red;
  margin-top: 30px;
  margin-left: 10px;
}

.atttsTagsContainer {
  min-height: 30px;
  display: inline-block;
  border-bottom: 0.5px solid gray;
  margin-top: 10px;
}

.atttsTagsContainer .tagContainer {
  display: flex;
  flex-direction: row;
  background: #e91e63;
  padding: 4px 6px 4px 30px;
  border-radius: 20px;
  margin-bottom: 10px;
  float: left;
  margin-right: 10px;
  align-items: center;
}

.atttsTagsContainer .tagContainer .remove {
  margin-left: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 20px;
  transition: 0.3s all;
}

.atttsTagsContainer .tagContainer .remove:hover {
  background: red;
}

.atttsTagsContainer .tagContainer .tag {
  font-size: 14px;
  color: white;
  margin-right: 4px;
}

.tagsWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.simpleTagsContainer {
  display: inline-block;
}

.simpleTagsContainer .tag {
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px 4px 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  background: #e91e63;
  color: white;
  float: left;
  border-radius: 100px;
}
</style>
