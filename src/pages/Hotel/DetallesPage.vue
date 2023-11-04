<template>
    <layautPage title="Detalles del
            hotel">
        <!-- Formulario -->
        <form class="px-8 pt-6 pb-8 mb-4 w-full">
            <div class="mb-4">
                <div class="grid grid-flow-row md:grid-flow-col gap-3">
                    <!-- NIT -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="nit" class="block mb-2 text-sm font-medium text-gray-900">NIT</label>
                        <input type="text" name="nit" id="nit" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="nit">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.nit }}</p>
                    </div>
                    <!-- Nombre -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                        <input type="text" name="name" id="name" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="name">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.name }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div class="grid grid-flow-row md:grid-flow-col gap-3">
                    <!-- Ciudad -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="city_id" class="block mb-2 text-sm font-medium text-gray-900">Ciudad</label>
                        <select name="city_id" id="city_id" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="city_id">
                            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                        </select>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.city_id }}</p>
                    </div>
                    <!-- Dirección -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Dirección</label>
                        <input type="text" name="address" id="address" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="address">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.address }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div class="grid grid-flow-row md:grid-flow-col gap-3">
                    <!-- Número de habitaciones -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="num_rooms" class="block mb-2 text-sm font-medium text-gray-900">Número máximo de
                            habitaciones</label>
                        <input type="number" name="num_rooms" id="num_rooms" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="num_rooms">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.num_rooms }}</p>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <ButtonLink text="Regresar" backgroundColor="blue" to="/"></ButtonLink>
                <ButtonLink text="Habitaciones" backgroundColor="yellow" :to="'Habitaciones/' + this.id"></ButtonLink>
            </div>
        </form>
    </layautPage>
</template>
<script>
import LayautPage from "@/components/LayautPage.vue";
import ButtonLink from "@/components/ButtonLink.vue";
import axios from "axios"; // Importa Axios

export default {
    components: {
        LayautPage,
        ButtonLink
    },
    data() {
        return {
            id: this.$route.params.id, // Obtén el ID del hotel desde los parámetros de la ruta
            cities: [],  // Arreglo para almacenar las ciudades
            city_id: null,
            name: "",
            nit: "",
            address: "",
            num_rooms: null,
            errorMessages: {
                city_id: "",
                name: "",
                nit: "",
                address: "",
                num_rooms: "",
            },
        }
    },
    mounted() {
        // Realiza la solicitud GET a la API de ciudades al cargar el componente
        this.fetchCities();
    },
    methods: {
        fetchCities() {
            // Realiza la solicitud GET a la API de ciudades
            axios.get("http://146.190.32.176/diplomado/api/cities")
                .then((response) => {
                    this.cities = response.data; // Almacena las ciudades en el arreglo 'cities'
                })
                .catch((error) => {
                    console.error("Error al cargar las ciudades:", error);
                });
        },
        async loadHotelData() {
            try {
                // Realiza una solicitud GET a la API para cargar los datos del hotel
                const response = await axios.get(`http://146.190.32.176/diplomado/api/hotels/${this.id}`);

                // Establece los datos del hotel en el formulario
                const hotelData = response.data.data;
                this.city_id = hotelData.city_id;
                this.name = hotelData.name;
                this.nit = hotelData.nit;
                this.address = hotelData.address;
                this.num_rooms = hotelData.num_rooms;
            } catch (error) {
                // Maneja el error si la solicitud falla
                console.error("Error al cargar los datos del hotel", error);
            }
        },
    },
    created() {
        // Carga los datos del hotel cuando se crea el componente
        this.loadHotelData();
    },
}
</script>