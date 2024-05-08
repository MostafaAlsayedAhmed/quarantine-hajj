import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'vue-good-table-next/dist/vue-good-table-next.css'

const app = createApp(App)
const pinia = createPinia() 

app.use(pinia) //Options API Used
app.use(router) 
app.mount('#app')
