
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nome = ref('')
const email = ref('')
const senha = ref('')

function cadastrar() {
  if (!nome.value.trim() || !email.value.trim() || senha.value.length < 6) {
    alert('Preencha os campos corretamente. A senha deve ter 6 caracteres ou mais.')
    return
  }

  alert('Cadastro validado com sucesso!')
  router.push('/login')
}
</script>

<template>
  <div class="cadastro">
    <form @submit.prevent="cadastrar">
      <h1>🍬 Criar conta</h1>
      <p>Cadastre-se no Doce Gestão.</p>

      <input v-model="nome" placeholder="Nome completo" required />
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="senha" type="password" placeholder="Senha (mínimo 6 caracteres)" required />

      <button>Cadastrar</button>

      <RouterLink to="/login">Já tenho uma conta</RouterLink>
    </form>
  </div>
</template>

<style scoped>
.cadastro {
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: 20px;
}
form {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
}
p { color: #888; margin: 12px 0 20px; }
input {
  width: 100%;
  padding: 13px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
}
button {
  width: 100%;
  padding: 13px;
  background: #7655a5;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  margin-bottom: 18px;
}
a { color: #7655a5; text-decoration: none; }
</style>
