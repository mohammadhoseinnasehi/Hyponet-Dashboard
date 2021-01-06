import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import vuetify from './plugins/vuetify';
import store from './plugins/vuex'
import VueTypedJs from 'vue-typed-js'
import i18n from '../src/plugins/i18n'
Vue.use(VueTypedJs);




Vue.config.productionTip = false

new Vue({
    store,
    router,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')