/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

// import { vue } from 'laravel-mix';
// import {Form, HasError, AlertError} from 'vform';
// window.Form = Form;

import {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
  } from 'vform/src/components/bootstrap5'
//ternyata Form terpisah
import Form from 'vform'
window.Form = Form
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

//sebagai refresh Otomatis
let Fire = new Vue();
window.Fire = Fire;

//Import Sweet Alert
import Swal from 'sweetalert2'
window.Swal = Swal;
const Toast = Swal.mixin({
    toast : true,
    position : 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.Toast = Toast;

// Progress Bar
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar,{
    color: 'rgb(143,255,199)',
    failedColor: 'red',
    height: '10px'
})

//Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)



let routes =[
    {path: '/data-user', component:require('./components/User/Data-user.vue').default},
    {path: '/data-level', component:require('./components/User/Data-level.vue').default}
]

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const router = new VueRouter ({
    routes
})

const app = new Vue({
    el: '#app',
    router
});
