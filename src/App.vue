<template>
  <div id="app">

    <div class="notificationBar" id="notificationBar">
      <label class="notificationText" id="notificationMsg">Login failed</label>
      <img class="notificationCloseBtn" src="./assets/ic_close_white.png" @click="removeNotication"/>
    </div>

    <router-view/>


    <transition >
      <div class="modal-mask" id="loadingDiv" style=" visibility : hidden">
        <div class="modal-wrapper">
          <div class="modal-container" >
            <div class="loadingInner" style="width : 100px ; height : 100px ; background : rgba(255, 255, 255, 0.9); border-radius : 10px ;     box-shadow:  1px 1px 4px 4px black;   position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);">
                <img src="./assets/loading.gif" style="width : 100% ; height : 100% ;" />
            </div>
          </div>
        </div>
      </div>
    </transition>


    <transition >
      <div class="videoContainer" id="videoView" style=" display : none">
        <div class="preview_top">
            <label class="title">Preview</label>
            <img class="close" src="./assets/ic_close_white.png" @click="closeVideo"/>
        </div>

        <div class="imgInner">
          <video id="videoPlayer" class="videoView" :src="videoModel.url" autoplay controls :poster="videoModel.thumb_url">
          </video>
        </div>


      </div>
    </transition>


    <!-- <transition >
      <div class="videoContainer" id="pdfView" style=" display : table">
        <div class="inner">

          <iframe src="http://localhost:3001/download/FPF_New-1582302145750.pdf" width="100%" height="100%"></iframe>




          <img class="close" src="./assets/ic_close.png" @click="closeVideo"/>
        </div>
      </div>
    </transition> -->




    <transition >
      <div class="videoContainer" id="imageView" style=" display : none">
        <div class="preview_top">
            <label class="title">Preview</label>
            <img class="close" src="./assets/ic_close_white.png" @click="closeImage"/>
        </div>
        <div id="imgInner" class="imgInner">

        </div>
      </div>
    </transition>

  </div>
</template>


<script>
  export default {
	name: 'MainApp',
  data() {
    return {
      showingVideo: false,
      videoModel: null,
      videoModel:{url : '' , thumb_url : ''},
    };
  },
   methods : {
     closeVideo(){
       document.getElementById('videoView').style.display = 'none';
       this.videoModel = {url : '' , thumb_url : ''};
       var video = document.getElementById("videoPlayer");
       video.pause();
       video.currentTime = 0;
     },
     closeImage(){
       document.getElementById('imageView').style.display = 'none';
       // document.getElementById('image').style."background-image" = '';
       document.getElementById("imgInner").innerHTML = '<img id="u23_img" class="videoView " src="">';
     }
   },
    mounted() {
      const ctx = this;
      this.$root.$on('showVideo', function(data) {
        ctx.videoModel = data;
        document.getElementById('videoView').style.display = 'table';
        var video = document.getElementById("videoPlayer");
        video.play();
        video.currentTime = 0;
      });

      this.$root.$on('showImage', function(data) {
        document.getElementById("imgInner").innerHTML = '<img id="u23_img" class="videoView" src="'+ data.url+ '">';
        console.log(document.getElementById("imgInner").innerHTML);
        document.getElementById('imageView').style.display = 'table';
      });


    }
  }
</script>

<style>

@font-face {
    font-family: 'Regular';
    src: url(./assets/fonts/Saira-Regular.ttf) format('truetype');
}

@font-face {
    font-family: 'Thin';
    src: url(./assets/fonts/Saira-Thin.ttf) format('truetype');
}

@font-face {
    font-family: 'Black';
    src: url(./assets/fonts/Saira-Black.ttf) format('truetype');
}

@font-face {
    font-family: 'Bold';
    src: url(./assets/fonts/Saira-Bold.ttf) format('truetype');
}

@font-face {
    font-family: 'ExtraBold';
    src: url(./assets/fonts/Saira-ExtraBold.ttf) format('truetype');
}

@font-face {
    font-family: 'ExtraLight';
    src: url(./assets/fonts/Saira-ExtraLight.ttf) format('truetype');
}

@font-face {
    font-family: 'Medium';
    src: url(./assets/fonts/Saira-Medium.ttf) format('truetype');
}

*{
  font-family: 'Regular';
}

::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}


.notificationBar{
  width: 100%;
  background: #ffb74d;
  z-index: 1000;
  display: none;
  position: fixed;
  z-index: 100000;
  top: 0;
  right: 0;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.notificationCloseBtn{
  width: 30px;
  height: 30px;
  border-radius: 30px;
  transition: all 0.25s;
  border: 2px solid transparent;
}

.notificationCloseBtn:hover{
  border: 2px solid white
}

.notificationText{
  float: left;
  width: calc(100% - 70px);
  padding: 10px;
  font-family: regular;
  color: white;
  font-weight: 300;
  margin-left: 10px;
  text-align: left;
}

.modalBody {
    display: table;
    width: 100%;
}

.modalInput {
    width: 100%;
    float: left;
    height: 50px;
}

.modalInputTitle {
    width: 100%;
    font-size: 12px;
    color: #bdbdbd;
    font-weight: 600;
    text-align: left;
    float: left;
}

.modalTextInput {
    width: 100%;
    background: transparent;
    color: white;
    float: left;
    height: 30px;
    font-size: 16px;
    border: 0px solid transparent;
    border-bottom: 1px solid #bdbdbd;
    outline: none;
    text-align: left;
}

.modalTextValue{
   width: 100%;
    background: transparent;
    color: white;
    float: left;
    height: 30px;
    text-align: left;
    font-size: 16px;
    margin-top: 4px;
}

.modalNotice{
  width: 100%;
  margin-top: 30px;
  color: white;
  font-size: 14px;
  font-family: monospace;
  float: left;
}

.modalDescription{
   width: 100%;
    background: transparent;
    color: white;
    float: left;
    height: auto;
    font-size: 18px;
    outline: none;
    margin-bottom: 20px;
    text-align: left;
}

.modalVerticalSpacing {
    margin-top: 20px;
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50; */
  text-align: center;
}

.table{
  width: 100%;

}

.head{

  height: 60px;

}

.column{
  background: #455a64;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 800;
  position: sticky;
   top: 0px;
   box-shadow: 1px 1px 10px 1px black;
}

.rowCont{
  transition: transform 0.5s;

}

.rowCont:hover{

  transform: scale(1.01);
  box-shadow: 1px 1px 10px 1px black;
  background: #37474f;

}


.row{
  text-align: center;
  padding: 10px;
  height: 40px;
  color: white;
  font-size: 14px;
  border: 1px solid #37474f;

}


.btAction{
  height: 30px;
  color: white;
  margin: 4px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  outline : none;
  border: 0px solid transparent;
  transition: all 0.25s;
}

.big{
  height: 42px;
  font-size: 15px;
  border-radius: 20px;
  width: 150px;
  line-height: 30px;
  float: right;
}

.big:hover{
  transform: scale(1.1);
  box-shadow: 1px 1px 10px 1px black;
}

.btAction:hover{
  /* transform: scale(1.1);
  box-shadow: 1px 1px 10px 1px black; */
}

.green{
  border: 1px solid #4caf50;
  background: transparent;
  color: #4caf50;
}

.green:hover{
  background: #4caf50;
  color: white;
}

.purple{
  border: 1px solid #4E08F0;
  background: transparent;
  color: #4E08F0;
}

.purple:hover{
  background: #4E08F0;
  color: white;
}

.red{
  color: #f44336;
  border: 1px solid #f44336;
  background: transparent;
}

.red:hover{
  background: #f44336;
    color: white
}


.yellow{
  border: 1px solid #fec60a;
  background: transparent;
  color: #fec60a;
}

.yellow:hover{
  background: #fec60a;
    color: white
}


.grey{
  border: 1px solid gray;
  background: transparent;
  color: gray;
}

.grey:hover{
  background: gray;
    color: white
}


.orange{
  border: 1px solid #ff7043;
  background: transparent;
    color: #ff7043;
}

.orange:hover{
  background: #ff7043;
  color: white
}

.searchContainer {
  width: 100%;
	height: 50px;
	float: left;
	margin-bottom: 10px;
	border: 1px solid #455a64;
	display: inline-block;
}

.searchTitle {
	width: 200px;
	background: #455a64;
	color: white;
	text-align: center;
	line-height: 50px;
	float: left;
	padding-left: 10px;
	padding-right: 10px
}

.searchInput{
  width: calc(100% - 235px);
  text-align: center;
  background: transparent;
  color: white;
  float: left;
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border : 0px solid transparent;
  outline: none;
  float: left;
}

.checksContainer {
    width: 100%;
    background: transparent;
    height: 50px;
    display: flex;
}

.checkContainer {
    height: 50px;
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.checkTitle {
    height: 50px;
    font-size: 16px;
    color: white;
    line-height: 50px;
    margin-left: 10px;
}

.check {
    width: 20px;
    height: 20px;
    line-height: 50px;
    color: white;
}

.modelSave {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    background: #4caf50;
    color: white;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    border: 0px solid transparent;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
}

.searchContainer {
  width: 100%;
	height: 50px;
	float: left;
	margin-bottom: 10px;
	border: 1px solid #455a64;
	display: inline-block;
}

.searchTitle {
	width: 200px;
	background: #455a64;
	color: white;
	text-align: center;
	line-height: 50px;
	float: left;
	padding-left: 10px;
	padding-right: 10px
}

.searchInput{
  width: calc(100% - 235px);
  text-align: center;
  background: transparent;
  color: white;
  float: left;
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border : 0px solid transparent;
  outline: none;
  float: left;
}

.srchCont {
    width: calc(100% - 70px);
    height: 50px;
    float: left;
    margin-bottom: 10px;
    border: 1px solid #455a64;
    display: inline-block;
}

.addBtn {
    height: 50px;
    width: 50px;
    margin-left: 10px;
    font-size: 16px;
    color: white;
    transition: all 0.25s;
    border-radius: 100px;
}

.addBtn:hover {
  background: white;
border-width: 2px;
}

/* .addBtn {
    background: red;
    border-radius: 100px;
} */

/* thead{
   position: sticky;
    top: 0px;
} */
.usersCont{
  text-align: left;
  padding: 10px;

}


.vdatetime-popup__header{
    background: #4caf50 !important;
}

.vdatetime-calendar__month__day--selected > span > span{
      background-color: #4caf50 !important;
}

.vdatetime-popup__actions__button{
  color: #4caf50 !important;
}

.vdatetime-time-picker__item--selected{
  color: #4caf50 !important;
}

.vdatetime-time-picker__item--selected {
  color: #4caf50 !important;
}

.ap-input, .ap-hint{
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.ap-input-icon{
  right : 0 !important;
}


.event-section-heading{
	width: 100%;
  float: left;
  line-height: 30px;
  font-size: 18px;
	font-weight: bold;
  color: #4caf50;
  font-weight: 600;
  text-align: left;
	margin-top: 40px;
}

.heading-small{
	width: 100%;
  font-size: 12px;
  color: #4caf50;
  font-weight: bold;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 4px;
}

.pageActionsContainer{
  display: flex;
  float: right;
}


.btBase{
  width: 150px;
  height: 30px;
  background: transparent;
  color: white;
  font-weight: bold;
  font-size: 12px;
  line-height: 30px;
  border-radius: 3px;
  transition: all 0.25s;
  margin-left: auto;
}

.btBase:hover{
  width: 200px;
  font-size: 14px;
  border-radius: 15px;
  color: white;
}

.btSave {
  border: 2px solid #4caf50;
  color: #4caf50;
}

.btSave:hover {
  background: #4caf50;
}

.btDiscard {
  border: 2px solid #fec60a;
  color: #fec60a;
  margin-left: 10px;
}

.btDiscard:hover {
  background: #fec60a;
}

.btDelete {
  border: 2px solid red;
  color: red;
  margin-left: 10px;
}

.btDelete:hover {
  background: red;
}

.vertical-spacing {
  margin-top: 20px;
}

.horizontalLine{
  height:1px;
  width: 100%;
  background: gray;
}

.checksContainer {
   width: 100%;
    background: transparent;
    height: 50px;
    display: flex;
}

.checkContainer {
    height: 50px;
    width: 40%;
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
}

.checkTitle {
   height: 50px;
   font-size: 16px;
   color: #37474f;
   line-height: 50px;
   margin-left: 10px;
}

.check {
   width: 20px;
   height: 20px;
   line-height: 50px;
   color: white;
}

.btCancel{
  width: 100%;
  height: 60px;
  line-height: 60px;
  outline: none;
  color: #4E08F0;
  font-family: medium;
  background: transparent;
  border: 1px solid transparent;
  font-size: 16px;
  margin-top: 10px;
  transition: all 0.25s;
}

.btCancel:hover{
  border: 2px solid #4E08F0;
  color: #4E08F0;
  border-radius: 4px;
}

input[type="radio"] {
 /* remove standard background appearance */
 -webkit-appearance: none;
 -moz-appearance: none;
 appearance: none;
 /* create custom radiobutton appearance */
 display: inline-block;
 width: 25px;
 height: 25px;
 padding: 4px;
 /* background-color only for content */
 background-clip: content-box;
 border: 2px solid #bbbbbb;
 background-color: #e7e6e7;
 border-radius: 50%;
	outline: none;
}

input[type="radio"]:checked {
  background-color: #4E08F0;
}

input[type="file"] {
   display: none;
}

.imgPicker {
 width: 175px;
 height: 175px;
border-radius: 87.5px;
border: 1px solid rgba(68, 9, 235, 0.8);
 color: transparent;
 font-size: 12px;
 transition: all 0.25s;
outline: none;
overflow: hidden;
position: relative;
	z-index: 1;
	box-shadow: 1px 1px 10px 4px rgba(0, 0, 0, 0.2);
	margin-left: calc(50% - 87.5px);
	transform: all 0.25s;
  margin: auto;
}

.imgPicker:hover{
	box-shadow: 1px 2px 10px 10px rgba(0, 0, 0, 0.1);
}

.avatar{
	width: 175px;
 height: 175px;
	border-radius: 87.5px;
	outline: none;
	position: absolute;
	z-index: 2;
	left: 0;
}

.uploadBtn{
	width: 100%;
	height: 30px;
	line-height: 25px;
	background: rgba(68, 9, 235, 0.8);
	position: absolute;
	z-index: 3;
	left: 0;
	bottom: 0;
	color: white;
	font-family: bold;
	font-size: 10px;
	box-shadow: 2px 2px 10px 6px rgba(0, 0, 0, 0.2);
}

.videoContainer{
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
}


.videoContainer .inner{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.videoContainer .videoView{
  max-width: 90vw;
  max-height: calc(100vh - 70px);
  outline: none;
  padding: 10px;
}


.videoContainer  .preview_top{
  width: 100vw;
  height: 50px;
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 3px solid #4E08F0;
}

.videoContainer  .preview_top .title{
  margin-left: 20px;
  color: white;
  font-size: 16px;
  font-weight: bold;
}
.videoContainer  .preview_top .close{
  width: 30px;
  height: 30px;
  margin-left: auto;
  margin-right: 20px;
  transition: all 0.5s;
  border-radius: 20px;
  border: 2px solid transparent;
}

.videoContainer  .preview_top .close:hover{
  /* width: 40px;
  height: 40px; */
  background: #4E08F0;
  border: 2px solid white;
}

.imgInner{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
