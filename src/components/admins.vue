<template lang="html">


		<div class="full_container">

			<div class="options_container">
				<a class="bt_container" @click="addNewEmployee">
					<img class="icon" src="../assets/ic_send.png">
					Invite Admins
				</a>
			</div>

			<table >
      <thead>
        <tr >
          <th  style="width : 5%">ID</th>
          <th  style="width : 35%">NAME</th>
          <th  style="width : 20%">EMAIL</th>
          <th  style="width : 20%">TYPE</th>
          <th  v-if="isSuperAdmin" style="width : 10%">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-bind:key="user.id" v-for="user in users">
          <td >{{user.id || 'N/A'}}</td>
          <td >{{user.name || 'N/A'}}</td>
          <td >{{user.email || 'N/A'}}</td>
					<td >{{user.type ? user.type.toUpperCase() : 'N/A'}}</td>
          <td v-if="isSuperAdmin">
            <button
              class="btAction red"
							@click="showDeleteUserPopup(user)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

		  <popup v-if="showPopup" :title="popupTitle" :content="popupMsg" :showNegativeButton="showNegativeButton" :negativeButtonTitle="negativeButtonTitle" :positiveButtonTitle="positiveButtonTitle" @onClickPopupNegativeButton="onClickPopupNegativeButton" @onClickPopupPositiveButton="onClickPopupPositiveButton"></popup>

			<invite v-if="showInvite" @onInviteCancelled="showInvite = false" @onInviteSent="onInviteSent"/>
    </div>
</template>

<script>

import Popup from "../components/popup.vue";

import {
    HTTP, URLS
}
from '../network/http';

import Invite from '../components/invite.vue'

var NotificationsController = require("../components/NotificationsController.js");


  export default {
		name: 'admins',
	  components: {
			Popup,
			Invite
	  },
	  data() {
	    return {
	      users :[],
				showPopup:false,
				popupTitle: '',
				popupMsg: '',
				showNegativeButton: false,
				negativeButtonTitle: '',
				positiveButtonTitle: '',
				deleteableUser:null,
				myId : -1,
				isSuperAdmin : false,
				showInvite:false
	    };
	  },
		methods:{
			onInviteSent(){
				this.showInvite = false
				this.showNegativeButton = false;
				this.popupTitle = "Invitation send...";
				this.popupMsg = "The invitation has been sent successfully";
				this.positiveButtonTitle = "Ok"
				this.showPopup = true;
				this.getEmployees();
			},
			addNewEmployee(){
				this.showInvite = true;
			},
			showDeleteUserPopup(user){
				if (this.myId === user.id) {
					this.showNegativeButton = false;
					this.popupTitle = "Not Allowed...";
					this.popupMsg = "You cannot delete yourself.";
					this.positiveButtonTitle = "I Get It !!!"
					this.showPopup = true;
					return;
				}
				if (user.type === 'root') {
					this.showNegativeButton = false;
					this.popupTitle = "Not Allowed...";
					this.popupMsg = "You cannot delete a ROOT user";
					this.positiveButtonTitle = "I Get It !!!"
					this.showPopup = true;
					return;
				}

				this.deleteableUser = user;
				this.showNegativeButton = true;
				this.negativeButtonTitle = "Abort";
				this.popupTitle = "Are you sure?";
				this.popupMsg = 'This action is irreversable. Are you sure you want to delete ' + user.name + ' ?';
				this.positiveButtonTitle = "Yes, Delete " + user.name
				this.showPopup = true;

			},
			onClickPopupNegativeButton(){
				this.deleteableUser = null;
				this.showPopup = false;
			},
			onClickPopupPositiveButton(){
				this.showPopup = false;
				if (!this.deleteableUser) {
						return;
				}
				this.deleteUser(this.deleteableUser.id)

			},
			deleteUser(id){
				NotificationsController.showActivityIndicator();
				const ctx = this;
				HTTP.delete(URLS.ADMIN.BY_ID.replace(':id' , id) ,  {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
						.then(function(res) {
								NotificationsController.hideActivityIndicator();

								ctx.showNegativeButton = false;
								ctx.popupTitle = "Admin deleted";
								ctx.popupMsg = ctx.deleteableUser.name + " has been successfully removed from the list. ";
								ctx.positiveButtonTitle = "Great !"
								ctx.deleteableUser = null;
								ctx.showPopup = true;
								ctx.getEmployees();
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			},
			getEmployees(){
				const ctx = this;
				HTTP.get(URLS.ADMIN.LIST_ALL ,  {
						headers: {
							Authorization: localStorage.getItem("token")
						}
					})
						.then(function(res) {
								NotificationsController.hideActivityIndicator();
								ctx.users = res.data.data.rows;
						})
						.catch(function(error) {
							NotificationsController.hideActivityIndicator();
							NotificationsController.showErrorNotification(error);
						});
			}
		},
    mounted() {
			this.myId = parseInt(localStorage.getItem('id'));
			this.isSuperAdmin = localStorage.getItem('type') === 'normal' ? false : true;
			console.log(this.isSuperAdmin);
			console.log(localStorage.getItem('type') === 'normal');
			this.getEmployees()

    }
  }
</script>

<style >

.full_container{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
table{
	height: 100%;
	width : 100%;
	background: #BDBDBD;
	border-radius: 10px;
	overflow: auto;
	transition: all 0.25s;
}

thead th {
  position: sticky;
  top: -20px;
	background: #BDBDBD;
}

thead{

	color: ##031b4e;
	font-size: 18px;
	position: sticky;
	top: 0;
	background: #BDBDBD;

}
th{
	height: 75px;
	font-family: ExtraBold;
}


table tr:nth-child(odd) td{
    background: #E0E0E0;
		height: 50px;
}
table tr:nth-child(even) td{
    background: #F5F5F5;
		height: 50px;
}




@keyframes slide-add {
	0%{
		width: 0;
		color: transparent;
	}
	25%{
		color: transparent;
	}
	50%{
		color: transparent;
	}
	75%{
		color: transparent;
	}
	100%{
		width: 150px;
		color: white;
		padding-right: 20px;
	}


}


</style>
