<template>
  <router-link :to="to" class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :class="classBg()">
    {{ text }}
  </router-link>
</template>
  
<script>
export default {
  name: 'ButtonLink',
  props: {
    text: {
      type: String,
      required: true, // Marca la propiedad como requerida si es necesario
    },
    to: {
      type: String,
      required: true,
    },
    backgroundColor:{
      type: String,
      required: true
    }
  },
  methods: {
    classBg() {
      return `bg-${this.backgroundColor}-500 hover:bg-${this.backgroundColor}-600`;
    },
  },
};
</script>
  