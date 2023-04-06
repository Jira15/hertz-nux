<script setup>    
import { getAssetURL } from "@/utils/get-asset-url";
import { usePedidoStore } from '@/stores/pedido'; 
const storePedido = usePedidoStore(); 
const auto = computed(() => {
    return storePedido.pedido.carro
})  

</script> 
<template>
<section>  
    <header> 
        <div>  
            <h3>
                {{ auto.marca }} {{ auto.modelo }}  
            </h3>   
            <em>o similar</em> 
        </div> 
        <figure> 
            <img :src="getAssetURL(auto.imagen)"  loading="lazy" /> 
        </figure> 
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
</template>
<style scoped lang="scss">  
  /* autos flota id */  
    article {
        background-color: white;
        border-radius: 5px; 
        padding: 5px;
        display: flex;
        flex-direction: column;
        min-width: 350px; 
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
        button {
            background-color: #047EFF;
            padding: 5px 15px;
            border-radius: 5px; 
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 600;
            color: white;    
            text-align: center;
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
// Desktop  
@media screen and (min-width: 768px) {  
 
    article {
        background-color: white;
        border-radius: 5px; 
        padding: 5px;
        display: flex;
        flex-direction: column;
        min-width: 400px; 
        margin:10px; 
        height:100%;
        // justify-content: space-around;
    }
    header { 
        display: flex;
        flex-direction: column;  
    } 
    img {
        object-fit:contain;
 
        padding: 0px;
        border-radius: 5px; 
    } //650 x 411
    .specs { 
        display:flex; 
        div {
            text-align: center; 
            text-transform:capitalize;
            width: 90px;  
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
</style> 