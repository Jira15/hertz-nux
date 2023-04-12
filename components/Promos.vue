<script setup>
import { getAssetURL } from "@/utils/get-asset-url"; 

const { getItems } = useDirectusItems();

const promos = await getItems({ collection: "promos_hertz" });
</script>

 
<template>
<section class="promos">
    <article v-for="promo in promos" class="blocks" :key="promo.id">
        <figure><img :src="getAssetURL(promo.imagen)"/></figure>
 
    </article>   
</section>
</template>

<style lang="scss" scoped>
.promos{
    grid-area: content;
    display: flex;
    flex-direction: column;
    width:100%; 
    margin-top: 20px;
    margin-bottom: 20px; 
    .blocks{
        display: flex;
        place-items: center; 
        justify-content: space-between; 
        max-width: 1200px;
    } 
    figure {
        flex:1; 
        text-align: center; 
    } 
    button {
        background-color: #FFD115;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: rgb(0, 0, 0); 
        line-height: 18px;
        margin-top: 20px; 
    }
} 
// Desktop  
@media screen and (min-width: 768px) {  
    .promos{
        grid-area: content;
        display: flex;
        flex-direction: row;
        width:100%; 
        margin-top: 20px;
        margin-bottom: 20px; 
    .blocks{
            display: flex;
            place-items: center;  
            margin: 0 auto;
            margin-top: 10px;
            margin-bottom: 10px;  
            max-width: 1200px;
        } 
    } 
}
</style>
