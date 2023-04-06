<script setup>   
import { getAssetURL } from "@/utils/get-asset-url";  
import { useLenguajesStore } from '@/stores/lenguajes'; 
const storeLenguaje = useLenguajesStore();
const route = useRoute()
const { getItemById } = useDirectusItems(); 
// const pagina = await  getItemById({
//         collection: "paginas",
//         id: route.params.id,
//     });  
    
const pagina = computed(() => {
    return storeLenguaje.paginas
})   
onMounted(() => {
    storeLenguaje.fetchPaginas(); 
    // storeLenguaje.setEN(); 

})

useHead({
        title: route.params.id + ' | Thrifty Car Rental Panamá'
    });

</script> 
<template> 
    <ThePrompt/>
    <article class="page-content">    
        <img :src="getAssetURL(pagina.banner)"  loading="lazy" />  
            <h2>
                {{pagina.titulo }}
            </h2> 
            <div class="format-content"  v-html="pagina.contenido"></div> 
    </article> 
</template>

<style scoped lang="scss">

.page-content { 
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
    section {
        margin: 20px;
    } 
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


}  
// Desktop  
@media screen and (min-width: 768px) { 
    .page-content {
        max-width: 1000px; 
    }
}
</style>
