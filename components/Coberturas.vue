 
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
<h2>Coberturas</h2>
<section>  
    <ul>
        <li v-for="cobertura in coberturas" :key="cobertura.id">
            <article> 
                <div> 
                    <header>  
                        <h3 v-on:click="cobertura.descripcion = !cobertura.descripcion" >{{ cobertura.nombre }} <span>i</span></h3>
                         
                    </header>   
                    <Transition mode="out-in"> 
                        <p v-show="cobertura.descripcion === true">
                            {{ cobertura.explicacion }}
                        </p>
                    </Transition> 
                </div>
               
                <footer v-if="storePedido.pedido.carro.tipo != 'Sedan'"> 
                    <input required  type="radio" name="cobertura" v-model="storePedido.pedido.cobertura" :value="cobertura">
                    <h4>B/. {{ cobertura.precio_2 }} / por día</h4>  
                </footer>
                <footer  v-else> 
                    <input required  type="radio" name="cobertura" v-model="storePedido.pedido.cobertura" :value="cobertura">
                    <h4>B/. {{ cobertura.precio }} / por día</h4>  
                </footer>
        
            </article>
        </li>  
        <li>
            <article>
                <div>
                <header>  
                    <h3>Asistencia Vial(ERA)</h3>
                </header> 
                    <p>
                        ERA | ASISTENCIA VIAL Esta cobertura ofrece a EL ARRENDATARIO los siguientes servicios de asistencia en carretera sin cargo alguno: Pérdida de llave del automóvil, servicio de grúa, reemplazo de neumático, asistencia al quedarse sin combustible o sin batería. El tiempo de respuesta por parte de LA ARRENDADORA está sujeto al día, hora y ubicación del incidente.
                    </p>
                </div>
                <footer> 
                    <h4>B/. 3.99 / por día</h4>  
                </footer>
            </article>
        </li> 
        </ul> 
    </section> 
</main> 
</template> 
<style scoped lang="scss">  
.coberturas {  
    ul li article {
        background-color: rgba(255, 255, 255, 0.644);
        border-radius: 5px;  
        display: flex;
        flex-direction: column;
        min-width: 350px; 
        margin:10px;
        padding: 0px;
    } 
    header { 
        display: flex;
        text-align: center;  
            cursor: pointer;
            span{ 
                background-color: #8aacc5;
                border: none;
                border-radius: 15px 15px 15px 0px;
                color: white;
                font-weight: bold;
                font-family: initial;
                font-size: 11px; 
                padding: 3px 3px 0px 3px; 
            } 
    }
    h2 {
        font-weight: bold;
        font-size: 32px; 
        margin-top: 20px; 
        padding-left:10px;
        width: 100%; 
    } 
    h3 {
        margin-top:10px;
        font-weight: bold;
        font-size: 24px;  
        width: 100%; 
    } 
    em {
        font-size: 24px;
        color: gray;
        font-style: italic; 
    }
    p {  
    font-size: 12px;
    text-align: justify;
    padding: 10px;
    }  
    img {
        object-fit:contain;
        width: 100%;
        height: 200px;
        border-radius: 5px;
    } 
    footer {
    text-align: center;
    justify-content: space-around; 
    display: flex;
    width: 100%;
    background-color: #b3d7ff;
    padding: 10px;
        h4 {
            font-size: 20px;
            font-weight:bold;
        } 
        em {
            font-size: 24px;
            color: rgb(3, 3, 3);
            font-style:normal;
        }  
    } 
} 
  // Desktop  
@media screen and (min-width: 768px) {
    .coberturas {  
        ul li article {
            background-color: rgba(255, 255, 255, 0.644);
            border-radius: 5px;  
            display: flex; 
            flex-direction: row-reverse; 
            margin:10px;
            padding: 0px;
            justify-content: space-between;
        } 
        div{
            width: 100%; 
    
        } 
        footer {  
            align-items: center;
            max-width: 150px;
        } 
    } 
}
</style>
