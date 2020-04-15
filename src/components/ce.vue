<template lang="html">
  <div class="training">

    <div class="top">

      <img src="../assets/ic_back.png" class="goBack" @click="goBack">

      <label class="pageDesc" style="font-family : 'Bold' ; font-size : 24px">Bundle Detail</label>

      <div class="addFiles" @click="showFilesModal = true">
        ADD FILES
      </div>

      <div class="addFiles" v-if="!isEditMode" @click="isEditMode = true">
        EDIT
      </div>

      <div class="addFiles" v-if="isEditMode" @click="updateBundle(null)">
        SAVE
      </div>
    </div>

    <div class="section" v-if="isEditMode">
			Basic Information
		</div>


    <expandBtn title="Basic Information" @onToggle="expandBundleInfo = $event" default="true" v-if="!isEditMode"/>

    <div v-if="!isEditMode && expandBundleInfo && bundle"  class="form" >


      <div class="keyValCont">
        <label class="key">Cover Image</label>

        <img  v-if="!bundle.cover_url" src="../assets/image_placeholder.jpg" class="bundleCover">
        <img  v-if="bundle.cover_url" :src="bundle.cover_url" class="bundleCover">
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Name</label>
          <label class="val">{{bundle.name}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">PRICE</label>
          <label class="val">{{bundle.price}}</label>
        </div>
      </div>

      <div class="keyValCont" style="width : 100% !important">
        <label class="key">DESCRIPTION</label>
        <label class="val">{{bundle.description}}</label>
      </div>
    </div>


    <div v-if="isEditMode" class="form">

      <div class="bundleImgPckrCont">
        <label class="key">Cover Image</label>
        <label class="imgPickerBtn">
          Select Files
          <input type="file" @change="onFileChange" />
        </label>
      </div>

      <img  v-if="!bundle.cover_url && !url" src="../assets/image_placeholder.jpg" class="bundleCover">
      <img  v-if="!bundle.cover_url && url" :src="url" class="bundleCover">
      <img  v-if="bundle.cover_url && !url" :src="bundle.cover_url" class="bundleCover">
      <img  v-if="bundle.cover_url && url" :src="url" class="bundleCover">

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Name</label>
          <input type="text" v-model="bundle.name"  placeholder="Enter title here"/>
        </div>
        <div class="keyValCont">
          <label class="key">PRICE</label>
          <input type="text" v-model="bundle.price"  placeholder="Enter title here"/>
        </div>
      </div>

      <div class="keyValCont" style="width : 100% !important">
        <label class="key">DESCRIPTION</label>
        <input type="text" v-model="bundle.description"  placeholder="Enter title here"/>
      </div>
    </div>


		<div class="section" style="margin-top : 50px" v-if="isEditMode">
			Videos
		</div>
    <expandBtn title="Videos" @onToggle="expandVideos = $event" default="true" v-if="!isEditMode" style="margin-top : 20px"/>


    <div class="empty" v-if="expandVideos && videos.length <= 0">
      No Videos Found ...
    </div>

		<div class="grid" v-if="expandVideos && videos.length > 0">
			<div class="item" v-for="item in videos">
        <img class="hoverItem del" @click="displayDeleteModal(item)" src="../assets/ic_delete.png"/>
        <img class="hoverItem rename" @click="displayRenameModal(item)" src="../assets/ic_edit.png"/>
				<VideoCard :model="item" @showPreview="displayVideoPreview"></VideoCard>
			</div>
		</div>


    <div class="section" style="margin-top : 50px" v-if="isEditMode">
			Images
		</div>
    <expandBtn title="Images" @onToggle="expandImages = $event" default="true" v-if="!isEditMode" style="margin-top : 20px"/>

    <div class="empty" v-if="expandImages && images.length <= 0">
      No Images Found ...
    </div>

		<div class="grid" v-if="expandImages && images.length > 0">
			<div class="item" v-for="item in images">
        <img class="hoverItem del" @click="displayDeleteModal(item)" src="../assets/ic_delete.png"/>
        <img class="hoverItem rename" @click="displayRenameModal(item)" src="../assets/ic_edit.png"/>
				<ImageCard :model="item"></ImageCard>
			</div>
		</div>


    <div class="section" style="margin-top : 50px" v-if="isEditMode">
			Documents
		</div>
    <expandBtn title="Documents" @onToggle="expandDocuments = $event" default="true" v-if="!isEditMode" style="margin-top : 20px"/>

    <div class="empty" v-if="expandDocuments && documents.length <= 0">
      No Documents Found ...
    </div>
		<div class="grid" v-if="expandDocuments && documents.length > 0">
			<div class="item" v-for="item in documents">
        <img class="hoverItem del" @click="displayDeleteModal(item)" src="../assets/ic_delete.png"/>
        <img class="hoverItem rename" @click="displayRenameModal(item)" src="../assets/ic_edit.png"/>
				<DocCard :model="item"></DocCard>
			</div>
		</div>


	<FilesUploadModal v-if="showFilesModal" @uploadSuccess="filesUploadSuccess" :bundleId='bundle.id'/>


  <modal v-if="showDeleteModal"  @close="showDeleteModal = false ; deleteObject = null" size="size">
      <h3 slot="header" style="text-align : left;">Are you sure ?</h3>
      <div slot="body" class="modalBody">
        <label style="color : #37474f">You sure you want to delete <b style="font-family : 'Bold' ; color : #4E08F0">{{deleteObject.name}}</b> from this bundle? Once you delete it , you cannot recover it.</label>

      </div>
      <div class="buttonsWrapper" slot="footer">
        <div class="bottonsContainer" >
          <button type="button" class="bt neg" @click="showDeleteModal = false ; deleteObject = null">Abort</button>
          <button type="button" class="bt pos" @click="deleteItem">Yes , Delete</button>
        </div>
      </div>
  </modal>

  <modal v-if="showRenameModal"  @close="showRenameModal = false ; renameObject = null" size="size">
      <h3 slot="header" style="text-align : left;">Rename File ...</h3>
      <div slot="body" class="modalBody">


        <label class="inputTitle spacing30">Original Name</label>
        <label style="color : #37474f">{{renameObject.name}}</label>

        <label class="inputTitle spacing30">New Name</label>
        <input type="text" v-model="rename" placeholder="Enter a new name for the file" class="textInput" />

      </div>
      <div class="buttonsWrapper" slot="footer">
        <div class="bottonsContainer" >
          <button type="button" class="bt neg" @click="showRenameModal = false ; renameObject = null">Abort</button>
          <button type="button" class="bt pos" @click="renameFile">Save</button>
        </div>
      </div>
  </modal>

  </div>
</template>

<script>
import VideoCard from "../components/videoCard.vue";
import ImageCard from "../components/imageCard.vue";
import DocCard from "../components/docCard.vue";
import FilesUploadModal from "../components/filesUploadModal.vue";
import Modal from "../components/modal.vue";
import ExpandBtn from "../components/expadBtn.vue";

import {
    HTTP, URLS
}
from '../network/http';
var NotificationsController = require("../components/NotificationsController.js");

  export default {
		name : 'ce',
		components: {
			VideoCard,
			ImageCard,
			DocCard,
			FilesUploadModal,
      Modal,
      ExpandBtn
	 },
		props: ['id'],
	 data() {
		 return {
			 videos : ['' , '' ,'' , '' ,'' , '' ,'' ],
			 images : ['' , '' ,'' , '' ,'' , '' ,'' ,'' ,'' , '' ,'' , '' ,'' ],
			 documents : ['' , '' ,''  ],
       bundle : null,
       deleteObject : null,
       showFilesModal : false,
       showDeleteModal : false,
       showRenameModal : false,
       renameObject : null,
       isEditMode: false,
       rename : '',
       expandBundleInfo: true,
       expandVideos : true,
       expandImages : true,
       expandDocuments : true,
       url : null,
       imgFile : null
		 };
	 },
		methods:{
      onFileChange(e) {
				const file = e.target.files[0];
      	this.url = URL.createObjectURL(file);
				this.imgFile = file;
			},
      goBack(){
        this.$emit('hideBundleDetail')
      },
      uploadFile(){
				if (this.imgFile === null) {
					return;
				}
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
					ctx.updateBundle(response.data.url)
					NotificationsController.hideActivityIndicator();
				})
				.catch(function(err){
					NotificationsController.hideActivityIndicator();
					console.log(err);
					NotificationsController.showErrorNotification(err);
				})
			},
      updateBundle(newCoverUrl){


        const name = this.bundle.name || "";
        if (name === "") {
          NotificationsController.showNotification('warning' , 'Bundle name cannot be empty');
          return
        }

        const desc = this.bundle.description || "";
        if (desc === "") {
          NotificationsController.showNotification('warning' , 'Bundle description cannot be empty');
          return
        }


        const price = this.bundle.price || "";
        if (price === "") {
          NotificationsController.showNotification('warning' , 'Bundle price cannot be empty');
          return
        }



        var data = {name : name , description : desc , price : price };

        if (this.imgFile && this.url && newCoverUrl) {
          data.cover_url = newCoverUrl;
        }else if(this.imgFile && this.url && !newCoverUrl){
          this.uploadFile()
          return;
        }else if(!this.imgFile && !this.url && !newCoverUrl && !this.bundle.cover_url){
          NotificationsController.showNotification('warning' , 'Please select a cover image');
          return;
        }

        console.log(this.imgFile);
        console.log(this.url);
        console.log(newCoverUrl);
        console.log(this.bundle.cover_url);



        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.patch(URLS.BUNDLE.BY_ID.replace(':id' , this.bundle.id) , data , {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
            .then(function(res) {
              ctx.imgFile = null;
              ctx.url = null;
              ctx.getTrainingData();
              NotificationsController.hideActivityIndicator();
              ctx.isEditMode = false;
              NotificationsController.showNotification('success' , 'Bundle updated successfully');
            })
            .catch(function(error) {
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });


      },
      displayVideoPreview(data){
        console.log("inside displayVideoPreview in training");
        console.log(data);
        this.$emit('showVideoPreview' , data)
      },
      filesUploadSuccess: function(){
        this.showFilesModal = false;
        this.getTrainingData();
      },
      displayRenameModal(item){
        this.rename = "";
        this.renameObject = item;
        this.showRenameModal = true;
      },
      displayDeleteModal(item){
        this.deleteObject = item;
        this.showDeleteModal = true;
      },
      deleteItem(){
        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.delete(URLS.FILE.BY_ID.replace(':id' , this.deleteObject.id) ,  {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'File deleted successfully');
                ctx.showDeleteModal = false;
                ctx.getTrainingData();
                ctx.deleteObject = null;
            })
            .catch(function(error) {
              ctx.showDeleteModal = false;
              ctx.deleteObject = null;
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      renameFile(){
        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.patch(URLS.FILE.RENAME.replace(':id' , this.renameObject.id) , {name : this.rename} , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'File renamed successfully');
                ctx.showRenameModal = false;
                ctx.rename = "";
                ctx.renameObject = null;
                ctx.getTrainingData();
            })
            .catch(function(error) {
              ctx.rename = "";
              ctx.showRenameModal = false;
              ctx.renameObject = null;
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      getTrainingData: function(){
        const ctx = this;
        HTTP.get(URLS.BUNDLE.BY_ID.replace(':id' , this.id) ,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          const d = res.data.data;
          ctx.bundle = d;
          ctx.videos = [];
          ctx.images = [];
          ctx.documents = [];
          d.files.forEach(function(file){
            if (file.mime.includes("vid")) {
              ctx.videos.push(file);
            }else if (file.mime.includes("image")) {
              ctx.images.push(file);
            }else  {
              ctx.documents.push(file);
            }
          });
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      }
    },
    mounted() {
      this.getTrainingData();
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
  width : 30px ;
  height : 30px;
  margin-right : 10px ;
  border : 2px solid white ;
  border-radius : 30px;
  transition : all 0.5s;
}

.goBack:hover{
  background: #4E08F0;
}

.half-half{
  width: 100%;
  height: 60px;
  display: inline-block;
  margin-bottom: 20px;
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

.keyValCont > input{
  width: calc(100% - 20px);
  height: 20px;
  line-height: 20px;
  background: transparent;
  font-size: 16px;
  font-family: 'Bold';
  border: 0.5px solid gray;
  border-radius: 4px;
  color: white;
  padding: 10px;
  outline: none;
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
  color: white;
  text-align: left;
}

.val{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-family: 'Medium';
  font-size: 16px;
  color: white;
  text-align: left;
  border-bottom: 0.1px solid gray;
}
.training{
	width: calc(100vw - 40px);
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.training .top{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.training .top .pageDesc{
  width: calc(100% - 120px);
	color: white;
	font-size: 18px;
	font-family: 'Thin';
  text-align: left;
}


.training .top .addFiles{
    width: 110px;
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

.training .top .addFiles:hover{
  font-family: 'Bold';
}

.training .section{
	width: auto;
	height: 50px;
	line-height: 50px;
	font-size: 20px;
	font-weight: bold;
	color: white;
	font-family: 'Bold';
	text-align: left;
	border-bottom: 2px solid #4E08F0;
	margin-top: 20px;
}

.training .grid{
	display: inline-block;
	text-align: center;
	/* flex-direction: row; */
}

.training .grid .item{
	width: 300px;
	height: 200px;
	margin-right: 10px;
	float: left;
	margin-top: 10px;
  position: relative;
}

.hoverItem{
  position: absolute;
  top: 10px;
  width: 30px;
  height: 30px;
  z-index: 3;
  transition: all 0.25s;
}

/* .hoverItem:hover{
  width: 50px;
  height: 50px;
} */

.del{
  left: 10px;
}

.rename{
  left : 50px;
}

.del:hover{
  width: 40px;
  height: 40px;
}

.rename:hover{
  width: 40px;
  height: 40px;
}

.del:hover .rename{
  bottom: 100px;
}


.bundleCover{
  max-width: 200px;
  height: auto;
  margin-top: 10px;
}

/* .training .grid .rename:hover{
  background: #fec60a;
  color: white;
} */


.bundleImgPckrCont{
  width: auto;
  height: auto;
  display: flex;
  margin-top: 10px;
  align-items: center;
}

.bundleImgPckrCont .key{
  height: 20px;
  line-height: 20px;
  font-family: 'Thin';
  font-size: 14px;
  color: white;
  text-align: left;
  width: auto !important;
  margin-right: 10px;
}




.imgPickerBtn{
  background: #4E08F0;
  color: white;
  padding: 2px 6px 2px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.2s;
  outline: none;
}

.imgPickerBtn:hover{
  transform: scale(1.2);
}

</style>
