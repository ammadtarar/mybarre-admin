<style>

.home {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.navBar {
    width: calc(100% - 40px);
    height: 50px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 2;
    box-shadow: 0px 0px 10px 0px #1b2a3f;
}

.icon {
    height: 50px;
}

.btnsContainer {
    display: flex;
    flex-direction: row;
    margin-left: 50px;
    justify-content: space-between;
}

.navBtn {
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    font-size: 16px;
    font-family: medium;
    transition: all 0.25s;
    border-bottom: 2px solid transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    height: 50px;
}

.navBtn:hover {
    border-bottom: 2px solid #4E08F0;
}

.btLogout {
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    background: #4E08F0;
    font-size: 16px;
    font-family: medium;
    transition: all 0.25s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    border-radius: 4px;
    height: 50px;
}

.btLogout:hover {
    padding-left: 50px;
    padding-right: 50px;
}

.logout {
    width: 0;
    overflow: hidden;
}

.admin{
  margin-left: auto;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border-right: 4px solid #4E08F0;

}

.admin .name{
  font-size: 14px;
  color: white;
  font-family: 'Bold';
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.admin .icon{
  width: 20px;
  height: 20px;
  margin-left: 2px;

}
.admin .email{
  font-size: 12px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.btLogout:hover .logout {
    animation: slide 0.2s ease .1s forwards;
}

@keyframes slide {
    from {
        width: 0;
    }
    to {
        width: 60px;
    }
}

.btnSelected {
    border-bottom: 2px solid #4E08F0;
}

.navIcon {
    width: 25px;
    height: 25px;
    margin-right: 4px;
}

.footer {
    height: 50px;
    display: flex;
    padding: 20px;
    z-index: 2;
    box-shadow: 0px 0px 100px 0px #0e1724;
}

.footerPattern {
    width: 50px;
    height: 50px;
}

.footerCT {
    font-size: 14px;
    color: white;
    font-family: bold;
    margin: auto;
}

.home_content {
    width: calc(100vw - 40px);
    height: calc(100vh - 70px);
    overflow: scroll;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
}

</style>

<template>

<div class="home">

    <div class="navBar">
        <img src="../assets/mybarree_transparent_logo_white.png" class="icon">
        <div class="btnsContainer">


            <div v-bind:key="index" v-for="(page , index) in pages">
                <a class="navBtn" v-bind:class="{ btnSelected: page.selected}" @click="onNavItemClicked(page)">
                    <img :src="page.icon" class="navIcon" /> {{page.name}}
                </a>
            </div>

        </div>

        <div class="admin">
          <label class="name">{{name}}
            <img src="../assets/ic_admins.png" class="icon"/>
          </label>
          <label class="email">{{email}}
            <img src="../assets/ic_email.png" class="icon"/>
          </label>
        </div>
        <a class="btLogout" @click="logout">
            <img src="../assets/ic_logout.png" class="navIcon" />
            <span class="logout">Logout</span>
        </a>

    </div>

    <transition>
        <div class="home_content">
            <dashboard v-if="lvOneIndex === 0" />
            <admins v-if="lvOneIndex === 1" />

            <users v-if="lvOneIndex === 2 && lvTwoIndex <= 0" @showUserDetail="showUserDetail" />
            <user v-if="lvOneIndex === 2 && lvTwoIndex === 1" :id="userId" @hideUserDetail="onHideUserDeail" />

            <training v-if="lvOneIndex === 3" @showVideoPreview="showVideoPreview" />

            <celist v-if="lvOneIndex === 4 && lvTwoIndex <= 0" @showBundleDetail="showBundleDetail" />
            <ce v-if="lvOneIndex === 4 && lvTwoIndex === 1" :id="bundleId" @hideBundleDetail="hideBundleDetail" />

            <store v-if="lvOneIndex === 5" />
            <settings v-if="lvOneIndex === 6"/>


        </div>
    </transition>


</div>

</template>

<script>

// @ is an alias to /src

import Dashboard from '../components/dashboard.vue';
import Admins from '../components/admins.vue';
import Users from '../components/users.vue';
import Training from '../components/training.vue';
import Celist from '../components/celist.vue';
import Ce from '../components/ce.vue';
import Store from '../components/store.vue';
import User from '../components/user.vue';
import Settings from '../components/settings.vue';
export default {
    name: 'home',
    components: {
        Dashboard,
        Admins,
        Users,
        Training,
        Celist,
        Ce,
        Store,
        User,
        Settings
    },
    data() {
        return {
            name : "",
            email : "",
            lvOneIndex: 1,
            lvTwoIndex: 1,
            bundleId: -1,
            userId: -1,
            pages: [{
                index: 0,
                path: "dashboard",
                name: "Dashboard",
                selected: true,
                icon: require("@/assets/ic_dash.png")
            },{
                index: 1,
                path: "admins",
                name: "Admins",
                selected: false,
                icon: require("@/assets/ic_admins.png")
            }, {
                index: 2,
                path: "users",
                name: "Users",
                selected: false,
                icon: require("@/assets/ic_users.png")
            }, {
                index: 3,
                path: "training",
                name: "Training",
                selected: false,
                icon: require("@/assets/ic_training.png")
            }, {
                index: 4,
                path: "ce",
                name: "CE",
                selected: false,
                icon: require("@/assets/ic_ce.png")
            }, {
                index: 5,
                path: "store",
                name: "Store",
                selected: false,
                icon: require("@/assets/ic_store.png")
            },{
                index: 6,
                path: "settings",
                name: "Settings",
                selected: false,
                icon: require("@/assets/ic_settings.png")
            }],
            current: {}
        };
    },
    ready: function() {},
    methods: {
      hideBundleDetail(){
        this.lvTwoIndex = 0
        this.lvOneIndex = 4;
        this.$router.push('home?lv1Tab=ce');
      },
      onHideUserDeail(){
        this.lvTwoIndex = 0
        this.lvOneIndex = 2;
        this.$router.push('home?lv1Tab=users');
      },
        showUserDetail(id) {
                this.userId = id;
                this.lvOneIndex = 2;
                this.lvTwoIndex = 1;
                this.$router.push('home?lv1Tab=user&lv2Tab=detail?id=' + id);
            },
            showVideoPreview(data) {
                console.log("insdei showVideoPreview in home ");
                console.log(data);
            },
            showBundleDetail(id) {
                console.log("inside showBundleDetail in home");
                console.log(id);
                this.bundleId = id;
                this.lvOneIndex = 4;
                this.lvTwoIndex = 1;
                this.$router.push('home?lv1Tab=ce&lv2Tab=detail?id=' + id);
            },
            logout() {
                localStorage.setItem('email', '');
                localStorage.setItem('name', '');
                localStorage.setItem('id', '');
                localStorage.setItem('token', '');
                this.$router.push('/');
            },
            onNavItemClicked(page) {
                if (page.index === this.lvOneIndex) {
                  return;
                }
                this.lvTwoIndex = -1;
                this.lvOneIndex = page.index;
                const ctx = this;
                ctx.current = page;
                this.$router.push('home?lv1Tab=' + this.current.path);
                this.pages.forEach(function(page) {
                    if (page.name === ctx.current.name) {
                        page.selected = true
                    } else {
                        page.selected = false;
                    }
                });
            }
    },
    mounted() {
        const token = localStorage.getItem('token');
        console.log("TOkEN = "  , token);
        if (token === undefined || token === null || token === "") {
          this.$router.push('/');
          return
        }

        this.$el.addEventListener('itemSelected', e => console.log("got it in home"));
        this.current = this.pages[0];
        this.name = localStorage.getItem('name');
        this.email = localStorage.getItem('email');

    },
    created() {
      const token = localStorage.getItem('token');
      console.log("TOkEN = "  , token);
      if (token === undefined || token === null || token === "") {
        this.$router.push('/');
        return
      }
        const params = new URLSearchParams(window.location.search);
        console.log("window.location.search");
        console.log(window.location.search);
        const lv1Tab = params.get('lv1Tab');
        if (lv1Tab === undefined || lv1Tab === null || lv1Tab === "") {
            this.onNavItemClicked({
                index: 0,
                path: "dashboard",
                name: "Dashboard",
                selected: true,
                icon: require("@/assets/ic_admins.png")
            });
            return
        }
        let ctx = this;
        this.pages.forEach(function(page, ind) {
            if (page.path === lv1Tab) {
                ctx.lvTwoIndex = 0;
                ctx.lvOneIndex = page.index;
                ctx.current = page;
                console.log("ctx.lvOneIndex = " , ctx.lvOneIndex);
                console.log("ctx.current = " , ctx.current);
                const lv2Tab = params.get('lv2Tab') || null;
                console.log("HOME , lv2Tab = " + lv2Tab);
                if (lv2Tab === null) {
                  return;
                }

                if(page.path === "users" && lv2Tab.includes('detail')){
                  const id = lv2Tab.replace('detail?id=' , '')
                  ctx.showUserDetail(id)

                }else if(page.path === "ce" && lv2Tab.includes('detail')){
                  const id = lv2Tab.replace('detail?id=' , '');
                  ctx.showBundleDetail(id)
                }


            }
        });
        this.pages.forEach(function(page) {
            if (page.name === ctx.current.name) {
                page.selected = true
            } else {
                page.selected = false;
            }
        });

    }
}

</script>
