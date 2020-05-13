CE Store<template lang="html">
  <div >
    <div class="dash">

  		<div class="cont"  v-if="total">
        <div class="square" >
          <div class="titleContOuter">
            <div class="titleCont" style="border-left: 4px solid #26A69A;">
              <label class="name" style="color : #26A69A">TOTAL</label>
        			<label class="value" >TOTAL ENTRIES CREATED FOR</label>
            </div>
          </div>
          <div class="kvv" style="margin-top : 30px ">
            <label class="k">USERS</label>
            <label class="v">{{total.users}}</label>
          </div>
          <div class="kvv">
            <label class="k">ADMINS</label>
            <label class="v">{{total.admins}}</label>
          </div>
          <div class="kvv">
            <label class="k">TRAINGINGS</label>
            <label class="v">{{total.memberships}}</label>
          </div>
          <div class="kvv">
            <label class="k">BUNDLES</label>
            <label class="v">{{total.bundles}}</label>
          </div>
          <div class="kvv">
            <label class="k">COURSES</label>
            <label class="v">{{total.courses}}</label>
          </div>
          <div class="kvv">
            <label class="k">PRODUCTS</label>
            <label class="v">{{total.products}}</label>
          </div>
          <div class="kvv">
            <label class="k">ORDERS</label>
            <label class="v">{{total.orders}}</label>
          </div>
          <div class="kvv">
            <label class="k">FILES</label>
            <label class="v">{{total.files}}</label>
          </div>
    		</div>
      </div>

      <div class="cont"  v-if="revenue" style="float : right">
        <div class="square" >
          <div class="titleContOuter">
            <div class="titleCont" style="border-left: 4px solid #D81B60;">
              <label class="name" style="color : #D81B60">TOTAL REVENUE</label>
              <label class="value" >ACCUMLATED REVENUE FROM TRAINGINGS , STORE and BUNDLES</label>

              <label class="totalRevenue">
                ¥{{getTotalRevenue(revenue)}}</label>
            </div>
          </div>


          <pie-chart
          height="360px"
          width="100%"
          :donut="true"
          :data="[
          ['Store' , revenue.store],
          ['Store Shipping' , revenue.shippingRevenue],
          ['Trainings', revenue.membership] ,
          ['License' , revenue.license],
          ['CE Store', revenue.bundles] ]"></pie-chart>

        </div>
      </div>


      <div class="cont" v-if="users" style="width : 99.5% !important; margin-top : 20px; height : 500px">
        <div class="square" >
          <div class="titleContOuter">
            <div class="titleCont" style="border-left: 4px solid #F57C00;">
              <label class="name" style="color : #F57C00">CREATION BY DATE</label>
              <label class="value" >USERS , ADMINS , TRAINGINGS , STORE ORDERS AND CE STORE ORDERS CREATION BASED ON CREATION DATE</label>

            </div>
          </div>

          <line-chart
          height="500px"
           :data="[
           {name: 'USERS', data: graphs.users},
           {name: 'ADMINS', data: graphs.admins},
           {name: 'TRAINGINGS', data: graphs.memberships},
           {name: 'STORE ORDERS', data: graphs.storeOrders},
           {name: 'CE STORE ORDERS', data: graphs.bundleOrders},
           ]" />
        </div>
      </div>

    </div>



  </div>
</template>

<script>

import {
    HTTP, URLS
}
from '../network/http';
var NotificationsController = require("../components/NotificationsController.js");
import ApexCharts from 'apexcharts'

  export default {
		name: 'dashboard',
	  components: {

	  },
    props: {

    },
	  data() {
	    return {
        users : {},
        graphs : {},
        revenue: {store : 0 , membership : 0 , bundles : 0},
        total : {}
	    };
	  },
    methods:{
      getTotalRevenue(revenue){
        var total = parseFloat(revenue.store || 0.0)+ parseFloat(revenue.shippingRevenue || 0.0) + parseFloat(revenue.memberships || 0.0) + parseFloat(revenue.license || 0.0) + parseFloat(revenue.bundles || 0.0);
        total = parseFloat(total).toFixed(2);
        return total;
      },
			getUsers(){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				HTTP.get(URLS.DASHBOARD.GRAPHS , {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
						.then(function(res) {
              var users = {};
              res.data.data.users.forEach(function(obj){
                users[obj.date] = obj.count
              })
              ctx.graphs.users = users;

              var admins = {};
              res.data.data.admins.forEach(function(obj){
                admins[obj.date] = obj.count
              })
              ctx.graphs.admins = admins;

              var memberships = {};
              res.data.data.memberships.forEach(function(obj){
                memberships[obj.date] = obj.count
              })
              ctx.graphs.memberships = memberships;

              var storeOrders = {};
              res.data.data.storeOrders.forEach(function(obj){
                storeOrders[obj.date] = obj.count
              })
              ctx.graphs.storeOrders = storeOrders;

              var bundleOrders = {};
              res.data.data.bundleOrders.forEach(function(obj){
                bundleOrders[obj.date] = obj.count
              })
              ctx.graphs.bundleOrders = bundleOrders;
              console.log(ctx.graphs);

							NotificationsController.hideActivityIndicator();
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
      getRevenue(){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				HTTP.get(URLS.DASHBOARD.REVENUE , {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
						.then(function(res) {
              ctx.revenue = res.data.data;
							NotificationsController.hideActivityIndicator();
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
      getTotal(){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				HTTP.get(URLS.DASHBOARD.TOTAL , {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
						.then(function(res) {
              ctx.total = res.data.data;
							NotificationsController.hideActivityIndicator();
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			}
    },
    mounted() {
      this.getRevenue();
      this.getTotal();
      this.getUsers();
    }
  }
</script>

<style lang="css" scoped>

.dash{

	display: inline-block;
	padding-top: 20px;
  padding-bottom: 20px;


  background: rgba(255,255,255,0.5);
  box-shadow: 0px 0px 10px 0px #BDBDBD;



  margin-top: 20px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.cont{
  float: left;
  height: auto;
  display: flex;
  width: auto;
  margin-right: 10px;
  margin-bottom: 40px;
  min-width: 48%;

}

.square{
  width: 100%;
  min-height: 450px;
	display: flex;
	flex-direction: column;

  transition: all 0.5s;
  padding: 20px;
  border-radius: 4px;
}

.square:hover{
  /* z-index: 100;
  transform: scale(1.01); */
}

.titleContOuter{
  min-height: 80px
}
.titleCont{
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.square .name{
	font-family: 'Thin';
  text-align: left;
  color: #000000;
  font-family: 'ExtraBold';
  font-size: 18px;
  line-height: 20px;

}
/* 37474f */

.square .value{
  color: #616161;
  font-family: 'ExtraBold';
  text-align: left;
  font-size: 12px;
  line-height: 20px;
  margin-top: 4px;
}

.kvv{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 0.3px solid #9E9E9E;
}

.k{
  font-size: 12px;
  font-family: medium;
  color: #424242;
}

.v{
  font-size: 14px;
  font-family: bold;
  color:#212121;
  margin-left: auto;
}

.totalRevenue{
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-weight: bold;
  font-family: 'Medium';
  text-align: left;
  margin-top: 10px;
}

.totalRevenue span{
  font-size: 14px;
  font-weight: bold;
  font-family: 'Regular';

}
</style>
