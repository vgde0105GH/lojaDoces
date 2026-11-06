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

    <form @submit.prevent="cadastrar" class="form-compacto">
      <div class="campo">
        <label>Nome do produto</label>
        <input v-model="nome" placeholder="Ex: Brigadeiro" required />
      </div>

      <div class="campo">
        <label>Preço de venda (R$)</label>
        <input v-model.number="preco" type="number" step="0.01" min="0.01" required />
      </div>

      <div class="campo">
        <label>Custo de produção (R$)</label>
        <input v-model.number="custo" type="number" step="0.01" min="0" required />
      </div>

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

    <RouterLink to="/" class="btn-voltar">
      ← Voltar
    </RouterLink>
  </div>
</template>

<style scoped>
.pagina { padding: 30px; max-width: 800px; margin: 0 auto; }
.pagina > p { color: #888; margin: 10px 0 25px; }

.form-compacto, .lista {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.campo {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

input {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
  font-size: 14px;
}

input:focus {
  border-color: #7655a5;
  outline: none;
}

button {
  background: #7655a5;
  color: white;
  border: none;
  padding: 11px 16px;
  border-radius: 7px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background: #593b85;
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
.excluir:hover { background: #c9302c; }

.btn-voltar {
  display: inline-block;
  background: #7655a5;
  color: white;
  padding: 10px 20px;
  border-radius: 7px;
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
  margin-top: 10px;
}
</style>