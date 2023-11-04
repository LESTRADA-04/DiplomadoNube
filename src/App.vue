<template>
  <HeaderMenu></HeaderMenu>
  <div class="transition-all duration-500 ease-out ml-[300px] pt-10" id="container">
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderMenu from './components/HeaderMenu.vue';

export default {
  name: 'App',
  components: {
    HeaderMenu,
  }
}
</script>

<style>

</style>
