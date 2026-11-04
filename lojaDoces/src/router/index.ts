import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Produtos from '../components/Produtos.vue'
import Vendas from '../components/Vendas.vue'
import Despesas from '../components/Despesas.vue'
import Relatorios from '../components/Relatorios.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/produtos', component: Produtos },
  { path: '/vendas', component: Vendas },
  { path: '/despesas', component: Despesas },
  { path: '/relatorios', component: Relatorios },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
