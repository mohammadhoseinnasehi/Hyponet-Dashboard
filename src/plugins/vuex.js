import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        show: false,
        id: 12,
        value: '',
        filteredframes: [],
        frames: [],

    },
    mutations: {
        // showcat(state, val) {
        //     state.frames = state.frames.filter((frame) => {
        //         return frame.category == val;
        //     });
        // }
    },
    getters: {
        // filtered: (state) => {
        //     return state.frames.filter(frame => {
        //         return (frame.category == state.value);
        //     })
        // }
    },
    actions: {

    }
})



export default store