<template>
		<div class="pagerInnerContainer">
			<img class="pagerBt" @click="prev" src="../assets/ic_back.png"></img>
			<div class="desc">
				PAGE <span style="font-size : 22px ;">{{pageNumber}}</span> of {{limit}}
			</div>
			<img class="pagerBt" @click="next" src="../assets/ic_next.png"></img>
	</div>

</template>

<script>
export default {
	name: "pager",
	props: ['limit'],
	components: {
	},
	data() {
			return {
				pageNumber : 1
			};
	},
	ready: function() {},
	methods: {
		// closeModal: function() {
		// 	this.$emit("close");
		// }
		next(){
			if(this.pageNumber >= this.limit){
				return;
			}
			this.pageNumber = this.pageNumber + 1;
			this.$emit("onPageChanged" , this.pageNumber);
		},
		prev(){
			if(this.pageNumber <= 1){
				return;
			}
			this.pageNumber = this.pageNumber - 1;
			this.$emit("onPageChanged");
		},
	},
	mounted() {
		console.log("pager mounted");
	 }
};
</script>

<style lang="css">

.pagerInnerContainer{
	width: 300px;
	height: 50px;
	display: flex;
	overflow: hidden;
	color: white;
	line-height: 50px;
	justify-content: space-between;
	border-radius: 10px;
	border: 2px solid #4E08F0;
}

.pagerBt{
	margin-left: 5px;
	margin-right: 5px;
	width: 40px;
	height: 40px;
	transition: all 0.25s;
	color: white;
	margin-top: 5px;
	border-radius: 10px;
}

.pagerBt:hover{
	/* margin-top: 3px;
	margin-left: 3px;
	margin-right: 3px; */
	background: #4E08F0;
}

.desc{
	width: 180px;
	height: 50px;
	line-height: 50px;
	color: white;
	font-size: 12px;
	font-weight: 600;
	text-align: center;
	font-family: medium;
}


</style>
