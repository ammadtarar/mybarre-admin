<template lang="html">
<div class="settings">
    <div class="emailsCard" v-if="!isEditing">

        <div class="titleCont">
            <label class="cardTitle">SETTINGS</label>
            <div class="btsCont">
                <div class="btAction orange" @click="isEditing = true">
                    EDIT
                </div>
            </div>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">Ready for Production:</label>
                <label class="r">{{production_ready ? 'Yes' : 'No'}}</label>
            </div>
            <label class="notice">This will toggle the visibilty of videos related sections of the MiniProgram</label>
        </div>


        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">License Renewal Fee (¥):</label>
                <label class="r">{{license_fee}}</label>
            </div>
            <label class="notice">This is the fee that will be charged when user tries to renew the license</label>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">Shanghai Parcel Tariff (¥):</label>
                <label class="r">{{shanghai_parcel_tariff}}</label>
            </div>
            <label class="notice">MYbarre manual fee that will be charged when user registers with MYbarre.</label>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">Outside Shanghai Parcel Tariff (¥):</label>
                <label class="r">{{outside_shanghai_parcel_tariff}}</label>
            </div>
            <label class="notice">MYbarre manual fee that will be charged when user registers with MYbarre.</label>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">MYbarre Manual Fee (¥):</label>
                <label class="r">{{manual_fee}}</label>
            </div>
            <label class="notice">MYbarre manual fee that will be charged when user registers with MYbarre.</label>
        </div>

        <div class="filedCont" style="margin-top : 10px">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">DAYS PRIOR DEADLINE :</label>
                <label class="r">{{video_emails_notifications_days_in_advance}}</label>
            </div>
            <label class="notice">Number of days before start sending out email reminders to users. For example , start ending out video submission reminder emails {{video_emails_notifications_days_in_advance}} days before their offical video submission deadline </label>
        </div>

        <div class="filedCont" style="margin-top : 10px">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">NOTIFICATIONS FREQUENCY IN DAYS :</label>
                <label class="r">{{video_emails_notifications_frequency_days}}</label>
            </div>
            <label class="notice">Frequencu of sending out the email notifications. For example , send email reminders to user every {{video_emails_notifications_frequency_days}} days about uploading their training videos</label>

        </div>

    </div>

    <div class="emailsCard" v-if="isEditing">

        <div class="titleCont">
            <label class="cardTitle">EMAIL NOTIFCATIONS SETTINGS</label>
            <div class="btsCont">
                <div class="btAction green" @click="updateXonfigs">
                    SAVE
                </div>

                <div class="btAction red" @click="clearForm">
                    CANCEL
                </div>
            </div>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">Ready for Production : </label>
                <div class="checksCont">
                    <div class="checkCont">
						<input type="radio" id="yes" style="width : 25px !important" value="true" v-model="production_ready">
                        <label class="checkTitle">Yes</label>
                    </div>
                    <div class="checkCont">
						<input type="radio" id="no" style="width : 25px !important" value="false" v-model="production_ready">
                        <label class="checkTitle">No</label>

                    </div>
                </div>
            </div>
            <label class="notice">This is the shipping fee that will be charged on orders for users based in Shanghai</label>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">License Renewal Fee (¥):</label>
                <input class="r" type="number" v-model="form.license_fee"></input>
            </div>
            <label class="notice">This is the fee that will be charged when user tries to renew the license</label>
        </div>


        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">Shanghai Parcel Tariff (¥):</label>
                <input class="r" type="number" v-model="form.shanghai_parcel_tariff"></input>
            </div>
            <label class="notice">This is the shipping fee that will be charged on orders for users based in Shanghai</label>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">Outside Shanghai Parcel Tariff (¥):</label>
                <input class="r" type="number" v-model="form.outside_shanghai_parcel_tariff"></input>
            </div>
            <label class="notice">This is the shipping fee that will be charged on orders for users based outside Shanghai</label>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">MYbarre Manual Fee (¥):</label>
                <input class="r" type="number" v-model="form.manual_fee"></input>
            </div>
            <label class="notice">MYbarre manual fee that will be charged when user registers with MYbarre.</label>
        </div>

        <div class="filedCont">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">DAYS PRIOR DEADLINE :</label>
                <input class="r" type="number" v-model="form.video_emails_notifications_days_in_advance"></input>
            </div>
            <label class="notice">Number of days before start sending out email reminders to users. For example , start ending out video submission reminder emails {{video_emails_notifications_days_in_advance}} days before their offical video submission deadline </label>
        </div>

        <div class="filedCont" style="margin-top : 10px">
            <div class="lrCont">
                <div class="dot">
                </div>
                <label class="l">NOTIFICATIONS FREQUENCY IN DAYS :</label>
                <input class="r " type="number" v-model="form.video_emails_notifications_frequency_days"></input>
            </div>
            <label class="notice">Frequencu of sending out the email notifications. For example , send email reminders to user every {{video_emails_notifications_frequency_days}} days about uploading their training videos</label>

        </div>

    </div>

</div>
</template>

<script>
import {
    HTTP,
    URLS
}
from '../network/http';

const NotificationsController = require("../components/NotificationsController.js");

export default {
    name: 'settings',
    data() {
        return {
            isEditing: false,
            video_emails_notifications_days_in_advance: 40,
            video_emails_notifications_frequency_days: 10,
            manual_fee: 0,
            shanghai_parcel_tariff: 15,
            outside_shanghai_parcel_tariff: 30,
            form: {},
            production_ready: false,
            license_fee : 1000
        };
    },
    mounted() {
        console.log('New component mounted.')
        this.getConfigs()
    },
    methods: {
        clearForm() {
            this.isEditing = false;
            this.form.video_emails_notifications_days_in_advance = this.video_emails_notifications_days_in_advance;
            this.form.video_emails_notifications_frequency_days = this.video_emails_notifications_frequency_days;
            this.form.shanghai_parcel_tariff = this.shanghai_parcel_tariff;
            this.form.outside_shanghai_parcel_tariff = this.outside_shanghai_parcel_tariff;
            this.form.manual_fee = this.manual_fee;
            this.form.license_fee = this.license_fee;
            this.form.production_ready = this.production_ready
        },
        getConfigs() {
            const ctx = this;
            HTTP.get(URLS.CONFIGS.CONFIG, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then(function (res) {
                    NotificationsController.hideActivityIndicator();
                    const response = res.data.data;
                    ctx.video_emails_notifications_days_in_advance = response.video_emails_notifications_days_in_advance;
                    ctx.video_emails_notifications_frequency_days = response.video_emails_notifications_frequency_days;
                    ctx.manual_fee = response.manual_fee;
                    ctx.shanghai_parcel_tariff = response.shanghai_parcel_tariff;
                    ctx.outside_shanghai_parcel_tariff = response.outside_shanghai_parcel_tariff;
                    ctx.license_fee = response.license_fee;
                    ctx.production_ready = response.production_ready;
                    ctx.clearForm();
                })
                .catch(function (error) {
                    NotificationsController.hideActivityIndicator();
                    NotificationsController.showErrorNotification(error);
                });
        },
        updateXonfigs() {
			const ctx = this;
			
			ctx.form.production_ready = ctx.production_ready;
            NotificationsController.showActivityIndicator()
            HTTP.post(URLS.CONFIGS.CONFIG, ctx.form, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then(function (res) {
                    ctx.isEditing = false;
                    NotificationsController.hideActivityIndicator();
                    NotificationsController.showNotification('success', 'Update successful')
                    ctx.getConfigs();
                })
                .catch(function (error) {
                    NotificationsController.hideActivityIndicator();
                    NotificationsController.showErrorNotification(error);
                });
        }
    }

}
</script>

<style lang="css">
.settings {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    margin-top: 30px;
    transition: all 0.5s;
    padding: 10px;
}

.emailsCard {
    width: calc(100% - 40px);
    height: auto;
    padding: 30px 20px 30px 20px;
    background: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px 0px #BDBDBD;
}

.titleCont {
    display: flex;
    flex-direction: row;

    margin-bottom: 20px;
}

.btsCont {
    margin-left: auto;
    display: flex;
    flex-direction: row;
}

.edit {
    padding-left: 10px;
    padding-right: 10px;
    height: 30px;
    line-height: 30px;
    background: transparent;
    color: #e91e63;
    border: 2px solid #e91e63;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'Bold';
    transition: 0.25s all;
    margin-left: 10px;
}

.edit:hover {
    font-family: 'ExtraBold';
    background: #e91e63;
    color: white;
    font-size: 16px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
}

.cardTitle {
    text-align: left;
    color: black;
    font-family: 'ExtraBold';
    font-size: 18px;
    line-height: 20px;
    text-align: left;
}

.filedCont {
    display: flex;
    flex-direction: column;
}

.lrCont {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    align-items: center;
}

.lrCont .dot {
    width: 10px;
    height: 10px;
    background: #e91e63;
    border-radius: 5px;
    margin-right: 10px;
}

.lrCont .l {
    line-height: 30px;
    font-size: 14px;
    font-family: 'Regular';
    color: black;
    text-align: left;
}

.lrCont input {
    text-align: center !important;
    width: auto !important;
    outline: none !important;
    line-height: 30px;
    font-size: 14px;
    font-family: 'Regular';
    color: black;
    text-align: left;
}

.lrCont .r {
    line-height: 30px;
    font-size: 16px;
    font-family: 'Black';
    color: black;
    text-align: left;
    margin-left: 20px;
}

.notice {
    font-family: 'Regular';
    color: gray;
    font-size: 12px;
    text-align: left;
}

.checksCont {
    background: transparent;
    height: 50px;
    display: flex;
	flex-direction: row;
}

.checksCont .checkCont {
    height: 50px;
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.checksCont .checkCont .checkTitle {
    height: 50px;
    font-size: 16px;
    color: black;
    line-height: 50px;
    margin-left: 10px;
}

.checksCont .checkCont .check {
    width: 20px;
    height: 20px;
    line-height: 50px;
    color: white;
}

</style>
