<template>
    <div class="grid-layout">
      <div class="sesion">
        <h1>Bienvenido</h1>
          <h3>Si eres nuevo crea una cuenta</h3>
          <input placeholder="Nombre" type="text" v-model="NombreRegistro" @input="ValidacionNombre('NombreRegistro')">
          <input placeholder="Contraseña" v-model="ContraseñaRegistro" type="password" @input="ValidacionContraseña('ContraseñaRegistro')">
          <p v-if="MSJError.NombreRegistro" style="color: red;">{{ MSJError.NombreRegistro }}</p>
          <p v-if="MSJError.ContraseñaRegistro" style="color: red;">{{ MSJError.ContraseñaRegistro }}</p>
          <p>{{ MSJRegistro }}</p>
          <button @click="RegistrarUsuario" v-if="!Sesion">registrarse</button>
          <h3>Si ya tienes una inicia sesion</h3>
          <input placeholder="Nombre" type="text" v-model="NombreSesion" @input="ValidacionNombre('NombreSesion')">
          <input placeholder="Contraseña" v-model="ContraseñaSesion" type="password" @input="ValidacionContraseña('ContraseñaSesion')">
          <p v-if="MSJError.NombreSesion" style="color: red;">{{ MSJError.NombreSesion }}</p>
          <p v-if="MSJError.ContraseñaSesion" style="color: red;">{{ MSJError.ContraseñaSesion }}</p>
          <p>{{ MSJSesion }}</p>
          <button @click="InicioSesion" v-if="!Sesion">Iniciar sesion</button>
          <button @click="CerrarSesion" v-if="Sesion">Cerrar sesión</button>
      </div>
    </div>
  </template>
  
<script>
 export default { 
  name: 'ManejoDeUsuarios',
  data() {
    return {
      Sesion: false,
      NombreRegistro: '',
      ContraseñaRegistro:'',
      MSJRegistro: '',
      NombreSesion: '',
      ContraseñaSesion:'',
      MSJSesion:'',
      ID:'',
      MSJError: {
        NombreRegistro: '',
        NombreSesion: '',
        ContraseñaRegistro: '',
        ContraseñaSesion: '',
      },
    };
  },
  methods: {

    InicioSesion(){
      this.ValidacionNombre('NombreSesion');
      this.ValidacionContraseña('ContraseñaSesion');

      if (this.MSJError.NombreSesion || this.MSJError.ContraseñaSesion) { 
        return;
      }
    
      const Usuarios = JSON.parse(localStorage.getItem('Usuario')) || [];
      const UsuarioEncontrado = Usuarios.find(usuario => usuario.Nombre === this.NombreSesion && usuario.Contraseña === this.ContraseñaSesion);

      if (!UsuarioEncontrado) {
        this.MSJSesion = 'Usuario y/o contraseña incorrecta';
        return;
      }

      this.MSJSesion = 'Sesión iniciada';
      this.Sesion = true;
      this.ID = UsuarioEncontrado.id;
    },

    RegistrarUsuario() {
      this.ValidacionNombre('NombreRegistro');
      this.ValidacionContraseña('ContraseñaRegistro');

      if (this.MSJError.NombreRegistro || this.MSJError.ContraseñaRegistro) { 
        return;
      }
      this.ID = this.CrearID();
      const Usuario = JSON.parse(localStorage.getItem('Usuario')) || [];
      const Validacion = Usuario.some(Usuario => Usuario.Nombre === this.NombreRegistro);

      if (Validacion) {
        this.MSJRegistro = 'El usuario ya está registrado';
        return;
      }
      else{
        this.MSJRegistro = '¡Usuario registrado correctamente!';
      }

      Usuario.push({ Nombre: this.NombreRegistro, Contraseña: this.ContraseñaRegistro, id: this.ID });
      localStorage.setItem('Usuario', JSON.stringify(Usuario));

      this.NombreRegistro = '';
      this.ContraseñaRegistro = '';
      this.Sesion = true;
    },

    CerrarSesion() {
    this.Sesion = false;
    this.MSJRegistro = '';
    this.MSJSesion = '';
    this.ID = '';
    },

    ValidacionNombre(Nombre) {
      const ValoresValidos = /^[A-Za-z]+$/;

      if (!this[Nombre]) {
        this.MSJError[Nombre] = `El nombre no puede estar vacío.`;
      } else if (!ValoresValidos.test(this[Nombre])) {
        this.MSJError[Nombre] = `El nombre solo debe contener letras.`;
      } else {
        this.MSJError[Nombre] = '';
      }
    },

    ValidacionContraseña(contraseña) {
      if (!this[contraseña]) {
        this.MSJError[contraseña] = `La contraseña no puede estar vacía.`;
      } else {
        this.MSJError[contraseña] = '';
      }
    },

    CrearID() {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let IDGenerado = '';

      for (let i = 0; i < 10; i++) {
        const IDAleatorio = Math.floor(Math.random() * caracteres.length);
        IDGenerado += caracteres.charAt(IDAleatorio);
      }

      return IDGenerado;
    },

  },
}
</script>
  
<style>
@import '@/components/general.css';
.grid-layout{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.sesion{
  border: solid 1px black;
  text-align: center;
  padding: 20px;
  background-color: white;
}
.sesion input {
  display: block;
  margin: 10px auto;
}
</style>