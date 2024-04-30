  <template>
    <div class="encabezado">
      <nav>
        <router-link class="links" to="/">Registro o inicio de sesion</router-link>
        <router-link class="links" to="/CompraVenta">Compra y Venta de criptomonedas</router-link> 
        <router-link class="links" to="/Historial">Historial de transacciones</router-link>
        <router-link class="links" to="/Estadisticas">Estadisticas</router-link> 
      </nav>
    </div>
    <router-view></router-view>
    </template>
<script>
export default {
  name: 'PaginaDeInicio',
}
</script>

<style scoped>
@import '@/components/general.css';
.links{
  margin-left: 100px;
}
nav {
  padding: 0px;
  padding-right: 100px;
}
nav a.router-link-exact-active {
  color: black;
}
.encabezado { 
grid-area: header; 
background-color: white;
}

</style>