
<script setup lang="ts">
const faturamento = 0
const despesasFixas = 440
const custoProdutos = 0
const lucro = faturamento - despesasFixas - custoProdutos
</script>

<template>
  <div class="dashboard">
    <div class="welcome">
      <div>
        <h1>Olá, Maria! 👋</h1>
        <p>Gastos da loja</p>
      </div>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-icon purple">💵</div>
        <p>Faturamento</p>
        <h2>R$ {{ faturamento.toFixed(2) }}</h2>
        <small>Total das vendas</small>
      </div>

      <div class="card">
        <div class="card-icon orange">💸</div>
        <p>Despesas</p>
        <h2>R$ {{ despesasFixas.toFixed(2) }}</h2>
        <small>Despesas fixas</small>
      </div>

      <div class="card">
        <div class="card-icon green">📈</div>
        <p>Lucro / Resultado</p>
        <h2 :class="lucro < 0 ? 'negative' : 'positive'">
          R$ {{ lucro.toFixed(2) }}
        </h2>
        <small>Após despesas e custos</small>
      </div>

      <div class="card">
        <div class="card-icon blue">🛍️</div>
        <p>Vendas realizadas</p>
        <h2>0</h2>
        <small>Quantidade de vendas</small>
      </div>
    </div>

    <div class="section">
      <h2>Informações da loja</h2>
      <p>Dados iniciais cadastrados para Maria.</p>

      <div class="info-grid">
        <div class="info-card">
          <span>🧁</span>
          <div>
            <strong>Cupcake</strong>
            <p>Preço de venda: R$ 8,00</p>
            <p>Custo de produção: R$ 4,50</p>
          </div>
        </div>

        <div class="info-card">
          <span>🏠</span>
          <div>
            <strong>Despesas fixas mensais</strong>
            <p>Internet: R$ 120,00</p>
            <p>Luz: R$ 230,00</p>
            <p>Água: R$ 90,00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
}

.welcome {
  margin-bottom: 28px;
}

.welcome h1 {
  font-size: 26px;
  margin-bottom: 8px;
}

.welcome p,
.section > p {
  color: #888;
  font-size: 14px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.card {
  background: white;
  padding: 22px;
  border-radius: 12px;
  border: 1px solid #eeeaf2;
}

.card-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-size: 21px;
  margin-bottom: 17px;
}

.purple { background: #eee6fa; }
.orange { background: #fff0df; }
.green { background: #e3f6eb; }
.blue { background: #e3efff; }

.card p {
  color: #888;
  font-size: 13px;
  margin-bottom: 9px;
}

.card h2 {
  font-size: 23px;
  margin-bottom: 8px;
}

.card small {
  color: #999;
  font-size: 12px;
}

.negative {
  color: #dc5555;
}

.positive {
  color: #239b65;
}

.section {
  margin-top: 35px;
}

.section h2 {
  font-size: 19px;
  margin-bottom: 8px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 20px;
}

.info-card {
  background: white;
  padding: 22px;
  border: 1px solid #eeeaf2;
  border-radius: 12px;
  display: flex;
  gap: 16px;
}

.info-card > span {
  font-size: 30px;
}

.info-card strong {
  display: block;
  margin-bottom: 10px;
}

.info-card p {
  color: #777;
  font-size: 13px;
  margin-top: 7px;
}

@media (max-width: 1000px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .cards,
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
