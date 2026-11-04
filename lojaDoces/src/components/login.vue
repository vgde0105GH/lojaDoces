<script lang="ts" setup></script>

<template>
    <form>
        <div class="login-container">
            <div class="login-box">
                <h1>Login</h1>
                <h2>Coloque suas Informações para Entrar</h2>

                <p>
                    <label for="username">E-mail:</label>
                    <input
                       type="email"
                       id="username"
                       name="username"
                       placeholder="Digite seu e-mail"
                    />
                </p>

                <p>
                    <label for="password">Senha:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Digite sua senha"
                    />
                </p>

                <button type="submit">Login</button>
            </div>    
        </div>
    </form>
</template>

<style scoped>
form 
{
    margin: 0;
    font-family: Arial, sans-serif;
}

.login-container 
{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #df66df;
}

.login-box 
{
    display: flex;
    flex-direction: column;
    width: 340px;
    padding: 35px;
    background-color: white;
    color: #333;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.login-box h1 
{
    text-align: center;
    font-size: 32px;
    margin: 0 0 10px;
}

.login-box h2 
{
    text-align: center;
    font-size: 15px;
    font-weight: normal;
    margin-bottom: 25px;
}

.login-box p 
{
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0 0 18px;
}

.login-box label 
{
    font-size: 14px;
}

.login-box input 
{
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    font-size: 14px;
}

.login-box input:focus 
{
    border-color: #df66df;
}

.login-box button 
{
    padding: 12px;
    background-color: #df66df;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
}

.login-box button:hover 
{
    background-color: #c44bc4;
}
</style>