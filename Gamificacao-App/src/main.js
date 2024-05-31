import './assets/main.css'

import { createNotivue } from 'notivue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import vue3GoogleLogin from 'vue3-google-login'
const authkey = '415034066399-imnm6opf083t2dptfdvratlgp6p89tfh.apps.googleusercontent.com'

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap/dist/css/bootstrap.css'

import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: 'AIzaSyD7DqW6hTQlBn8PbnFR-qrp6A_GJauZBk',
  authDomain: 'vue-app-b8186.firebaseapp.com',
  databaseURL: 'https://vue-app-b8186-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vue-app-b8186',
  storageBucket: 'vue-app-b8186.appspot.com',
  messagingSenderId: '313291931730',
  appId: '1:313291931730:web:3e98e9cfa0be76eafb5f8b',
  measurementId: 'G-QLJYSKWTF5'
}

initializeApp(firebaseConfig)

import 'notivue/animations.css'
import 'notivue/notification.css' // Only needed if using built-in notifications
const notivue = createNotivue({
  position: 'top-center',
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 2500
    }
  }
})

const app = createApp(App)

app.use(router)
app.use(vue3GoogleLogin, { clientId: authkey })
app.use(BootstrapVue3)
app.use(notivue)
app.mount('#app')
