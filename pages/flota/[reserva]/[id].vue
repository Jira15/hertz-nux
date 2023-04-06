<script setup> 
import { getAssetURL } from "@/utils/get-asset-url";
import { usePedidoStore } from '@/stores/pedido';
 
const storePedido = usePedidoStore();
const route = useRoute();
const { getItemById } = useDirectusItems(); 
const auto = await  getItemById({
        collection: "flota",
        id: route.params.id, 
    });  
 
onMounted(() => {
    storePedido.pedido.carro = auto;
    storePedido.pedido.reserva = route.params.reserva; 
}) 
 


</script> 
<template>
    <main class="auto" >   
        <!-- <h1> {{ storePedido.pedido.reserva  }}</h1>   -->
            <article> 
                <CarroSeleccionado />
                <Desglose />  
                <footer v-if="storePedido.pedido.cobertura.precio > 0">
                    
                    <NuxtLink :to="'/flota/' +
                    'reserva/' +
                    'checkout/'"
                    >
                        <button>Siguiente</button>
                    </NuxtLink>  
                </footer> 
            </article> 
            <section class="coberturas">
                <Coberturas rules="required"  /> 
                <Extras /> 
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
}   
// Desktop  
@media screen and (min-width: 768px) { 
.auto {
    display: flex; 
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