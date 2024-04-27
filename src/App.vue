<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  
  export default {
    name: 'App',
    components: {
      HelloWorld
    }
  }
</script>

<style>

</style>
<!--
<template>
  <div class="grid-layout">
    <div class="sesion">
      <h1>Bienvenido</h1>
      <h3>Si eres nuevo crea una cuenta</h3>
      <input type="text">
      <input type="password">
      <button @click="irAOtraPagina">registrarse</button>
      <h3>Si ya tienes una inicia sesion</h3>
      <input type="text">
      <input type="password">
      <button href="@/src/views/registro.vue">Iniciar sesion</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    irAOtraPagina() {
      this.$router.push('/registro') 
    }
  }
}
</script>

<style scoped>
@import '@/components/general.css';
.grid-layout{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.sesion{
  border: solid 1px black;
  text-align: center;
  padding: 20px;
  background-color: white;
}
.sesion input {
  display: block;
  margin: 10px auto;
}
</style>
-->