<script setup>    
import { getAssetURL } from "@/utils/get-asset-url";
import { usePedidoStore } from '@/stores/pedido';
import { useCheckoutStore } from '@/stores/checkout'; 
import { Form, Field, ErrorMessage } from 'vee-validate';  
import { useNoPagoStore } from "@/stores/nopago"; 
import moment from 'moment'
 
const storeNoPago = useNoPagoStore();
const storePedido = usePedidoStore(); 
const storeCheckout = useCheckoutStore();

const pedido = computed(() => {
    return storePedido.pedido
})     

onMounted(() => { 
    storeCheckout.metodos = 'none';
})
</script> 

<template>
<main class="auto">   
    <article> 
        <CarroSeleccionado /> 
        <Desglose />  
    </article> 
    
    <section class="detalles-conductor"> 
        <h3>{{ $t('finaliza') }}</h3> 
        <!-- <Form  > -->
            <div class="forma">
            <!-- <Form @submit="storeCheckout.metodos = 'metodos'"> -->
        <fieldset>
            <p>
                <label for="nombre">{{ $t('nombre') }}</label>
                <Field v-model="pedido.cliente.nombre" type="text" id="nombre" name="nombre" rules="required" placeholder="Nombre" />  
                <ErrorMessage name="nombre" >
                    <p class="warning">{{ $t('warningRequeridos') }}</p> 
                </ErrorMessage>
            </p> 
            <p>
                <label for="apellido">{{ $t('apellido') }}</label>
                <Field v-model="pedido.cliente.apellido"  type="text" id="apellido" name="apellido" rules="required"   placeholder="Apellido"/> 
                <ErrorMessage name="apellido" >
                    <p class="warning">{{ $t('warningRequeridos') }}</p> 
                </ErrorMessage>
            </p>  
            <p>
                <label for="telefono">{{ $t('telefono') }}</label>
                <Field  v-model="pedido.cliente.telefono"  type="text" id="telefono" name="telefono"   placeholder="Teléfono" rules="required"   />
                <ErrorMessage name="telefono" > 
                    <p class="warning">{{ $t('warningRequeridos') }}</p> 
                </ErrorMessage> 
            </p>  
            <p>
                <label for="email">{{ $t('correo') }}</label>
                <Field   v-model="pedido.cliente.email"  type="text" id="email" name="email" rules="required"   placeholder="Correo" /> 
                <ErrorMessage name="email" > 
                    <p class="warning">{{ $t('warningRequeridos') }}</p> 
                </ErrorMessage> 
        
            </p>  
            <p>
                <label for="licencia">{{ $t('licencia') }}</label>
                <Field  v-model="pedido.cliente.licencia"  type="text" id="licencia" name="licencia" rules="required"  placeholder="Licencia" /> 
                <ErrorMessage name="licencia" > 
                    <p class="warning">{{ $t('warningRequeridos') }}</p> 
                </ErrorMessage> 
        
            </p>  
            <p>
                <label for="nacimiento">{{ $t('fecha') }}</label> 
                <date-picker  :enableTimePicker="false" v-model="pedido.cliente.nacimiento"
                locale="es" name="nacimiento" rules="required" id="nacimiento" />   
                <ErrorMessage name="nacimiento" > 
                    <p class="warning">{{ $t('warningRequeridos') }}</p> 
                </ErrorMessage> 
            </p> 
            </fieldset>


            <div class="reserva" v-if="storePedido.pedido.reserva === 'reserva'"> 
                <button type="submit"  @click="storeNoPago.onSubmit" >{{ $t('reservar') }}</button>
            </div>


            <!-- <div class="reserva" v-if="storePedido.pedido.reserva === 'reserva'"> 
                <button type="submit">Reservar</button>
            </div> -->


            <div class="reserva"  v-if="storePedido.pedido.reserva === 'prepago' " > 
                <button type="submit" @click="storeCheckout.metodos = 'metodos'" > 
                    <!-- <button type="submit" @click="storeCheckout.metodos = 'metodos'" >  -->
                        {{ $t('nextButton') }} 
                </button>  
            </div>

            <div  v-if="storeCheckout.metodos === 'metodos'">
                
                <h2>{{ $t('metodos') }} </h2>
                <FormaPago />
            </div>  
        </div>   
    </section> 
</main> 
</template>
<style scoped lang="scss">  

 
  /* autos flota id */ 

.auto {  
    article {
        background-color: white;
        border-radius: 5px; 
        padding: 5px;
        display: flex;
        flex-direction: column; 
        margin:5px; 
        
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
        object-fit:contain;
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
        font-weight:bold;
        } 
        em {
        font-size: 24px;
        color: rgb(3, 3, 3);
        font-style:normal;
        } 

    }
    .reserva { 
        display: flex;
        flex-direction: row-reverse;  
    }
    .detalles-conductor{
        background-color:white;
        border-radius: 5px; 
        padding: 5px; 
        min-width: 350px; 
        margin:5px;
        line-height: 1.5;
            .forma {
                margin-bottom: 10px;  
                button {
                    background-color: #000000;
                    padding: 5px 15px;
                    border-radius: 5px; 
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: 600;
                    color: #FFD115;    
                    text-align: center;
                    cursor:pointer; 
                }  
            p { 
                display: flex; 
                flex-direction: column;
                justify-content: space-between; 
            } 
            .warning{
                font-size: 12px; 
                color: red;
                font-weight: bold;
            } 
        }
    }
}   
// Desktop  
@media screen and (min-width: 768px) {  
    .auto {
        display: flex;
        flex-direction: column;
        .detalles-conductor{ 
            border-radius: 2px;  
            border: 1px solid rgb(145, 145, 145); 
            background-color: white; 
            padding: 5px; 
            max-width: 900px; 
            margin:0 auto;
            margin-top: 10px;
            margin-bottom: 10px;
            line-height: 1.5;
            fieldset {
                display: flex; 
                flex-wrap: wrap; 
            }
            .forma { 
                display: flex; 
                flex-direction: column;
                margin-bottom: 10px; 
                input {
                    padding: 10px 20px; 
                    border-radius: 3px; 
                    width: 100%;
                    box-sizing: border-box;
                    background-color: rgb(245, 245, 245); 
                    border-radius: 2px;  
                    border: 1px solid rgb(145, 145, 145);  
                } 
                p {
                    flex: 1 0 calc(50% - 10px);
                    font-size: 18px;
                    max-width: 500px;
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between; 
                } 
                button {
                    background-color: #000000;
                    padding: 5px 15px;
                    border-radius: 5px; 
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: 600;
                    color: #FFD115;    
                    text-align: center;
                    cursor:pointer; 
                }  
            }
        }
        
        article {
            background-color:#ffffff;
            border-radius: 2px;  
            border: 1px solid rgb(145, 145, 145); 
            padding: 5px;
            display: flex; 
            flex-direction: row-reverse;
            min-width: 400px; 
            margin:0 auto; 
            margin-top: 10px; 
             width: 900px;  
        }
        header { 
            display: flex;
            flex-direction: column;  
        } 
        img {
            object-fit:contain;
            width: 100%;
            height: 400px;
            padding: 5px;
            border-radius: 5px; 
        } //650 x 411
        .specs { 
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
</style> 