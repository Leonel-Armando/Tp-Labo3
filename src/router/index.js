import { createRouter, createWebHistory } from "vue-router"
import CompraVenta from "@/views/CompraVenta.vue"
import Usuarios from "@/views/Usuarios.vue"
import Historial from "@/views/Historial.vue"
import Estadisticas from "@/views/Estadisticas.vue"

const routes = [
  {
    path: "/",
    name: "manejo de usuarios",
    component: Usuarios,
  },
  {
    path: "/Historial",
    name: "Historial de movimientos",
    component: Historial,
  },
  {
    path: "/Estadisticas",
    name: "Estadisticas de movimientos",
    component: Estadisticas,
  },
  {
    path: "/CompraVenta",
    name: "pagina de compra y venta",
    component: CompraVenta,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router