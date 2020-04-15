<style>

.buttonsWrapper{
	display: flex;
	justify-content: flex-end;
	background: #EEEEEE;
}


.bottonsContainer{
		display: flex;
		flex-direction: row;
		height: 40px;
		/* width: 200px; */
		padding: 10px;
		justify-content: flex-end;
}

.bt{
	height: 40px;
	/* flex-basis: 50%; */
	flex-grow: 0;
	padding-left: 10px;
	padding-right: 10px;
	font-size: 15px;
	border: 0px;
	color: white;
	border-radius: 4px;
	transition: all 0.25s;

}

.neg{
	/* background: #9E9E9E; */
	font-family: bold;
	color: #616161;
	border: 2px solid #616161;
	background: #EEEEEE;
}

.neg:hover{
	background: #616161;
	color: white;
	box-shadow: 0px 0px 4px 4px lightgray;
}

.pos{
	/* background: #4E08F0; */
	color: #4E08F0;
	border: 2px solid #4E08F0;
	font-family: black;
	margin-left: 10px;
	background: #EDE7F6;
}

.pos:hover{
	background: #4E08F0;
	color: white;
	box-shadow: 0px 0px 4px 4px lightgray;
}

</style>

<template>

<div class="usersCont">

    <modal v-if="showModal" @close="close" size="size">

				<h3 slot="header">{{title}}</h3>

        <div slot="body" class="modalBody">
					{{content}}
        </div>

				<div class="buttonsWrapper" slot="footer">
					<div class="bottonsContainer" >
						<button type="button" class="bt neg" v-if="showNegativeButton" @click="onClickNegativeButton">{{negativeButtonTitle || 'Cancel'}}</button>
						<button type="button" class="bt pos" @click="onClickPositiveButton">{{positiveButtonTitle || 'Confirm'}}</button>
					</div>
				</div>




    </modal>

</div>

</template>

<script>

import Modal from "./modal.vue";
var NotificationsController = require("./NotificationsController.js");
import {
    HTTP, URLS
}
from "../network/http";
import moment from "moment";

export default {
    name: "popup",
		props: {
			size : String,
			title : String,
			content : String,
			showNegativeButton : Boolean,
			negativeButtonTitle : String,
			positiveButtonTitle : String
		},
    components: {
        Modal
    },
    data() {
        return {
            showModal: true
        };
    },
    ready: function() {},
    methods: {
			onClickNegativeButton(){
				this.close();
				this.$emit('onClickPopupNegativeButton');
			},
			onClickPositiveButton(){
				this.close();
				this.$emit('onClickPopupPositiveButton');
			},
      close(){
        this.showModal = false
        this.$emit('close')
      },
    },
    mounted() {

    }
};

</script>
