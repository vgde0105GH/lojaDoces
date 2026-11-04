
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Produtos from '../components/Produtos.vue'
import Vendas from '../components/Vendas.vue'
import Despesas from '../components/Despesas.vue'
import Relatorios from '../components/Relatorios.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/produtos', component: Produtos },
  { path: '/vendas', component: Vendas },
  { path: '/despesas', component: Despesas },
  { path: '/relatorios', component: Relatorios },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const usuarioLogado = localStorage.getItem('loja-doces-logado')

  const paginasPublicas = ['/login', '/register']

  if (!usuarioLogado && !paginasPublicas.includes(to.path)) {
    return '/login'
  }

  if (usuarioLogado && paginasPublicas.includes(to.path)) {
    return '/dashboard'
  }
})

export default router
