// This file will contain the stroes for the apllication

import { createStore } from "vuex";

const store = createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload){
            state.user = payload;
            console.log('user state change');
        }
    }
});

export default store;