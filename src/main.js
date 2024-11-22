import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

// import { ModalPlugin } from 'bootstrap-vue'
// import Vue from 'vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import axios from 'axios'

// axios.defaults.withCredentials = true   
axios.defaults.baseURL = 'http://localhost:2022/api'
axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Expose-Headers'] = "Access-Token, Uid";
axios.defaults.headers['Access-Control-Allow-Methods'] = "DELETE, PUT, GET, POST";
axios.defaults.headers['Access-Control-Allow-Headers'] = "Content-type, Authorization, X-Requested-With";
axios.defaults.withCredentials = true;


// import './index.css'
// import VueHtml2Canvas from 'html2canvas.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/vendor/jquery/jquery.min.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/vendor/jquery-easing/jquery.easing.min.js'
import './assets/js/sb-admin-2.min.js'
import './assets/vendor/fontawesome-free/css/all.min.css'
import './assets/font-awesome-4.7.0/css/font-awesome.css'
import './assets/fontawesome-free-6.2.0-web/css/fontawesome.css'
import './assets/fontawesome-free-6.2.0-web/css/fontawesome.min.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/img/login.jpg'
import './assets/css/sb-admin-2.css'
import './assets/css/style.css'
import 'jspdf-autotable'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faUser,
    faEnvelope,
    faKey,
    faLock,
    faCopyright,
    faEye,
    faEyeSlash,
    faPhone, 
    faTriangleExclamation,
    faCircleCheck,
    faArrowLeft,
    faUserPlus,
    faPaperPlane,
    faRightToBracket,
    faMagnifyingGlass,
    faMobileScreen,
    faTimesSquare,
    faStopwatch, 
    faGaugeHigh
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

// createApp(App).mount('#app')
library.add(
    faUser, faEnvelope, faKey, faLock, faCopyright, faEye, faEyeSlash, faPhone, faTriangleExclamation,
    faCircleCheck, faArrowLeft, faUserPlus, faPaperPlane, faRightToBracket, faMagnifyingGlass, faMobileScreen,
    faTimesSquare, faStopwatch, faGaugeHigh
)
// Vue.use(ModalPlugin)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$baseUrl = window.location.origin
// app.config.globalProperties.$windowWidth = window.innerWidth
app.config.globalProperties.$widthPotraitPhone = 480
app.config.globalProperties.$widthLandscapePhone = 1024
app.config.globalProperties.$widthComputer = 1200
app.config.globalProperties.$session = JSON.parse(`${localStorage.getItem('sessionObject')}`)
app.config.globalProperties.$roles = `${localStorage.getItem('roles')}`
app.config.globalProperties.$loggedIn = `${localStorage.getItem('loggedIn')}`
app.use(router)
// library.add(faUser)
// Vue.config.productionTip = false
app.mount('#app')