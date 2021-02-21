import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        designshow: false,
        templateshow: false,
        categoryshow: false,
        motionshow: false,
        value: '',
        isregular: true,
        isspecial: false,
        filtereddesigns: [],
        filteredmotions: [],
        designs: [],
        motions: [],
        regulartemplates: [],
        specialtemplates: [],
        finaltemplates: [],
        filteredtemplates: [],
        categories: [],

    },
    mutations: {
        // showcat(state, val) {
        //     state.designs = state.designs.filter((design) => {
        //         return design.category == val;
        //     });
        // }
    },
    getters: {
        // filtered: (state) => {
        //     return state.designs.filter(design => {
        //         return (design.category == state.value);
        //     })
        // }
    },
    actions: {

    }
})



export default store