import { createRouter, createWebHistory } from "vue-router"
import registro from "../views/registro.vue"

const routes = [
  {
    path: "/",
    name: "pagina de registro",
    component: registro,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router