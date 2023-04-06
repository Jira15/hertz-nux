<script setup>
import { getAssetURL } from "@/utils/get-asset-url";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const { getItems } = useDirectusItems();

const banner = await getItems({ collection: "banner_hertz" });
</script>

<template>   
<section class="banner" id="nserv"> 
    <vueper-slides :slide-ratio="1 / 2" fixed-height="350px" :arrows="false" :bullets="false" autoplay> 
        <vueper-slide v-for="banner in banner"
        :key="banner.id"  :image="getAssetURL(banner.banner)" />
    </vueper-slides> 
</section> 
</template>  

<style scoped lang="scss"> 
.vueperslides--fixed-height { height: 350px; }
.banner {
    height: 350px;
    overflow: hidden;  
    img { 
        object-fit:fill; 
        margin: 0 auto;
        width: 100%;
      } 
    grid-area: banner;
} 
@media screen and (max-width: 768px) { 
    
}
</style> 