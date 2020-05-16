<template>

    <div class="mainCont" >





      <div class="loginContainer">

        <label class="dashboard">Welcome to </br>

        <img src="../assets/mybarree_transparent_logo.png" class="logo">


        </br> Admin Dashboard</label>

        <div class="loginCenter">
          <label class="inputTitle">Email</label>
          <input type="text"  v-model="username" placeholder="Enter your email address" class="textInput"  @input="onupdate"/>


          <label class="inputTitle spacing15">Password</label>
          <input type="password"  v-model="password" placeholder="Enter your password" class="textInput" @input="onupdate"/>

          <button type="button" class="btLogin spacing30" :style="buttonBg" @click="login" :disable="!enableLogin">Login</button>
        </div>


        <div class="loginInner">
          <label>©2020 MYbarre Fitness. All Rights Reseverd</label>
          <label class="mwl">Made with <span style="color:#e81e62; font-size : 14px">♥</span> by <a style="color:#e81e62;font-family: Bold;" href="https://www.sawatechnologies.org">Sawa Technologies</a></label>
        </div>

      </div>


      <popup v-if="showPopup" :title="popupTitle" :content="popupMsg" :showNegativeButton="showNegativeButton" :negativeButtonTitle="negativeButtonTitle" :positiveButtonTitle="positiveButtonTitle" @onClickPopupNegativeButton="onClickPopupNegativeButton" @onClickPopupPositiveButton="onClickPopupPositiveButton"></popup>

    </div>



</template>

<style >
.mainCont{
  width: 100vw;
  height: 97%;
}

.content{
  width: calc(100vw - 40px);
  border-radius: 4px;
  height: calc(100vh - 220px);
  padding: 20px;
}

.logo{
  width: 300px;
  margin: -30px 0px -48px -30px;

}

.center{
  position: absolute;
  left: 50%;
  top: calc(50% - 30px);
  transform: translate(-50%, -50%);
}

.loginFooter{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-size: 14px;
}

.loginCenter{
  display: flex;
  flex-direction: column;
}
.loginInner{
  display: flex;
  flex-direction: column;
  margin-top: auto;
  font-size: 12px;
}

.mwl{
  margin-top: 10px;
  margin-bottom: 10px;

}
.loginContainer{
  background: white;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 100px 0px #BDBDBD;
  z-index: 100;
  position: absolute;
  right: 0;
  top: 0;

  justify-content: center;
  padding: 20px;
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
  border-bottom: 2px solid #e91e63;
}

.btLogin{
  width: 100%;
  height: 60px;
  color: white;
  background: #e91e63;
  font-size: 20px;
  outline: none;
  border: solid 0px transparent;
  border-radius: 4px;
  font-family: 'Bold'
}

.mybarre{
  color: black;
  font-family: Medium;
  font-size: 60px;
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
  color: #e91e63;
  font-size: 18px;
  font-family: 'Bold';
  transition: all 0.5s;
}

.btRegister:hover{
  background: #e91e63;
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

.dashboard{
  font-size:41px;
  font-family: ExtraLight;
  color: #e91e63;
  margin-bottom: 20px;
  margin-top: auto;
  text-align: left;
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
          background : "#e91e63"
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
