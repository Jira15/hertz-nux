<script setup>  
import { useCoberturasStore } from '@/stores/coberturas'
import { usePedidoStore } from '@/stores/pedido' 

const storePedido = usePedidoStore() 
const storeCoberturas = useCoberturasStore() 
const coberturas = computed(() => {
    return storeCoberturas.coberturas
}) 
onMounted(() => {
    storeCoberturas.fetchCoberturas(); 
}) 
</script> 
<template>
<main class="coberturas">   
    <h2>{{ $t('coberturasTitle') }}</h2> 
    <ul>
        <li v-for="cobertura in coberturas" :key="cobertura.id">
            <article> 
                <section class="cobertura-desc"> 
                    <img :src="'../_nuxt/assets/images/iconos/cdw.png'" loading="lazy" /> 
                    <div> 
                        <h3 v-on:click="cobertura.descripcion = !cobertura.descripcion" >
                            {{ cobertura.nombre }}
                            <span>i</span>
                        </h3> 
                        <Transition mode="out-in"> 
                            <p v-show="cobertura.descripcion === true">
                                {{ cobertura.explicacion }}
                            </p>
                        </Transition> 
                    </div>   
            
                </section> 
                
                <section class="cobertura-precio" v-if="storePedido.pedido.carro.tipo != 'Sedan'">  
                    <h4>B/. {{ cobertura.precio_2 }} <br /> {{ $t('porDia') }}</h4>  
                    <input required  type="radio" name="cobertura" v-model="storePedido.pedido.cobertura" :value="cobertura">
                </section>
                <section class="cobertura-precio" v-else> 
                    <h4>B/. {{ cobertura.precio }}  <br /> {{ $t('porDia') }}</h4>   
                    <input required  type="radio" name="cobertura" v-model="storePedido.pedido.cobertura" :value="cobertura">
                </section>
        
            </article>
        </li>  

        <li>
            <article>
                <section class="cobertura-desc">
                    <img :src="'../_nuxt/assets/images/iconos/asistencia.png'" loading="lazy" /> 
                    <div> 
                         
                        <h3>{{ $t('eraTitle') }}</h3>
                        <p>
                            {{ $t('eraDescription') }}
                        </p>
                    </div> 
                    <section class="cobertura-precio"> 
                        <h4>B/. 3.99 <br />  {{ $t('porDia') }}</h4>   
                    </section>
                </section>
            </article>
        </li> 
    </ul>  
</main> 
</template> 
<style scoped lang="scss">  
.coberturas { 
    max-width: 500px; 
    .cobertura-desc {
        display: flex; 
        justify-content: space-between; 
        padding: 10px;
        height: 100%; 
        width: 100%;
        align-items: center;
        h3 {
            margin-top:10px;
            font-weight: bold; 
            width: 100%; 
            font-size: 12px;
            text-transform: capitalize;
        } 
        span {
            font-size: 8px;
            background-color: #FFCF00;
            padding: 5px;
            border-radius: 5px 5px 5px 0px;
        }
        p {  
            font-size: 11px;
            text-align: justify; 
            font-family:Arial, Helvetica, sans-serif;
            font-weight: normal;
            padding: 5px;
            line-height: 1.2;
        }  
        img {
            object-fit:contain; 
            width: 60px;
        }  

        div { 
            cursor: pointer;
            display: flex; 
            justify-content: space-between; 
            width: 100%;
            flex-direction: column;
    
        }
    }

    .cobertura-precio { 
        background-color: #FFCF00;
        display: flex; 
        justify-content: space-between;  
        border-radius:0px  15px 15px 0px;  
        min-height: 100%;
    }


    ul li article {
        background-color: #F8F8F8;
        border-radius: 5px;  
        display: flex; 
        min-width: 350px; 
        margin:10px;
        padding: 0px; 
        border-radius:15px;  
        border: 1px solid rgb(145, 145, 145);  
        text-transform: capitalize;
    }   
} 
  // Desktop  
@media screen and (min-width: 768px) {
    .coberturas {
      
  
    }
}
</style>
