
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

    const usuario = {
        nome: nome.value.trim(),
        email: email.value.trim().toLowerCase(),
        senha: senha.value
    }

    localStorage.setItem('loja-doces-usuario', JSON.stringify(usuario))

    alert('Cadastro realizado com sucesso!')

    router.push('/login')
}
</script>

<template>
    <div class="cadastro">
        <form @submit.prevent="cadastrar">
            <h1>🍬 Criar conta</h1>
            <p>Cadastre-se no Doce Gestão.</p>

            <input
                v-model="nome"
                type="text"
                placeholder="Nome completo"
                required
            />

            <input
                v-model="email"
                type="email"
                placeholder="E-mail"
                required
            />

            <input
                v-model="senha"
                type="password"
                placeholder="Senha (mínimo 6 caracteres)"
                minlength="6"
                required
            />

            <button type="submit">Cadastrar</button>

            <RouterLink to="/login">
                Já tenho uma conta
            </RouterLink>
        </form>
    </div>
</template>

<style scoped>
.cadastro {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 20px;
    background-color: #df66df;
}

form {
    background: white;
    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
}

p {
    color: #888;
    margin: 12px 0 20px;
}

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
    background: #df66df;
    color: white;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    margin-bottom: 18px;
}

button:hover {
    background: #c44bc4;
}

a {
    color: #c44bc4;
    text-decoration: none;
}
</style>
