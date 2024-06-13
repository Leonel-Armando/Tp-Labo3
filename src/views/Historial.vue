<template>
  <h2 v-if="!cuentaActivaID">Inicie sesion</h2>
  <div v-if="cuentaActivaID" class="grid-layout-inicio">
    <div class="historial">
      <h2>Historial de Movimientos</h2>
      <h2 v-if="movimientos.length === 0">Sin movimientos registrados</h2>
      <ul>
        <li v-for="movimiento in movimientos" :key="movimiento._id">
          <span><strong>Criptomoneda:</strong>{{ movimiento.crypto_code }}</span><br>
          <span><strong>Cantidad:</strong>{{ movimiento.crypto_amount }}</span> 
          <span class="NuevaCantidad" v-if="movimientoEnEdicion === movimiento._id"><strong>Nueva cantidad:</strong></span>
          <input class="NuevaCantidadInput" v-if="movimientoEnEdicion === movimiento._id" type="number" v-model.number="ValorNuevo"><br>
          <span><strong>Valor:</strong>{{ movimiento.money }}</span>
          <span class="Error">{{ ErrorEdicion }} </span><br>
          <span><strong>Acción:</strong>{{ traducirAccion(movimiento.action) }}</span><br>
          <span><strong>Fecha:</strong>{{ formatFecha(movimiento.datetime) }}</span><br>
          <button v-if="movimientoEnEdicion !== movimiento._id" class="eliminar" @click="Eliminar(movimiento._id)">Eliminar</button>
          <button v-if="movimientoEnEdicion !== movimiento._id" @click="Editar(movimiento._id)">Editar</button>
          <button v-if="movimientoEnEdicion === movimiento._id" class="eliminar" @click="Cancelar">Cancelar</button>
          <button v-if="movimientoEnEdicion === movimiento._id" @click="GuardarEdicion(movimiento)">Guardar</button>
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
      movimientoEnEdicion: null,
      ValorNuevo: '',
      CantCripto: {
        btc: 0,
        eth: 0,
        dai: 0,
        usdt: 0,
      },
      ErrorEdicion:'',
      PrecioTotal: null,
      NuevoPrecio: null,
    }
  },
  methods:{
    Editar(id) {
      this.movimientoEnEdicion = id;
    },
    Cancelar() {
      this.movimientoEnEdicion = null;
      this.ValorNuevo = '';
    },
    async GuardarEdicion(movimiento) {
      if (this.ValorNuevo === '') {
        this.ErrorEdicion = 'Ingrese un valor';
        return;
      }
      try {
        await this.ObtenerPrecios(movimiento.crypto_code);
        this.NuevoPrecio = this.PrecioTotal * this.ValorNuevo;
        if (movimiento.action === 'purchase') {
          await axios.patch(`https://laboratorio3-f36a.restdb.io/rest/transactions/${movimiento._id}`, {
            crypto_amount: this.ValorNuevo,
            money: this.NuevoPrecio,
          }, {
            headers: {
              'x-apikey': '60eb09146661365596af552f'
            }
          });
        } else if (movimiento.action === 'sale') {
          this.TraerCantidades();
          if (this.CantCripto[movimiento.crypto_code] >= this.ValorNuevo) {
            await axios.patch(`https://laboratorio3-f36a.restdb.io/rest/transactions/${movimiento._id}`, {
              crypto_amount: this.ValorNuevo,
              money: this.NuevoPrecio,
            }, {
              headers: {
                'x-apikey': '60eb09146661365596af552f'
              }
            });
          } else {
            this.ErrorEdicion = `No tienes suficientes ${movimiento.crypto_code}`;
            return;
          }
        } else {
          this.ErrorEdicion = 'Error desconocido';
          return;
        }
        this.TraerHistorial();
        this.movimientoEnEdicion = null;
        this.ValorNuevo = '';
      } catch (error) {
        console.error('Error al editar el movimiento:', error);
      }
    },
    TraerCantidades(){
      let cantidades = {
        btc: 0,
        eth: 0,
        dai: 0,
        usdt: 0,
      };
      for(let i = 0; i < this.movimientos.length; i++){
        const transaccion = this.movimientos[i];
        if (transaccion.action === 'purchase') {
          cantidades[transaccion.crypto_code] += transaccion.crypto_amount;
        } else if (transaccion.action === 'sale') {
          cantidades[transaccion.crypto_code] -= transaccion.crypto_amount;
        }
      }
      this.CantCripto = { ...cantidades };
    },
    formatFecha(datetime) {
      const fecha = new Date(datetime);
      if (isNaN(fecha.getTime())) {
        console.error('Fecha inválida:', datetime);
        return 'Fecha inválida';
      }
      return fecha.toLocaleString();
    },
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
    },
    async ObtenerPrecios(cripto) {
      try {
        const response = await axios.get(`https://criptoya.com/api/argenbtc/${cripto}/ars/1`);
        this.PrecioTotal = response.data.ask;
      } catch (error) {
        console.error('Error al obtener los precios:', error);
      }
    },
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
.Error{
  color: red;
  margin-left: 10%; 
}
.NuevaCantidad {
  margin-left: 10%; 
}
.NuevaCantidadInput {
  width: 50px;
  margin-left: 5px;
}
.historial {
  padding: 20px;
}
.historial span {
  font-family: "Nunito", sans-serif;
}
.historial h2 {
  margin-bottom: 20px;
}
.historial li {
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
}
.historial ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  list-style-type: none;
  padding: 0;
}
.historial li {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>