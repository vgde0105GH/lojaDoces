<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nomeUsuario = ref('Maria')

const produtos = ref<any[]>([])
const vendas = ref<any[]>([])
const despesas = ref<any[]>([])

// Pega o último produto cadastrado ou o primeiro da lista para exibir no destaque
const produtoDestaque = computed(() => {
  if (produtos.value.length > 0) {
    return produtos.value[produtos.value.length - 1] // Mostra o último cadastrado
  }
  return { nome: 'Nenhum produto cadastrado', preco: 0, custo: 0 }
})

onMounted(() => {
  const usuario = localStorage.getItem('loja-doces-usuario')
  if (usuario) {
    const dados = JSON.parse(usuario)
    nomeUsuario.value = dados.usuario?.nome?.split(' ')[0] || 'Maria'
  }

  // Carrega as listas reais salvas no localStorage de cada tela
  produtos.value = JSON.parse(localStorage.getItem('produtos') || '[]')
  vendas.value = JSON.parse(localStorage.getItem('vendas') || '[]')
  despesas.value = JSON.parse(localStorage.getItem('despesas') || '[]')
})

const vendasRealizadas = computed(() =>
  vendas.value.reduce((total, venda) => total + (venda.quantidade || 0), 0)
)

const faturamento = computed(() =>
  vendas.value.reduce((total, venda) => total + (venda.total || 0), 0)
)

const custoTotalVendas = computed(() =>
  vendas.value.reduce((total, venda) => total + (venda.custoTotal || 0), 0)
)

const totalDespesas = computed(() =>
  despesas.value.reduce((total, desp) => total + (desp.valor || 0), 0)
)

const lucroResultado = computed(() =>
  faturamento.value - custoTotalVendas.value - totalDespesas.value
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
          <small>Gastos cadastrados</small>
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

      <!-- Informações da loja (Agora puxa o produto cadastrado dinamicamente) -->
      <section class="informacoes">
        <h2>Informações da loja</h2>
        <p class="subtitulo">Dados e produtos cadastrados para {{ nomeUsuario }}.</p>

        <div class="grid-detalhes">
          <div class="card-detalhe">
            <h3>🧁 {{ produtoDestaque.nome }}</h3>
            <p>Preço de venda: R$ {{ formatarMoeda(produtoDestaque.preco) }}</p>
            <p>Custo de produção: R$ {{ formatarMoeda(produtoDestaque.custo) }}</p>
          </div>

          <div class="card-detalhe">
            <h3>🏠 Total de Despesas Registradas</h3>
            <p>Quantidade de itens: {{ despesas.length }} despesa(s)</p>
            <p>Valor total: R$ {{ formatarMoeda(totalDespesas) }}</p>
          </div>
        </div>
      </section>

      <!-- Cadastros -->
      <section class="cadastros">
        <h2>Cadastros da loja</h2>
        <p class="subtitulo">Escolha o que deseja cadastrar:</p>

        <div class="botoes">
          <RouterLink to="/produtos">+ Cadastrar Produto</RouterLink>
          <RouterLink to="/vendas">+ Registrar Venda</RouterLink>
          <RouterLink to="/despesas">+ Cadastrar Despesa</RouterLink>
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
  font-weight: 600;
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