<template lang="html">
  <div class="order">

    <div class="top">
      <img src="../assets/ic_back.png" class="goBack" @click="goBack">
      <label class="pageDesc" style="font-family : 'Bold' ; font-size : 24px">Course Detail</label>
    </div>

    <expandBtn title="Course Information" @onToggle="expandBasicInfo = $event" default="true" style="margin-top : 20px"/>

    <div v-if="expandBasicInfo" class="cont">
      <div class="half-half" >
        <div class="keyValCont">
          <label class="key">Name</label>
          <label class="val">{{course.name || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Price</label>
          <label class="val">{{course.price || 'N/A'}}</label>
        </div>
      </div>

      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Start</label>
          <label class="val">{{course.start || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">End</label>
          <label class="val">{{course.end || 'N/A'}}</label>
        </div>
      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Seats</label>
          <label class="val">{{course.seats || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Available Seats</label>
          <label class="val">{{course.available_seats || 'N/A'}}</label>
        </div>
      </div>




    </div>

    <expandBtn title="Memberships" @onToggle="expandMemberships = $event" style="margin-top : 20px"/>

    <div v-if="expandMemberships" class="cont">
      <div class="empty" v-if="course.memberships.length <= 0">
        No Memberships
      </div>
      <table style="margin-top : 10px" v-if="course.memberships.length > 0">
        <thead>
          <tr >
            <th  style="width : 5%">ID</th>
						<th  style="width : 25%">STUDENT NAME</th>
						<th  style="width : 15%">START</th>
						<th  style="width : 15%">END</th>
						<th  style="width : 15%">STATUS</th>
						<th  style="width : 15%">OUT TRADE #</th>
						<th  style="width : 10%">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-bind:key="course.id" v-for="item in course.memberships">
            <td >{{item.id || 'N/A'}}</td>
						<td >{{item.user.name || 'N/A'}}</td>
						<td >{{item.start || 'N/A'}}</td>
						<td >{{item.end || 'N/A'}}</td>
            <td >{{item.status ? item.status.replace('_' , ' ').toUpperCase() : 'N/A'}}</td>
            <td >{{item.out_trade_no || 'N/A'}}</td>
						<td >
							<button
									@click="$emit('onMembershipClick' , item.id)"
									class="btAction purple"
								>DETAILS</button>
						</td>
          </tr>
        </tbody>
      </table>
		</div>




  </div>
</template>

<script>

import Modal from "../components/modal.vue";
import ExpandBtn from "../components/expadBtn.vue";

import {
    HTTP, URLS
}
from '../network/http';
var NotificationsController = require("../components/NotificationsController.js");

  export default {
		name : 'courseDetail',
		components: {
      Modal,
      ExpandBtn
	 },
		props: ['courseId'],
	 data() {
		 return {
			 course : null,
			 expandBasicInfo: true,
			 expandMemberships: true
		 };
	 },
		methods:{
      goBack(){
        this.$emit('hideCourseDetail')
      },
      getCourse: function(){
        const ctx = this;
        HTTP.get(URLS.COURSE.BY_ID.replace(':id' , this.courseId) ,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          ctx.course = res.data.data
          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          ctx.loadingCourse = false
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      }
    },
    mounted() {
      if (this.id === undefined || this.id === null || this.id <= 0) {
        const ctx = this;
        const params = new URLSearchParams(window.location.search);
        const lv3TabRaw = params.get('lv3Tab');
        const lv3Tab = lv3TabRaw.substring(0 , lv3TabRaw.indexOf('?')) || null;
        console.log("lv3Tab = " , lv3Tab);
        if (lv3Tab === 'course') {
          var id = lv3TabRaw.substring(lv3TabRaw.indexOf("=") + 1 , lv3TabRaw.length)
          this.id = id;
        }
      }
      this.getCourse();
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

.cont{
  width: 100%;
}

.half-half{
  width: 100%;
  height: 60px;
  display: inline-block;
  margin-bottom: 20px;
}


.tripleKeyValCont{
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: left;
  margin-top: 20px;
  transition: all 0.25s;
}

.tripleKeyValCont:nth-of-type(1){
  margin-right: 0.3%;
}

.empty{
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 14px;
  color: white;
}

.tripleKeyValCont:nth-of-type(2){
  margin-right: 0.3%;
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

.qAndACont{
  width: 100%;
  height: auto !important;
  min-height: 60px !important;
}

.answer{
  min-height: 40px !important;
  height: auto !important;
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
  border-bottom: 0.5px solid #424242;
}
.order{
	width: calc(100vw - 40px);
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.order .top{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.order .top .pageDesc{
  width: calc(100% - 120px);
	color: white;
	font-size: 18px;
	font-family: 'Thin';
  text-align: left;
}


.order .top .btn{
    width: 200px;
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

.order .top .btn:hover{
  font-family: 'Bold';
}



.order .grid{
	display: inline-block;
	text-align: center;
  float: left;
	/* flex-direction: row; */
}

.order .grid .item{
	width: 200px;
	height: 270px;
	margin-right: 10px;
	float: left;
	margin-top: 10px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.order .grid .whiteCard{
  height: auto !important;
  padding: 8px;
  box-shadow: 0px 0px 4px 0px gray !important;
}

.order .gird .checkCont{
  width: 100%;
  height: 50px;
}

.tick{
  width: 30px;
  height: 30px;
  border-radius: 20px;
  float: right;
  border: 1px solid #999999;
}

.order .grid .item > img{
  width: 100%;
  height: 200px;
  background: pink;
}

.order .grid .item .infoView{
  width: calc(100% - 20px);
  height: 30px;
  display: inline-block;
  margin-left: 10px;
}

.order .grid .item .infoView .key{
  width: auto;
  height: 30px;
  line-height: 30px;
  float: left;
  text-align: left;
  font-size: 12px;
  color: black;
  font-family: 'Medium'
}


.order .grid .item .infoView .value{
  width: auto;
  height: 30px;
  line-height: 30px;
  float: right;
  text-align: right;
  font-size: 16px;
  color: black;
  font-family: 'BOld'
}



.productsList{
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-top: 6px;
}

.productsList .item{
  height: auto;
}

.productsList .item .name{
  height: auto;
  line-height: 20px;
  float: left;
  width: 50%;
  font-size: 14px;
  color: #616161;
  text-align: left;
  font-family: 'Bold';
}

.productsList .item .count{
  height: 20px;
  line-height: 20px;
  float: left;
  width: 10%;
  font-size: 12px;
  color: #616161;
  font-family: 'Bold';
  text-align: right;
}

.productsList .item .price{
  height: 20px;
  line-height: 20px;
  float: left;
  width: 20%;
  font-size: 12px;
  color: #616161;
  font-family: 'Bold';
  text-align: right;
}


.productsList .item  .heading{
  font-size: 12px;
  color: #4E08F0;
  font-family: 'Bold';
  text-align: right;
}
/* .training .grid .rename:hover{
  background: #fec60a;
  color: white;
} */

.hori_cont{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
}

.actions_cont{
  display: flex;
  flex-direction: row;
  margin-left: auto;
}
.action_btn{
  min-width: 100px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  font-size: 14px;
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  transition: all 0.5s;
  line-height: 40px;
  margin-top: 5px;
  margin-left: 10px;
}

.action_btn:hover{
  background: #4E08F0;
  color: white;
  font-weight: 800;
  border-radius: 20px;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
}


</style>
