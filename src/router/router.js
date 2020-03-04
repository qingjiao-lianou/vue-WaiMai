import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login/login.vue'
import City from '@/views/city.vue'
import Food from '@/views/food/food.vue'
import foodHome from '@/views/food/food_home.vue'
import Search from '@/views/food/search.vue'
import User from '@/views/food/user.vue'
import Order from '@/views/food/order.vue'
import FoodCate from '@/views/food/food_cate.vue'

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
            component: Food,
            children: [
                {
                    name: 'food_home',
                    path: 'food_home',
                    component: foodHome
                },
                {
                    name: 'search',
                    path: 'search',
                    component: Search
                },
                {
                    name: 'order',
                    path: 'order',
                    component: Order
                },
                {
                    name: 'user',
                    path: 'user',
                    component: User
                },
            ]
        },
        {
            name: 'food_cate',
            path: '/food_cate',
            component: FoodCate
        },
    ]
})