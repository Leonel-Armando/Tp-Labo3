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
          <button>Editar</button><button class="eliminar" @click="Eliminar(movimiento._id)">Eliminar</button>
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
      movimientos:[],
    }
  },
  methods:{
    Eliminar(id) {
      axios.delete(`https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`, {
        headers: {
          'x-apikey': '60eb09146661365596af552f'
        }
      })
      .then((response) => {
        console.log('Movimiento eliminado:', response.data);
        this.TraerHistorial();
      })
      .catch((error) => {
        console.error('Error al eliminar el movimiento:', error);
      });
    },
    async TraerHistorial(){
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

.eliminar{
  background-color: red; 
  color: white;
}
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