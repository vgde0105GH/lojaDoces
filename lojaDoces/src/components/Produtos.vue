
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const produtos = ref<any[]>([])
const nome = ref('')
const preco = ref(0)
const custo = ref(0)

function salvar() {
  localStorage.setItem('produtos', JSON.stringify(produtos.value))
}

function cadastrar() {
  if (!nome.value.trim() || preco.value <= 0 || custo.value < 0) {
    alert('Preencha os campos corretamente!')
    return
  }

  produtos.value.push({
    id: Date.now(),
    nome: nome.value,
    preco: preco.value,
    custo: custo.value
  })

  salvar()
  nome.value = ''
  preco.value = 0
  custo.value = 0
}

function excluir(id: number) {
  produtos.value = produtos.value.filter(p => p.id !== id)
  salvar()
}

onMounted(() => {
  produtos.value = JSON.parse(localStorage.getItem('produtos') || '[]')

  if (produtos.value.length === 0) {
    produtos.value.push({
      id: 1,
      nome: 'Cupcake',
      preco: 8,
      custo: 4.5
    })
    salvar()
  }
})
</script>

<template>
  <div class="pagina">
    <h1>Produtos</h1>
    <p>Cadastre os doces da loja.</p>

    <form @submit.prevent="cadastrar">
      <input v-model="nome" placeholder="Nome do produto" required />
      <input v-model.number="preco" type="number" step="0.01" min="0.01" placeholder="Preço de venda" required />
      <input v-model.number="custo" type="number" step="0.01" min="0" placeholder="Custo de produção" required />
      <button>Cadastrar produto</button>
    </form>

    <div class="lista">
      <h2>Produtos cadastrados</h2>

      <div v-for="p in produtos" :key="p.id" class="item">
        <div>
          <strong>{{ p.nome }}</strong>
          <p>Venda: R$ {{ p.preco.toFixed(2) }} | Custo: R$ {{ p.custo.toFixed(2) }}</p>
        </div>

        <button class="excluir" @click="excluir(p.id)">Excluir</button>
      </div>
    </div>
  </div>
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
input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
}
button {
  background: #7655a5;
  color: white;
  border: none;
  padding: 11px 16px;
  border-radius: 7px;
  cursor: pointer;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.item p { color: #888; font-size: 13px; margin-top: 6px; }
.excluir { background: #d9534f; }
</style>
