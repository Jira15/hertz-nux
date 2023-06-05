<script setup>
import { usePedidoStore } from "@/stores/pedido";
import moment from "moment";
import MoneyFormat from "vue-money-format";
const pedidoStore = usePedidoStore();

const pedido = computed(() => {
  return pedidoStore.pedido;
});
const precioDropoff = computed(() => {
  return (pedidoStore.pedido.dropoff = pedidoStore.checkDropoff(
    pedidoStore.pedido.sucursal.LocationCode,
    pedidoStore.pedido.sucursalRetorno.LocationCode
  ));
});

const totalDeDias = computed(() => {
  return (pedidoStore.pedido.totalDeDias = pedidoStore.diffDias(
    pedidoStore.pedido.diaRetorno,
    pedidoStore.pedido.diaRetiro
  ));
});

const impuestoPedido = computed(() => {
  return (pedidoStore.pedido.impuesto = pedidoStore.impuesto());
});
const impuestoAeropuerto = computed(() => {
  return (pedidoStore.pedido.impuesto_aeropuerto = pedidoStore.impuestoAeropuerto());
});
const subTotal = computed(() => {
  return (pedidoStore.pedido.sub_total = pedidoStore.subTotal());
});
const totalPedido = computed(() => {
  return (pedidoStore.pedido.total = pedidoStore.total());
});

const fechaFormat = function (value) {
  if (value) {
    return moment(value).format("DD MMM YYYY hh:mm A");
  }
};

const horaFormat = function (value) {
  if (value) {
    return moment(value).format("hh:mm A");
  }
};

const precioFormat = function (value) {
  if (value) {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
};

function toUSDFormat(decimal) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    decimal
  );
}

const prepago = function (precio, descuentoPrepago) {
  let descuento = descuentoPrepago;
  const descuentoCalculado = precio * (descuento / 100);
  const nuevoPrecio = precio - descuentoCalculado;
  // console.log(
  //   "precio" +
  //     precio +
  //     "descuento" +
  //     descuento +
  //     "descuento calculado" +
  //     descuentoCalculado +
  //     "nuevo precio" +
  //     nuevoPrecio
  // );
  // // Calculate tax due
  // const impuestoADeber = nuevoSubtotal * (impuesto / 100);
  // // Calculate final price
  // const impuestoSumado = nuevoSubtotal * (1 + (impuesto / 100));
  pedidoStore.pedido.carro.precio_prepago = nuevoPrecio;
  return nuevoPrecio.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

onMounted(() => {
  pedidoStore.pedido.totalDeDias = pedidoStore.diffDias(
    pedidoStore.pedido.diaRetorno,
    pedidoStore.pedido.diaRetiro
  );
});
</script>
<script>
export default {
  components: {
    "money-format": MoneyFormat,
  },
};
</script>
<template>
  <section class="desglose">
    <h6> {{ $t('detalles') }}:</h6>
    <dl>
      <dt> {{ $t('retiro') }}:<br />{{ pedido.sucursal.name }}</dt>
      <dd> {{ $t('retorno') }}: <br />{{ pedido.sucursalRetorno.name }}</dd>
    </dl>
    <!-- <dl>
                <dt>
                    Días Reservados:
                </dt> 
                <dd>
                    {{ totalDeDias }}
                </dd>
            </dl>   -->
    <dl>
      <dt>{{ $t('diaDeRetiro') }}:</dt>
      <dd>
        {{ fechaFormat(pedido.diaRetiro) }}
      </dd>
    </dl>
    <dl>
      <dt>{{ $t('diaDeRetorno') }}:</dt>
      <dd>
        {{ fechaFormat(pedido.diaRetorno) }}
      </dd>
    </dl>
    <dl v-if="precioDropoff > 0">
      <dt>Drop-off</dt>
      <dd>
        {{ toUSDFormat(precioDropoff) }}
      </dd>
    </dl>

    <h6>{{ $t('modelo') }}:</h6>
    <dl>
      <dt>{{ pedido.carro.marca }} {{ pedido.carro.modelo }}</dt>
      <dd v-if="pedido.reserva === 'prepago'">
        {{
          prepago(
            pedido.carro.precio_hertz *
              pedidoStore.diffDias(pedido.diaRetorno, pedido.diaRetiro),
            pedido.carro.descuento_prepago
          )
        }}
      </dd>
      <dd v-else>
        {{
          precioFormat(
            pedido.carro.precio_hertz *
              pedidoStore.diffDias(pedido.diaRetorno, pedido.diaRetiro)
          )
        }}
      </dd>
    </dl>
    <h6>{{ $t('coberturasTitle') }}:</h6>

    <dl v-if="pedido.carro.tipo != 'Sedan'">
      <dt v-if="pedido.cobertura.nombre">
        {{ pedido.cobertura.nombre }}
      </dt>
      <dd>
        {{
          toUSDFormat(
            pedido.cobertura.precio_2 *
              pedidoStore.diffDias(pedido.diaRetorno, pedido.diaRetiro)
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
          toUSDFormat(
            pedido.cobertura.precio *
              pedidoStore.diffDias(pedido.diaRetorno, pedido.diaRetiro)
          )
        }}
      </dd>
    </dl>
    <dl>
      <dt>{{ $t('eraTitle') }}</dt>
      <dd>
        {{
          toUSDFormat(
            pedido.era * pedidoStore.diffDias(pedido.diaRetorno, pedido.diaRetiro)
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
            toUSDFormat(
              extra.precio * pedidoStore.diffDias(pedido.diaRetorno, pedido.diaRetiro)
            )
          }}
        </dd>
      </div>
    </dl>

    <h6>Sub-Total:</h6>
    <dl>
      <dt>Sub-Total</dt>
      <dd>
        {{ toUSDFormat(subTotal) }}
      </dd>
    </dl>
    <dl v-if="impuestoAeropuerto > 0">
      <dt>{{ $t('impuestoAeropuertos') }}</dt>
      <dd>
        {{ toUSDFormat(impuestoAeropuerto) }}
      </dd>
    </dl>
    <dl>
      <dt>ITBMS</dt>
      <dd>
        {{ toUSDFormat(impuestoPedido) }}
      </dd>
    </dl>
    <h6>Total:</h6>
    <dl v-if="totalPedido">
      <dt></dt>
      <dd>$ {{ totalPedido  }}</dd>
    </dl>

    <dl v-if="!pedido.cobertura.precio">
      <dt class="warn">{{ $t('warningCobertura') }} </dt>
      <dd></dd>
    </dl>
  </section>
</template>
<style lang="scss">
.desglose {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  .warn {
    font-weight: bold;
    font-size: 14px;
  }
  h6 {
    font-weight: bold;
    border-bottom: 2px solid #747474;
  }
  dl {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
  }
  .extras {
    flex-direction: column;
    div {
      display: flex;
      justify-content: space-between;
    }
  }
  button {
    background-color: #ffd115;
    padding: 5px 15px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    color: white;
    width: 100%;
    text-align: center;
  }
}

@media screen and (min-width: 768px) {
  .desglose {
    flex: 1;
    display: flex;
    flex-direction: column;
    line-height: 1;
    padding: 3px;
    justify-content: space-between;
  }
}
</style>
