<template lang="html">
  <div class="order">

    <div class="top">

      <img src="../assets/ic_back.png" class="goBack" @click="goBack">

      <label class="pageDesc" style="font-family : 'Bold' ; font-size : 24px">Order Detail</label>



      <div class="btn" v-if="order && order.status === 'pending_dispatch' " @click="displayUpdateStatusModal(order)">
        MARK AS DISPATCH
      </div>

    </div>



    <expandBtn title="Basic Information" @onToggle="expandBasicInfo = $event" style="margin-top : 20px" default="true"/>

    <div v-if="expandBasicInfo && order" class="cont">
    <div class="half-half">
      <div class="keyValCont">
        <label class="key">Order #</label>
        <label class="val">{{order.id}}</label>
      </div>
      <div class="keyValCont">
        <label class="key">Date </label>
        <label class="val">{{formatDate(order.createdAt)}}</label>
      </div>
    </div>

    <div class="half-half">
      <div class="keyValCont">
        <label class="key">Total Amount</label>
        <label class="val">¥ {{totalAmount}}</label>
      </div>
      <div class="keyValCont">
        <label class="key">Status label</label>
        <label class="val">{{order.status ? order.status.replace('_' , ' ').toUpperCase() : 'N/A'}}</label>
      </div>
    </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Courier Company</label>
          <label class="val">{{order.courier_company || 'N/A'}}</label>
        </div>
        <div class="keyValCont">
          <label class="key">Tracking #</label>
          <label class="val">{{order.tacking_number || 'N/A'}}</label>
        </div>

      </div>


      <div class="half-half">
        <div class="keyValCont">
          <label class="key">Wechat Out Trade #</label>
          <label class="val">{{order.out_trade_no || 'N/A'}}</label>
        </div>

        <div class="keyValCont">
          <label class="key">Remarks</label>
          <!-- <label class="val">{{order.remarks || 'N/A'}}</label> -->
          <label class="val">soidjisdojsapoijpof jdofjdaposijf opisfjd oipsdj fgopsdi jgfiaojgdiogjfasignfsdigj dfskjgfiugfdsipu ipdfijpifi ndkjg ndfgkj dfnglkjdfsngipdf gksdfng ip </label>
        </div>

      </div>
    </div>



    <expandBtn title="Reciepient Information" @onToggle="expandUserInfo = !$event" style="margin-top : 20px" default="false"/>

    <div v-if="expandUserInfo" class="cont">


        <div class="half-half">
          <div class="keyValCont">
            <label class="key">Name</label>
            <label class="val">{{order.reciepient_name}}</label>
          </div>
          <div class="keyValCont">
            <label class="key">Phone</label>
            <label class="val">{{order.phone}}</label>
          </div>
        </div>

        <div class="half-half">
          <div class="keyValCont">
            <label class="key">Address</label>
            <label class="val">{{order.address}} , {{order.zip_code}}</label>
          </div>
          <div class="keyValCont">
            <label class="key">City</label>
            <label class="val">{{order.city}}</label>
          </div>
        </div>
      </div>


      <expandBtn title="Products Information" @onToggle="expandProductsInfo = !$event" style="margin-top : 20px" default="false"/>

      <div v-if="expandProductsInfo" class="cont">

        <div class="empty" v-if="order.items.length <= 0">
          No Products Were Found...
        </div>

        <div class="grid">
    			<div class="productCard" v-for="item in order.items">
            <img :src="item.product.thumbnail_url">
            <div class="infoView" style="border-top : 2px solid #4E08F0">
              <label class="key">Name</label>
              <label class="value">{{item.product.name}}</label>
            </div>
            <div class="infoView" >
              <label class="key">Price</label>
              <label class="value">¥{{item.product.price}}</label>
            </div>
            <div class="infoView">
              <label class="key">Qty</label>
              <label class="value">{{item.count}}</label>
            </div>
    			</div>
    		</div>

        </div>


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
		name : 'order',
		components: {
      Modal,
      ExpandBtn
	 },
		props: ['id'],
	 data() {
		 return {
       order : null,
       totalAmount : 0,
       updateableOrderObject : null,
       showStatusModal : false,
       expandBasicInfo: true,
       expandUserInfo:false,
       expandProductsInfo: false
		 };
	 },
		methods:{
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
              ctx.getTrainingData();
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
      goBack(){
        this.$emit('hideOrderDetail')
      },
      getTrainingData: function(){
        const ctx = this;
        HTTP.get(URLS.ORDER.BY_ID.replace(':id' , this.id) ,  {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(res) {
          const d = res.data.data;
          ctx.order = d;

          var amount = 0;
          ctx.order.items.forEach(function(item){
            var count = item.count;
            var price = item.product.price;
            amount = amount + (count * price)
          })
          ctx.totalAmount = amount;

          NotificationsController.hideActivityIndicator();
        })
        .catch(function(error) {
          NotificationsController.hideActivityIndicator();
          NotificationsController.showErrorNotification(error);
        });
      },
      formatDate: function(dateStr){
        return dateStr.replace(/T/, ' ').replace(/\..+/, '')
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
  
  height: auto !important;
  line-height: 40px;
  font-family: 'Medium';
  font-size: 16px;
  color: white;
  text-align: left;
  border-bottom: 0.1px solid gray;
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

.order .section{
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

.order .grid{
	display: inline-block;
	text-align: center;
  float: left;
	/* flex-direction: row; */
}

.order .grid .productCard{
	width: 200px;
	min-height: 290px;
	margin-right: 10px;
	float: left;
	margin-top: 10px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.order .grid .productCard > img{
  width: 100%;
  height: 200px;
}

.order .grid .productCard .infoView{
  width: calc(100% - 20px);
  min-height: 30px;
  display: inline-block;
  margin-left: 10px;
}

.order .grid .productCard .infoView .key{
  width: auto;
  height: 30px;
  line-height: 30px;
  float: left;
  text-align: left;
  font-size: 12px;
  color: black;
  font-family: 'Medium'
}


.order .grid .productCard .infoView .value{
  width: auto;
  min-height: 30px;
  line-height: 30px;
  float: right;
  text-align: right;
  font-size: 16px;
  color: black;
  font-family: 'BOld'
}






/* .training .grid .rename:hover{
  background: #fec60a;
  color: white;
} */




</style>
