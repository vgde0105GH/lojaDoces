<script setup lang="ts">
import Login from './components/login.vue';
</script>

<template>
    <Login />
</template>


<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">🍬</span>
        <h2>Doce Gestão</h2>
      </div>

      <p class="menu-title">MENU PRINCIPAL</p>

      <nav>
        <RouterLink to="/" class="menu-item">
          <span>📊</span> Dashboard
        </RouterLink>

        <RouterLink to="/produtos" class="menu-item">
          <span>🧁</span> Produtos
        </RouterLink>

        <RouterLink to="/vendas" class="menu-item">
          <span>🛒</span> Vendas
        </RouterLink>

        <RouterLink to="/despesas" class="menu-item">
          <span>💰</span> Despesas
        </RouterLink>

        <RouterLink to="/relatorios" class="menu-item">
          <span>📈</span> Relatórios
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <p>Doce Gestão</p>
        <small>Controle financeiro</small>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <h3>Painel Administrativo</h3>
          <p>Gerencie sua loja de doces</p>
        </div>

        <div class="user">
          <span>👩🏻</span>
          <div>
            <strong>Maria</strong>
            <small>Administradora</small>
          </div>
        </div>
      </header>

      <section class="page-content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f8f7fb;
  color: #292536;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 245px;
  background: #302544;
  color: white;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 45px;
}

.logo h2 {
  font-size: 21px;
}

.logo-icon {
  font-size: 27px;
}

.menu-title {
  color: #b7abc9;
  font-size: 11px;
  margin: 0 0 15px 10px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px;
  border-radius: 9px;
  text-decoration: none;
  color: #e4ddec;
  transition: 0.2s;
}

.menu-item:hover,
.menu-item.router-link-active {
  background: #7655a5;
  color: white;
}

.sidebar-footer {
  margin-top: auto;
  padding: 15px 5px;
  border-top: 1px solid #514365;
}

.sidebar-footer small {
  color: #b7abc9;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.topbar {
  height: 85px;
  background: white;
  border-bottom: 1px solid #eeeaf2;
  padding: 15px 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar h3 {
  font-size: 19px;
}

.topbar p {
  color: #888;
  font-size: 13px;
  margin-top: 5px;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user > span {
  background: #f0e9f8;
  padding: 10px;
  border-radius: 50%;
}

.user div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user small {
  color: #888;
}

.page-content {
  padding: 30px 35px;
}

@media (max-width: 700px) {
  .sidebar {
    width: 75px;
    padding: 20px 8px;
  }

  .logo h2,
  .menu-title,
  .menu-item:not(span),
  .sidebar-footer {
    font-size: 0;
  }

  .logo {
    justify-content: center;
  }

  .menu-item {
    justify-content: center;
    font-size: 0;
  }

  .menu-item span {
    font-size: 20px;
  }

  .topbar {
    padding: 15px;
  }

  .page-content {
    padding: 20px 12px;
  }
}
</style>
