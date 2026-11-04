<script setup lang="ts">
import Login from './components/login.vue';
</script>

<template>
    <Login />
</template>



<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>🍬 Doce Gestão</h2>

      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/produtos">Produtos</RouterLink>
        <RouterLink to="/vendas">Vendas</RouterLink>
        <RouterLink to="/despesas">Despesas</RouterLink>
        <RouterLink to="/relatorios">Relatórios</RouterLink>
      </nav>
    </aside>

    <main>
      <header>
        <h3>Painel Administrativo</h3>
        <span>Maria 👩🏻</span>
      </header>

      <RouterView />
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
  background: #f7f5fa;
  color: #302544;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #302544;
  color: white;
  padding: 25px 15px;
}

.sidebar h2 {
  margin-bottom: 35px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 12px;
  border-radius: 7px;
}

nav a:hover,
nav a.router-link-active {
  background: #7655a5;
}

main {
  flex: 1;
  min-width: 0;
}

header {
  background: white;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

@media (max-width: 600px) {
  .sidebar {
    width: 140px;
    padding: 15px 8px;
  }

  .sidebar h2 {
    font-size: 16px;
  }

  header {
    padding: 18px 10px;
    font-size: 12px;
  }
}
</style>
