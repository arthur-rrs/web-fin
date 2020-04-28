import Vue from 'vue'
import VueRouter from 'vue-router'

import Accounts from '../views/Accounts'
import AddTransaction from '../views/AddTransaction'
import Home from '../views/Home.vue'
import Report from '../views/Report.vue'
import Signin from '../views/Signin.vue'
import Login from '../views/Login.vue'
import Transactions from '../views/Transactions.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Accounts',
    path: '/accounts',
    component: Accounts
  },
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Signin',
    path: '/signin',
    component: Signin
  },
  {
    name: 'Report',
    path: '/report',
    component: Report
  },
  {
    name: 'AddTransaction',
    path: '/add-transaction',
    component: AddTransaction,
    props: true
  }, 
  {
    name: 'Transactions',
    path: '/transactions',
    component: Transactions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user-session') !== null;
  if (to.name === 'Signin') next()
  else if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
