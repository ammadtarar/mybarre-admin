<template>

    <div class="mainCont" >





      <transition name="slide-fade">
        <div class="loginContainer">

          <img src="../assets/mybarree_transparent_logo.png" class="logo">


          <label class="inputTitle">Email</label>
          <input type="text"  v-model="username" placeholder="Enter your email address" class="textInput"  @input="onupdate"/>


          <label class="inputTitle spacing15">Password</label>
          <input type="password"  v-model="password" placeholder="Enter your password" class="textInput" @input="onupdate"/>

          <button type="button" class="btLogin spacing30" :style="buttonBg" @click="login" :disable="!enableLogin">Login</button>


        </div>
      </transition>





      <popup v-if="showPopup" :title="popupTitle" :content="popupMsg" :showNegativeButton="showNegativeButton" :negativeButtonTitle="negativeButtonTitle" :positiveButtonTitle="positiveButtonTitle" @onClickPopupNegativeButton="onClickPopupNegativeButton" @onClickPopupPositiveButton="onClickPopupPositiveButton"></popup>

    </div>



</template>

<style >
.mainCont{
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}

.content{
  width: calc(100vw - 40px);
  border-radius: 4px;
  height: calc(100vh - 220px);
  overflow: scroll;
  padding: 20px;
}

.logo{
  width: 200px;
  margin-bottom: 20px;
}

.center{
  position: absolute;
  left: 50%;
  top: calc(50% - 30px);
  transform: translate(-50%, -50%);
}
.loginContainer{
  position: absolute;
  left: 50%;
  top: calc(50% - 30px);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  background: white;
  padding: 20px;
  border-radius: 4px;
  overflow: hidden;
}

.admin{
  font-size: 18px;
  font-family: 'ExtraBold';
  font-size: 24px;
  color: #031b4e;
}

.spacing15{
  margin-top: 15px;
}

.spacing30{
  margin-top: 30px;
}

.inputTitle{
  width: 100%;
  font-size: 14px;
  color: #031b4e;
  text-align: left;
  font-family: 'Bold'
}
.textInput{
  width: 100%;
  background: transparent;
  color: black;
  height: 40px;
  font-size: 18px;
  border : 0px solid transparent;
  border-bottom: 1px solid #bdbdbd;
  outline: none;
  transition: all 0.25s;
}

.textInput:focus{
  border-bottom: 2px solid #4E08F0;
}

.btLogin{
  width: 100%;
  height: 60px;
  color: white;
  background: #37474f;
  font-size: 20px;
  outline: none;
  border: solid 0px transparent;
  border-radius: 4px;
  font-family: 'Bold'
}

.regNotice{
  margin-top: 50px;
  color: #37474f;
}

.btRegister{
  background: transparent;
  outline: none;
  padding: 6px 10px 6px 10px;
  border: 0px;
  color: #4E08F0;
  font-size: 18px;
  font-family: 'Bold';
  transition: all 0.5s;
}

.btRegister:hover{
  background: #4E08F0;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.copyright{
  color: white;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 14px;
}
</style>

<script>

import {
    HTTP, URLS
}
from '../network/http';

const NotificationsController = require("../components/NotificationsController.js");

import Popup from "../components/popup.vue";

export default {
  name: 'login',
  components: {
    Popup,
  },
  data() {
    return {
      mainCont:{},
      username : "",
      password: "",
      buttonBg :{},
      enableLogin: false,
      showPopup: false,
      popupMsg: '',
      showNegativeButton:true,
      negativeButtonTitle:'',
      popupType: '',
      popupTitle: '',
    };
  },
  ready:function(){
      // onupdate();
  },
  methods: {
    onClickPopupNegativeButton(){
      console.log("onClickPopupNegativeButton");
      this.showPopup = false;
    },
    onClickPopupPositiveButton(){
      console.log("onClickPopupPositiveButton");
      this.showPopup = false;
    },
    login(){
      if (this.username.length > 4 && this.password.length > 4) {
      NotificationsController.showActivityIndicator();
      let ctx = this;
      let data = {
          "email": this.username,
          "password": this.password
      };
      HTTP.post(URLS.LOGIN, data)
          .then(function(res) {
            NotificationsController.hideActivityIndicator();
            const response = res.data.data;

            localStorage.setItem('email', response.email);
            localStorage.setItem('name', response.name);
            localStorage.setItem('id', response.id);
            localStorage.setItem('token',response.token);
            localStorage.setItem('type',response.type);

              NotificationsController.showNotification('success' , 'Login successful')
              ctx.$router.push('home');
          })
          .catch(function(error) {
            localStorage.setItem('email', "");
            NotificationsController.hideActivityIndicator();
            NotificationsController.showErrorNotification(error);
          });

      }
    },
    onupdate(){
      if (this.username.length > 4 && this.password.length > 4) {
        this.buttonBg = {
          background : "#4E08F0"
        }
        this.enableLogin = true;
      }else{
        this.buttonBg = {
          background : '#37474f'
        };
        this.enableLogin = false;
      }
    },
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
  },
  mounted() {
  }
}
</script>
