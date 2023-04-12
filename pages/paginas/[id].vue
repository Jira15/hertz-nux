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
        title: route.params.id + ' | Hertz Rent a car Panamá'
    });

</script> 
<template> 
    <ThePrompt/>
    <figure>
        <img :src="getAssetURL(pagina.banner_hertz)"  loading="lazy" />  
    </figure>
    <article class="page-content">     
            <h2>
                {{pagina.titulo }}
            </h2> 
            <div class="format-content"  v-html="pagina.contenido_hertz"></div> 
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
}  
figure { 
    img {
        object-fit:cover;
        width: 100%;
        height: 320px; 
        padding: 0;
        margin: 0;
    }
}

// Desktop  
@media screen and (min-width: 768px) { 
    .page-content {
        max-width: 1000px; 
    }
    
}
</style>
