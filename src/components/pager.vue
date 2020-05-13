<template>
		<div class="pagerInnerContainer">
			<img class="pagerBt" src="../assets/ic_left_black.png" @click="prev" ></img>
			<div class="desc">
				PAGE <span style="font-size : 22px ;">{{pageNumber}}</span> of {{limit}}
			</div>
			<img class="pagerBt" @click="next" src="../assets/ic_right_black.png"></img>
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
	min-width: 200px;
	height: 50px;
	display: flex;
	flex-direction: row;
	overflow: hidden;
	color: black;
	line-height: 50px;
	justify-content: space-between;
	align-items: center;
	border-radius: 10px;
	border: 2px solid black;
	padding-left: 10px;
	padding-right: 10px;
	box-shadow: 0px 0px 10px 0px #BDBDBD;
	background: transparent;
}

.pagerBt{
	margin-left: 5px;
	margin-right: 5px;
	width: 20px;
	height: 20px;
	transition: all 0.25s;
	color: black;
	border-radius: 10px;
}

.pagerBt:hover{
	/* margin-top: 3px;
	margin-left: 3px;
	margin-right: 3px; */
	width: 40px;
	height: 40px;

}

.desc{
	width: 180px;
	height: 50px;
	line-height: 50px;
	color: black;
	font-size: 12px;
	font-weight: 600;
	text-align: center;
	font-family: medium;
}



</style>
