<script setup>
import { storeToRefs } from "pinia";
import { usePrecheckingStore } from "@/stores/prechecking";

const storePrechecking = usePrecheckingStore();

const order = storePrechecking.prechecking;
</script>
<template>
  <section class="detalles-conductor">
    <h6>Detalles:</h6>
    <dl>
      <dt>Nombre:</dt>
      <dd>
        <input type="text" name="name" v-model="order.Name" />
      </dd>
    </dl>
    <dl>
      <dt>Correo:</dt>
      <dd>
        <input type="text" name="Renters_Email" v-model="order.Renters_Email" />
      </dd>
    </dl>
    <dl>
      <dt>Telefono:</dt>
      <dd>
        <input type="text" name="Phone_Number" v-model="order.Phone_Number" />
      </dd>
    </dl>
    <dl>
      <dt>Licencia:</dt>
      <input type="text" name="Licencia" v-model="order.Licencia" />
    </dl>
  </section>
</template>

<style scoped lang="scss">
.detalles-conductor{
  background-color:white;
  border-radius: 5px; 
  padding: 5px; 
  min-width: 350px; 
  margin:5px;
  line-height: 1.5;
  input {
    padding: 10px 20px; 
    border-radius: 3px; 
    width: 100%;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245); 
    border-radius: 2px;  
    border: 1px solid rgb(145, 145, 145); 

}  
      
      .warning{
          font-size: 12px; 
          color: red;
          font-weight: bold;
      } 
  } 
// Desktop
@media screen and (min-width: 768px) {
    .detalles-conductor{
              
      border-radius: 2px;  
      border: 1px solid rgb(145, 145, 145); 
      background-color: white; 
      padding: 5px; 
      max-width: 900px; 
      margin:0 auto;
      margin-top: 10px;
      margin-bottom: 10px;
      line-height: 1.5; 
          input {
              padding: 10px 20px; 
              border-radius: 3px; 
              width: 100%;
              box-sizing: border-box;
              background-color: rgb(245, 245, 245); 
              border-radius: 2px;  
              border: 1px solid rgb(145, 145, 145); 
        
          }   
  }
}
</style>
