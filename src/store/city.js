import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        cityInfo:JSON.parse(localStorage.getItem('city')) || {}
    },

    mutations: { 
        setCityInfo(state, data) {
            state.cityInfo = data
            localStorage.setItem('city',JSON.stringify(data))
        }
    }
})