import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login/login.vue'
import City from '@/views/city.vue'
import Food from '@/views/food/food_home.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'default',
            path: '/',
            redirect: { name: 'home' }
        },
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'city',
            path: '/city/:id',
            component: City
        },
        {
            name: 'food',
            path: '/food',
            component: Food
        }
    ]
})