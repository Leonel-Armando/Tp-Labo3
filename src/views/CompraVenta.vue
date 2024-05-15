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
          <span>Tienes {{ cantidadActual }}. El precio actual es: {{ precioActual }} <br> Valor a pagar: {{ precioCompra }} <br>{{ MSJError }}</span>
        </div>
        <div class="acciones">
          <input @input="CalcularPrecio,ValidarCantidad(CANTCripto)" type="number" v-model="CANTCripto" step="any" class="input">
          <button class="boton" @click="Comprar">comprar</button>
          <button class="boton" @click="Vender">vender</button>
        </div>
      </div>
    </div>
    <button @click="test">test</button>
  </div>
</template>
<CompraVenta :idDeUsuario="idDeUsuario" />
<script>
import axios from 'axios';
export default {
  name: 'PaginaDeMovimientos',
  data() {
    return{
      CriptoElegida: 'btc',
      precioActual: '',
      precioCompra: '',
      CANTCripto: '',
      MSJError:'',
      cuentaActivaID:'',
      preciosCripto: {
        btc: 0,
        eth: 0,
        dai: 0,
        usdt: 0
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
    }
  },
  methods: {
    test(){
      alert()
    },
    FechaActual() {
      const now = new Date();
        const year = now.getFullYear();
        const month = `${now.getMonth() + 1}`.padStart(2, '0');
        const day = `${now.getDate()}`.padStart(2, '0');
        const hour = `${now.getHours()}`.padStart(2, '0');
        const minute = `${now.getMinutes()}`.padStart(2, '0');
        return `${day}-${month}-${year}  ${hour}:${minute}`;
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
        this.cantidadActual = this.preciosCripto[this.CriptoElegida];
    },
    CalcularPrecio (){
      this.precioCompra = this.precioActual * this.CANTCripto
    },
    Comprar(){
      this.ValidarCantidad('CANTCripto');
      if (this.MSJError) { 
        return;
      }
      this.Transaccion.user_id= this.cuentaActivaID;
      this.Transaccion.action= 'purchase';
      this.Transaccion.crypto_code= this.CriptoElegida;
      this.Transaccion.crypto_amount= this.CANTCripto.toString();
      this.Transaccion.money= this.precioCompra.toString();
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
          console.log('Compra exitosa:', response.data);
        })
        .catch((error) => {
          console.error('Error Comprar:', error);
        });
    },
    Vender(){
      this.ValidarCantidad('CANTCripto');
      if (this.MSJError) { 
        return;
      }
    },
    ValidarCantidad(cantidad){
      if (cantidad <= 0) {
        this.MSJError = 'La cantidad debe ser mayor a 0'
      } else if(!cantidad){  
        this.MSJError = 'La cantidad no puede estar vacia';
      } else {
        this.MSJError = '';
      }
    },
  },
  mounted() {
    this.ObtenerPrecios();
    this.cuentaActivaID = localStorage.getItem('CuentaActivaID');
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
