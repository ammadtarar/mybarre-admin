CE Store<template lang="html">
  <div >
    <div class="dash">

      <div class="tripleContainer">

        <div class="item" style="margin-right : 2%; width: 20%;">
          <div class="cont"  v-if="total">
            <div class="square" >
              <div class="titleContOuter">
                <div class="titleCont" style="border-left: 4px solid #26A69A;">
                  <label class="name" style="color : #26A69A">TOTAL</label>
            			<label class="value" >TOTAL ENTRIES CREATED FOR</label>
                </div>
              </div>
              <div class="kvv" >
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
                <label class="k">LICENSE RENEWALS</label>
                <label class="v">{{total.license_renewals}}</label>
              </div>
              <div class="kvv">
                <label class="k">ORDERS</label>
                <label class="v">{{total.orders}}</label>
              </div>
            <div class="kvv">
              <label class="k">FILES</label>
              <label class="v">{{total.files}}</label>
            </div>
              <div class="kvv">
                <label class="k">TOTAL DISK SIZE</label>
                <label class="v">{{disk.total_str}}</label>
              </div>
              <div class="kvv">
                <label class="k">AVAILABLE DISK SIZE</label>
                <label class="v">{{disk.free_str}}</label>
              </div>
        		</div>
          </div>
        </div>


        <div class="item" style="margin-right : 2% ; width: 20%;">
          <div class="cont"  v-if="revenue" style="float : right">
            <div class="square" >
              <div class="titleContOuter">
                <div class="titleCont" style="border-left: 4px solid #AFB42B;">
                  <label class="name" style="color : #AFB42B">DISK</label>
                  <label class="value" >SERVER DISK SIZE AND AVAILABLE </label>
                </div>
              </div>


              <pie-chart
               :colors= "['#00897B', '#FF1744']"
              :data="[
              ['Available ( ' + String(disk.free) + ' GB )' , disk.free],
              ['Used ( ' + String(disk.total - disk.free) + ' GB )' , disk.total - disk.free]]"></pie-chart>

            </div>
          </div>
        </div>

        <div class="item" style="margin-right : 2% ; width: 20%;">
          <div class="cont"  v-if="revenue" style="float : right">
            <div class="square" >
              <div class="titleContOuter">
                <div class="titleCont" style="border-left: 4px solid #D81B60;">
                  <label class="name" style="color : #D81B60">GENDER RATIO</label>
                  <label class="value" >GENDER RATIO FOR ALL THE USRES</label>

                </div>
              </div>


              <pie-chart
              :colors= "['#42A5F5', '#E91E63']"
              :data="[
              ['Male ( ' + String(maleCount) + ' )' , maleCount],
              ['Female ( ' + String(femaleCount) + ' )' , femaleCount] ]"></pie-chart>

            </div>
          </div>
        </div>

        <div class="item" style="width: 39% ">
          <div class="cont"  v-if="revenue" style="float : right">
            <div class="square" >
              <div class="titleContOuter">
                <div class="titleCont" style="border-left: 4px solid #3366CC;">
                  <label class="name" style="color : #3366CC">TOTAL REVENUE : <span class="totalRevenue">
                    ¥{{revenue}}</span></label>
                  <label class="value" >ACCUMLATED REVENUE FROM Store , Store Shipping , Trainings , License , CE Store</label>


                </div>
              </div>


              <pie-chart
              :data="[
              ['Store ( ¥ ' + String(revenueObj.store) + ' )' , revenueObj.store],
              ['Store Shipping ( ¥ ' + String(revenueObj.shippingRevenue) + ' )' , revenueObj.shippingRevenue],
              ['Trainings ( ¥ ' + String(revenueObj.membership) + ' )', revenueObj.membership] ,
              ['License ( ¥ ' + String(revenueObj.license) + ' )' , revenueObj.license],
              ['License Renewals ( ¥ ' + String(revenueObj.licenseRenewals) + ' )'  , revenueObj.licenseRenewals],
              ['CE Store ( ¥ ' + String(revenueObj.bundles) + ' )', revenueObj.bundles] ]"
              ></pie-chart>

            </div>
          </div>
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
        revenueObj : {store : 0 , membership : 0 , bundles : 0},
        revenue: 0.0,
        total : {},
        femaleCount: 0,
        maleCount: 0,
        disk: {
          total_str : "0 GB",
          free_str : "0 GB",
        }
	    };
	  },
    methods:{
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
              ctx.revenueObj = res.data.data;
              const revenue = res.data.data;
              var total = parseFloat(revenue.licenseRenewals) + parseFloat(revenue.store) + parseFloat(revenue.membership) + parseFloat(revenue.shippingRevenue) +  parseFloat(revenue.license) + parseFloat(revenue.bundles);
              total = total.toFixed(2);
              ctx.revenue = total;
							NotificationsController.hideActivityIndicator();
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
      getDisk(){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				HTTP.get(URLS.DASHBOARD.DISK , {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
						.then(function(res) {
              ctx.disk = res.data;
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
			},
      getGenderRatio(){
        NotificationsController.showActivityIndicator();
        const ctx = this;
        HTTP.get(URLS.DASHBOARD.GENDER_RATIO , {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(function(res) {
              res.data.data.forEach((item, i) => {
                if (item.gender === "male") {
                  ctx.maleCount = item.count
                }else if(item.gender === "female"){
                  ctx.femaleCount = item.count
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
      this.getRevenue();
      this.getTotal();
      this.getUsers();
      this.getGenderRatio();
      this.getDisk();
    }
  }
</script>

<style lang="css" scoped>

.dash{
  width: calc(100% - 80px);
  margin: 40px 50px 40px 30px;
	display: inline-block;
  background: rgba(255,255,255,0.5);
  box-shadow: 0px 0px 10px 0px #BDBDBD;
  border-radius: 10px;

  padding: 20px 10px 20px 10px;

}

.cont{
  width: 100%;
  float: left;
  height: auto;
  display: flex;
  margin-right: 10px;
  margin-bottom: 40px;
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
  font-size: 22px;
  font-weight: bold;
  font-family: 'Medium';
  text-align: left;
  color: black;
}

.totalRevenue span{
  font-size: 14px;
  font-weight: bold;
  font-family: 'Regular';
}

.tripleContainer{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
}

.tripleContainer .item{
  width: 32%;
  height: auto;
}
</style>
