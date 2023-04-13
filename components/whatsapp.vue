<script setup>
 
</script>

<template>   
<aside class="whatsapp-button">  
    <a href="https://api.whatsapp.com/send?phone=+50767689626&text=Hola!%20Quiero%20saber%20más%20sobre%20los%20servicios%20de%20Hertz" target="_blank" rel="noopener noreferrer"
    onclick="ga('send', 'event', 'WhatsApp Button', 'click', 'WhatsApp Link');"
>  
        <img src="@/assets/images/wapplogo.png" alt="whatsapp" />   
    </a> 
</aside> 
</template>  

<style scoped lang="scss">  
.whatsapp-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%; 
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 24px;
    z-index: 9999;
  }
  
  .whatsapp-button:hover {
    background-color: #25d366;
    color: #fff;
    text-decoration: none;
  }
@media screen and (max-width: 768px) { 
    
}
</style> 