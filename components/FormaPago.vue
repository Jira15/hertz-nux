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
        background-color: #047EFF;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: white;   
        width: 100%;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 40px;
    }
}

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
    .specs {
        display: none;    
        padding: 5px; 
        div {
            text-align: center; 
            text-transform:capitalize;
            width: 50px; 
        }
        dl {
            display: flex;
            font-size: 12px;
            font-weight: bold;
        }
        dd {  
            font-size: 12px; 
        } 
        dt {
            object-fit:contain;
        } 
        img{ 
            max-width:  15px;  
        } 
    }
    .detalles-conductor{
        background-color:white;
        border-radius: 5px; 
        padding: 5px; 
        min-width: 350px; 
        margin:5px;
        line-height: 1.5;
            form {
                margin-bottom: 10px;  
            p { 
                display: flex; 
                flex-direction: column;
                justify-content: space-between; 
            } 
            button {
                background-color: #047EFF;
                padding: 5px 15px;
                border-radius: 5px; 
                text-transform: uppercase;
                font-size: 16px;
                font-weight: 600;
                color: white;    
                text-align: center;
                cursor:pointer;
            } 
        }
    }
}   
// Desktop  
@media screen and (min-width: 768px) { 
    .tarjeta{
        margin-top: 50px;
    }
    .metodos {
        display:flex;
        justify-content: space-evenly;
       
    }
    .auto {
        display: flex;
        .detalles-conductor{
            background-color: white;
            border-radius: 5px; 
            padding: 5px; 
            width: 100%; 
            margin:5px;
            line-height: 1.5;
            
            form { 
                display: flex;
                flex-wrap: wrap; 
                margin-bottom: 10px; 
                input {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 3px; 
                    width: 100%;
                    box-sizing: border-box;
                    background-color: rgb(245, 245, 245);
                } 
                p {
                    flex: 1 0 calc(50% - 10px);
                    font-size: 18px;
                    max-width: 500px;
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between; 
                }
            }
        }
        
        article {
            background-color: white;
            border-radius: 5px; 
            padding: 5px;
            display: flex;
            flex-direction: column;
            min-width: 400px; 
            margin:10px; 
            // justify-content: space-around;
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