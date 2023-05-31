<script setup>
import { usePrecheckingStore } from "@/stores/prechecking";
const storePrechecking = usePrecheckingStore();

const order = storePrechecking.prechecking;
</script>
<template>

  <section class="status-pedido">
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
        <!-- <img :src="getAssetURL(order.Class)" loading="lazy" /> -->
      </figure>
    </div>


    
  
  <section class="info-pedido">
    <h6>Detalles:</h6>
    <dl>
      <dt>Categoria:</dt>
      <dd>
        {{ order.Class }}
      </dd>
    </dl>
    <div>
      <dl>
        <dt>Retiro:</dt>
        <dd>{{ order.Pickup_Location }}</dd>
      </dl>

      <dl>
        <dt>Día de Retiro:</dt>
        <dd>{{ order.Pickup_Date }} {{ order.Pickup_Time }}:00</dd>
      </dl>
    </div>

    <div>
      <dl>
        <dt>Retorno:</dt>
        <dd>{{ order.Due_Back_Location }}</dd>
      </dl>
      <dl>
        <dt>Día de Retorno:</dt>
        <dd>{{ order.Due_Date }} {{ order.Due_Time }}:00</dd>
      </dl>
    </div>
    <dl>
      <dt>Total:</dt>
      <dd>B/. {{ order.Est_Total }}</dd>
    </dl>
  </section>



 
  </section>


 
</template>

<style scoped lang="scss">
.manage-pedido {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  line-height: 20px;
  .status-pedido {
    display: flex;
    flex-direction: column;
    background: none;
    border: none;

    .prechecking-btn {
      color: #000000;
      background-color: #9cff88;
    }
    .prechecking-btn:hover {
      background-color: #ffd115;
      color: #000000;
    }

    .prepaid-btn {
    }
    .prepaid-btn:hover {
      background-color: #ffd115;
      color: #000000;
    }

    .cancelar-btn {
      background-color: #999999;
      color: #000000;
    }
    button {
      background-color: #000000;
      padding: 5px 15px;
      border-radius: 5px;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 600;
      color: #ffd115;
      width: 100%;
      text-align: center;
      margin: 10px;
      cursor: pointer;
    }
  }
  .info-sucursal {
    display: flex;
    justify-content: space-around;
  }
  section {
    background-color: #fff;
    margin-top: 10px;
    border-radius: 2px;
    border: 1px solid rgb(145, 145, 145);
    padding: 10px;
    button {
      background-color: #000000;
      padding: 5px 15px;
      border-radius: 5px;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 600;
      color: #ffd115;
      width: 100%;
      text-align: center;
    }
  }
  h2 {
    font-size: 28px;
    font-weight: bold;
  }
  h3 {
    font-weight: bold;
    font-size: 22px;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 250px;
    border-radius: 5px;
  }

  .info-pedido {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    h6 {
      font-weight: bold;
      background-color: #bebebe;
    }
    dl {
      display: flex;
      justify-content: space-between;
      background-color: #f8fbff;
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
    .extras {
      flex-direction: column;
      div {
        display: flex;
        justify-content: space-between;
      }
    }
    button {
      background-color: #000000;
      padding: 5px 15px;
      border-radius: 5px;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 600;
      color: #ffd115;
      width: 100%;
      text-align: center;
    }
  }

  .metodos {
    margin-top: 10px;
    button {
      background-color: #050505;
      padding: 5px 15px;
      border-radius: 5px;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 600;
      color: #ffd115;
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
    .tarjeta {
      background-color: #bebebe;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
      p {
        display: flex;
        flex-direction: column;
      }
      .ccexp {
        width: 60px;
      }
      .cvv {
        width: 50px;
      }
    }
  }
}
// Desktop
@media screen and (min-width: 768px) {
  .manage-pedido {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    max-width: 1000px;
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
    .info-pedido {
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      h6 {
        font-weight: bold;
        background-color: #e6e6e6;
      }
      dl {
        display: flex;
        justify-content: space-between;
        background-color: #f8fbff;
      }
      header {
        display: contents;
        margin-bottom: 0px;
        div {
          justify-content: space-around;
        }
      }
      h3 {
        font-weight: bold;
        font-size: 34px;
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
        height: 260px;
        padding: 5px;
        border-radius: 5px;
      }
      .extras {
        flex-direction: column;
        div {
          display: flex;
          justify-content: space-between;
        }
      }
      button {
        background-color: #000000;
        padding: 5px 15px;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: #ffd115;
        width: 100%;
        text-align: center;
      }
    }

    .metodos {
      margin-top: 40px;
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }
}
</style>
