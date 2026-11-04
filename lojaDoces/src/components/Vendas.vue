
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Produto {
  id: number
  nome: string
  preco: number
  custo: number
}

interface Venda {
  id: number
  produto: string
  quantidade: number
  total: number
  custoTotal: number
  data: string
}

const produtos = ref<Produto[]>([])
const vendas = ref<Venda[]>([])
const produtoId = ref(0)
const quantidade = ref(1)

const produtoSelecionado = computed(() =>
  produtos.value.find(p => p.id === produtoId.value)
)

const total = computed(() =>
  (produtoSelecionado.value?.preco || 0) * quantidade.value
)

function registrarVenda() {
  const produto = produtoSelecionado.value

  if (!produto || quantidade.value <= 0) {
    alert('Selecione um produto e uma quantidade válida!')
    return
  }

  vendas.value.unshift({
    id: Date.now(),
    produto: produto.nome,
    quantidade: quantidade.value,
    total: total.value,
    custoTotal: produto.custo * quantidade.value,
    data: new Date().toLocaleDateString('pt-BR')
  })

  localStorage.setItem('vendas', JSON.stringify(vendas.value))

  alert('Venda registrada com sucesso!')
  quantidade.value = 1
}

onMounted(() => {
  produtos.value = JSON.parse(localStorage.getItem('produtos') || '[]')
  vendas.value = JSON.parse(localStorage.getItem('vendas') || '[]')
  if (produtos.value.length) produtoId.value = produtos.value[0].id
})
</script>

<template>
  <div class="pagina">
    <h1>Vendas</h1>
    <p class="subtitulo">Registre e acompanhe as vendas da loja.</p>

    <div class="formulario">
      <h2>Registrar nova venda</h2>

      <form @submit.prevent="registrarVenda">
        <label>Selecione o produto</label>
        <select v-model.number="produtoId" required>
          <option :value="0" disabled>Escolha um produto</option>
          <option v-for="p in produtos" :key="p.id" :value="p.id">
            {{ p.nome }} - R$ {{ p.preco.toFixed(2) }}
          </option>
        </select>

        <label>Quantidade</label>
        <input v-model.number="quantidade" type="number" min="1" required />

        <div class="resumo">
          <p>Preço unitário:
            <strong>R$ {{ (produtoSelecionado?.preco || 0).toFixed(2) }}</strong>
          </p>
          <h3>Total da venda: R$ {{ total.toFixed(2) }}</h3>
        </div>

        <button type="submit" :disabled="!produtoSelecionado">
          Registrar venda
        </button>
      </form>
    </div>

    <div class="tabela">
      <h2>Histórico de vendas</h2>

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="venda in vendas" :key="venda.id">
            <td>{{ venda.produto }}</td>
            <td>{{ venda.quantidade }}</td>
            <td>{{ venda.data }}</td>
            <td>R$ {{ venda.total.toFixed(2) }}</td>
          </tr>

          <tr v-if="vendas.length === 0">
            <td colspan="4">Nenhuma venda registrada.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.pagina { width: 100%; }
h1 { font-size: 26px; }
.subtitulo { color: #888; margin: 8px 0 25px; }
.formulario, .tabela {
  background: white; padding: 25px; border-radius: 12px;
  border: 1px solid #eeeaf2; margin-bottom: 22px;
}
h2 { font-size: 18px; margin-bottom: 20px; }
label { display: block; font-size: 13px; margin: 15px 0 8px; }
input, select {
  width: 100%; max-width: 450px; padding: 12px;
  border: 1px solid #ddd; border-radius: 7px;
}
.resumo {
  margin-top: 20px; padding: 18px; background: #f7f3fc;
  border-radius: 8px; max-width: 450px;
}
.resumo h3 { margin-top: 12px; color: #7655a5; }
button {
  padding: 12px 18px; margin-top: 18px; border: none;
  border-radius: 7px; background: #7655a5; color: white; cursor: pointer;
}
button:disabled { opacity: .5; cursor: not-allowed; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 14px 10px; text-align: left; border-bottom: 1px solid #eee; }
th { color: #777; font-size: 13px; }
@media(max-width: 650px) {
  .tabela { overflow-x: auto; }
  table { min-width: 500px; }
}
</style>
