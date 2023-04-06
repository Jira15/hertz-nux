 
<script setup>  
import { useAutosStore } from '@/stores/autos'
import { storeToRefs } from 'pinia' 
import { getAssetURL } from "@/utils/get-asset-url";
import { useSearchStore } from '~~/stores/search';
const route = useRoute();

const storeSearch = useSearchStore()
const storeAutos = useAutosStore()

const getAutos = computed(() => {
    return storeAutos.getAutos
})
const autos = computed(() => {
    return storeAutos.autos
}) 
onMounted(() => {
    storeAutos.fetchAutos(); 
})

// const abrirBuscador = function(auto) {
//     if (auto)
//     { 
//         storeSearch.searchIs = 'TheSearch';
//     } 
//     else { 
//         route.push('/thanks/'+ auto); 
//     }
// }


useHead({
        title: 'Flota | Thrifty Car Rental Panamá'
    });



</script> 
<template>
<main class="auto"  id="prompt">
    <ThePrompt /> 
    <h2>Flota</h2>

    <Filtros></Filtros>
    <div class="wrapper">
        <article v-for="auto in autos" :key="auto.id">
            <div class="promocion" v-if="auto.status === 'promocion'">
                <img src="@/assets/images/promo.png" alt="Pasajeros" />  
            </div>


            <figure> 
                <img :src="getAssetURL(auto.imagen)"  loading="lazy" /> 
            </figure> 
            <section>
            <header> 
                <h3>
                    {{ auto.marca }} {{ auto.modelo }}  
                </h3>   
                <em>o similar</em> 
            </header>
                <dl class="specs">
                    <div v-if="auto.pasajeros">
                        <dt>
                            <img src="@/assets/images/pasajeros.png" alt="Pasajeros" />  
                        </dt>
                        <dd>{{auto.pasajeros }}</dd>
                    </div>
                    <div v-if="auto.puertas">
                        <dt>
                            <img src="@/assets/images/doors.png" alt="Puertas" />
                        </dt>
                        <dd>{{auto.puertas }}</dd>
                    </div>
                    <div v-if="auto.maletas">
                        <dt>
                            <img src="@/assets/images/luggage.png" alt="Maletas" />
                        </dt>
                        <dd>{{auto.maletas }}</dd>
                    </div>
                    <div v-if="auto.transmision">
                        <dt>
                        <img src="@/assets/images/transmision.png" alt="Transmision" />
                        </dt>
                        <dd>{{ auto.transmision }}</dd>
                    </div>
                    <div v-if="auto.motor">
                        <dt>
                        <img src="@/assets/images/motor.png" alt="Motor" />
                        </dt>
                        <dd>1200cc</dd>
                    </div>
                    <div v-if="auto.combustible">
                        <dt>
                        <img src="@/assets/images/fuel.png" alt="Gasolina" />
                        </dt>
                        <dd>{{ auto.combustible}}</dd>
                    </div>
                    <div>
                        <dt>
                        <img src="@/assets/images/ac.png" alt="ac" /> 
                        </dt>
                        <dd>A/C</dd>
                    </div>
                </dl>   
            </section>  

            <!-- <NuxtLink  
            :to="'/flota/' +
            auto.id">
            Reservar   
            </NuxtLink>
-->
 
            <div class="disponibilidad" v-if="auto.status === 'disponibilidad' "> 
                <NuxtLink to="https://api.whatsapp.com/send?phone=50766785406" target="_blank"   >
                        Consulta disponibilidad 
                    </NuxtLink> 
            </div>

            <div  class="verificar"  v-if="auto.status === 'published' || auto.status === 'promocion'"> 
                <NuxtLink to="#prompt"   
                    @click="storeSearch.searchIs = 'TheSearch'">
                        Reservar    
                    </NuxtLink> 
            </div>
                    
        </article> 
    </div>
</main> 
</template>

<style scoped lang="scss"> 
.auto {  
    article {
        background-color: white;
        border-radius: 5px; 
        padding: 5px;
        display: flex;
        flex-direction: column; 
        min-width: 350px;
        max-width: 350px;
        margin:10px;
        justify-content: space-between; 

    }

    h2 {
        font-weight: bold;
        font-size: 32px; 
        margin-top: 20px;
        margin: 10px;
        width: 100%; 
    }
    header { 
        text-align: center;
        margin-bottom: 10px;
    }
    h3 {
        font-weight: bold;
        font-size: 34px;  
        width: 100%; 
    } 
    em {
        font-size: 24px;
        color: gray;
        font-style: italic; 
    }
    p {  
        font-size: 15px; 
        padding: 3px; 
    }  
    img {
        object-fit:contain;
        width: 100%;
        height: 180px;
        border-radius: 5px;
    }

    .specs {
        display: flex;   
        width: 100%;
        padding: 5px;
        flex-wrap: wrap;
        div {
            text-align: center; 
            text-transform:capitalize;
            width: 90px; 
            margin-top: 3px;
        }
            dl {
                display: flex;
                font-size: 14px;
                font-weight: bold;
            }
            dd {  
                font-size: 12px; 
            } 
            dt {
                object-fit:contain;
            } 
            img{ 
                max-width: 25px;  
            } 
    }
} 

.promocion {
    position: absolute; 
    opacity:80%;
    margin-top: -5px;
    margin-left: -5px;
    display: flex; 
    img {
        max-width: 100px;
        max-height: 100px;      
    }
}
.disponibilidad
{
    background-color: #25D366; 
    padding: 5px 15px;
    border-radius: 5px; 
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    color: white;   
    width: 100%;
    text-align: center; 
}

.verificar { 
    
        background-color: #047EFF;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: white;   
        width: 100%;
        text-align: center; 

        a {
            background-color: #047EFF;
            padding: 5px 15px;
            border-radius: 5px; 
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 600;
            color: white;   
            width: 100%;
            text-align: center;
            
        }

} 

// Desktop  
@media screen and (min-width: 768px) { 
    .wrapper { 
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    } 
}
</style>
