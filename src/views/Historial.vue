<template>
  <div class="grid-layout-inicio">
    <div class="historial">
      <h2>Historial de Movimientos</h2>
      <ul>
        <li v-for="movimiento in movimientos" :key="movimiento._id">
          <p><strong>Criptomoneda:</strong> {{ movimiento.crypto_code }}</p>
          <p><strong>Cantidad:</strong> {{ movimiento.crypto_amount }}</p>
          <p><strong>Valor:</strong> {{ movimiento.money }}</p>
          <p><strong>Accion:</strong> {{ traducirAccion(movimiento.action) }}</p>
          <p><strong>Fecha:</strong> {{ new Date(movimiento.datetime).toLocaleString() }}</p>
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HistorialDeMovimientos',
  data(){
    return{
      cuentaActivaID:'',
      movimientos:[]
    }
  },
  methods:{
    TraerHistorial(){
      const userId = this.cuentaActivaID;
      axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${userId}"}`, {
        headers: {
          'x-apikey': '60eb09146661365596af552f'
        }
      })
      .then((response) => {
        this.movimientos = response.data;
      })
      .catch((error) => {
        console.error('Error al obtener los movimientos', error);
      })
    },
    traducirAccion(action) {
      if (action === 'purchase') return 'compra';
      if (action === 'sale') return 'venta';
      return action;
    }
  },
  mounted() {
    this.cuentaActivaID = localStorage.getItem('CuentaActivaID');
    if (this.cuentaActivaID) {
      this.TraerHistorial();
    }
  }
}
</script>

<style scoped>
@import '@/components/general.css';

.historial {
  padding: 20px;
}

.historial h2 {
  margin-bottom: 20px;
}

.historial ul {
  list-style-type: none;
  padding: 0;
}

.historial li {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}

.historial p {
  margin: 5px 0;
}
</style>