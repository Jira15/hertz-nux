 
<script setup>  
import { useSucursalStore } from '@/stores/sucursal'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia' 
import { getAssetURL } from "@/utils/get-asset-url";
import { GoogleMap, Marker } from 'vue3-google-map'  

const storeSucursal = useSucursalStore(); 
const storeSearch = useSearchStore();
 
const sucursales = computed(() => {
    return storeSucursal.sucursales
}) 
onMounted(() => {
    storeSucursal.fetchSucursales(); 
})
const sucursalABuscador = function(value) {
    storeSearch.sucursal = value;
    storeSearch.searchIs = 'TheSearch';
}
useHead({
        title: 'Sucursales | Thrifty Car Rental Panamá'
    });
</script> 
<template>
<main class="sucursal" id="prompt">
    <ThePrompt />
    <h2>Sucursales</h2>
    <div>
        <article v-for="sucursal in sucursales" :key="sucursal.id">
            <figure> 
                <img :src="getAssetURL(sucursal.imagen)"  loading="lazy" /> 
            </figure> 
            <section>
                <h3>
                    {{ sucursal.name }}  
                </h3> 
                <p>
                    Telefonos:  {{ sucursal.telefono_1 }} <br />
                    {{ sucursal.telefono_2 }} 
                </p>
                <p v-if="sucursal.horario_apertura === 0 && sucursal.horario_apertura_domingo === 0 ">
                    Abierto 24 horas
                </p> 
                <p v-if="sucursal.horario_apertura != 24 && sucursal.horario_apertura != 0">
                    Lunes a Viernes: {{ sucursal.horario_apertura }}:00 a {{ sucursal.horario_cierre }}:00 
                </p> 
                <p v-if="sucursal.horario_apertura_sabado > 0 && sucursal.horario_cierre_sabado != 24">
                    Sabados: {{ sucursal.horario_apertura_sabado }}:00 a {{ sucursal.horario_cierre_sabado }}:00 
                </p>
                <p  v-if="sucursal.horario_apertura_sabado === 24 ">
                    Sabados: Cerrados 
                </p>
                <!-- hacer un if si apertura en cero, es mayor o 24-->
                <p  v-if="sucursal.horario_apertura_domingo === 24">
                    Domingos: Cerrados 
                </p>
                <p  v-if="sucursal.horario_apertura_domingo > 0  && sucursal.horario_apertura_domingo != 24">
                    Domingos: {{ sucursal.horario_apertura_domingo }}:00 a {{ sucursal.horario_cierre_domingo }}:00 
                </p> 
            </section> 

            <aside v-if="sucursal.imagen">
                <GoogleMap
                api-key="AIzaSyB3lYFwl2_OLMyM71Je6JWd7yOyvv5T0yA"
                class="mapa" 
                :center="{ lat: sucursal.mapa.coordinates[1], lng: sucursal.mapa.coordinates[0] }"
                :zoom="15">
                    <Marker :options="{ 
                        position: { lat: sucursal.mapa.coordinates[1], lng: sucursal.mapa.coordinates[0] } }" 
                        />
                </GoogleMap>
            </aside>   

            <NuxtLink to="#prompt"   class="verificar" 
              @click="sucursalABuscador(sucursal)">
                Reservar Aqui  
            </NuxtLink> 

        </article> 
    </div>
</main> 
</template>

<style scoped lang="scss"> 
.sucursal {  
    article {
        background-color: white;
        border-radius: 5px;
        margin: 10px;
        padding: 5px; 
    }
    h2 {
        font-weight: bold;
        font-size: 32px;
        line-height: 36px;
        margin-top: 20px;
        margin: 10px;
    }
    h3 {
        font-weight: bold;
        font-size: 18px;  
        padding: 3px;
    }
    p {  
        font-size: 15px; 
        padding: 3px; 
    }  
    img {
        object-fit: cover;
        width: 100%;
        height: 150px;
        border-radius: 5px;
    }
    .verificar {
        background-color: #006fb4;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: white;  
        margin-top: 20px;
        width: 100%;
        text-align: center;
        display:inline-block
    } 
}
.mapa {
    width: 100%;
    height: 150px
}

.sucursales {
display: flex;
justify-content: space-evenly; 
}

// Desktop  
@media screen and (min-width: 768px) { 
    div { 
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    article {
        min-width: 350px;
        max-width: 350px; 
    }
    section {
        height: 130px;
    }
}
</style>
