

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./assets/tailwind.css";

import App from './App.vue'
import router from './router'
import { AUTH } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

let app;

onAuthStateChanged(AUTH,()=>{
    if(!app){
        app = createApp(App)

        app.use(createPinia())
        app.use(router)

        app.mount('#app')

    }
})
