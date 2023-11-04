<template>
  <router-link :to="generateRoute(id)"
    class="p-1 rounded flex items-center justify-center w-8 font-medium text-white ml-2" :class="backgroundColor">
    <i class="bi" :class="iconClass"></i>
  </router-link>
</template>
  
<script>
export default {
  name: 'IconLink',
  props: {
    id: Number,
    routePrefix: String, // Prefijo común para las rutas
    iconClass: String, // Clase CSS para el ícono
    backgroundColor: String, // Clase CSS para el fondo del enlace
  },
  methods: {
    generateRoute(id) {
      // Genera la ruta completa utilizando el prefijo y el id
      console.log(id)
      return `/${this.routePrefix}/${id}`;
    },
  },
};
</script>
  