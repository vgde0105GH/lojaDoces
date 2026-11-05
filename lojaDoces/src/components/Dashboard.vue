
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nomeUsuario = ref('Maria')

const produto = ref({
  nome: 'Cupcake',
  precoVenda: 8,
  custoProducao: 4.5
})

const despesasFixas = ref({
  internet: 120,
  luz: 230,
  agua: 90
})

const vendas = ref<any[]>([])

onMounted(() => {
  const usuario = localStorage.getItem('loja-doces-usuario')

  if (usuario) {
    const dados = JSON.parse(usuario)
    nomeUsuario.value = dados.usuario?.nome?.split(' ')[0] || 'Maria'
    produto.value = dados.loja?.produto || produto.value
    despesasFixas.value = dados.loja?.despesasFixas || despesasFixas.value
  }

  const historico = localStorage.getItem('loja-doces-vendas')

  if (historico) {
    vendas.value = JSON.parse(historico)
  } else {
    vendas.value = [
      { produto: 'Cupcake', quantidade: 10, valorTotal: 80 },
      { produto: 'Cupcake', quantidade: 5, valorTotal: 40 }
    ]
    localStorage.setItem('loja-doces-vendas', JSON.stringify(vendas.value))
  }
})

const vendasRealizadas = computed(() =>
  vendas.value.reduce((total, venda) => total + (venda.quantidade || 0), 0)
)

const faturamento = computed(() =>
  vendas.value.reduce((total, venda) => total + (venda.valorTotal || 0), 0)
)

const totalDespesas = computed(() =>
  despesasFixas.value.internet +
  despesasFixas.value.luz +
  despesasFixas.value.agua
)

const lucroResultado = computed(() =>
  faturamento.value - totalDespesas.value
)

function formatarMoeda(valor: number) {
  return valor.toFixed(2).replace('.', ',')
}

function logout() {
  localStorage.removeItem('loja-doces-logado')
  router.push('/login')
}
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-conteudo">

      <header class="topo-dashboard">
        <div>
          <h1>Olá, {{ nomeUsuario }}! 👋</h1>
          <p>Gastos da loja</p>
        </div>
        <button class="btn-sair" @click="logout">Sair</button>
      </header>

      <!-- Indicadores -->
      <section class="grid-kpis">
        <div class="card">
          💵
          <p>Faturamento</p>
          <h2>R$ {{ formatarMoeda(faturamento) }}</h2>
          <small>Total das vendas</small>
        </div>

        <div class="card">
          💸
          <p>Despesas</p>
          <h2>R$ {{ formatarMoeda(totalDespesas) }}</h2>
          <small>Despesas fixas</small>
        </div>

        <div class="card">
          📝
          <p>Lucro / Resultado</p>
          <h2 :class="lucroResultado >= 0 ? 'positivo' : 'negativo'">
            R$ {{ formatarMoeda(lucroResultado) }}
          </h2>
          <small>Após despesas e custos</small>
        </div>

        <div class="card">
          🛍️
          <p>Vendas realizadas</p>
          <h2>{{ vendasRealizadas }}</h2>
          <small>Quantidade de itens vendidos</small>
        </div>
      </section>

      <!-- Informações da loja -->
      <section class="informacoes">
        <h2>Informações da loja</h2>
        <p class="subtitulo">Dados iniciais cadastrados para {{ nomeUsuario }}.</p>

        <div class="grid-detalhes">
          <div class="card-detalhe">
            <h3>🧁 {{ produto.nome }}</h3>
            <p>Preço de venda: R$ {{ formatarMoeda(produto.precoVenda) }}</p>
            <p>Custo de produção: R$ {{ formatarMoeda(produto.custoProducao) }}</p>
          </div>

          <div class="card-detalhe">
            <h3>🏠 Despesas fixas mensais</h3>
            <p>Internet: R$ {{ formatarMoeda(despesasFixas.internet) }}</p>
            <p>Luz: R$ {{ formatarMoeda(despesasFixas.luz) }}</p>
            <p>Água: R$ {{ formatarMoeda(despesasFixas.agua) }}</p>
          </div>
        </div>
      </section>

      <!-- CADASTROS: fica dentro do Dashboard -->
      <section class="cadastros">
        <h2>Cadastros da loja</h2>
        <p class="subtitulo">Escolha o que deseja cadastrar:</p>

        <div class="botoes">
          <RouterLink to="/produtos">+ Cadastrar Produto</RouterLink>
          <RouterLink to="/vendas">+ Registrar Venda</RouterLink>
          <RouterLink to="/despesas">+ Cadastrar Despesa</RouterLink>
          <RouterLink to="/register">
  + Cadastrar Usuário
</RouterLink>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f7fafc;
  padding: 32px 40px;
}

.dashboard-conteudo {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.topo-dashboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.topo-dashboard h1 {
  font-size: 24px;
  color: #1a202c;
}

.topo-dashboard p,
.subtitulo {
  color: #718096;
  font-size: 13px;
  margin-top: 5px;
}

.btn-sair {
  background: #e040fb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 7px;
  cursor: pointer;
}

.grid-kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.card, .card-detalhe {
  background: white;
  padding: 22px;
  border: 1px solid #edf2f7;
  border-radius: 10px;
}

.card p {
  color: #718096;
  font-size: 13px;
  margin-top: 12px;
}

.card h2 {
  font-size: 21px;
  margin: 6px 0;
}

.card small {
  color: #a0aec0;
}

.positivo {
  color: #38a169;
}

.negativo {
  color: #e53e3e;
}

.informacoes {
  margin-top: 25px;
}

.informacoes h2, .cadastros h2 {
  color: #302544;
  font-size: 18px;
}

.grid-detalhes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.card-detalhe h3 {
  margin-bottom: 15px;
  color: #302544;
}

.card-detalhe p {
  color: #718096;
  font-size: 13px;
  margin: 8px 0;
}

.cadastros {
  margin-top: 25px;
  padding: 22px;
  background: white;
  border: 1px solid #edf2f7;
  border-radius: 10px;
}

.botoes {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 15px;
}

.botoes a {
  background: #7655a5;
  color: white;
  padding: 12px 18px;
  border-radius: 7px;
  text-decoration: none;
}

.botoes a:hover {
  background: #593b85;
}

@media (max-width: 768px) {
  .grid-kpis {
    grid-template-columns: 1fr;
  }

  .grid-detalhes {
    grid-template-columns: 1fr;
  }

  .dashboard-container {
    padding: 20px;
  }
}
</style>
