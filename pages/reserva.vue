
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
        title: 'Reservas | Thrifty Car Rental Panamá'
    });


</script> 
<template>
<main class="auto">
    <ThePrompt />

    
    <Filtros></Filtros>
    <div class="wrapper">
        <article v-for="auto in autos" :key="auto.id"> 
            <div class="promocion" v-if="auto.status === 'promocion'">
                <img src="@/assets/images/promo.png" alt="Pasajeros" />  
            </div>
            <section>
                <header>  
                    <figure> 
                        <img :src="getAssetURL(auto.imagen)"  loading="lazy" /> 
                    </figure> 
                    <div> 
                        <h3>
                            {{ auto.marca }} {{ auto.modelo }}  
                        </h3>   
                        <em>o similar</em> 
                    </div> 
                </header>
            
                <dl class="specs">
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
                </dl>
            </section> 

            
            <footer class="disponibilidad"  v-if="auto.status === 'disponibilidad'"> 
                <section> 
                    <div>
                        <em>Por día</em>
                        <h4> {{  precioFormat(auto.precio_thrifty) }}</h4>   
                    </div> 
                    <div>
                        <em>Prepago</em>
                        <h4> {{  precioPrepago(auto.precio_thrifty) }}</h4>  
                    </div> 
                </section>
                    <NuxtLink   to="https://api.whatsapp.com/send?phone=50766785406" target="_blank"   >
                        Consulta disponibilidad 
                    </NuxtLink>  
            </footer> 

            <footer  v-if="auto.status === 'published' || auto.status === 'promocion'">
                 
                <div>
                    <em>Por día</em>
                    <h4> {{  precioFormat(auto.precio_thrifty) }}</h4>  
                    <NuxtLink   
                    @click="checkBuscar(storeSearch.sucursal, storeSearch.sucursalRetorno, storeSearch.fechaRetiro, storeSearch.fechaRetorno, auto.id)"
          >
                    Reservar   
                    </NuxtLink>
                </div> 
                <div>
                    <em>Prepago</em>
                    <h4> {{  precioPrepago(auto.precio_thrifty) }}</h4> 
                    <NuxtLink  
                    :to="'/flota/' +
                    'prepago/' +
                    auto.id">
                    Reservar y pagar   
                    </NuxtLink>

                    
                </div>

            
                 
            </footer> 



            <section class="warning" v-if="storeSearch.mostrarWarning === true">
                <!-- {{ storeSearch.sucursal }} -->
                <strong>Necesitas especificar la fecha y sucursal antes de continuar</strong>  
                <!-- {{ storeSearch.fechaRetiro }} -->
            </section>


            
             <!-- <section class="warning" v-if="storeSearch.sucursal  === undefined || storeSearch.sucursalRetorno === undefined">
               {{ storeSearch.sucursal }}  
                <strong>Necesitas especificar la fecha y sucursal antes de continuar</strong>  
                {{ storeSearch.fechaRetiro }} 
            </section>-->

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
    
    article {
        background-color: white;
        border-radius: 5px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        min-width: 350px;
        margin: 5px; 
    }

    h2 {
        font-weight: bold;
        font-size: 32px;
        margin-top: 20px;
        margin: 10px;
        width: 100%;
    }

    header { 
        display: flex;
        text-align: center;
        margin-bottom: 10px;
        align-items: center;
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
        object-fit: contain;
        width: 100%;
        height: 160px;
        padding: 5px;
        border-radius: 5px;
    }

    footer {
        text-align: center;
        justify-content: space-between;
        display: flex;
        width: 100%; 
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
            background-color: #047EFF;
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
        display:none;
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
    padding: 5px 15px;
    border-radius: 5px; 
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600; 
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

    .auto {
        article {
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            padding: 5px;
            display: flex;
            flex-direction: column;
            min-width: 350px;
            max-width: 350px;
            margin: 10px;
        }

        h2 {
            font-weight: bold;
            font-size: 32px;
            margin-top: 20px;
            margin: 10px;
            width: 100%;
        }


        header { 
            display: flex;
            flex-direction: column;  
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
            object-fit: contain;
            width: 100%;
            height: 180px;
            border-radius: 5px;
        } 
 
        footer {
            justify-content: space-between;
            display: flex;
            width: 100%;

            h4 {
                font-size: 35px;
                font-weight: bold;
            }

            em {
                font-size: 24px;
                color: rgb(3, 3, 3);
                font-style: normal;
            }

            div { 
                width: 100%; 
            }
            a {
                background-color: #047EFF;
                padding: 5px 10px;
                border-radius: 5px; 
                text-transform: uppercase;
                font-size: 15px;
                font-weight: 600;
                color: white;   
                text-align: center; 
                
            } 
    
        }

        .specs {
            display: flex;
            width: 100%;
            padding: 5px;
            flex-wrap: wrap;
            display:flex;
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
                max-height: 25px;
                object-fit:contain; 
                padding: 2px;  
            } 
        }
    }
}

.disponibilidad
{  
    width: 100%; 
    display: flex;
    flex-direction: column;
    section {
        display: flex;
    }
    a{
        
        background-color: #25D366; 
        width: 100%; 
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        color: white;    
        text-align: center; 
    }
}


</style>
