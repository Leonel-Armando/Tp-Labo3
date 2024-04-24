<template>
  <div class="grid-layout">
     <div class="sesion">
      <h1>bienvenido</h1>
      <h2>Si eres nuevo registrece por favor</h2>
      <input type="text">
      <input type="password">
      <button>Registrarce</button>
      <h2>inicie sesion si ya tiene una cuenta</h2>
      <input type="text">
      <input type="password">
      <button>Iniciar sesion</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>

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
}
.sesion input {
  display: block;
  margin: 10px auto;
}
</style>
