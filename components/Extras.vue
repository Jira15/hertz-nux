<template>

    <main class="extras">   
        <h2>Extras</h2>
        <section> 
            <ul>
                <li>
                    <article  v-for="extra in extras" :key="extra.id"> 
                        <header>  
                            <h3> {{ extra.nombre }} </h3>
                        </header>  
                        <footer> 
                            <input type="checkbox" :value="extra" v-model="pedidoStore.pedido.extras"  >
                            <h4>B/.{{ extra.precio }} / {{ $t('porDia') }}</h4>  
                        </footer> 
                    </article>
                </li>  
            </ul> 
        </section>
        
        </main>  
</template> 
<script setup lang="ts"> 
import { computed, ref } from 'vue'
import { useExtrasStore } from "@/stores/extras";
import { usePedidoStore } from "@/stores/pedido";
import { storeToRefs } from 'pinia'
const extrasStore = useExtrasStore()
const pedidoStore = usePedidoStore() 
 

const extras = computed(() => {
    return  extrasStore.extras
}) 


onMounted(() => {
    extrasStore.fetchExtras(); 
}) 
const selectedExtras = ref([])

function addSelectedExtras() {
  selectedExtras.value.forEach(extra => {
    pedidoStore.addExtra(extra)
  })
  selectedExtras.value = []
}
</script>
 


<style scoped lang="scss">  
.extras {  
    ul li article {
        background-color:white;
        border-radius: 5px;  
        display: flex;
        flex-direction: column; 
        margin:10px;
        padding: 0px; 
        
        border-radius: 2px;  
        border: 1px solid rgb(145, 145, 145); 
    } 
    header { 
        display: flex;
        text-align: center; 
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
        font-size:18px;  
        width: 100%; 
    }  
    footer {
    text-align: center;
    justify-content: space-around; 
    display: flex;
    width: 100%;
    background-color: #FFD115;
    padding: 10px;
        h4 {
            font-size: 18px;
            font-weight:bold;
        }  
    } 
} 
  // Desktop  
@media screen and (min-width: 768px) { 

    .extras { 
        max-width: 200px;
        footer h4 {
            font-size: 16px;
        }
        ul li article { 
            border-radius: 5px;  
            display: flex;
            margin:2px;
            padding: 0px;
            justify-content: space-between;
            width: 100%;
            
        border-radius: 2px;  
        border: 1px solid rgb(145, 145, 145); 
        } 
        ul {     
            padding: 10px;
        } 
        ul li   { 
            display: flex; 
            
            flex-direction: column;
            
        } 
    } 
}
</style> 