
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')

function cadastrar() {
  if (!nome.value.trim() || !email.value.trim() || !senha.value) {
    alert('Preencha todos os campos!')
    return
  }

  if (senha.value.length < 6) {
    alert('A senha precisa ter pelo menos 6 caracteres!')
    return
  }

  if (senha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem!')
    return
  }

  // Demonstração de cadastro: não armazene senhas em texto puro.
  alert('Cadastro validado! A autenticação será conectada ao backend.')
  router.push('/login')
}
</script>

<template>
  <div class="cadastro">
    <div class="caixa">
      <div class="icone">🍬</div>

      <h1>Criar conta</h1>
      <p>Cadastre-se para acessar o Doce Gestão.</p>

      <form @submit.prevent="cadastrar">
        <label>Nome completo</label>
        <input v-model="nome" type="text" placeholder="Digite seu nome" required />

        <label>E-mail</label>
        <input v-model="email" type="email" placeholder="Digite seu e-mail" required />

        <label>Senha</label>
        <input v-model="senha" type="password" placeholder="Crie uma senha" required />

        <label>Confirmar senha</label>
        <input v-model="confirmarSenha" type="password" placeholder="Repita sua senha" required />

        <button type="submit">Cadastrar</button>
      </form>

      <p class="login">
        Já possui uma conta?
        <RouterLink to="/login">Entrar</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.cadastro {
  min-height: 85vh; display: flex; justify-content: center;
  align-items: center; padding: 20px;
}
.caixa {
  background: white; width: 100%; max-width: 440px;
  padding: 35px; border-radius: 15px;
  border: 1px solid #eeeaf2;
  box-shadow: 0 5px 25px rgba(0,0,0,.04);
}
.icone { font-size: 38px; text-align: center; }
h1 { text-align: center; margin: 15px 0 8px; }
.caixa > p { text-align: center; color: #888; margin-bottom: 25px; }
label { display: block; font-size: 13px; margin: 15px 0 7px; }
input {
  width: 100%; padding: 13px; border: 1px solid #ddd;
  border-radius: 7px; outline: none;
}
input:focus { border-color: #7655a5; }
button {
  width: 100%; padding: 14px; margin-top: 24px;
  background: #7655a5; color: white; border: none;
  border-radius: 7px; cursor: pointer;
}
.caixa .login { margin: 22px 0 0; font-size: 13px; }
.login a { color: #7655a5; font-weight: bold; text-decoration: none; }
</style>
