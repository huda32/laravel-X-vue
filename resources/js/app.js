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
