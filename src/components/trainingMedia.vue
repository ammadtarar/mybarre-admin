<template lang="html">
  <div class="training">

    <div class="top">
      <label class="pageDesc">You can manage all the videos , photos and other documents that will show up under <b>'Training'</b> section in the Wehchat MiniProgram once user is enrolled in the MYBARRE programme.</label>



      <div class="btAction btActionCentered green" @click="showFilters = true; ">
        FILTERS
      </div>

      <div class="btAction btActionCentered red" style="width : 200px !important;" @click="clearStages" v-if="filterStage != 'null'">
        CLEAR FILTERS
      </div>

      <div class="btAction btActionCentered green"  @click="showFilesModal = true">
        ADD FILES
      </div>
    </div>

    <label class="stagesNotice" v-if="filterStage == 'null'">Currently showing all files regardless of stages/statuses</label>
    <label class="stagesNotice" v-if="filterStage != 'null'">Currently showing all the files for
      <span class="stageName">{{filterStage.replaceAll("-" , " ")}}</span>
      stage/status
    </label>

		<div class="section">
			Videos ( {{videos.length}} )
		</div>
		<div class="grid">
			<div class="item" v-for="item in videos">
        <img class="hoverItem del" @click="displayDeleteModal(item)" src="../assets/ic_delete.png"/>
        <img class="hoverItem rename" @click="displayRenameModal(item)" src="../assets/ic_edit.png"/>
				<VideoCard :model="item" @showPreview="displayVideoPreview"></VideoCard>
			</div>
		</div>

		<div class="section">
			Images ( {{images.length}} )
		</div>
		<div class="grid">
			<div class="item" v-for="item in images">
        <img class="hoverItem del" @click="displayDeleteModal(item)" src="../assets/ic_delete.png"/>
        <img class="hoverItem rename" @click="displayRenameModal(item)" src="../assets/ic_edit.png"/>
				<ImageCard :model="item"></ImageCard>
			</div>
		</div>

		<div class="section">
			Documents ( {{documents.length}} )
		</div>
		<div class="grid">
			<div class="item" v-for="item in documents">
        <img class="hoverItem del" @click="displayDeleteModal(item)" src="../assets/ic_delete.png"/>
        <img class="hoverItem rename" @click="displayRenameModal(item)" src="../assets/ic_edit.png"/>
				<DocCard :model="item"></DocCard>
			</div>
		</div>


	<FilesUploadModal v-if="showFilesModal" @uploadSuccess="filesUploadSuccess" :bundleId='1' :needStage='true'/>


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


  <modal v-if="showFilters"  @close="showFilters = false" size="size">
      <h3 slot="header" style="text-align : left;">Filters</h3>
      <div slot="body" class="modalBody">
        <label style="color : #37474f; margin-bottom : 20px">Please select a user training status/stage to filters the files for.</label>

        <select v-model="filterStage" >
          <option disabled value="null">Select one stage/status</option>
            <option
            v-for="item in stages"
              v-bind:value="item"
              v-bind:key="item">
              <span style="text-transform: capitalize;">{{item.replaceAll("-" , " ").toUpperCase()}}</span>
            </option>
        </select>

      </div>
      <div class="buttonsWrapper" slot="footer">
        <div class="bottonsContainer" >
          <button type="button" class="bt neg" @click="clearStages">Clear & Show All</button>
          <button type="button" class="bt pos"@click="filterFiles" >Filter</button>
        </div>
      </div>
  </modal>

  <modal v-if="showRenameModal"  @close="showRenameModal = false ; renameObject = null" size="size">
      <h3 slot="header" style="text-align : left;">Edit File ...</h3>
      <div slot="body" class="modalBody">


        <label class="inputTitle spacing30">Original Name</label>
        <label style="color : #37474f">{{renameObject.name}}</label>

        <label class="inputTitle spacing30">New Name</label>
        <input type="text" v-model="rename" placeholder="Enter a new name for the file" class="textInput" />

        <label class="inputTitle spacing30">Stages</label>
        <div v-for="item in renameStages" class="stagesContainer">
          <div class="stageContainer" style="margin-top : 10px;">
            <input type="checkbox" :value="item.selected"  v-model="item.selected" @click="item.selected = !item.selected;">
              <span style="text-transform: capitalize;">{{item.stage.replaceAll("-" , " ")}}</span>
            </input>
          </div>
        </div>

      </div>
      <div class="buttonsWrapper" slot="footer">
        <div class="bottonsContainer" >
          <button type="button" class="bt neg" @click="showRenameModal = false ; renameObject = null; renameStages = []">Abort</button>
          <button type="button" class="bt pos" @click="renameFile">Save</button>
        </div>
      </div>
  </modal>

  <pdfviewer @closepdf="closepdf"  :pdfurl="pdfurls"  :maxscale='4' :minscale='0.6' :scale='1.1'></pdfviewer>






  </div>
</template>

<script>
import VideoCard from "../components/videoCard.vue";
import ImageCard from "../components/imageCard.vue";
import DocCard from "../components/docCard.vue";
import FilesUploadModal from "../components/filesUploadModal.vue";
import Modal from "../components/modal.vue";
import pdfviewer from 'vue-pdfviewer'

import {
    HTTP, URLS
}
from '../network/http';
var NotificationsController = require("../components/NotificationsController.js");

  export default {
		name : 'trainingMedia',
		data(){
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
				rename : '',
				pdfurls:'//cdn.mozilla.net/pdfjs/tracemonkey.pdf',
				isshowpdf:true,
        selectedFilters : [],
        showFilters: false,
        stages : [
          'pre-instructor', // MEANS USER PAIDED AND SIGNED UP
          'pre-instructor-tbc', //USER DID NOT ATTEND TRAINING CLASSES
          'instructor-in-training', // USER ATTENDED THE TRAINING CLASSES
          'training-videos-submitted', // USER SUBMITTED TRAINING VIDEOS AFTER TRAINING CLASSES
          'exam-passed', // SUBMITTED TRAINING VIDEOS PASSED
          'exam-failed', // SUBMITTED TRAINING VIDEOS FAILED
          'license-fee-paid', // USER PASSED THE EXAM AND PAID THE LICENSE FEE
          'licensed-instructor' // USER PASSED THE EXAM AND PAID THE LICENSE FEE
        ],
        allFiles: [],
        filterStage: "null",
        renameStages : []
			}
		},
		components:{
			VideoCard,
			ImageCard,
			DocCard,
			FilesUploadModal,
      Modal,
      pdfviewer
		},
		methods:{
			closepdf(){
          this.isshowpdf = false
      },
      pdferr(errurl) {
          console.log(errurl);
      },
      displayVideoPreview(data){
        console.log("inside displayVideoPreview in training");
        console.log(data);
        this.$emit('showVideoPreview' , data)
      },
      filesUploadSuccess: function(){
        this.showFilesModal = false;
        this.filterFiles();
      },
      displayDeleteModal(item){
        this.deleteObject = item;
        this.showDeleteModal = true;
      },
      displayRenameModal(item){
        this.renameObject = item;
        this.rename = "";

        var objStages = JSON.parse(this.renameObject.stages) || [];
        var renameStages = [];

        this.stages.forEach((orignalStage, i) => {

          if (typeof objStages === 'string') {
            objStages = JSON.parse(objStages);
          }
          if (objStages.contains(orignalStage)) {
            renameStages.push({
              stage : orignalStage,
              selected : true
            });
          }else{
            renameStages.push({
              stage : orignalStage,
              selected : false
            });
          }
        });

        this.renameStages = renameStages;
        this.showRenameModal = true;
      },
      renameFile(){
        NotificationsController.showActivityIndicator();
        const ctx = this;

        var body = {};

        if (this.rename !== null && this.rename !== undefined && this.rename !== "") {
          body.name = this.rename;
        }

        var stages = [];
        this.renameStages.forEach((item, i) => {
          if (item.selected) {
            stages.push(item.stage)
          }
        });

        body.stages = JSON.stringify(stages);


        HTTP.patch(URLS.FILE.BY_ID.replace(':id' , this.renameObject.id) , body , {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
            .then(function(res) {
                NotificationsController.hideActivityIndicator();
                NotificationsController.showNotification('success' , 'File renamed successfully');
                ctx.showRenameModal = false;
                ctx.renameObject = null;
                ctx.rename = "";
                ctx.renameStages = [];
                ctx.filterFiles();
            })
            .catch(function(error) {
              ctx.showRenameModal = false;
              ctx.renameObject = null;
              ctx.rename = "";
              ctx.renameStages = [];
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
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
                ctx.filterFiles();
                ctx.deleteObject = null;
            })
            .catch(function(error) {
              ctx.showDeleteModal = false;
              ctx.deleteObject = null;
              NotificationsController.hideActivityIndicator();
              NotificationsController.showErrorNotification(error);
            });
      },
      filterFiles: function(){
        this.getTrainingData()
      },
      getTrainingData: function(){
        const ctx = this;
        var url = URLS.BUNDLE.BY_ID.replace(':id' , 1);
        if (this.filterStage != "null") {
          var arr = [];
          arr.push(this.filterStage);
          console.log(arr);
          url = url + "?stage=" + JSON.stringify(arr);
        }
        HTTP.get( url,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          const d = res.data.data;
          if (d === null) {
            ctx.bundle = [];
            ctx.videos = [];
            ctx.images = [];
            ctx.documents = [];
            ctx.showFilters = false;
            NotificationsController.hideActivityIndicator();
            return;
          }
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
          ctx.showFilters = false;
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      },
      clearStages: function(){
        this.filterStage = "null";
        this.showFilters = false;
        this.getTrainingData();

      }
		},
    mounted() {
			this.getTrainingData();
    }
  }
</script>

<style lang="css" scoped>
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
	color: black;
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
	width: 100%;
	height: 50px;
	line-height: 50px;
	font-size: 20px;
	font-weight: bold;
	color: black;
	font-family: 'Bold';
	text-align: left;
	border-bottom: 0.5px solid black;
	margin-top: 20px;
}

.training .grid{
	display: inline-block;
	text-align: center;
	/* flex-direction: row; */
}

.training .grid .course{
  width: 300px;
	height: 200px;
	margin-right: 10px;
	float: left;
	margin-top: 10px;
  background: gray;
  position: relative;
}


.training .grid .detail{
  width: 300px;
	height: 200px;
	margin-right: 10px;
	float: left;
	margin-top: 10px;
  background: white;
  position: relative;
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

.icon{
	width: 30px;
	height: 30px;
}

input[type="checkbox"] {
 /* remove standard background appearance */
 -webkit-appearance: none;
 -moz-appearance: none;
 /* create custom radiobutton appearance */
 display: inline-block;
 width: 25px;
 height: 25px;
 padding: 4px;
 /* background-color only for content */
 background-clip: content-box;
 border: 2px solid #bbbbbb;
 background-color: #e7e6e7;

	outline: none;
  margin-right: 10px;
  border-radius: 50%;
}

input[type="checkbox"]:checked {
  background-color: red;
}

.stagesNotice{
  color: white;
  font-size: 18px;
}


.stageName{
  text-transform: capitalize;
  color : white;
  font-weight : bold;
  font-size : 20px;
  font-family: 'ExtraBold';
  background: #4E08F0;
  padding: 2px 6px 2px 6px;
  border-radius: 4px;

}
</style>
