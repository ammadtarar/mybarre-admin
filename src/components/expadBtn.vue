<template lang="html">
  <div @click="toggle">

		<div class="expand_section">
			{{title}}
			<img class="expandBtn"
			v-bind:class="{ up : isExpanded , down : !isExpanded }"
			src="../assets/ic_arrow_down.png"/>
		</div>



  </div>
</template>

<script>
  export default {
		name : 'expandBtn',
		props: ['title' , 'default'],
		components: {
		},
		data() {
				return {
					isExpanded : true
				};
		},
		ready: function() {},
		methods: {
			toggle(){
				this.isExpanded = !this.isExpanded;
				this.$emit("onToggle" , this.isExpanded);
			}
		},
    mounted() {
			this.isExpanded = this.default;
    }
  }
</script>

<style lang="css">


.expand_section{
 width: auto;
 height: 50px;
 line-height: 50px;
 font-size: 20px;
 font-weight: bold;
 color: black;
 font-family: 'Bold';
 text-align: left;
 border-bottom: 2px solid black;

 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
}

.expandBtn{
  width: 30px;
  height: 30px;
  margin-left: 10px;
	transition: transform 0.5s;
	border: 1px solid white;
	border-radius: 100px;
	transition: all .5s;
	padding-top: 4px;
	padding-left: 2px;
	padding-right: 2px;
  border: 2px solid black;
}

.expandBtn:hover{
	background: #fce4ec;
}

.up{
	transform: rotate(180deg);
}

.down{
	transform: rotate(0deg);
}

</style>
