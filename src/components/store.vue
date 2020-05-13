<template lang="html">
  <div class="storePage">
    <div class="top" v-if="index !== 3">
			<label class="navBtn" @click="onClickNavBtn(1)" v-bind:class="{active : index === 1}">Products List</label>
      <label class="navBtn" @click="onClickNavBtn(2)" v-bind:class="{active : index === 2}">Orders</label>
    </div>

    <div class="storeContent">
      <products v-if="index ===1"/>
      <orders v-if="index === 2" @showOrderDetail="showOrderDetail"/>
      <order v-if="index === 3" :id="orderId" @hideOrderDetail="hideOrderDetail"/>
    </div>
  </div>
</template>

<script>

import Products from "./products.vue";
import Orders from "./orders.vue";
import Order from "./order.vue";

  export default {
		name : 'store',
		data (){
			return {
        index : 1,
        orderId : -1
			}
		},
    components : {
      Products,
      Orders,
      Order
    },
    methods : {
      hideOrderDetail(){
        this.index = 2
        this.$router.push('home?lv1Tab=store&lv2Tab=orders');
      },
      onClickNavBtn(index){
        if (index ===1) {
          this.$router.push('home?lv1Tab=store&lv2Tab=products');
        }else{
          this.$router.push('home?lv1Tab=store&lv2Tab=orders');
        }
        this.index = index;
      },
      showOrderDetail(id){
        this.orderId = id;
        this.$router.push('home?lv1Tab=store&lv2Tab=orders&lv3Tab=order?id=' + id);
        this.index = 3;
        console.log("showCourseDetail");
      }
    },
    mounted() {
      console.log("store mounted");
      const ctx = this;
      const params = new URLSearchParams(window.location.search);
      const lv2Tab = params.get('lv2Tab') || null;
      if (lv2Tab === null) {
        ctx.index = 1;
        return
      }
      if (lv2Tab === "products") {
        ctx.index = 1;
      }else if (lv2Tab === "orders") {
        ctx.index = 2;
        const lv3Raw = params.get('lv3Tab');
        const lv3Tab = lv3Raw.substring(0 , lv3Raw.indexOf('?')) || null;
        if (lv3Tab === 'order') {
          var orderId = lv3Raw.substring(lv3Raw.indexOf("=") + 1 , lv3Raw.length)
          ctx.orderId = orderId;
          ctx.showOrderDetail(orderId)
        }
      }

    }
  }
</script>

<style lang="css" scoped>

.storePage{
	width: 100%;
	height: 100%;
}

.storePage .top{
	width: 100%;
	height: 50px;
	display: inline-block;
}

.storePage .top .navBtn{
	width: auto;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	color: black;
	padding-left: 10px;
	padding-right: 10px;
	float: left;
}

.storePage .top .active{
	border-bottom: 1px solid black;
	font-family: 'Bold'
}

.storePage .storeContent{
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
  float: left;
}



</style>
