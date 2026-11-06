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

    <form @submit.prevent="cadastrar" class="form-compacto">
      <h2>Adicionar despesa</h2>

      <div class="campo">
        <label>Nome da despesa</label>
        <input v-model="nome" placeholder="Ex: Aluguel" required />
      </div>

      <div class="campo">
        <label>Valor (R$)</label>
        <input v-model.number="valor" type="number" min="0.01" step="0.01" required />
      </div>

      <button>Adicionar</button>
    </form>

    <div class="lista">
      <h2>Despesas cadastradas</h2>

      <div v-for="d in despesas" :key="d.id" class="item">
        <div>
          <strong>{{ d.nome }}</strong>
          <p>R$ {{ d.valor.toFixed(2) }}</p>
        </div>
        <button class="excluir" @click="excluir(d.id)">Excluir</button>
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

.total, .form-compacto, .lista {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.total h2 { color: #7655a5; margin-top: 10px; font-size: 22px; }

.form-compacto h2 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
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
  padding: 10px 15px;
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
  gap: 10px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}
.item p { color: #888; font-size: 13px; margin-top: 4px; }
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