<template>
    <span class="absolute text-white text-2xl top-2 left-2 cursor-pointer" @click="openSidebar">
        <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"> Menu</i>
    </span>
    <div
        class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 transition-all duration-500 ease-out translate-x-0">
        <div class="text-gray-100 text-xl">
            <div class="p-2.5 mt-1 flex items-center">
                <img src="@/assets/logo.png" alt="icon" class="w-10">
                <h1 class="font-bold text-gray-200 text-[15px] ml-3">Administrador</h1>
                <i class="bi bi-x cursor-pointer ml-24" @click="openSidebar"></i>
            </div>
            <div class="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
            <i class="bi bi-search text-sm"></i>
            <input type="text" placeholder="Buscar" class="text-[15px] ml-4 w-full bg-transparent focus:outline-none" />
        </div>
        <router-link to="/">
            <div
                class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                <i class="bi bi-bank"></i>
                <span class="text-[15px] ml-4 text-gray-200 font-bold">Listado de hoteles</span>
            </div>
        </router-link>
        <router-link to="/crearHotel">
            <div
                class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                <i class="bi bi-plus-circle"></i>
                <span class="text-[15px] ml-4 text-gray-200 font-bold">Crear hotel</span>
            </div>
        </router-link>
        <div class="my-4 bg-gray-600 h-[1px]"></div>
        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            @click="dropdown">
            <i class="bi bi-people-fill"></i>
            <div class="flex justify-between w-full items-center">
                <span class="text-[15px] ml-4 text-gray-200 font-bold">Integrantes</span>
                <span class="text-sm rotate-180" id="arrow">
                    <i class="bi bi-chevron-down"></i>
                </span>
            </div>
        </div>
        <div class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold" id="submenu">
            <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Steven López
            </h1>
            <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Osnaider julio
            </h1>
            <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Luis estrada
            </h1>
            <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Miguel Palencia
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderMenu',
    mounted() {
        this.dropdown();
    },
    methods: {
        dropdown() {
            document.querySelector("#submenu").classList.toggle("hidden");
            document.querySelector("#arrow").classList.toggle("rotate-0");
            document.querySelector("#arrow").classList.toggle("rotate-180");
        }, openSidebar() {
            document.querySelector(".sidebar").classList.toggle("translate-x-[-100%]");
            document.querySelector("#container").classList.toggle("ml-[0px]");
            document.querySelector("#container").classList.toggle("ml-[300px]");
        }
    },
}

</script>