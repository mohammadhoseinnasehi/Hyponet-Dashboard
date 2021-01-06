import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import '../style/Main.scss'
// import '../scss/variables.scss'
import Vuetify from 'vuetify/lib/framework';
// import VueI18n from 'vue-i18n'
// import fa from '../locales/fa.js'
// import en from '../locales/en.js'


Vue.use(Vuetify);
// Vue.use(VueI18n);

export default new Vuetify({
    // lang: {
    //     locales: { fa, en },
    //     current: 'fa',
    // },
    theme: { dark: false },
    icons: {
        iconfont: 'mdi'
    },
    rtl: true,
});