<template lang="html">
  <div class="card">
		<img class="cover" src="../assets/placeholder.png" />
		<div class="info">
      <label class="type">{{getFileType(model.mime) || 'FILE'}}</label>
			<label class="name">{{model.name}}</label>
		</div>
		<div class="btn" @click="showPreview">
			<span>PREVIEW</span>
		</div>
  </div>
</template>

<script>
  export default {
		name: 'docCard',
    props: {
      model: {
       default: function () {
         return {
           name: 'N/A',
           url: '',
           mime: "PDF"
          }
       }
     }
   },
   methods:{
     getFileType(mime){
       if (mime === undefined || mime === null || mime === "") {
         return "FILE";
       }
       return mime.substring(mime.indexOf("/") + 1).toUpperCase()
     },
     showPreview(){
       this.$root.$emit('showImage' , this.model);
     }
   },
    mounted() {
      console.log('New component mounted.')
      console.log();
      console.log("DOC");
      console.log(this.model);
      console.log();
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
	background: linear-gradient(rgba(0, 0, 0, 0.5) ,transparent , rgba(0, 0, 0, 0.5));
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

.card .info .type{
	font-family: 'Bold';
	position: absolute;
	top: 10px;
  right: 10px;
  border: 2px solid white;
  font-size: 12px;
  padding: 1px 6px 1px 6px;
  color: white;
  border-radius: 4px;
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

.card .btn > span{
	color: white;
  border: 1px solid white;
  padding: 4px 10px 4px 10px;
  border-radius: 4px;
  transition: all 0.25s;
}


.card .btn > span:hover{
  background: #4E08F0;
  border: 1px solid #4E08F0;
}

</style>
