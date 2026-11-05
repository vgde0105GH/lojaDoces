
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const produtos = ref<any[]>([])
const vendas = ref<any[]>([])
const produtoId = ref(0)
const quantidade = ref(1)

const selecionado = computed(() =>
  produtos.value.find(p => p.id === produtoId.value)
)

const total = computed(() =>
  (selecionado.value?.preco || 0) * quantidade.value
)

function registrar() {
  if (!selecionado.value || quantidade.value < 1) {
    alert('Selecione um produto e uma quantidade válida!')
    return
  }

  vendas.value.push({
    id: Date.now(),
    produto: selecionado.value.nome,
    quantidade: quantidade.value,
    total: total.value,
    custoTotal: selecionado.value.custo * quantidade.value,
    data: new Date().toLocaleDateString('pt-BR')
  })

  localStorage.setItem('vendas', JSON.stringify(vendas.value))
  alert('Venda registrada!')

  quantidade.value = 1
}

onMounted(() => {
  produtos.value = JSON.parse(localStorage.getItem('produtos') || '[]')
  vendas.value = JSON.parse(localStorage.getItem('vendas') || '[]')
})
</script>

<template>
  <div class="pagina">
    <h1>Vendas</h1>
    <p>Registre as vendas da loja.</p>

    <form @submit.prevent="registrar">
      <label>Produto</label>
      <select v-model.number="produtoId">
        <option :value="0" disabled>Selecione um produto</option>
        <option v-for="p in produtos" :key="p.id" :value="p.id">
          {{ p.nome }} - R$ {{ p.preco.toFixed(2) }}
        </option>
      </select>

      <label>Quantidade</label>
      <input v-model.number="quantidade" type="number" min="1" />

      <h3>Total: R$ {{ total.toFixed(2) }}</h3>

      <button type="submit">Registrar venda</button>
    </form>

    <div class="lista">
      <h2>Histórico de vendas</h2>

      <div v-for="v in vendas" :key="v.id" class="item">
        <div>
          <strong>{{ v.produto }}</strong>
          <p>{{ v.quantidade }} unidade(s) - {{ v.data }}</p>
        </div>
        <strong>R$ {{ v.total.toFixed(2) }}</strong>
      </div>

      <p v-if="vendas.length === 0">Nenhuma venda registrada.</p>
    </div>
  </div>
  <RouterLink
  to="/"
  style="
    display: inline-block;
    background: #7655a5;
    color: white;
    padding: 10px 20px;
    border-radius: 7px;
    text-decoration: none;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 18px;
  "
>
  ← Voltar
</RouterLink>
</template>

<style scoped>
.pagina { padding: 30px; }
.pagina > p { color: #888; margin: 10px 0 25px; }
form, .lista {
  background: white;
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
}
label { display: block; margin: 12px 0 7px; }
input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
}
h3 { margin-top: 20px; color: #7655a5; }
button {
  margin-top: 18px;
  background: #7655a5;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 7px;
  cursor: pointer;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.item p { color: #888; margin-top: 5px; }
</style>
