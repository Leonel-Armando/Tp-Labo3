<template>
    <div class="grid-layout-inicio">
      <div class="caja">
        <h3>Elija la criptomoneda que desee comprar o vender</h3>
        <div class="cripto">
          <select v-model="CriptoElegida" @change="ObtenerPrecios" class="SelectCriptos">
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
            <option value="dai">DAI</option>
            <option value="usdt">USDT</option>
          </select>
          <div class="precios">
            <span>Tienes {{ CantCripto[CriptoElegida] }} el precio actual es: {{ precioActual }} <br> Valor a pagar: {{ precioCompra }} <br>{{ MSJError }}</span>
          </div>
          <div class="acciones">
            <input @input="ValidarCantidad(CantAUsar)" type="number" v-model.number="CantAUsar" step="any" class="input">
          <button class="boton" @click="Comprar">comprar</button>
          <button class="boton" @click="Vender">vender</button>
        </div>
      </div>
    </div>
    <h4>{{ resultado }}</h4>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'PaginaDeMovimientos',
  data() {
    return{
      CriptoElegida: '',
      precioActual: '',
      precioCompra: '',
      CantAUsar: '',
      MSJError:'',
      cuentaActivaID:'',
      CantCripto: {
        btc: 0,
        eth: 0,
        dai: 0,
        usdt: 0,
      },
      cantidadActual: 0,
      Transaccion : {
        user_id: null,
        action: null,
        crypto_code: null,
        crypto_amount: null,
        money: null,
        datetime: null,
      },
      datos:[],
      resultado:'',
    }
  },
  watch: {
    CantAUsar() {
      this.CalcularPrecio(); 
    }
  },
  methods: {
    FechaActual() {
      const now = new Date();
      const year = now.getFullYear();
      const month = `${now.getMonth() + 1}`.padStart(2, '0');
      const day = `${now.getDate()}`.padStart(2, '0');
      const hour = `${now.getHours()}`.padStart(2, '0');
      const minute = `${now.getMinutes()}`.padStart(2, '0');
      return `${day}-${month}-${year}  ${hour}:${minute}`;
    },
    async ActualizarCantidad(){
      let cantidades = {
        btc: 0,
        eth: 0,
        dai: 0,
        usdt: 0,
      };
      for(let i = 0; i < this.datos.length; i++){
        const transaccion = this.datos[i];
        if (transaccion.action === 'purchase') {
          cantidades[transaccion.crypto_code] += transaccion.crypto_amount;
        } else if (transaccion.action === 'sale') {
          cantidades[transaccion.crypto_code] -= transaccion.crypto_amount;
        }
      }
      this.CantCripto = { ...cantidades };
    },
    ObtenerPrecios() {
      axios.get(`https://criptoya.com/api/argenbtc/${this.CriptoElegida}/ars/1`)
      .then(response => {
        this.precioActual = response.data.ask;
        this.CalcularPrecio();
      })
      .catch(error => {
        console.error('Error al obtener los precios:', error);
      });
      
    },
    CalcularPrecio (){
      this.precioCompra = this.precioActual * this.CantAUsar
      this.ActualizarCantidad()
    },
    Comprar(){
      this.ValidarCantidad('CantAUsar');
      if (this.MSJError) { 
        return;
      }
      this.Transaccion.user_id= this.cuentaActivaID;
      this.Transaccion.action= 'purchase';
      this.Transaccion.crypto_code= this.CriptoElegida;
      this.Transaccion.crypto_amount= this.CantAUsar;
      this.Transaccion.money= this.precioCompra;
      this.Transaccion.datetime= this.FechaActual();
      
      if(!this.Transaccion.user_id){  
        alert('Error el usuario esta vacio')
        return
      }
      if(!this.Transaccion.crypto_code){  
        alert('Error la cripto esta vacia')
        return
      }
      if(!this.Transaccion.crypto_amount){  
        alert('Error la cantidad de cripto esta vacia')
        return
      }
      if(!this.Transaccion.money){  
        alert('Error el monto esta vacio')
        return
      }
      if(!this.Transaccion.datetime){  
        alert('Error la fecha esta vacia')
        return
      }
      axios.post('https://laboratorio3-f36a.restdb.io/rest/transactions', this.Transaccion, {
        headers: {
          'x-apikey': '60eb09146661365596af552f',
        },
      })
      .then((response) => {
        console.log('Compra exitosa:', response.data);
        this.resultado = 'Compra exitosa'
      })
      .catch((error) => {
        console.error('Error al Comprar:', error);
      });
    },
    Vender(){
      this.ValidarCantidad('CantAUsar');
      if (this.MSJError) { 
        return;
      }
      if (this.CantCripto[this.CriptoElegida] < this.CantAUsar){
        console.log('Error al vender')
        return
      }
      this.Transaccion.user_id= this.cuentaActivaID;
      this.Transaccion.action= 'sale';
      this.Transaccion.crypto_code= this.CriptoElegida;
      this.Transaccion.crypto_amount= this.CantAUsar;
      this.Transaccion.money= this.precioCompra;
      this.Transaccion. datetime= this.FechaActual();
      
      if(!this.Transaccion.user_id){  
        alert('Error el usuario esta vacio')
        return
      }
      if(!this.Transaccion.crypto_code){  
        alert('Error la cripto esta vacia')
        return
      }
      if(!this.Transaccion.crypto_amount){  
        alert('Error la cantidad de cripto esta vacia')
        return
      }
      if(!this.Transaccion.money){  
        alert('Error el monto esta vacio')
        return
      }
      if(!this.Transaccion.datetime){  
        alert('Error la fecha esta vacia')
        return
      }
      axios.post('https://laboratorio3-f36a.restdb.io/rest/transactions', this.Transaccion, {
        headers: {
          'x-apikey': '60eb09146661365596af552f',
        },
      })
      .then((response) => {
        console.log('Venta exitosa', response.data);
        this.resultado = 'Venta exitosa'
      })
      .catch((error) => {
        console.error('Error al vender', error);
      });
    },
    ValidarCantidad(cantidad){
      if (cantidad <= 0) {
        this.MSJError = 'La cantidad debe ser mayor a 0';
      } else if(!cantidad){  
        this.MSJError = 'La cantidad no puede estar vacia';
      } else {
        this.MSJError = '';
      }
    },
    TraerDatos(){
      const userId = this.cuentaActivaID;
      axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${userId}"}`, {
        headers: {
          'x-apikey': '60eb09146661365596af552f'
        }
      })
      .then((response) => {
        this.datos = response.data;
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error);
      })
    },
  },
  mounted() {
    this.ObtenerPrecios();
    this.cuentaActivaID = localStorage.getItem('CuentaActivaID');
    this.TraerDatos();
  }
}

</script>

<style scoped>
@import '@/components/general.css';
.grid-layout-inicio {
  display: flex;
  flex-direction: column; 
  align-items: center; 
}
.caja {
  margin-top: 60px;
  background-color: white;
  text-align: center;
  border: solid 1px black;
  width: 70%;
}
.cripto {
  border-top: solid 1px black;
  padding: 10px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; 
  grid-gap: 10px;
}
.acciones {
  grid-column: 3;
  display: flex;
  justify-content: flex-end;
}
.precios {
  grid-column: 2;
  display: flex;
}
.input{
  margin-left: 30px;
  margin-right: 3px;
  width: 60px;
}
.boton{
  margin-right: 3px;
}
.SelectCriptos{
  width: 150px;
}
</style>
