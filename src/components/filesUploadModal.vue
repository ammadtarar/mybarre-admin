<template lang="html">

	<div class="usersCont">

		<modal v-if="showModal" @close="close" size="big">

			<h3 slot="header">Upload Bundle Files</h3>

			<div slot="body" class="modalBody">
				<div class="inviteContainer">

					<label style="color : #37474f">You can upload multi files at once. Just click the 'Select Files' button to select files form the computer and then add names for each file. </label>




					<table style="margin-top : 20px ">
						<thead>
							<tr style="text-align : center">
								<th  style="width : 5%">#</th>
								<th  style="width : 20%">File Title</th>
								<th  style="width : 10%">File Name</th>
								<th  style="width : 10%">File Type</th>
								<th  style="width : 10%">Size</th>
								<th  style="width : 35%" v-if="needStage">Stage</th>
								<th  style="width : 10%">ACTIONS</th>
							</tr>
						</thead>
					</table>

					<label class="notFiles" v-if="files.length <= 0">NO FILES SELECTED</label>

					<div class="tableFixHead" v-else>
						<table  style="margin-top : 10px;">
							<tbody style="text-align : center ; height : 400px">
								<tr  v-bind:key="key" v-for="(file, key) in files">
									<td style="width : 5%">{{key + 1}}</td>
									<td style="width : 20%">
										<input class="fileTitle" v-model="file.title" placeholder="Please enter file title here" @input="onupdate"></input>
									</td>
									<td style="width : 10%">{{file.name || 'N/A'}}</td>
									<td style="width : 10%">{{file.type || 'N/A'}}</td>
									<td style="width : 10%">{{calculateFileSize(file.size)}}</td>

									<td style="width : 35%" v-if="needStage">

										<div v-for="item in file.stages" class="stagesContainer">
											<div class="stageContainer">
												<input type="checkbox" :value="item.selected"  v-model="item.selected" @click="item.selected = !item.selected;"> {{item.stage}}</input>
											</div>
										</div>





									</td>
									<td style="width : 10%">
										<button
										class="btAction red"
										@click="removeFile(key)">
										Remove
									</button>
								</td>
							</tr>
						</tbody>
					</table>

				</div>



			</div>

		</div>

		<div class="buttonsWrapper" slot="footer">
			<div class="bottonsContainer" style="width : 100% !important">

				<label class="picker">
					Select Files
					<input type="file" multiple @change="onFileChange" />

				</label>


				<button type="button" class="bt neg"  @click="onClickNegativeButton">Cancel</button>
				<button v-if="!allowUpload" type="button" class="bt neg" style="margin-left: 10px;" >Upload Files</button>

				<button v-if="allowUpload" type="button" class="bt pos" :disabled="!allowUpload" @click="onClickPositiveButton">Upload Files</button>
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
import Modal from './modal.vue'
var NotificationsController = require("../components/NotificationsController.js");
var OSS = require('ali-oss');

export default {
	name: 'filesUploadModal',
	components: {
		Modal
	},
	props: {
		bundleId : Number,
		needStage: Boolean
	},
	data() {
		return {
			showModal:true,
			email:null,
			name:null,
			isValidEmail:false,
			type: 'super',
			files:[],
			allowUpload: false,
			stages : [
				'temporary-freeze',
				'pre-instructor', // MEANS USER PAIDED AND SIGNED UP
				'pre-instructor-tbc', //USER DID NOT ATTEND TRAINING CLASSES
				'instructor-in-training', // USER ATTENDED THE TRAINING CLASSES
				'training-videos-submitted', // USER SUBMITTED TRAINING VIDEOS AFTER TRAINING CLASSES
				'exam-passed', // SUBMITTED TRAINING VIDEOS PASSED
				'exam-failed', // SUBMITTED TRAINING VIDEOS FAILED
				'license-fee-paid', // USER PASSED THE EXAM AND PAID THE LICENSE FEE
				'licensed-instructor' // USER PASSED THE EXAM AND PAID THE LICENSE FEE
			],
			allSelectedStages : []
		};
	},
	methods:{
		onupdate(){
			var file = null;
			this.files.forEach(function(f){
				const title = f.title || "";
				if (title === "") {
					file = f;
					return;
				}
			});
			if (file !== null) {
				this.allowUpload = false;
			}else{
				this.allowUpload = true;
			}
		},
		removeFile(index){
			console.log(index);
			this.files.splice(index , 1);
		},
		onFileChange(e) {
			const ctx = this;
			let vm = this;
			var selectedFiles = e.target.files;
			for (let i = 0; i < selectedFiles.length; i++) {
				var selected = selectedFiles[i];
				selected.stages = ctx.allSelectedStages;
				console.log(selected);
				this.files.push(selected);
			}
		},
		calculateFileSize(size){
			return (size / 1024 / 1024).toFixed(2) + 'MB';

		},
		onClickNegativeButton(){
			this.$emit('onInviteCancelled');
			this.close();

		},
		async onClickPositiveButton(){
			var ctx = this;
			NotificationsController.showActivityIndicator();
			var promises = [];

			let client = new OSS({
				region: 'oss-accelerate',
				accessKeyId: 'LTAI4GFTLJTB2U4J9mXzWP9n',
				accessKeySecret: 'yq6W4oN6pG5mxq07M23kwjeBAaoaRj',
				bucket: 'mybarre'
			});

			for (let index = 0; index < ctx.files.length; index++) {
				console.log("index = " , index);
				
				var file = ctx.files[index];
				console.log(file);
				let r1 = await client.put(file.title,file); 
				var url = r1.url;
				console.log("url = " , url);
				

				if (ctx.needStage) {
					var stages = [];
					file.stages.forEach((item, i) => {
						if (item.selected) {
							stages.push(item.stage)
						}
					});
					stages = JSON.stringify(stages);
				}else{
					stages = JSON.stringify([]);
				}

				var axios = HTTP.post(URLS.FILE.CREATE ,{
					type : 'bundle',
					item_name : file.title,
					bundle_id : ctx.bundleId,
					stages : stages,
					thumb_url : file.type.includes("vid") ? url+'?x-oss-process=video/snapshot,t_50000,f_jpg,w_800,h_600' : '',
					url : url,
					mime : file.type
				}, {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				});
				promises.push(axios);				
			}
			Promise.all(promises).then(function(values) {
				console.log(values);
				NotificationsController.hideActivityIndicator();
				ctx.showModal = false
				ctx.$emit('uploadSuccess')
			});
		},
		close(){
			this.showModal = false
			this.$emit('close')
		}
	},
	mounted() {
		var updated = [];
		this.stages.forEach((item, i) => {
			updated.push({
				selected : true,
				stage : item
			});
		});
		this.allSelectedStages = updated;
		console.log(this.allSelectedStages);

	}
}
</script>

<style >

.inviteContainer{
	display: flex;
	flex-direction: column;
}



.picker {
	width: 100px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	border-radius: 4px;
	font-size: 15px;
	transition: all 0.25s;
	color: #e91e63;
	border: 2px solid #e91e63;
	font-family: black;
	background: transparent;
	margin-right: 10px;
	margin-top: 1px;
}

.picker:hover{
	background: #e91e63;
	color: white;
}




.fileTitle{
	width: 90%;
	font-family: 'Bold';
	color: black;
	font-size: 16px;
	padding: 10px;
	outline: none;
	border-radius: 8px;
	border: 1px solid #4E08F0;
	margin-top: 10px;
	margin-bottom: 10px;
	/* background: transparent; */
	/* border: 0px; */

}

.notFiles{
	width: 100%;
	height: 500px;
	font-size: 16px;
	font-family: 'Regular';
	color: #e91e63;
	text-align: center;
	line-height: 500px;
}

.tableFixHead          { overflow-y: auto; min-height: 50%; max-height: 75%}
.tableFixHead thead th { position: sticky; top: 0; }

.stagesContainer{
	display: inline-block;
	float: left;
}

.stageContainer{
	margin-right: 5px;
	float: left;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
}

</style>
