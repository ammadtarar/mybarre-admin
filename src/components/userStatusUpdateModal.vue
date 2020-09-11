<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <!-- <img src="../assets/ic_close.png"  class="btClose" @click="closeModal"/> -->
                <div class="modal-header">

                    <h3>Update User Status & Membership Timeline</h3>
                </div>

                <div class="modal-body">

                    <label class="inputTitle spacing30">Approval Status</label>
                    <select v-model="userApprovalStatus">
                        <option disabled value="null">Select one status</option>
                        <option v-for="item in userApprovalStatuses" v-bind:value="item" v-bind:key="item">
                            {{item.replaceAll("-" , " ").toUpperCase()}}
                        </option>
                    </select>


                    

                    <div v-if="userApprovalStatus == 'approved'" class="columnBox">

                        

                        <label class="inputTitle spacing30">Course</label>
                        <select v-model="userCourseModel">
                            <option disabled value="null">Select one course</option>
                            <option v-for="item in courses" v-bind:value="item.id" v-bind:key="item.id">
                                {{item.name}}
                            </option>
                        </select>


                        <label class="inputTitle spacing30">Membership Start Date</label>
                        <input type="date" v-model="startDate" placeholder="Select a start time for the course" class="textInput" />

                        <label class="inputTitle spacing30">Licnese Start Date</label>
                        <input type="date" v-model="licenseStart" placeholder="Select a start time for the course" class="textInput" />
                        <label style="color : #37474f; margin-top : 20px; font-size : 12px">Start date for the instructor license. Please keep in mind the license one date is one year after the date you choose. For example if you pick 13 July 2020 as license start date , the license end date will automatically be set to 13 July 2021</label>

                    </div>
                    
                    <div v-if="userApprovalStatus == 'rejected'" class="columnBox">
                        <label class="inputTitle spacing30">Rejection Reason</label>
                        <textarea type="text" @input="rejectionMesage = $event.target.value" :model="rejectionMesage" placeholder="Enter rejection reason" class="descText"  />
                    </div>


                </div>

                <div class="modal-footer">
                    <div class="bottonsContainer">
                        <button type="button" class="bt neg" @click="close">Abort</button>
                        <button type="button" class="bt pos" @click="updateUser" >Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {
    HTTP,
    URLS
} from "../network/http";
var NotificationsController = require("../components/NotificationsController.js");

export default {
    name: "userStatusUpdateModal",
    props: ['userObject'],
    methods: {
        close: function () {
            this.$root.$emit('closeUserUpdateModal', null);
        },
        getCourses: function(){
            const ctx = this;

            var url = URLS.COURSE.LIST_ALL + "?limit=1000&page=1";

            HTTP.get(url,  {
            headers: {
                Authorization: localStorage.getItem("token")
            }
            })
            .then(function(res) {
            ctx.courses = res.data.data.rows;
            NotificationsController.hideActivityIndicator();
            })
            .catch(function(error) {
            NotificationsController.hideActivityIndicator();
            NotificationsController.showErrorNotification(error);
            });
        },
        updateUser: function () {
            
            
            if (this.userApprovalStatus === null || this.userApprovalStatus === 'null') {
                NotificationsController.showNotification('warning', 'Please select a user status');
                return;
            }

            var data = {
                status : this.userApprovalStatus,
                userId : this.userObject.id
            };

            if(this.userApprovalStatus == 'approved'){
                console.log("this.startDate = " , this.startDate);

                if (this.userCourseModel === null || this.userCourseModel === 'null') {
                    NotificationsController.showNotification('warning', 'Please select a course');
                    return;
                }

                if (this.startDate === null || this.startDate === 'null') {
                    NotificationsController.showNotification('warning', 'Please select a membership start date');
                    return;
                }

                this.endDate = new Date(this.startDate);
                this.endDate.setFullYear(this.endDate.getFullYear() + 1);

                console.log("this.endDate = " , this.endDate.toISOString().slice(0,10));
                if (this.endDate === null || this.endDate === 'null') {
                    NotificationsController.showNotification('warning', 'Please select a membership end date');
                    return;
                }

                console.log("this.licenseStart = " , this.licenseStart);
                if (this.licenseStart === null || this.licenseStart === 'null') {
                    NotificationsController.showNotification('warning', 'Please select a start date for instructor license');
                    return;
                }
                
                data.start = this.startDate;
                data.end = this.endDate;
                data.licenseStart = this.licenseStart;
                data.courseId = this.userCourseModel;

                console.log(data)
            }

            if(this.userApprovalStatus == 'rejected'){
                if (this.rejectionMesage === null || this.rejectionMesage === 'null' || this.rejectionMesage === '') {
                    NotificationsController.showNotification('warning', 'Please enter the rejectionMesage for rejecting the user. This message will be shown to the user in the MiniProgram ');
                    return;
                }

                data.message = this.rejectionMesage
            }


            const ctx = this;            
            HTTP.post(URLS.USER.UPDATE_STATUS, data, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then(function (res) {
                    console.log("user update response");
                    console.log(res);
                    ctx.$root.$emit('onUserStatusUpdatedSuccessfully' , res);
                    NotificationsController.showNotification('success', 'Membership status updated');
                    NotificationsController.hideActivityIndicator();
                })
                .catch(function (error) {
                    NotificationsController.hideActivityIndicator();
                    NotificationsController.showErrorNotification(error);
                });
        }
    },
    data() {
        return {
            userApprovalStatuses: [
                'pending',
                'approved',
                'rejected'
            ],
            userApprovalStatus: 'null',
            userCourseModel: 'null',
            startDate : null,
            endDate : null,
            licenseStart : null,
            rejectionMesage : ''
        }
    },
    mounted() {
        this.getCourses();
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

.modalcontainerbig {
    width: 90%;
}

.modal-header h3 {
    color: #e91e63;
    font-size: 26px;
    font-family: "bold";
    margin: 0px;
    padding: 10px 20px 10px 20px;
    border-bottom: 1px solid lightgray;
    text-align: left;
}

.modal-body {
    z-index: 80;
    padding: 10px 20px 20px 20px;
    max-height: 75vh;
    overflow-y: scroll;
    text-align: left;
    display: flex;
    flex-direction: column;
}

.modal-default-button {
    float: right;
}

.modal-footer {
    width: 100%;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.columnBox{
    display: flex;
    flex-direction: column;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.btClose {
    width: 30px;
    height: 30px;

    float: right;
    margin-right: -10px;
    margin-top: -10px;
}

.spacing30 {
    margin-top: 30px;
}
</style>
