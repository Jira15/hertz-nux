<script setup>   
import { usePedidoStore } from '@/stores/pedido';    
useHead({
        title: 'Gracias | Thrifty Car Rental Panamá'
    });


 
onMounted(() => {
    // usePedidoStore.$reset();
}) 


</script>  



<template>
<main class="gracias"> 
    <h2>Gracias por tu reserva</h2>
    <p>Tu Reserva esta siendo procesada pronto recibiras un correo con los detalles.</p> 
</main> 
</template>


<style scoped lang="scss">

.gracias { 
    display: flex;
    flex-direction: column; 
    padding: 10px; 
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color:white;
    box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
    border-radius: 5px; 
    line-height: 20px;    
    h2 {
        margin: 20px;
        font-size: 28px;
        font-weight: bold;
    }
    h3 {
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 20px;
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 250px;
        border-radius: 5px;
    }

    .info-pedido {
        display: flex;
        flex-direction: column; 
        line-height: 1.5;
        h6 {
            font-weight:bold;
            background-color: #cde4ff;
        }
        dl {
            display: flex;
            justify-content: space-between;
            background-color: #f8fbff; 
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
        .extras { 
            flex-direction: column; 
            div {
                display: flex;
                justify-content: space-between;
            }
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

}  
// Desktop  
@media screen and (min-width: 768px) { 

    .gracias { 
        display: flex;
        flex-direction: column;  
        margin:0 auto;
        margin-top: 100px;
        margin-bottom: 100px; 
        max-width: 1000px;
        padding: 50px;
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
        .info-pedido {
            display: flex;
            flex-direction: column; 
            line-height: 1.5;
            h6 {
                font-weight:bold;
                background-color: #cde4ff;
            }
            dl {
                display: flex;
                justify-content: space-between;
                background-color: #f8fbff; 
            }
            header { 
                display:contents; 
                margin-bottom: 0px; 
                div { 
                    justify-content: space-around;
                }
            }
            h3 {
                font-weight: bold;
                font-size: 34px;   
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
                height: 260px;
                padding: 5px;
                border-radius: 5px;
            }
            .extras { 
                flex-direction: column; 
                div {
                    display: flex;
                    justify-content: space-between;
                }
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
        }
    
        .metodos {
            margin-top: 40px; 
            display: flex;
            width: 100%; 
            justify-content: space-around; 
        }
    
    }  
}
</style>
