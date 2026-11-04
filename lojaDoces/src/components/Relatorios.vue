
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Venda {
  id: number
  produto: string
  quantidade: number
  total: number
  custoTotal: number
  data: string
}

interface Despesa {
  id: number
  nome: string
  valor: number
  tipo: string
  data: string
}

const vendas = ref<Venda[]>([])
const despesas = ref<Despesa[]>([])

const faturamento = computed(() =>
  vendas.value.reduce((s, v) => s + v.total, 0)
)

const custos = computed(() =>
  vendas.value.reduce((s, v) => s + v.custoTotal, 0)
)

const totalDespesas = computed(() =>
  despesas.value.reduce((s, d) => s + d.valor, 0)
)

const lucro = computed(() =>
  faturamento.value - custos.value - totalDespesas.value
)

const quantidadeVendida = computed(() =>
  vendas.value.reduce((s, v) => s + v.quantidade, 0)
)

onMounted(() => {
  vendas.value = JSON.parse(localStorage.getItem('vendas') || '[]')
  despesas.value = JSON.parse(localStorage.getItem('despesas') || '[]')
})
</script>

<template>
  <div class="pagina">
    <h1>Relatórios financeiros</h1>
    <p class="subtitulo">Acompanhe os resultados da sua loja.</p>

    <div class="cards">
      <div class="card">
        <span>💵 Faturamento</span>
        <h2>R$ {{ faturamento.toFixed(2) }}</h2>
      </div>

      <div class="card">
        <span>📦 Custos de produção</span>
        <h2>R$ {{ custos.toFixed(2) }}</h2>
      </div>

      <div class="card">
        <span>💸 Despesas</span>
        <h2>R$ {{ totalDespesas.toFixed(2) }}</h2>
      </div>

      <div class="card">
        <span>📈 Lucro / Resultado</span>
        <h2 :class="lucro < 0 ? 'negativo' : 'positivo'">
          R$ {{ lucro.toFixed(2) }}
        </h2>
      </div>
    </div>

    <div class="resumo">
      <h2>Resumo geral</h2>

      <div class="linha">
        <span>Quantidade de produtos vendidos</span>
        <strong>{{ quantidadeVendida }}</strong>
      </div>

      <div class="linha">
        <span>Total de vendas</span>
        <strong>{{ vendas.length }}</strong>
      </div>

      <div class="linha">
        <span>Faturamento bruto</span>
        <strong>R$ {{ faturamento.toFixed(2) }}</strong>
      </div>

      <div class="linha">
        <span>Custos de produção</span>
        <strong>R$ {{ custos.toFixed(2) }}</strong>
      </div>

      <div class="linha">
        <span>Despesas cadastradas</span>
        <strong>R$ {{ totalDespesas.toFixed(2) }}</strong>
      </div>

      <div class="linha resultado">
        <span>Resultado final</span>
        <strong :class="lucro < 0 ? 'negativo' : 'positivo'">
          R$ {{ lucro.toFixed(2) }}
        </strong>
      </div>
    </div>

    <p class="observacao">
      * O resultado considera todas as vendas e despesas atualmente
      cadastradas no sistema. Para um fechamento mensal correto,
      as despesas deverão ser filtradas por período.
    </p>
  </div>
</template>

<style scoped>
.pagina { width: 100%; }
h1 { font-size: 26px; }
.subtitulo { color: #888; margin: 8px 0 25px; }
.cards {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px;
}
.card, .resumo {
  background: white; padding: 24px; border-radius: 12px;
  border: 1px solid #eeeaf2;
}
.card span { color: #777; font-size: 14px; }
.card h2 { margin-top: 15px; font-size: 24px; }
.resumo { margin-top: 25px; }
.resumo h2 { margin-bottom: 20px; }
.linha {
  display: flex; justify-content: space-between; gap: 15px;
  padding: 16px 0; border-bottom: 1px solid #eee;
}
.resultado { font-size: 17px; border-bottom: none; }
.positivo { color: #239b65; }
.negativo { color: #dc5555; }
.observacao { margin-top: 18px; color: #888; font-size: 12px; }
@media(max-width: 650px) {
  .cards { grid-template-columns: 1fr; }
}
</style>
