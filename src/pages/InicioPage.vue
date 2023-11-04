<template>
    <LayautPage2 title="Listado general
            de hoteles">
        <!-- <button @click="cargarDatos" type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cargar
            Datos</button> -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left bg-blue-600 text-gray-800 ">
                <thead class="text-xs text-white uppercase ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            NIT
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ciudad
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Direccion
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            N° max de habitaciones
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Opciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="hotel in hotels" :key="hotel.id" class="border-b bg-blue-100 hover:bg-blue-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ hotel.nit }}
                        </th>
                        <td class="px-6 py-4">
                            {{ hotel.name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ hotel.city.name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ hotel.address }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            {{ hotel.num_rooms }}
                        </td>
                        <td class="px-6 py-4 flex items-center justify-center">

                            <IconLink :id='hotel.id' routePrefix="detallesHoteles" iconClass="bi-file-earmark-text"
                                backgroundColor="bg-yellow-500 hover:bg-yellow-600"></IconLink>
                            <IconLink :id='hotel.id' routePrefix="editarHotel" iconClass="bi-pen"
                                backgroundColor="bg-blue-500 hover:bg-blue-600"></IconLink>
                            <button
                                class="p-1 rounded flex items-center justify-center w-8 font-medium text-white ml-2 bg-red-500 hover:bg-red-600"
                                @click="confirmDelete(hotel.id)">
                                <i class="bi bi-trash"></i>
                            </button>
                            <IconLink :id='hotel.id' routePrefix="informe" iconClass="bi-bar-chart-line-fill"
                                backgroundColor="bg-green-500 hover:bg-green-600"></IconLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </LayautPage2>
</template>
<script>
import LayautPage2 from "@/components/LayautPage2.vue";
import IconLink from "@/components/IconLink.vue";
import axios from "axios"; // Importa Axios

export default {
    components: {
        LayautPage2,
        IconLink,
    },
    data() {
        return {
            hotels: [], // Arreglo para almacenar los datos de los hoteles
        };
    },
    methods: {
        cargarDatos() {
            // Realiza la solicitud GET a la API
            axios.get("http://146.190.32.176/diplomado/api/hotels")
                .then((response) => {
                    // Almacena los datos de la respuesta en el arreglo 'hotels'
                    this.hotels = response.data.data; // Ajusta la ruta de acceso a los datos según la estructura de la respuesta real
                })
                .catch((error) => {
                    console.error("Error al cargar los datos:", error);
                });
        },
        async confirmDelete(hotelId) {
            // Muestra un cuadro de diálogo de confirmación (puede ser una ventana modal o simplemente un cuadro de diálogo en tu página)
            const isConfirmed = confirm("¿Estás seguro de que deseas eliminar este hotel?");

            if (isConfirmed) {
                // Si el usuario confirma la eliminación, realiza la solicitud DELETE
                try {
                    // Realiza la solicitud DELETE para eliminar el hotel con el ID proporcionado
                    const response = await axios.delete(`http://146.190.32.176/diplomado/api/hotels/${hotelId}`);

                    // Maneja la respuesta, por ejemplo, muestra un mensaje de éxito
                    alert(response.data.message)
                    console.log("Hotel eliminado exitosamente:", response.data.message);
                    this.cargarDatos();
                    
                    // Aquí puedes realizar cualquier otra acción después de eliminar el hotel, como recargar la lista de hoteles
                } catch (error) {
                    // Maneja el error si la solicitud falla
                    alert(error)
                    console.error("Error al eliminar el hotel", error);

                    // Aquí puedes mostrar un mensaje de error al usuario si es necesario
                }
            }
        },
    },
    created() {
        // Carga los datos del hotel cuando se crea el componente
        this.cargarDatos();
    }
};
</script>