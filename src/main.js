import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

import axios from 'axios'

axios.defaults.withCredentials = true   
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['content'] = window.csrf_token;
axios.defaults.headers['X-CSRF-TOKEN'] = window.csrf_token;

// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
// import './assets/fontawesome-free-6.2.0-web/css/all.css'
// import './assets/fontawesome-free-6.2.0-web/css/all.min.css'
import './assets/fontawesome-free-6.2.0-web/css/fontawesome.css'
import './assets/fontawesome-free-6.2.0-web/css/fontawesome.min.css'
import './assets/img/login.jpg'
// @import = url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
// import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faUser,
    faEnvelope,
    faKey,
    faLock,
    faCopyright,
    faEye,
    faEyeSlash 
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

// createApp(App).mount('#app')
library.add(faUser, faEnvelope, faKey, faLock, faCopyright, faEye, faEyeSlash)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
// library.add(faUser)
// Vue.config.productionTip = false
app.mount('#app')