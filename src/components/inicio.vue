<template>
  <div>
    <div class="encabezado">
      <nav>
        <img src="@/assets/Logo.png" class="logo">
        <router-link class="links" to= "/Estadisticas">Estadisticas</router-link> 
        <router-link class="links" to= "/Historial">Historial de transacciones</router-link>
        <router-link class="links" to= "/CompraVenta">Compra y Venta</router-link> 
        <router-link class="registro" to= "/">ACCEDER <img src="@/assets/Persona.png" class="persona"></router-link>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'PaginaDeInicio',
  }
</script>

<style scoped>
@import '@/components/general.css';
.logo{
  background-color: #D5E5FE;
  width: 200px;
  height: 150px;
}
.persona{
  width: 50px;
  height: 40px;
  margin-left: 40px;
}
.links{
  margin-left: 80px;
  font-size: 18px;
  text-decoration: none;
}
.registro{
  display: flex;
  align-items: center;
  margin-left: 100px;
  background-color: white;
  padding-top: 20px ;
  padding-bottom: 20px;
  padding-left: 30px;
  font-family: 'nunito', Arial, sans-serif;
  font-size: 19px;
  text-decoration: none;
}
nav {
  display: flex;
  align-items: center;
  background-color: #D5E5FE;
  padding-right: 70px;
  padding-top: 5px ;
}
nav a.router-link-exact-active {
  color: black;
}
.encabezado { 
  grid-area: header; 
  background-color: white;
}
</style>