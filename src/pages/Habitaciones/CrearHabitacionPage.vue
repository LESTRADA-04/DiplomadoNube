<template>
    <layautPage title="Crear Habitacion">
        <form class="px-8 pt-6 pb-8 mb-4 w-full" @submit.prevent="submitForm">
            <div class="flex items-center justify-between mb-10">
                <div class="flex items-start justify-between flex-col">
                    <div class="flex items-center justify-between">
                        <img src="@/assets/logo.png" alt="hotel" class="w-16">
                        <h2 class="px-5 text-3xl font-bold">{{ this.name }}</h2>
                    </div>
                    <p class="text-lg font-semibold">Habitaciones: <span>{{ this.num_rooms }}</span></p>
                </div>
            </div>
            <div class="mb-4">
                <div class="grid grid-flow-row md:grid-flow-col gap-3">
                    <div class="sm:col-span-4 justify-center">
                        <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 ">Numero de
                            habitaciones</label>
                        <input type="text" id="nombre"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="quantity" placeholder="Numero de habitaciones" required>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.quantity }}</p>
                    </div>

                    <div class="sm:col-span-4 justify-center">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Tipo de
                            habitacion</label>
                        <select id="countries" v-model="room_type_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option v-for="t in types" :key="t.id" :value="t.id">{{ t.name }}</option>
                        </select>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.room_type_id }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div class="grid grid-flow-row md:grid-flow-col gap-3">
                    <div class="sm:col-span-4 justify-center">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Tipo de
                            acomodacion</label>
                        <select id="countries" v-model="accommodation_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option v-for="a in accommodations" :key="a.id" :value="a.id">{{ a.name }}</option>
                        </select>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessages.accommodation_id }}</p>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-green-500 hover:bg-bl-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"> Crear </button>
                <ButtonLink text="Regresar" backgroundColor="blue" :to="'/detallesHoteles/Habitaciones/' + this.hotel_id">
                </ButtonLink>
            </div>
        </form>

    </layautPage>
</template>
<script>
import LayautPage from "@/components/LayautPage.vue";
import ButtonLink from "@/components/ButtonLink.vue";
import axios from "axios";

export default {
    components: {
        LayautPage,
        ButtonLink
    },
    data() {
        return {
            id: this.$route.params.id,
            accommodations: Object,
            types: Object,
            name: "",
            num_rooms: null,
            hotel_id: null,
            errorMessages: {
                quantity: "",
                accommodation_id: "",
                room_type_id: ""
            }
        }
    },
    async created() {
        // Realiza la solicitud GET a la API para obtener las habitaciones del hotel
        try {

            const r1 = await axios.get(`http://146.190.32.176/diplomado/api/accommodation-types`);
            this.accommodations = r1.data;
            const r2 = await axios.get(`http://146.190.32.176/diplomado/api/room-types`);
            this.types = r2.data;
            const response = await axios.get(`http://146.190.32.176/diplomado/api/rooms/show/${this.id}`);

            // Actualiza los datos de las habitaciones y el nombre del hotel
            this.room = response.data.data;

            const responseHotel = await axios.get(`http://146.190.32.176/diplomado/api/hotels/${this.id}`);

            const hotelData = responseHotel.data.data;
            this.name = hotelData.name;
            this.num_rooms = hotelData.num_rooms;
            this.hotel_id = hotelData.id;

        } catch (error) {
            console.error("Error al cargar las habitaciones", error);
        }
    },
    methods: {
        async submitForm() {
            // Realiza una solicitud PUT para actualizar el hotel con los datos actuales del formulario
            try {

                const response = await axios.post(
                    `http://146.190.32.176/diplomado/api/rooms`, {
                    hotel_id: this.id,
                    room_type_id: this.room_type_id,
                    accommodation_id: this.accommodation_id,
                    quantity: this.quantity,
                });

                if (response.data.success) {
                    alert(response.data.message)
                    this.room_type_id = null;
                    this.accommodation_id = null;
                    this.quantity = "";
                    // Limpia los mensajes de error
                    this.errorMessages = {
                        quantity: ""
                    };
                }

                // Maneja la respuesta, por ejemplo, muestra un mensaje de éxito
                console.log("Hotel actualizado exitosamente:", response.data.message);
            } catch (error) {
                // Maneja el error si la solicitud falla, también puedes manejar errores de validación
                console.error("Error al actualizar el hotel", error);
                if (error.response && error.response.data && error.response.data.errors) {
                    const errors = error.response.data.errors;
                    console.log(errors)
                    // Actualiza los mensajes de error según la respuesta del servidor
                    this.errorMessages.quantity = errors.simple ? errors.simple : "";
                    this.errorMessages.accommodation_id = errors.accommodation_id ? errors.accommodation_id[0] : "";
                    this.errorMessages.room_type_id = errors.room_type_id ? errors.room_type_id[0] : "";
                }
            }
        },
    }
}
</script>