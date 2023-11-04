import { createRouter, createWebHistory } from 'vue-router'

import InicioPage from '@/pages/InicioPage.vue'
import DetallesPage from '@/pages/Hotel/DetallesPage.vue';
import CrearHotelPage from '@/pages/Hotel/CrearHotelPage.vue';
import EditarHotelPage from '@/pages/Hotel/EditarHotelPage.vue';
import InformePage from '@/pages/Hotel/InformePage.vue';
import HabitacionesPage from '@/pages/Habitaciones/HabitacionesPage.vue';
import CrearHabitacionPage from '@/pages/Habitaciones/CrearHabitacionPage.vue';
import EditarHabitacionPage from '@/pages/Habitaciones/EditarHabitacionPage.vue';

const routes = [
    {path: '/', name:'InicioPage', component: InicioPage},
    {path: '/detallesHoteles/:id', name:'DetallesPage', component: DetallesPage},
    {path: '/crearHotel', name:'CrearHotelPage', component: CrearHotelPage},
    {path: '/editarHotel/:id', name:'EditarHotelPage', component: EditarHotelPage},
    {path: '/informe/:id', name:'InformePage', component: InformePage},
    {path: '/detallesHoteles/Habitaciones/:id', name:'HabitacionesPage', component: HabitacionesPage},
    {path: '/detallesHoteles/Habitaciones/CrearHabitacion/:id', name:'CrearHabitacionPage', component: CrearHabitacionPage},
    {path: '/detallesHoteles/Habitaciones/editar/:id', name:'EditarHabitacionPage', component: EditarHabitacionPage},
];


const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router
