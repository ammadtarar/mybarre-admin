<template lang="html">

	<div class="usersCont">

	    <modal v-if="showModal" @close="close" size="size">

					<h3 slot="header">Invite Admins</h3>

	        <div slot="body" class="modalBody">
						<div class="inviteContainer">

							<label style="color : #37474f">You can invite other admins to user this platorm. Please enter their email address below. They will be emailed a login password and instructions</label>

							<label class="inputTitle spacing30">Name</label>
							<input type="text" v-model="name" placeholder="Enter admin's name" class="textInput" @input="onEmailUpdated" />


							<label class="inputTitle spacing30">Email</label>
							<input type="text" v-model="email" placeholder="Enter a valid email address" class="textInput" @input="onEmailUpdated" />

							<label class="inputTitle spacing30">Access Level</label>
							<div class="checksContainer">
										<div class="checkContainer">
												<input class="check" type="radio" v-model="type" v-bind:value="'super'">
												<label class="checkTitle">Super</label>
										</div>
										<div class="checkContainer">
												<input class="check" type="radio" v-model="type" v-bind:value="'normal'">
												<label class="checkTitle">Normal</label>

										</div>
							</div>

							<label style="color : #37474f">Super admins can delete anything but normal admins can NOT delete other admins or any media</label>

						</div>

	        </div>

					<div class="buttonsWrapper" slot="footer">
						<div class="bottonsContainer" >
							<button type="button" class="bt neg"  @click="onClickNegativeButton">Cancel</button>

							<button v-if="!isValidEmail" type="button" class="bt neg" style="margin-left: 10px;">Invite</button>

							<button v-if="isValidEmail" type="button" class="bt pos" @click="onClickPositiveButton">Invite</button>
						</div>
					</div>




	    </modal>

	</div>

</template>

<script>

import {
    HTTP, URLS
}
from '../network/http';
import Modal from './modal.vue'
var NotificationsController = require("../components/NotificationsController.js");

  export default {
		name: 'invite',
	  components: {
			Modal
	  },
    props: {

    },
	  data() {
	    return {
				showModal:true,
				email:null,
				name:null,
				isValidEmail:false,
				type: 'super'
	    };
	  },
    methods:{
			onClickNegativeButton(){
				this.$emit('onInviteCancelled');
				this.close();

			},
			onClickPositiveButton(){
				this.sendInvitation();
			},
			close(){
        this.showModal = false
        this.$emit('close')
      },
			onEmailUpdated(){
				if (this.validateEmail(this.email) && this.name !== null && this.name !== undefined && this.name !== "") {
					this.isValidEmail = true;
				}else{
					this.isValidEmail = false;
				}
			},
			validateEmail(email) {
					var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return re.test(String(email).toLowerCase());
			},
			sendInvitation(){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				HTTP.post(URLS.ADMIN.CREATE , {name : this.name , email  : this.email , type : this.type} , {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
						.then(function(res) {
							ctx.$emit('onInviteSent');
							NotificationsController.hideActivityIndicator();
							ctx.close();
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			}
    },
    mounted() {

    }
  }
</script>

<style >

.inviteContainer{
	display: flex;
	flex-direction: column;
}




</style>
