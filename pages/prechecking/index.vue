<script setup>
import { storeToRefs } from "pinia";
import { usePrecheckingStore } from "@/stores/prechecking";

const storePrechecking = usePrecheckingStore();
</script>

<template> 
  <article class="pagar-pedido">
    
    <form @submit="toReserva">
      <h2>Para Empezar sólo ingresa el número de la reserva:</h2>
      <fieldset> 
        <input type="text" v-model="storePrechecking.Res" required />
        <NuxtLink :to="'/prechecking/' + storePrechecking.Res">
          <button>Siguiente</button>
        </NuxtLink>
      </fieldset>
    </form>

    <!-- <p>
      Al retirar el vehículo, al conductor principal se le bloqueará un depósito de
      seguridad en su tarjeta de crédito dependiendo de la categoría del auto. No se
      aceptarán tarjetas de débito ni dinero en metálico. El personal de la oficina
      confirmará la cantidad exacta del depósito. Tarjetas aceptadas para el deposito:
      American Express, MasterCard y Visa.
    </p>

    <em>
      Importante: No se aceptan tarjetas virtuales, ni cualquier otro tipo de tarjeta que
      no tenga el estampado en relieve.
    </em> -->
  </article>
</template>
<style scoped lang="scss">
figure {
  img {
    object-fit: cover;
    width: 100%;
    padding: 0;
    margin: 0;
  }
}
.pagar-pedido {
  background-image: url("@/assets/images/prechecking2.jpg");
  background-size:contain;
  display: flex;
  flex-direction: column;
  padding: 20px;   
  line-height: 1;
  width: 100%;
  min-height: 90vh;
  background-repeat:no-repeat;
  h2 {
    margin: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  p {
    text-align: justify;
    padding: 20px;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 250px;
    border-radius: 5px;
  }
  form {
    padding: 20px;
    margin: 0 auto;
    margin-top: 200px;
    background-color: #ffffff;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.308);
    border-radius: 20px; 
    fieldset {
      display: flex; 
      justify-content: space-around;
      input {
        padding: 5px 0px 5px 0px; 
        height: 40px;
        text-align: center;
        border-radius: 8px;
        border: 1px solid darkgray;
        margin-bottom: 10px; 
        width: 200px;
      }
      button {
        background-color: #458EFF; 
        height: 50px;
        width: 200px;
        padding: 5px 15px;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: #fff; 
        text-align: center;  
      }
    }
  }
   
  em {
    font-style: italic;
    font-size: 14px;
  }
}
// Desktop
@media screen and (min-width: 768px) {
  .pagar-pedido {
    display: flex;
    flex-direction: column; 

    h2 {
      margin: 20px;
      font-size: 28px;
      font-weight: bold;
    }
    h3 {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 0px;
    }
  }
}
</style>
