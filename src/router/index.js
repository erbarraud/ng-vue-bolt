import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ProductionOrders from '../views/ProductionOrders.vue'
import CreateProductionOrder from '../views/CreateProductionOrder.vue'
import UserManagement from '../views/UserManagement.vue'
import ShiftScheduler from '../views/ShiftScheduler.vue'
import ClaimsManagement from '../views/ClaimsManagement.vue'
import LineCheck from '../views/LineCheck.vue'
import LiveScanning from '../views/LiveScanning.vue'
import BoardInspector from '../views/BoardInspector.vue'
import BoardFinder from '../views/BoardFinder.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/orders',
    name: 'ProductionOrders',
    component: ProductionOrders
  },
  {
    path: '/orders/create',
    name: 'CreateProductionOrder',
    component: CreateProductionOrder
  },
  {
    path: '/users',
    name: 'UserManagement',
    component: UserManagement
  },
  {
    path: '/scheduler',
    name: 'ShiftScheduler',
    component: ShiftScheduler
  },
  {
    path: '/claims',
    name: 'ClaimsManagement',
    component: ClaimsManagement
  },
  {
    path: '/line',
    name: 'LineCheck',
    component: LineCheck
  },
  {
    path: '/scanning',
    name: 'LiveScanning',
    component: LiveScanning
  },
  {
    path: '/inspector',
    name: 'BoardInspector',
    component: BoardInspector
  },
  {
    path: '/finder',
    name: 'BoardFinder',
    component: BoardFinder
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router