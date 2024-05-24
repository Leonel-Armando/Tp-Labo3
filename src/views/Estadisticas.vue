<template>
  <div class="grid-layout-inicio">
    <div class="Estadisticas">
      <h2>Estadísticas de Criptomonedas</h2>
      <div v-for="(total, ID) in totales" :key="ID" class="EstadisticaCuadro">
        <h3>{{ ID.toUpperCase() }}</h3>
        <p>Cantidad total: {{ total.crypto_amount }}</p>
        <p>${{ total.money }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  name: 'PaginaDeEstadisticas',
  data() {
    return {
      cuentaActivaID:'',
      movimientos: [],
      totales: {}
    }
  },
  methods: {
    async TraerDatos() {
      const userId = this.cuentaActivaID;
      axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${userId}"}`, {
        headers: {
          'x-apikey': '60eb09146661365596af552f'
        }
      })
      .then((response) => {
        this.movimientos = response.data;
        this.CalcularTotales();
      })
      .catch((error) => {
        console.error('Error al obtener los movimientos', error);
      });
    },
    CalcularTotales() {
      const totales = {};
      this.movimientos.forEach(movimiento => {
        const { crypto_code, crypto_amount, money, action } = movimiento;
        if (!totales[crypto_code]) {
          totales[crypto_code] = {
            crypto_amount: 0,
            money: 0
          };
        }
        if (action === 'purchase') {
          totales[crypto_code].crypto_amount += parseFloat(crypto_amount);
          totales[crypto_code].money += parseFloat(money);
        } else if (action === 'sale') {
          totales[crypto_code].crypto_amount -= parseFloat(crypto_amount);
          totales[crypto_code].money -= parseFloat(money);
        }
      });
      this.totales = totales;
    }
  },
  mounted() {
    this.cuentaActivaID = localStorage.getItem('CuentaActivaID');
    if (this.cuentaActivaID) {
      this.TraerDatos();
    }
  }
}
</script>
  
<style scoped>
@import '@/components/general.css';
.Estadisticas {
  padding: 20px;
}
.Estadisticas h2 {
  margin-bottom: 20px;
}
.EstadisticaCuadro {
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
</style>