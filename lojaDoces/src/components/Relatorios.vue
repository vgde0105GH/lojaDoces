
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const vendas = ref<any[]>([])
const despesas = ref<any[]>([])

const faturamento = computed(() =>
  vendas.value.reduce((s: number, v: any) => s + v.total, 0)
)

const custos = computed(() =>
  vendas.value.reduce((s: number, v: any) => s + v.custoTotal, 0)
)

const gastos = computed(() =>
  despesas.value.reduce((s: number, d: any) => s + d.valor, 0)
)

const lucro = computed(() => faturamento.value - custos.value - gastos.value)

onMounted(() => {
  vendas.value = JSON.parse(localStorage.getItem('vendas') || '[]')
  despesas.value = JSON.parse(localStorage.getItem('despesas') || '[]')
})
</script>

<template>
  <div class="pagina">
    <h1>Relatórios</h1>
    <p>Resumo financeiro da loja.</p>

    <div class="lista">
      <div class="item">
        <span>Faturamento</span>
        <strong>R$ {{ faturamento.toFixed(2) }}</strong>
      </div>

      <div class="item">
        <span>Custos de produção</span>
        <strong>R$ {{ custos.toFixed(2) }}</strong>
      </div>

      <div class="item">
        <span>Despesas</span>
        <strong>R$ {{ gastos.toFixed(2) }}</strong>
      </div>

      <div class="item resultado">
        <span>Lucro / Resultado final</span>
        <strong :class="lucro < 0 ? 'negativo' : 'positivo'">
          R$ {{ lucro.toFixed(2) }}
        </strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagina { padding: 30px; }
.pagina > p { color: #888; margin: 10px 0 25px; }
.lista {
  background: white;
  padding: 22px;
  border-radius: 12px;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 20px 5px;
  border-bottom: 1px solid #eee;
}
.resultado { font-size: 18px; }
.positivo { color: #239b65; }
.negativo { color: #d9534f; }
</style>
