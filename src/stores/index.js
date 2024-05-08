// stores/counter.js
import { defineStore } from 'pinia'
 

const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
        name: 'Eduardo'
    }),

    getters: { // = computed() properties of the store
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
})
export { useCounterStore }