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
          <span>Tienes x. El precio actual es: {{ precioActual }} <br> Valor a pagar: {{ precioCompra }} <br>{{ MSJError }}</span>
        </div>
        <div class="acciones">
          <input @input="CalcularPrecio,ValidarCantidad(CANTCripto)" type="number" v-model="CANTCripto" step="any" class="input">
          <button class="boton" @click="Comprar">comprar</button>
          <button class="boton" @click="Vender">vender</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
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
    }
  },
  methods: {
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
      this.precioCompra = this.precioActual * this.CANTCripto
    },
    Comprar(){
      this.ValidarCantidad();
    },
    Vender(){
      this.ValidarCantidad();
    },
    ValidarCantidad(cantidad){
      if (cantidad === 0) {
        this.MSJError = 'La cantidad no puede ser 0'
      } else if(!cantidad){  
        this.MSJError = `La cantidad no puede estar vacia.`;
      } else {
        this.MSJError = '';
      }
    },
    ApiClient() {
        return axios.create({
          baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
          headers: {'x-apikey': '60eb09146661365596af552f'},
          //baseURL: 'https://labor3-d60e.restdb.io/rest/',
          //headers: {'x-apikey':'64a2e9bc86d8c525a3ed8f63'},
          //baseURL: 'https://laboratorio3-5459.restdb.io/rest',
          //headers: {'x-apikey':'64a57c2b86d8c50fe6ed8fa5'},
          //baseURL: 'https://laboratorio-36cf.restdb.io/rest',
          //headers: {'x-apikey':'64a5ccf686d8c5d256ed8fce'},
          //baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
          //headers: {'x-apikey':'64bdbc3386d8c5613ded91e7'},
          //baseURL: 'https://laboratorio-ab82.restdb.io/rest',
          //headers: {'x-apikey':'650b525568885487530c00bb'},
          //baseURL: 'https://laboratorio-afe2.restdb.io/rest',
          //headers: {'x-apikey':'650b53356888544ec60c00bf'},
        });
      },
  },
  mounted() {
    this.ObtenerPrecios();
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
