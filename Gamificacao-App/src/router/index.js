import Barra from '@/components/Barra.vue'
import Homepage from '@/views/Homepage.vue'
import Login from '@/views/Login.vue'
import User from '@/views/User.vue'
import Location from '@/views/Location.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/barra',
      name: 'barra',
      component: Barra
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/location',
      name: 'location',
      component: Location
    }
  ]
})

export default router
