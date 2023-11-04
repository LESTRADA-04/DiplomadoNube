<template>
    <layautPage title="Informes del
            hotel">
        <div class="w-full">
            <div class="w-full flex gap-10 flex-wrap mb-20 items-center justify-center">
                <div class="w-full">
                    <canvas ref="migrafica2"></canvas>
                </div>
                <div class="w-full">
                    <canvas ref="migrafica1"></canvas>
                </div>
            </div>

            <div class="flex items-center justify-between mb-20 ml-5">
                <ButtonLink text="Regresar" backgroundColor="blue" to="/"></ButtonLink>
            </div>
        </div>
    </layautPage>
</template>
<script>
import LayautPage from "@/components/LayautPage.vue";
import ButtonLink from "@/components/ButtonLink.vue";
import Chart from 'chart.js/auto';
import axios from "axios";

export default {
    async mounted() {
        const response = await axios.get(`http://146.190.32.176/diplomado/api/rooms/${this.id}`);

        // Actualiza los datos de las habitaciones y el nombre del hotel
        const roomsData = response.data.data;

        // Inicializa arreglos para tipos y acomodaciones
        let type = ['SUITE', 'ESTANDAR', 'MATRIMONIAL'];
        let accommodation = ['SENCILLA', 'DOBLE', 'TRIPLE'];

        // Inicializa arreglos para la cantidad de habitaciones por tipo y acomodación
        let typeData = Array(type.length).fill(0);
        let accommodationData = Array(accommodation.length).fill(0);

        // Recorre cada habitación en los datos y suma las cantidades
        roomsData.forEach((room) => {
            const typeIndex = type.indexOf(room.type.name);
            const accommodationIndex = accommodation.indexOf(room.accommodation.name);

            if (typeIndex !== -1) {
                typeData[typeIndex] += room.quantity;
            }

            if (accommodationIndex !== -1) {
                accommodationData[accommodationIndex] += room.quantity;
            }
        });

        const ctx = this.$refs.migrafica1
        const ctx2 = this.$refs.migrafica2
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: type,
                datasets: [{
                    label: 'Grafico de barras',
                    data: typeData,
                    backgroundColor: [
                        '#e11d48',
                        '#9333ea',
                        '#0284c7',
                        '#d97706'
                    ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Habitaciones por tipo'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: accommodation,
                datasets: [{
                    label: 'Grafico de barras',
                    data: accommodationData,
                    backgroundColor: [
                        '#e11d48',
                        '#9333ea',
                        '#0284c7',
                        '#d97706'
                    ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Habitaciones por acomodación'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },
    components: {
        LayautPage,
        ButtonLink
    },
    data() {
        return {
            id: this.$route.params.id
        }
    },
    methods: {
    }
}
</script>