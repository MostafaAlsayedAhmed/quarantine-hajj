// stores/counter.js
import { defineStore } from 'pinia'


const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),

    getters: { // = computed() properties of the store
        isLoggedIn: (state) => state.user !== null,
    },
    
    actions: {
        setUser(session) {
           this.user = session;
        }
    },
})
export { useUserStore }