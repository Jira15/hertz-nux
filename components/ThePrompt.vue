<script setup> 
import { useSearchStore } from '@/stores/search';
const route = useRoute();
const storeSearch = useSearchStore(); 

onMounted(() => { 
    storeSearch.searchIs = 'ThePrompt';
})


</script> 
<template>
<aside class="prompt"> 
    <Transition mode="out-in"> 
        <header  v-if="storeSearch.searchIs === 'ThePrompt'">
            <h2  @click="storeSearch.searchIs = 'TheSearch'"> 
                Haz Tu reserva
            </h2> 
        </header>  
        <div v-else-if="storeSearch.searchIs === 'TheSearch' "><TheSearch /></div> 
        <div v-else-if="storeSearch.searchIs === 'TheProgress'"><TheProgress  /></div> 
    </Transition>

</aside>

</template> 
<style lang="scss">
.slot-icon {
    height: 12px;
    width: auto;
    padding-left: 5px;
}
.prompt {   
    background: #FFD115;
    padding: 15px;
    box-sizing: border-box;   
    width: 100%;    
    display:flex; 
    flex-direction: column; 
    text-transform: uppercase; 
    color: white;
    align-items: center;
    z-index: 999999;
    h2 {
        font-size: 20px; 
        font-weight: bold;
        padding: 0.2rem;
        cursor: pointer;
    } 
    legend {
        font-size: 14px;
        font-weight: bold; 
    } 
    
    section {
        padding: 0.5rem;
        font-weight: bold;
        font-size: 14px;  
    } 
    select { 
        width: 100%;
        height: 40px;
    }   
}  
.fechas{
    display: flex;
    justify-content: space-between;
    
    .hora {
        margin-left: 30px;
        width:150px
    }
}

.sucursales h2 {
    font-size: 16px;
}

.siguiente { 
    padding: 8px; 
}  

.verificar { 
    padding: 10px;  
    font-weight: bold;
    font-size: 14px;
    background:#FFD115;
    color: white; 
    align-self: flex-end; 
}  

// Desktop  
@media screen and (min-width: 768px) { 
    .siguiente {    
        align-self: flex-end;
        margin-bottom: 10px;
    } 
    .prompt {    
        display: flex;  
        margin-top: -5px;  
        width: 100%; 
        footer 
        {
            align-self: end;
        }
    }
} 
</style>