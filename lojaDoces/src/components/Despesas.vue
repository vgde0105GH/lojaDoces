
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Despesa {
  id: number
  nome: string
  valor: number
  tipo: string
  data: string
}

const despesas = ref<Despesa[]>([])
const nome = ref('')
const valor = ref(0)
const tipo = ref('Fixa')

const totalDespesas = computed(() =>
  despesas.value.reduce(
    (soma: number, d: Despesa) => soma + d.valor,
    0
  )
)

function salvar() {
  localStorage.setItem('despesas', JSON.stringify(despesas.value))
}

function cadastrarDespesa() {
  if (!nome.value.trim() || valor.value <= 0) {
    alert('Preencha os campos corretamente!')
    return
  }

  despesas.value.unshift({
    id: Date.now(),
    nome: nome.value,
    valor: valor.value,
    tipo: tipo.value,
    data: new Date().toLocaleDateString('pt-BR')
  })

  salvar()
  nome.value = ''
  valor.value = 0
  tipo.value = 'Fixa'
}

function excluirDespesa(id: number) {
  if (confirm('Deseja excluir esta despesa?')) {
    despesas.value = despesas.value.filter(d => d.id !== id)
    salvar()
  }
}

onMounted(() => {
  const dados = localStorage.getItem('despesas')

  if (dados) {
    despesas.value = JSON.parse(dados)
  } else {
    despesas.value = [
      { id: 1, nome: 'Internet', valor: 120, tipo: 'Fixa', data: '-' },
      { id: 2, nome: 'Luz', valor: 230, tipo: 'Fixa', data: '-' },
      { id: 3, nome: 'Água', valor: 90, tipo: 'Fixa', data: '-' }
    ]
    salvar()
  }
})
</script>

<template>
  <div class="pagina">
    <h1>Despesas</h1>
    <p class="subtitulo">Controle os gastos da sua loja.</p>

    <div class="total">
      <div>
        <p>Total de despesas cadastradas</p>
        <h2>R$ {{ totalDespesas.toFixed(2) }}</h2>
      </div>
      <span>💸</span>
    </div>

    <div class="formulario">
      <h2>Adicionar despesa</h2>

      <form @submit.prevent="cadastrarDespesa">
        <label>Nome da despesa</label>
        <input v-model="nome" placeholder="Ex: Aluguel" required />

        <label>Valor (R$)</label>
        <input v-model.number="valor" type="number" min="0.01" step="0.01" required />

        <label>Tipo de despesa</label>
        <select v-model="tipo">
          <option>Fixa</option>
          <option>Variável</option>
        </select>

        <button type="submit">+ Adicionar despesa</button>
      </form>
    </div>

    <div class="tabela">
      <h2>Lista de despesas</h2>

      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="d in despesas" :key="d.id">
            <td>{{ d.nome }}</td>
            <td>{{ d.tipo }}</td>
            <td>{{ d.data }}</td>
            <td>R$ {{ d.valor.toFixed(2) }}</td>
            <td>
              <button class="excluir" @click="excluirDespesa(d.id)">Excluir</button>
            </td>
          </tr>

          <tr v-if="despesas.length === 0">
            <td colspan="5">Nenhuma despesa cadastrada.</td>
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
.total {
  display: flex; justify-content: space-between; align-items: center;
  padding: 25px; background: #fff0df; border-radius: 12px; margin-bottom: 22px;
}
.total p { color: #875f38; }
.total h2 { margin-top: 10px; font-size: 27px; color: #bd7130; }
.total span { font-size: 35px; }
.formulario, .tabela {
  background: white; padding: 25px; border-radius: 12px;
  border: 1px solid #eeeaf2; margin-bottom: 22px;
}
h2 { font-size: 18px; margin-bottom: 18px; }
label { display: block; font-size: 13px; margin: 14px 0 8px; }
input, select {
  width: 100%; max-width: 450px; padding: 12px;
  border: 1px solid #ddd; border-radius: 7px;
}
button {
  padding: 12px 18px; margin-top: 18px; border: none;
  border-radius: 7px; background: #7655a5; color: white; cursor: pointer;
}
.excluir { background: #dc5555; margin: 0; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 14px 10px; text-align: left; border-bottom: 1px solid #eee; }
th { color: #777; font-size: 13px; }
@media(max-width: 650px) {
  .tabela { overflow-x: auto; }
  table { min-width: 550px; }
}
</style>
