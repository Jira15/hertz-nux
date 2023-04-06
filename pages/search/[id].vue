<script setup>
  
  const route = useRoute()
      
</script>
<template>
  <h2>search sucursal ID {{ route.params.sucursal }}</h2>
    <h1> {{ route.params }}</h1>  
</template>