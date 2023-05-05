<script setup>
import { getAssetURL } from "@/utils/get-asset-url";
import { storeToRefs } from "pinia";
import { usePrecheckingStore } from "@/stores/prechecking";
import { useActualizarStore } from "@/stores/actualizar";
import { useTarjetaStore } from "@/stores/tarjeta";
import { usePaypalStore } from "@/stores/paypal";
import moment from "moment";

const storePaypal = usePaypalStore();
const storeActualizar = useActualizarStore();
const storeTarjeta = useTarjetaStore();
const storePrechecking = usePrecheckingStore();
const { getItemById, getItems } = useDirectusItems();

// const getPedido = computed(() => {
//   return storePedido.getPedido;
// });

const route = useRoute();
// const pedido = await getItemById({
//         collection: "pedidos",
//         id:  route.params.id,
//         // id: route.params.id,
//     });
let filters = { Res: route.params.id };
const prechecking = await getItems({
  collection: "prechecking",
  params: {
    filter: filters,
  },
});
const order = prechecking[0];
onMounted(() => {
  storePrechecking.prechecking = order;
});
const fechaFormat = function (value) {
  if (value) {
    return moment(value).format("DD MMM YYYY hh:mm A");
  }
};
const precioFormat = function (value) {
  if (value) {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
};

const baseUrl = "@/assets/images/modelos/";
useHead({
  title: "PreChecking Reserva | Hertz Rent a Car Panamá",
});
</script>
<template>
  <article class="manage-pedido">
    <section class="status-pedido">
      <button
        class="prechecking-btn"
        type="submit"
        v-if="order.status === 'Pendiente de Prechecking'"
        @click="storePrechecking.onPrechecking"
      >
        Comenzar Prechecking
      </button>
      <button class="prepaid-btn" type="submit" @click="storePrechecking.onPrechecking">
        Deseo pagar mi reserva
      </button>

      <button class="cancelar-btn" type="submit" @click="storePrechecking.onPrechecking">
        Cancelar mi reserva
      </button>
    </section>

    <section class="info-pedido">
      <div>
        <div class="status" v-if="order.status === 'Pendiente de Pago'">
          <h4>Esta reserva aun no esta paga</h4>
        </div>
        <div class="status" v-if="order.status === 'Pendiente de Prechecking'">
          <h4>Pendiente de Prechecking</h4>
        </div>
        <div class="status" v-if="order.status === 'Prechecking Pagado'">
          <h4>Esta reserva ya esta paga y en Prechecking</h4>
        </div>
        <div class="status" v-if="order.status === 'Prechecking Sin Pago'">
          <h4>Ya hiciste tu prechecking</h4>
        </div>

        <h3>Tu reserva: {{ order.Res }}</h3>
        <em>{{ order.Class }}</em>
        <h6>Modelo:</h6>
        <dl>
          <dt>
            {{ order.Class }}

            <!-- {{ precioFormat(pedido.carro.precio_thrifty) }}  x{{  storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)  }}  -->
          </dt>
          <dd>
            {{ order.Rate_Day }}
            <!-- {{
              precioFormat(
                pedido.carro.precio_thrifty *
                  storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)
              )
            }} -->
          </dd>
        </dl>
      </div>
      <figure>
        <img
          :src="'../_nuxt/assets/images/modelos/' + order.Class + '.png'"
          loading="lazy"
        />
        <!-- <img :src="getAssetURL(order.Class)" loading="lazy" /> -->
      </figure>
    </section>
    <section class="info-cliente">
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
    <h6>Sucursal:</h6>
    <section class="info-sucursal">
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
      <!-- <dl>
          <dt>Drop-off</dt>
          <dd>
            {{ precioFormat(order.dropoff) }}
          </dd>
        </dl> -->
    </section>
    <section class="info-coberturas">
      <Coberturas />

      <!-- <h6>Coberturas:</h6>
        <dl v-if="pedido.carro.tipo != 'Sedan'">
          <dt>
            {{ pedido.cobertura.nombre }}
          </dt>
          <dd>
            {{
              precioFormat(
                pedido.cobertura.precio_2 *
                  storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)
              )
            }}
          </dd>
        </dl>
        <dl v-else>
          <dt>
            {{ pedido.cobertura.nombre }}
          </dt>
          <dd>
            {{
              precioFormat(
                pedido.cobertura.precio *
                  storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)
              )
            }}
          </dd>
        </dl>
        <dl>
          <dt>Asistencia Vial(ERA)</dt>
          <dd>
            {{
              precioFormat(
                pedido.era *
                  storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)
              )
            }}
          </dd>
        </dl> -->
    </section>

    <section class="info-extras">
      <Extras />

      <!--
        <h6>Extras:</h6>
        <dl v-if="pedido.extras" class="extras">
          <div v-for="extra in pedido.extras">
            <dt>
              {{ extra.nombre }}
            </dt>
            <dd>
              {{
                precioFormat(
                  extra.precio *
                    storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)
                )
              }}
            </dd>
          </div>
        </dl>
-->
    </section>

    <section class="total">
      <!-- <dl> 
        <dt></dt>
        <dd>B/. {{ pedido.sub_total }}</dd>
      </dl>

      <div v-if="pedido.impuesto_aeropuerto > 0">
        <h6>Impuesto de Aeropuerto:</h6>

        <dl>
          <dt></dt>
          <dd>B/. {{ pedido.impuesto_aeropuerto }}</dd>
        </dl>
      </div>

      <h6>Impuesto:</h6>

      <dl>
        <dt></dt>
        <dd>B/. {{ pedido.impuesto }}</dd>
      </dl> -->

      <h6>Total:</h6>

      <dl>
        <dt></dt>
        <dd>B/. {{ order.Est_Total }}</dd>
      </dl>
    </section>

    <section class="metodos" v-if="order.status === 'Pendiente de Prechecking'">
      <section class="tarjeta">
        <p>
          <label>Número de la Tarjeta</label>
          <input
            type="text"
            placeholder="0000 0000 0000 000"
            name="ccnumber"
            v-model="storeTarjeta.tarjeta.ccnumber"
          />
        </p>
        <p>
          <label>Fecha de Expiración</label>
          <input
            type="text"
            placeholder="01 / 26"
            name="ccexp"
            class="ccexp"
            v-model="storeTarjeta.tarjeta.ccexp"
          />
        </p>
        <p>
          <label>CCV</label>
          <input
            type="text"
            placeholder="123"
            name="cvv"
            class="cvv"
            v-model="storeTarjeta.tarjeta.cvv"
          />
        </p>
        <button type="submit" @click="storeTarjeta.onSubmit">Pagar</button>
      </section>

      <div id="paypal-button"></div>
    </section>
  </article>
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
    margin: 20px;
    font-size: 28px;
    font-weight: bold;
  }
  h3 {
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
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
      font-size: 34px;
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
