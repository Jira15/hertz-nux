<script setup>  
import { useAutosStore } from '@/stores/autos'
import { storeToRefs } from 'pinia' 
import { getAssetURL } from "@/utils/get-asset-url";
import { usePedidoStore } from '@/stores/pedido' 
import { useSearchStore } from '@/stores/search'

const storeSearch = useSearchStore()
const storeAutos = useAutosStore()
const storePedido = usePedidoStore()
const getAutos = computed(() => {
    return storeAutos.getAutos
})
const autos = computed(() => {
    return storeAutos.autos
}) 
const route = useRoute() 

onMounted(() => {
    storeAutos.fetchAutos(); 
    // storeSearch.sucursal = route.params.sucursal; 
    storePedido.pedido.sucursal = storeSearch.sucursal; 
    storePedido.pedido.sucursalRetorno = storeSearch.sucursalRetorno; 
    storePedido.pedido.diaRetiro = storeSearch.diaRetiro; 
    storePedido.pedido.horaRetiro = storeSearch.horaRetiro; 
    storePedido.pedido.diaRetorno = storeSearch.diaRetorno; 
    storePedido.pedido.horaRetorno = storeSearch.horaRetorno;  
})
</script> 
<template>
  <main class="auto"> 
    <TheSearch />
    <div class="wrapper"> 
        <article v-for="auto in autos" :key="auto.id">
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

            <footer>
            <div>
                <em>Por día</em>
                <h4>B/. {{ auto.precio }}</h4>
                
                <NuxtLink :to="'/flota/' + auto.id">
                    <button>Reservar Aqui</button>
                </NuxtLink>
            </div>
                

            <div>
                <em>Prepago</em>
                <h4>B/. {{ auto.precio }}</h4>
                <button>Reservar y pagar</button> 
            </div>

            </footer> 
        </article>
        
        
    </div>
</main> 
</template>

<style scoped lang="scss"> 
.auto {  
    article {
        background-color: rgb(255, 255, 255);
        border-radius: 5px; 
        padding: 5px;
        display: flex;
        flex-direction: column; 
        min-width: 350px; 
        margin:10px;
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
    button {
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
    footer {
    text-align: center;
    justify-content: space-between; 
    display: flex;
    width: 100%;
    h4 {
        font-size: 38px;
        font-weight:bold;
    } 
    em {
        font-size: 24px;
        color: rgb(3, 3, 3);
        font-style:normal;
    }
    div {
        width: 100%;
    }
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
// Desktop  
@media screen and (min-width: 768px) { 
    .wrapper { 
        display: flex;
        justify-content: center;
    } 
}
</style>
