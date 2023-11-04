<template>
    <layautPage title="Habitaciones del
            hotel">
        <div class="px-8 pt-6 pb-8 mb-4 w-full">

            <div class="flex items-center justify-between mb-10">
                <div class="flex items-start justify-between flex-col">
                    <div class="flex items-center justify-between">
                        <img src="@/assets/logo.png" alt="hotel" class="w-16">
                        <h2 class="px-5 text-3xl font-bold">{{ this.name }}</h2>
                    </div>
                    <p class="text-lg font-semibold">Habitaciones: <span>{{ this.num_rooms }}</span></p>
                </div>
                <ButtonLink text="Crear habitaciones" backgroundColor="green"
                    :to="'/detallesHoteles/Habitaciones/CrearHabitacion/' + this.id"></ButtonLink>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left bg-blue-600 text-gray-800 ">
                    <thead class="text-xs text-white uppercase ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Tipo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Acomodacion
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Habitaciones
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="room in rooms" :key="room.id" class="border-b bg-blue-100 hover:bg-blue-200">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ room.type.name }}
                            </th>
                            <td class="px-6 py-4">
                                {{ room.accommodation.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ room.quantity }}
                            </td>
                            <td class="px-6 py-4 flex items-center justify-center">
                                <IconLink :id="room.id" routePrefix="detallesHoteles/Habitaciones/editar" iconClass="bi-pen"
                                    backgroundColor="bg-blue-500 hover.bg-blue-600"></IconLink>
                                <button
                                    class="p-1 rounded flex items-center justify-center w-8 font-medium text-white ml-2 bg-red-500 hover:bg-red-600"
                                    @click="confirmDelete(room.id)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div class="flex items-center justify-between mt-10">
                <ButtonLink text="Regresar" backgroundColor="blue" :to="'/detallesHoteles/' + this.id"></ButtonLink>
            </div>
        </div>

    </layautPage>
</template>
<script>
import LayautPage from "@/components/LayautPage.vue";
import ButtonLink from "@/components/ButtonLink.vue";
import IconLink from "@/components/IconLink.vue";
import axios from "axios";

export default {
    components: {
        LayautPage,
        ButtonLink,
        IconLink,
    },
    data() {
        return {
            id: this.$route.params.id,
            rooms: [], // Aquí almacenaremos las habitaciones
            name: "",
            num_rooms: null,
        };
    },
    async mounted() {
        // Realiza la solicitud GET a la API para obtener las habitaciones del hotel
        try {
            const responseHotel = await axios.get(`http://146.190.32.176/diplomado/api/hotels/${this.id}`);

            const hotelData = responseHotel.data.data;
            this.name = hotelData.name;
            this.num_rooms = hotelData.num_rooms;
            const response = await axios.get(`http://146.190.32.176/diplomado/api/rooms/${this.id}`);

            // Actualiza los datos de las habitaciones y el nombre del hotel
            this.rooms = response.data.data;
        } catch (error) {
            console.error("Error al cargar las habitaciones", error);
        }
    },
    methods: {
        async confirmDelete(roomId) {
            // Muestra un cuadro de diálogo de confirmación (puede ser una ventana modal o simplemente un cuadro de diálogo en tu página)
            const isConfirmed = confirm("¿Estás seguro de que deseas eliminar esta habitacion?");

            if (isConfirmed) {
                // Si el usuario confirma la eliminación, realiza la solicitud DELETE
                try {
                    // Realiza la solicitud DELETE para eliminar el hotel con el ID proporcionado
                    const response = await axios.delete(`http://146.190.32.176/diplomado/api/rooms/${roomId}`);

                    // Maneja la respuesta, por ejemplo, muestra un mensaje de éxito
                    if (response.data.success) {
                        alert("Habitacion eliminada")
                        const response2 = await axios.get(`http://146.190.32.176/diplomado/api/rooms/${this.id}`);
                        this.rooms = response2.data.data;
                    } else {
                        alert("Error al eliminar la habitacion")
                    }
                    console.log("Habitacion eliminada exitosamente:", response.data.message);


                    // Aquí puedes realizar cualquier otra acción después de eliminar el hotel, como recargar la lista de hoteles
                } catch (error) {
                    // Maneja el error si la solicitud falla
                    alert(error)
                    console.error("Error al eliminar el hotel", error);
                }
            }
        },
    }
};
</script>