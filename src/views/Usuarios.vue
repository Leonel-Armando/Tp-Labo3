<template>
    <div class="grid-layout">
      <div class="sesion">
        <h1>Bienvenido</h1>
          <h3>Si eres nuevo crea una cuenta</h3>
          <input type="text">
          <input type="password">
          <button @click="irAInicio">registrarse</button>
          <h3>Si ya tienes una inicia sesion</h3>
          <input type="text">
          <input type="password">
          <button @click="irAInicio">Iniciar sesion</button>
      </div>
    </div>
  </template>
  
<script>
 export default { 
  name: 'ManejoDeUsuarios',
  methods: {
    irAInicio() {
      this.$router.push("/inicio")
      this.mostrar= false; 
    }
  }
}
</script>
  
<style>
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