<script setup>
import { usePrecheckingStore } from "@/stores/prechecking";
const storePrechecking = usePrecheckingStore();

const order = storePrechecking.prechecking;
</script>
<template>
  
  <section class="info-pedido">
    <h6>Detalles:</h6>
    <dl>
      <dt>Categoria:</dt>
      <dd>
        {{ order.Class }}
      </dd>
    </dl> 
    <dl>
      <dt>Retiro:</dt>
      <dd>{{ order.Pickup_Location }}</dd>
    </dl> 
    <dl>
      <dt>Día de Retiro:</dt>
      <dd>{{ order.Pickup_Date }} {{ order.Pickup_Time }}:00</dd>
    </dl>  
    <dl>
      <dt>Retorno:</dt>
      <dd>{{ order.Due_Back_Location }}</dd>
    </dl>
      <dl>
        <dt>Día de Retorno:</dt>
        <dd>{{ order.Due_Date }} {{ order.Due_Time }}:00</dd>
      </dl> 
    <div class="total">
      <dl>
        <dt>Total:</dt>
        <dd>B/. {{ order.Est_Total }}</dd>
      </dl>
    </div>
  </section>



  <!-- <section class="status-pedido">
    <div>
      <div class="status" v-if="order.status === 'Pendiente de Pago'">
        <h4>Estatus: Esta reserva aun no esta paga</h4>
      </div>
      <div class="status" v-if="order.status === 'Pendiente de Prechecking'">
        <h4>Estatus: Pendiente de Prechecking</h4>
      </div>
      <div class="status" v-if="order.status === 'Prechecking Pagado'">
        <h4>Estatus:Esta reserva ya esta paga y en Prechecking</h4>
      </div>
      <div class="status" v-if="order.status === 'Prechecking Sin Pago'">
        <h4>Estatus:Ya hiciste tu prechecking</h4>
      </div>

      <figure>
        <img
          :src="'../_nuxt/assets/images/modelos/' + order.Class + '.png'"
          loading="lazy"
        />
      <img :src="getAssetURL(order.Class)" loading="lazy" />
      </figure>
    </div> 
  </section>  -->
</template>

<style scoped lang="scss">  

  .info-pedido {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    height: 100%; 
    justify-content: space-between;
    h6 {
      font-weight: bold;
      font-size: 16px;
    }
    dl {
      display: flex;
      justify-content: space-between; 
    }
    header {
      display: flex;
      text-align: center;
      margin-bottom: 10px;
      align-items: center;
    }
    h3 {
      font-weight: bold;
      font-size: 32px;
      width: 100%;
    }
    em {
      font-size: 24px;
      color: gray;
      font-style: italic;
    }
    p {
      font-size: 15px;
      padding: 3px;
    }
    img {
      object-fit: contain;
      width: 100%;
      height: 160px;
      padding: 5px;
      border-radius: 5px;
    }

    .total{
      padding: 20px; 
      font-size: 26px;
      font-weight: bold;
      text-transform: uppercase;
      background-color:#FFD002;
      border-radius: 20px; 
      box-shadow: 0 4px 18px 0 rgba(10, 10, 10, 0.384);
    }
    
  }
 
// Desktop
@media screen and (min-width: 768px) { 
   
}
</style>
