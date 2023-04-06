<script setup> 
import { useSearchStore } from '@/stores/search'
import { usePedidoStore } from '@/stores/pedido';
import { storeToRefs } from 'pinia' 
import moment from 'moment';
const storeSearch = useSearchStore(); 
const storePedido = usePedidoStore();

function tiempoMinimoAntesDeReserva(date, hours){
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + hours);
        return newDate;
    }; 

const time = ref({ 
    hours: new Date().getHours(),
    minutes: new Date().getMinutes() 
});

const date = new Date();
const tiempoMinimo = tiempoMinimoAntesDeReserva(date, 1); 
const startTime = ref({ hours: tiempoMinimo.getHours(), minutes: 0 });


const fechaFormat = function(value) {
    if (value) {
        return moment(value).format('DD MMM  hh:mm')
    }
}

const horaFormat = function(value) {
    if (value) {
        return moment(value).format('hh:mm A')
    }
}

</script> 
<template> 

<aside class="progreso">  
    <div>
        <section class="retiro" v-if="storeSearch.sucursal"> 
            <h3> {{ storeSearch.sucursal.name }}</h3>  
            <p>   
                {{ fechaFormat(storePedido.pedido.diaRetiro) }} 
            </p>  
        </section>   
        <section  class="retorno" v-if="storeSearch.sucursalRetorno">
            <h3>{{ storeSearch.sucursalRetorno.name }}</h3> 
            <p>  
                {{ fechaFormat(storePedido.pedido.diaRetorno) }} 
            </p>  
        </section> 
    </div>
    <div class="siguiente">
        <NuxtLink    @click="storeSearch.searchIs = 'TheSearch'">
            Cambiar
        </NuxtLink> 
    </div>
</aside>   

</template> 
<style lang="scss">  

.progreso {  
    box-sizing: border-box;     
    display:flex; 
    text-transform: uppercase; 
    color: white;  
    height: 100%; 
    justify-content: space-around;  
    z-index: 98989898989;
    h3 {
        font-size: 15px;   
    } 
    div {
        display: flex;
        section {
            flex: 1; 
            display: inline;
        }
        p {
            font-size: 18px;
            
            font-weight: bold;  
        }
    }
    a {
        padding: 10px;  
        font-weight: bold;
        font-size: 14px;
        background: rgb(3, 101, 199) ;
        color: white;
        border-radius:10px;
        align-self: flex-end; 
        cursor: pointer;
    }
} 
// Desktop  
@media screen and (min-width: 768px) {  
.progreso{     
    width:1000px;  
    } 
} 
</style>