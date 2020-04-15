<template>
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-bind:class="{ modalcontainerbig : size === 'big' }">
					<!-- <img src="../assets/ic_close.png"  class="btClose" @click="closeModal"/> -->
          <div class="modal-header">

            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
name: "modal",
props: ['size'],
methods: {
	closeModal: function() {
		this.$emit("close");
	}
},
mounted() {

  }
};
</script>

<style lang="css">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 450px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 4px;
	overflow: hidden;
  box-shadow: 1px 1px 10px 1px #212121;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
	/* overflow: hidden; */
}

.modalcontainerbig{
  width: 90%;
}

.modal-header h3 {
  color: #4E08F0;
	font-size: 26px;
	font-family: "bold";
	margin: 0px;
	padding: 10px 20px 10px 20px;
	border-bottom: 1px solid lightgray;
}

.modal-body {
	z-index: 80;
	padding: 10px 20px 20px 20px;
	max-height: 75vh;
	overflow-y: scroll;
}

.modal-default-button {
  float: right;
}

.modal-footer{
	width: 100%;
}



.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.btClose{
	width: 30px;
	height: 30px;


	float: right;
	margin-right: -10px;
	margin-top: -10px;
}
</style>
