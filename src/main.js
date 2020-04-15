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
  },
  computed: {

  }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
