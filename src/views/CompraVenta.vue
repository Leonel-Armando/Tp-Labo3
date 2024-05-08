<template>
  <div class="grid-layout-inicio">
    <div class="caja">
      <h3>Elija la criptomoneda que desee comprar o vender</h3>
      <div class="cripto">
        <span>cripto 1</span>   
        <div class="acciones">
          <input type="number" placeholder="Cantidad a comprar" id="CANTCompra1">
          <button>comprar por</button>$$$
        </div>
        <span>posees x cantidad</span>
        <div class="acciones">
          <input type="number" placeholder="Cantidad a vender" id="CANTVenta1">
          <button>vender por</button>$$$
        </div>
      </div>
      <div class="cripto">
        <span>cripto 2</span>   
        <div class="acciones">
          <input type="number" placeholder="Cantidad a comprar" id="CANTCompra2">
          <button>comprar por</button>$$$
        </div>
        <span>posees x cantidad</span>
        <div class="acciones">
          <input type="number" placeholder="Cantidad a vender" id="CANTVenta2">
          <button>vender por</button>$$$
        </div>
      </div><div class="cripto">
        <span>cripto 3</span>   
        <div class="acciones">
          <input type="number" placeholder="Cantidad a comprar" id="CANTCompra3">
          <button>comprar por</button>$$$
        </div>
        <span>posees x cantidad</span>
        <div class="acciones">
          <input type="number" placeholder="Cantidad a vender" id="CANTVenta3">
          <button>vender por</button>$$$
        </div>
      </div><div class="cripto">
        <span>cripto 4</span>   
        <div class="acciones">
          <input type="number" placeholder="Cantidad a comprar" id="CANTCompra4">
          <button>comprar por</button>$$$
        </div>
        <span>posees x cantidad</span>
        <div class="acciones">
          <input type="number" placeholder="Cantidad a vender" id="CANTVenta4">
          <button>vender por</button>$$$
        </div>
      </div>
    </div>
  </div>
  </template>
  
<script>
export default {
  name: 'PaginaDeMovimientos',
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
  margin-top: 20px;
  background-color: white;
  text-align: center;
  border: solid 1px black;
  width: 80%;
}
.cripto {
  border-top: solid 1px black;
  padding: 10px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-gap: 10px;
}
.acciones {
  grid-column: 2;
  display: flex;
  justify-content: flex-end;
}
</style>