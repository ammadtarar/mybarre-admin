<template lang="html">
  <div class="card">
		<img class="cover" :src="model.thumb_url" />
		<div class="info">
			<label class="name">{{model.name || 'N/A'}}</label>
		</div>
		<div class="btn" @click="showPreview">
			<img src="../assets/ic_play.png" class="play">
		</div>
  </div>
</template>

<script>
  export default {
		name: 'videoCard',
		props: {
			model: {
			 default: function () {
				 return {
					 name: 'N/A',
					 thumb_url: require('../assets/placeholder.png'),
					 url: ''
				  }
			 }
		 }
	 },
   methods : {
     showPreview(){
       this.$root.$emit('showVideo' , this.model);
     }
   },
    mounted() {
      console.log('New component mounted.')
    }
  }
</script>

<style lang="css" scoped="true">
.card{
	width: 100%;
	height: 100%;
	border-radius: 8px;
	position: relative;
	overflow: hidden;
	padding: 0px !important;
	background: rgba(255 , 255 , 255 , 0.5);
}

.card .cover{
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1;
	object-fit: none; /* Do not scale the image */
 object-position: center;; /* Center the image within the element */

}

.card .info{
	width: 100%;
	height: 100%;
	background: linear-gradient(transparent , rgba(0, 0, 0, 0.5) );
	position: absolute;
	z-index: 2;
	top: 0;
	left: 0;
	opacity: 1;
	transition: 0.5s;
}

.card .info .name{
	color: white;
	font-family: 'Regular';
	position: absolute;
	bottom: 10px;
	left: 10px;
	right: 10px;
	text-align: left;
}

.card:hover .info{
	overflow: hidden;
	opacity: 0;
}

.card:hover .btn{
	visibility: visible;
	opacity: 1;
}

.card .btn{
	transition: 0.5s;
	opacity: 0;
	overflow: hidden;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	z-index: 2;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.card .btn .play{
	width: 75px;
	height: 75px;
	border-radius: 50%;
	transition: all 0.25s;
}

.card .btn .play:hover{
	padding: 2px;
	background: #e91e63;
}

</style>
