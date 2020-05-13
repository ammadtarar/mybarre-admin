import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Datetime
}
from 'vue-datetime'
  // You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

Vue.mixin({
  components: {

  },
  data() {
    return {};
  },
  methods: {
    removeNotify() {
        document.getElementById('notificationBar').style.height = '0px'
      },
      removeNotication() {
        document.getElementById('notificationBar').style.display = 'none';
      }
  },
  mounted: function() {
    // this.$el.addEventListener('itemSelected', e => console.log(
    //   "got it in main,js"));
    this.removeNotication();

    String.prototype.replaceAll = function(str1, str2, ignore) {
      return this.replace(new RegExp(str1.replace(
          /([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"
        ), (ignore ?
          "gi" : "g")), (typeof(str2) == "string") ? str2.replace(
          /\$/g, "$$$$") :
        str2);
    };

    Array.prototype.contains = function(obj) {

      var i = this.length;
      while (i--) {
        console.log("this[i] = ", this[i]);
        console.log("obj = ", obj);
        if (this[i] === obj) {
          return true;
        }
      }
      return false;
    }


  },
  computed: {

  }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
