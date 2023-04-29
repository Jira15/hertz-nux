<script setup>
import { getAssetURL } from "@/utils/get-asset-url";
import { storeToRefs } from "pinia";
import { usePrecheckingStore } from "@/stores/prechecking";
import moment from "moment";

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

useHead({
  title: "PreChecking Reserva | Hertz Rent a Car Panamá",
});
</script>
<template>
  <article class="manage-pedido">
    <h2>Tu reserva:</h2>
    <section class="info-pedido">
      <header>
        <div>
          <h3>
            {{ order.Res }}
          </h3>
          <em>{{ order.Class }}</em>
        </div>
        <figure>
          <!-- <img :src="getAssetURL(pedido.carro.imagen)" loading="lazy" /> -->
        </figure>
      </header>

      <!-- <section class="info-cliente">
        <h6>Detalles:</h6>
        <dl>
          <dt>Nombre:</dt>
          <dd>{{ pedido.nombre }} {{ pedido.apellido }}</dd>
        </dl>
        <dl>
          <dt>Correo:</dt>
          <dd>
            {{ pedido.email }}
          </dd>
        </dl>
        <dl>
          <dt>Telefono:</dt>
          <dd>
            {{ pedido.telefono }}
          </dd>
        </dl>
        <dl>
          <dt>Licencia:</dt>
          <dd>
            {{ pedido.licencia }}
          </dd>
        </dl>
      </section> -->

      <!-- <section class="info-sucursal">
        <h6>Sucursal:</h6>
        <dl>
          <dt>Retiro:<br />{{ pedido.retiro }}</dt>
          <dd>Retorno: <br />{{ pedido.retorno }}</dd>
        </dl>
        <dl>
          <dt>Día de Retiro:</dt>
          <dd>
            {{ fechaFormat(pedido.fecha_retiro) }}
          </dd>
        </dl>
        <dl>
          <dt>Día de Retorno:</dt>
          <dd>
            {{ fechaFormat(pedido.fecha_retorno) }}
          </dd>
        </dl>
        <dl>
          <dt>Drop-off</dt>
          <dd>
            {{ precioFormat(pedido.dropoff) }}
          </dd>
        </dl>
      </section> -->
      <!-- <section class="info-coberturas">
        <h6>Modelo:</h6>
        <dl>
          <dt>
            {{ pedido.carro.tipo }}
            {{ precioFormat(pedido.carro.precio_thrifty) }}  x{{  storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)  }} 
          </dt>
          <dd>
            {{
              precioFormat(
                pedido.carro.precio_thrifty *
                  storePedido.diffDias(pedido.fecha_retorno, pedido.fecha_retiro)
              )
            }}
          </dd>
        </dl>
        <h6>Coberturas:</h6>
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
        </dl>

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

        <h6>Sub-Total:</h6>

        <dl>
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
        </dl>

        <h6>Total:</h6>

        <dl>
          <dt></dt>
          <dd>B/. {{ pedido.total }}</dd>
        </dl>
      </section> -->
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
  background-color: white;
  box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
  border-radius: 5px;
  line-height: 20px;
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
