
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const despesas = ref<any[]>([])
const nome = ref('')
const valor = ref(0)

const total = computed(() =>
  despesas.value.reduce((s: number, d: any) => s + d.valor, 0)
)

function salvar() {
  localStorage.setItem('despesas', JSON.stringify(despesas.value))
}

function cadastrar() {
  if (!nome.value.trim() || valor.value <= 0) {
    alert('Preencha os campos corretamente!')
    return
  }

  despesas.value.push({
    id: Date.now(),
    nome: nome.value,
    valor: valor.value
  })

  salvar()
  nome.value = ''
  valor.value = 0
}

function excluir(id: number) {
  despesas.value = despesas.value.filter(d => d.id !== id)
  salvar()
}

onMounted(() => {
  despesas.value = JSON.parse(localStorage.getItem('despesas') || 'null') || [
    { id: 1, nome: 'Internet', valor: 120 },
    { id: 2, nome: 'Luz', valor: 230 },
    { id: 3, nome: 'Água', valor: 90 }
  ]

  salvar()
})
</script>

<template>
  <div class="pagina">
    <h1>Despesas</h1>
    <p>Controle os gastos da loja.</p>

    <div class="total">
      <span>Total de despesas</span>
      <h2>R$ {{ total.toFixed(2) }}</h2>
    </div>

    <form @submit.prevent="cadastrar">
      <h2>Adicionar despesa</h2>

      <input v-model="nome" placeholder="Nome da despesa" required />
      <input v-model.number="valor" type="number" min="0.01" step="0.01" placeholder="Valor" required />

      <button>Adicionar</button>
    </form>

    <div class="lista">
      <h2>Despesas cadastradas</h2>

      <div v-for="d in despesas" :key="d.id" class="item">
        <strong>{{ d.nome }}</strong>
        <span>R$ {{ d.valor.toFixed(2) }}</span>
        <button class="excluir" @click="excluir(d.id)">Excluir</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagina { padding: 30px; }
.pagina > p { color: #888; margin: 10px 0 25px; }
.total, form, .lista {
  background: white;
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
}
.total h2 { color: #7655a5; margin-top: 10px; }
input {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ddd;
  border-radius: 7px;
}
button {
  background: #7655a5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 7px;
  cursor: pointer;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}
.excluir { background: #d9534f; }
</style>
