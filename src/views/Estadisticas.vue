<template>
  <h2 v-if="!cuentaActivaID">Inicie sesion</h2>
  <div v-if="cuentaActivaID" class="grid-layout-inicio">
    <div class="Estadisticas">
      <h2>Estadísticas de Criptomonedas</h2>
      <h3>Saldo actual ${{ dinero }}</h3>
      <h3 v-if="movimientos.length === 0">Sin movimientos registrados</h3>
      <div v-for="(movimiento, index) in movimientosAgrupados" :key="index" class="EstadisticaCuadro">  
        <h3>{{ movimiento.crypto_code }}</h3> 
        <span>Cantidad actual: {{ movimiento.crypto_amount }}</span><br>
        <span>valor de ${{ movimiento.money }}</span><br>
        <h3>resultado de su inversion</h3>
        <p v-if="movimiento.resultado >= 0" class="ganancia">ganancia de ${{ movimiento.resultado.toFixed(2) }}</p>
        <p v-if="movimiento.resultado < 0" class="perdida">perdida de ${{ Math.abs(movimiento.resultado).toFixed(2) }}</p>
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
      movimientosAgrupados: [],
      dinero: 0,
    }
  },
  methods: {
    async TraerDatos() {
      const userId = this.cuentaActivaID;
      try {
        const response = await axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${userId}"}`, {
          headers: {
            'x-apikey': '60eb09146661365596af552f',
          },
        });
        this.movimientos = response.data;
        this.agruparMovimientos();
      } catch (error) {
        console.error('Error al obtener los movimientos', error);
      }
    },
    async ObtenerPrecios(cripto) {
      try {
        const response = await axios.get(`https://criptoya.com/api/argenbtc/${cripto}/ars/1`);
        return response.data.ask;
      } catch (error) {
        console.error('Error al obtener los precios:', error);
        return null;
      }
    },
    async agruparMovimientos() {
      const agrupados = {};
      for (const movimiento of this.movimientos) {
        const { crypto_code, crypto_amount, money, action } = movimiento;
        if (!agrupados[crypto_code]) {
          agrupados[crypto_code] = {
            crypto_code,
            crypto_amount: 0,
            money: 0,
            resultado: 0,
          };
        }
        if (action === 'purchase') {
          agrupados[crypto_code].crypto_amount += parseFloat(crypto_amount);
          agrupados[crypto_code].money += parseFloat(money);
        } else if (action === 'sale') {
          agrupados[crypto_code].crypto_amount -= parseFloat(crypto_amount);
          agrupados[crypto_code].money -= parseFloat(money);
          agrupados[crypto_code].resultado += parseFloat(money);
        }
        this.dinero += parseInt(money)
      }

      for (const code in agrupados) {
        const precioActual = await this.ObtenerPrecios(code);
        if (precioActual !== null) {
          const currentValue = agrupados[code].crypto_amount * precioActual;
          agrupados[code].resultado += currentValue - agrupados[code].money;
        }
      }

      this.movimientosAgrupados = Object.values(agrupados);
    },
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
.ganancia {
  color: green;
}
.perdida {
  color: red;
}
</style>