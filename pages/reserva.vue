
<script setup>
import { useAutosStore } from '@/stores/autos'
import { storeToRefs } from 'pinia'
import { getAssetURL } from "@/utils/get-asset-url"; 
import { useSearchStore } from '@/stores/search'
const route = useRoute();

const storeSearch = useSearchStore(); 
const storeAutos = useAutosStore();

const getAutos = computed(() => {
return storeAutos.getAutos
})
const autos = computed(() => {
return storeAutos.autos
})
const precioFormat = function(value) {
    if (value) {
        return value.toLocaleString('es-US', { style: 'currency', currency: 'USD' }) 
    }
}

const precioPrepago = function(value) {
    if (value) {
        let descuento = 5;  
        const descuentoCalculado = value * (descuento / 100);

        const nuevoPrecio = value - descuentoCalculado;
        // // Calculate tax due
        // const impuestoADeber = nuevoSubtotal * (impuesto / 100);
        // // Calculate final price
        // const impuestoSumado = nuevoSubtotal * (1 + (impuesto / 100)); 
        return nuevoPrecio.toLocaleString('es-US', { style: 'currency', currency: 'USD' }) 
    }
}
onMounted(() => {
storeAutos.fetchAutos(); 
storeSearch.searchIs = 'TheProgress';
})  
function checkBuscar(retiro, retorno, fechaRetiro, fechaRetorno, id) {
    const router = useRouter();  

    if (retiro  === undefined || retorno === undefined || fechaRetiro === undefined || fechaRetorno === undefined){
        storeSearch.mostrarWarning = true; 
        console.log(storeSearch.mostrarWarning)
    }
    else {
        storeSearch.mostrarWarning = false; 
        router.push('/flota/' + 'reserva/' +  id)
    }
}

useHead({
        title: 'Reservas | Hertz Rent a car Panamá'
    });


</script> 
<template>
<main class="auto">
    <ThePrompt />

    
    <Filtros></Filtros>
 


<div class="wrapper">


<article class="car-card" v-for="auto in autos" :key="auto.id"> 
        <div class="promocion" v-if="auto.status === 'promocion'">
            <img src="@/assets/images/promo.png" alt="Pasajeros" />  
        </div>  

        <header class="title">  
            <h1>
                {{ auto.marca }} {{ auto.modelo }}   <em>o similar</em> 
            </h1>   
            
        </header>



        <figure class="modelo"> 
            <img :src="getAssetURL(auto.imagen)"  loading="lazy" /> 
        </figure>   


        <section class="specs">
            <div v-if="auto.pasajeros">
                <dt>
                    <img src="@/assets/images/pasajeros.png" alt="Pasajeros" />
                </dt>
                <dd>{{ auto.pasajeros }}</dd>
            </div>
            <div v-if="auto.puertas">
                <dt>
                    <img src="@/assets/images/doors.png" alt="Puertas" />
                </dt>
                <dd>{{ auto.puertas }}</dd>
            </div>
            <div v-if="auto.maletas">
                <dt>
                    <img src="@/assets/images/luggage.png" alt="Maletas" />
                </dt>
                <dd>{{ auto.maletas }}</dd>
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
                <dd>{{ auto.combustible }}</dd>
            </div>
            <div>
                <dt>
                    <img src="@/assets/images/ac.png" alt="ac" />
                </dt>
                <dd>A/C</dd>
            </div>
        </section> 

            
            <section class="disponibilidad"  v-if="auto.status === 'disponibilidad'"> 
                <section> 
                    <div>
                        <em>Por día</em>
                        <h4> {{  precioFormat(auto.precio_hertz) }}</h4>   
                    </div> 
                    <div>
                        <em>Prepago</em>
                        <h4> {{  precioPrepago(auto.precio_hertz) }}</h4>  
                    </div> 
                </section>
                    <NuxtLink   to="https://api.whatsapp.com/send?phone=50767689626" target="_blank"   >
                        Consulta disponibilidad 
                    </NuxtLink>  
            </section> 




        <section class="precios"  v-if="auto.status === 'published' || auto.status === 'promocion'"> 
            <div> 
            <NuxtLink   
                @click="checkBuscar(storeSearch.sucursal, storeSearch.sucursalRetorno, storeSearch.fechaRetiro, storeSearch.fechaRetorno, auto.id)" >
                Reservar   
                
                <h4> {{  precioFormat(auto.precio_hertz) }}</h4>  
                </NuxtLink>
            </div> 


            <div> 
                <NuxtLink  
                :to="'/flota/' +
                'prepago/' +
                auto.id">
                Reservar y pagar   
                <h4> {{  precioPrepago(auto.precio_hertz) }}</h4> 
                </NuxtLink> 
            </div> 
            <section class="warning" v-if="storeSearch.mostrarWarning === true">
                <!-- {{ storeSearch.sucursal }} -->
                <strong>Necesitas especificar la fecha y sucursal antes de continuar</strong>  
                <!-- {{ storeSearch.fechaRetiro }} -->
            </section>


        </section> 

        

 
            
            <!-- <section class="warning" v-if="storeSearch.sucursal  === undefined || storeSearch.sucursalRetorno === undefined">
            {{ storeSearch.sucursal }}  
            <strong>Necesitas especificar la fecha y sucursal antes de continuar</strong>  
            {{ storeSearch.fechaRetiro }} 
        </section>-->
        <div class="shape"></div>
        </article>

 
    </div>
</main>
</template>

<style scoped lang="scss">


.auto { 
    .warning{
        color: red;
        font-size: 13px;
        font-weight: bold;
        margin:  0 auto;
        padding: 5px;
        text-align: justify;
    } 
    .car-card{
        background-color:#ffffff;
        border-radius: 2px;  
        border: 1px solid rgb(145, 145, 145); 
        max-height: 400px;
        width:390px; 
        margin: 0 auto;
        margin-bottom: 10px;
        display: grid; 
        grid-template-columns: 1fr 1fr;
        grid-template-rows:auto 1fr auto; 
        grid-template-areas: 
            "title title"
            "modelo modelo"
            "precios precios"; 
            gap: 5px;

            .title {   
                grid-area: title; 
                display: flex;  
                justify-content: space-around;
                text-align: center;   
                h1 {
                    font-weight: bold;
                    font-size: 28px; 
                } 
                em {
                    font-size: 14px;
                    color: gray;
                    font-style: italic;
                }
            } 

            .modelo { 
                grid-area: modelo;   
                img {
                    width: 100%;
                    max-height: 120px;
                    object-fit: contain;
                }
            }
            .shape
            {   
                grid-area: precios;
                width: 0; 
                height: 0;  
                border-bottom: 80px solid #FFD115; 
                border-left: 388px solid transparent;  
            } 
 

            .precios { 
                grid-area: precios; 
                display: flex;
                z-index: 1; 
                div{
                    
                    text-align: center;
                    justify-content: space-between;
                    display: flex;
                    flex-direction: column;
                    width: 100%;  
                }
                h4 {
                    font-size: 40px;
                    font-weight: bold;
                }
        
                em {
                    font-size: 24px;
                    color: rgb(3, 3, 3);
                    font-style: normal;
                } 
                a {
                    
                    background-color: #282828;
                    padding: 5px 15px;
                    border-radius: 5px;
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                    text-align: center;
                    cursor: pointer;
                    margin: 1px;
                } 
            } 

            .disponibilidad { 
                grid-area: precios; 
                display: flex;
                flex-direction: column;
                z-index: 1;
                section{
                    
                    text-align: center;
                    justify-content: space-between;
                    display: flex; 
                    width: 100%;  
                }
                h4 {
                    font-size: 40px;
                    font-weight: bold;
                }
        
                em {
                    font-size: 24px;
                    color: rgb(3, 3, 3);
                    font-style: normal;
                } 
                a {
                    
                    background-color: #282828;
                    padding: 5px 15px;
                    border-radius: 5px;
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                    text-align: center;
                    cursor: pointer; 
                } 
            } 
        
            .specs { 
                grid-area: specs;
                display: none; 
            } 
    } 
    p {
        font-size: 15px;
        padding: 3px;
    } 
}
/*
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
    padding: 5px 15px;
    border-radius: 5px; 
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600; 
    width: 100%;
    text-align: center; 
}
*/
.verificar { 
    
        background-color: #FFD115;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: white;   
        width: 100%;
        text-align: center; 

        a {
            background-color: #FFD115;
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
.auto {  
        .car-card{
            margin: 0 auto;
            width: 900px;
            height: 325px;
            margin-bottom: 20px;
            padding-top:10px;
            grid-template-columns: 1fr 1fr;
            grid-template-rows:1fr 1fr 0.5fr; 
            grid-template-areas: 
                "title modelo"
                "specs modelo"
                "precios precios"; 
                gap: 5px;
            .specs{
                display: flex;   
                justify-content: space-between;
                flex-wrap: wrap; 
                text-align: center;
                padding: 10px;
                div {
                    width: 33%;
                    padding: 5px;
                }
                
            }

            
            .title {   
                grid-area: title; 
                display: flex;  
                justify-content: space-around;
                text-align: center;   
                h1 {
                    font-weight: bold;
                    font-size: 28px; 
                } 
                em {
                    font-size: 24px;
                    color: gray;
                    font-style: italic;
                }
            } 

            .modelo { 
                grid-area: modelo; 
                display: flex; 
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img { 
                    width: 100%;
                    max-height: 200px;
                    object-fit: contain; 
                }
            }
            .shape
            {   
                grid-area: precios;
                width: 0; 
                height: 0;  
                border-bottom: 100px solid #FFD115; 
                border-left:898px solid transparent;  
            } 
 

            .precios { 
                grid-area: precios; 
                display: flex;
                z-index: 1; 
                justify-content: space-around;
                align-items: end;  
                div{  
                    justify-content: space-around;
                    display: flex;
                    flex-direction: row;
                    width:auto;
                    height: 80px; 
                }
                h4 {
                    align-content: center; 
                    font-size: 34px;
                    font-weight: bold;

                }
        
 
                a { 
                    width: 250px;
                    background-color: #282828;
                    padding: 9px 12px;
                    border-radius: 5px;
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                    text-align: center;
                    margin-bottom:2px;
                    cursor: pointer;
                } 
            }
            
            

            .disponibilidad { 
                grid-area: precios; 
                display: flex;
                flex-direction: column;
                z-index: 1;
                section{
                    
                    text-align: center;
                    justify-content: space-around;
                    display: flex; 
                    width: 100%;  
                } 
                a {
                    
                    background-color: #282828;
                    padding: 5px 15px;
                    border-radius: 5px;
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                    text-align: center;
                    cursor: pointer; 
                } 
            }   
        } 
    }
}
</style>
