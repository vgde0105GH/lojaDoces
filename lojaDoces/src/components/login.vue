<script lang="ts" setup></script>
<template>
    <div>
        <h1>Login</h1>
        <h2>Please enter your credentials</h2>
        <p>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
        </p>
        <p>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" />
        </p>
        <button type="submit">Login</button>
    </div>
</template>
<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;

        background-color: #351baa;
    }
</style>