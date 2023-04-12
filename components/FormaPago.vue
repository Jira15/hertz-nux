<script setup>     
import { usePedidoStore } from '@/stores/pedido';
import { useCheckoutStore } from '@/stores/checkout';
import { usePaypalStore } from '@/stores/paypal'; 

const storePaypal = usePaypalStore(); 
const storePedido = usePedidoStore(); 
const storeCheckout = useCheckoutStore();

const pedido = computed(() => {
    return storePedido.pedido
})   




const store = useCheckoutStore();
const origin = ref(null);
const ccnumber = ref('');
const ccexp = ref('');
const cvv = ref('');



onBeforeMount(() => {
  if (import.meta.env.SSR) {
    return;
  }
  origin.value = window.location.origin;
});



onBeforeMount(() => {
  if (import.meta.env.SSR) {
    return;
  }
  origin.value = window.location.origin;
});



async function submitForm() {
  // Collect the form values here
  const values = {
    ccnumber: ccnumber.value,
    ccexp: ccexp.value,
    cvv: cvv.value,
  };

  await storeCheckout.onSubmit(values, origin.value);
}



</script> 

<template>
<section class="metodos" > 
    <form class="tarjeta" @submit.prevent="submitForm">
        <p>
            <label>Número de la Tarjeta</label>  
            <input type="text" placeholder="0000 0000 0000 000" name="ccnumber" v-model="storeCheckout.tarjeta.ccnumber" />
        </p>
        <p>
            <label>Fecha de Expiración</label>  
            <input type="text" placeholder="01 / 26" name="ccexp"  class="ccexp" v-model="storeCheckout.tarjeta.ccexp" />
        </p>  
        <p>
            <label>CCV</label>  
            <input type="text" placeholder="123" name="cvv" class="cvv" v-model="storeCheckout.tarjeta.cvv" />
        </p>   
       <button type="submit">Pagar</button>
    </form>  


    <div id="paypal-button">
    </div> 
</section> 
</template>
<style scoped lang="scss">  

.warning{
    font-size: 12px;
    font-weight: bold;
}

.metodos {
    margin-top: 10px; 
    button {
        background-color: #000000;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: #FFD115;   
        width: 100%;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 40px;
    }  
    p {  
        font-size: 15px; 
        padding: 3px;  
        display: flex; 
        flex-direction: column;
        justify-content: space-between; 
    }  
}   
// Desktop  
@media screen and (min-width: 768px) { 

    .metodos {
        display:flex;
        justify-content: space-around;
        div { 
            width: 400px;
        }
        .tarjeta{ 
            background-color: #c7c7c7; 
            padding: 10px;
            border-radius: 5px;
            width:400px;
            form { 
                display: flex;
                flex-wrap: wrap; 
                margin-bottom: 10px; 
                input {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 3px;  
                    box-sizing: border-box;
                    background-color: rgb(245, 245, 245);
                } 
                p {
                    flex: 1 0 calc(50% - 10px);
                    font-size: 18px;
                    max-width: 400px;
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between; 
                }
            } 
        }
    }  
}
</style> 