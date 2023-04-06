<script setup>
import { storeToRefs } from 'pinia' 
import { usePedidoStore } from '~~/stores/pedido';

const storePedido = usePedidoStore();

</script>

<template> 

    <article class="pagar-pedido">
        <h2> Para pagar o ver tu reserva,  sólo ingresa el número de la reserva:</h2>
        <form  @submit="toReserva">  
            <input  type="text"  v-model="storePedido.order_id" required > 
            <NuxtLink :to="'/orden/' + storePedido.order_id">
                <button>Verificar</button>
            </NuxtLink>
        </form>

        <p>
            Al retirar el vehículo, al conductor principal se le bloqueará un depósito de seguridad en su tarjeta de crédito dependiendo de la categoría del auto. No se aceptarán tarjetas de débito ni dinero en metálico. El personal de la oficina confirmará la cantidad exacta del depósito. Tarjetas aceptadas para el deposito: American Express, MasterCard y Visa.
        </p>
           
        <em>
            Importante: No se aceptan tarjetas virtuales, ni cualquier otro tipo de tarjeta que no tenga el estampado en relieve.
        </em>
    </article>
    
</template>
<style scoped lang="scss">

.pagar-pedido { 
    display: flex;
    flex-direction: column; 
    padding: 20px; 
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    background-color:white;
    box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
    border-radius: 5px; 
    line-height:1;
    h2 {
        margin: 20px;
        font-size: 24px;
        font-weight: bold;
    }
    p {
        text-align: justify;
        padding: 20px;
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 250px;
        border-radius: 5px;
    }
    form{
        padding: 20px;
        margin: 0 auto;
    }
    input {
        padding: 5px 0px 5px 0px; 
        width: 100%; 
        text-align: center;
        border-radius: 8px;
        border: 1px solid darkgray;
        margin-bottom: 10px;
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
    em {
        font-style: italic;
        font-size:14px;
    }
} 
// Desktop  
@media screen and (min-width: 768px) { 

    .pagar-pedido { 
        display: flex;
        flex-direction: column;  
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        max-width: 1000px;

        h2 {
            margin: 20px;
            font-size: 28px;
            font-weight: bold;
        }
        h3 {
            font-weight: bold;
            font-size: 24px;
            margin-bottom:0px;
        } 
    }
}
</style>
