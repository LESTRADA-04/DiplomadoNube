<template>
    <layautPage title="Crear hotel">

        <!-- Formulario -->
        <form class="px-8 pt-6 pb-8 mb-4 w-full" @submit.prevent="submitForm">
            <div class="mb-4">
                <div class="grid grid-flow-row md:grid-flow-col gap-3">
                    <!-- NIT -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="nit" class="block mb-2 text-sm font-medium text-gray-900">NIT</label>
                        <input type="text" name="nit" id="nit"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="nit">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.nit }}</p>
                    </div>
                    <!-- Nombre -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                        <input type="text" name="name" id="name"
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
                        <select name="city_id" id="city_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="city_id">
                            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                        </select>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.city_id }}</p>
                    </div>
                    <!-- Dirección -->
                    <div class="sm:col-span-4 justify-center">
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Dirección</label>
                        <input type="text" name="address" id="address"
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
                        <input type="number" name="num_rooms" id="num_rooms"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="num_rooms">
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.num_rooms }}</p>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <button
                class="bg-green-500 hover:bg-bl-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar</button>
                <ButtonLink text="Regresar" backgroundColor="blue" to="/" />
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
            cities: [],  // Arreglo para almacenar las ciudades
            errorMessages: {
                city_id: "",
                name: "",
                nit: "",
                address: "",
                num_rooms: "",
            }
        };
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
        submitForm() {
            // Realizar la solicitud POST a la API para crear un hotel
            axios.post("http://146.190.32.176/diplomado/api/hotels", {
                city_id: this.city_id,
                name: this.name,
                nit: this.nit,
                address: this.address,
                num_rooms: this.num_rooms,
            })
                .then((response) => {
                    // Manejar la respuesta exitosa aquí
                    if (response.data.success) {
                        alert('Hotel registrado')
                        // Limpia los campos
                        this.city_id = null;
                        this.name = '';
                        this.nit = '';
                        this.address = '';
                        this.num_rooms = '';

                        // Limpia los mensajes de error
                        this.errorMessages = {
                            city_id: '',
                            name: '',
                            nit: '',
                            address: '',
                            num_rooms: '',
                        };
                    }
                })
                .catch((error) => {
                    // Manejar la respuesta de error aquí
                    if (error.response && error.response.data && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        this.errorMessages = {
                            city_id: errors.city_id ? errors.city_id[0] : "",
                            name: errors.name ? errors.name[0] : "",
                            nit: errors.nit ? errors.nit[0] : "",
                            address: errors.address ? errors.address[0] : "",
                            num_rooms: errors.num_rooms ? errors.num_rooms[0] : "",
                        };
                    }
                });
        },
    }
};
</script>