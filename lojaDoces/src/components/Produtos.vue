
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Produto {
  id: number
  nome: string
  preco: number
  custo: number
}

const produtos = ref<Produto[]>([])
const nome = ref('')
const preco = ref(0)
const custo = ref(0)

function carregarProdutos() {
  const dados = localStorage.getItem('produtos')

  if (dados) {
    produtos.value = JSON.parse(dados)
  } else {
    produtos.value = [
      { id: 1, nome: 'Cupcake', preco: 8, custo: 4.5 }
    ]
    salvar()
  }
}

function salvar() {
  localStorage.setItem('produtos', JSON.stringify(produtos.value))
}

function cadastrarProduto() {
  if (!nome.value.trim() || preco.value <= 0 || custo.value < 0) {
    alert('Preencha os dados corretamente!')
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

function excluirProduto(id: number) {
  if (confirm('Deseja excluir este produto?')) {
    produtos.value = produtos.value.filter(p => p.id !== id)
    salvar()
  }
}

onMounted(carregarProdutos)
</script>

<template>
  <div class="pagina">
    <h1>Produtos</h1>
    <p class="subtitulo">Gerencie os produtos da sua loja.</p>

    <div class="formulario">
      <h2>Cadastrar novo produto</h2>

      <form @submit.prevent="cadastrarProduto">
        <div class="campos">
          <div>
            <label>Nome do produto</label>
            <input v-model="nome" placeholder="Ex: Brigadeiro" required />
          </div>

          <div>
            <label>Preço de venda (R$)</label>
            <input v-model.number="preco" type="number" min="0.01" step="0.01" required />
          </div>

          <div>
            <label>Custo de produção (R$)</label>
            <input v-model.number="custo" type="number" min="0" step="0.01" required />
          </div>
        </div>

        <button type="submit">+ Cadastrar produto</button>
      </form>
    </div>

    <div class="tabela">
      <h2>Produtos cadastrados</h2>

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Venda</th>
            <th>Custo</th>
            <th>Lucro unitário</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td>{{ produto.nome }}</td>
            <td>R$ {{ produto.preco.toFixed(2) }}</td>
            <td>R$ {{ produto.custo.toFixed(2) }}</td>
            <td>R$ {{ (produto.preco - produto.custo).toFixed(2) }}</td>
            <td>
              <button class="excluir" @click="excluirProduto(produto.id)">Excluir</button>
            </td>
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
  background: white;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #eeeaf2;
  margin-bottom: 22px;
}
h2 { font-size: 18px; margin-bottom: 20px; }
.campos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
label { display: block; font-size: 13px; margin-bottom: 8px; }
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
}
button {
  margin-top: 18px;
  padding: 12px 18px;
  border: none;
  border-radius: 7px;
  background: #7655a5;
  color: white;
  cursor: pointer;
}
table { width: 100%; border-collapse: collapse; }
th, td { padding: 14px 10px; text-align: left; border-bottom: 1px solid #eee; }
th { color: #777; font-size: 13px; }
.excluir { background: #dc5555; margin: 0; }
@media(max-width: 750px) {
  .campos { grid-template-columns: 1fr; }
  .tabela { overflow-x: auto; }
  table { min-width: 600px; }
}
</style>
