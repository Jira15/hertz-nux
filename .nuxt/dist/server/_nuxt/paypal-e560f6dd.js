import { d as defineStore, u as useDirectusItems, e as useRouter } from "../server.mjs";
import "vue";
import "hookable";
import "destr";
import "devalue";
import { u as usePedidoStore } from "./pedido-45937ac8.js";
import { loadScript } from "@paypal/paypal-js";
import { h as hooks } from "./moment-470c4d3d.js";
const usePaypalStore = defineStore("paypal", () => {
  const { createItems, updateItem } = useDirectusItems();
  const storePedido = usePedidoStore();
  const totalPedido = storePedido.pedido.total;
  const router = useRouter();
  loadScript({
    "client-id": "AauU5ZBGbHQmw4NSSD3m8p_JC5an_3cscA7RZ52dH0YBZsKa5Za-X8aPlxf1FkowqAb0phFjjETUUnCl",
    "currency": "USD",
    "data-page-type": "checkout"
  }).then((paypal) => {
    paypal.Buttons({
      createOrder: function(data, actions) {
        const storePedido2 = usePedidoStore();
        const totalPedido2 = storePedido2.pedido.total;
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalPedido2
              // value: '88.88'
            },
            description: "Renta de Auto " + storePedido2.pedido.carro.modelo + " o " + storePedido2.pedido.carro.clasificacion + " - " + storePedido2.pedido.cobertura.nombre,
            custom_id: "Hertz Rent a Car",
            // // invoice_id: 'INV-0001',
            soft_descriptor: "Hertz Rent a Car"
            // items: [
            //     {
            //         name: 'Renta de Auto',
            //         quantity: '1',
            //         unit_amount: {
            //             currency_code: 'USD',
            //             value: totalPedido
            //         },
            //         category: 'PHYSICAL_GOODS'
            //     }, 
            // ], 
          }]
          // payer: { 
          //   payer_id: '',
          //   name: {
          //       given_name: '',
          //       surname: ''
          //     }, 
          // },
          // Id. del formato de pagoThrifty-8351-ODM1MQ==OV
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          var items = [
            {
              nombre: storePedido.pedido.cliente.nombre,
              apellido: storePedido.pedido.cliente.apellido,
              email: storePedido.pedido.cliente.email,
              telefono: storePedido.pedido.cliente.telefono,
              licencia: storePedido.pedido.cliente.licencia,
              nacimiento: storePedido.pedido.cliente.nacimiento,
              retiro: storePedido.pedido.sucursal.name,
              fecha_retiro: hooks(storePedido.pedido.diaRetiro).format(),
              retorno: storePedido.pedido.sucursalRetorno.name,
              fecha_retorno: hooks(storePedido.pedido.diaRetorno).format(),
              carro: storePedido.pedido.carro,
              cobertura: storePedido.pedido.cobertura,
              dropoff: storePedido.pedido.dropoff,
              sucursal_detail: storePedido.pedido.sucursal,
              sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
              extras: JSON.stringify(storePedido.pedido.extras),
              status: "Pagado",
              tipo_pago: "Paypal",
              total: totalPedido
            }
          ];
          if (storePedido.pedido.pedidos_id !== "") {
            console.log("Transacción Aprobada" + storePedido.pedido.pedidos_id);
            var status = { status: "Pagado", tipo_pago: "Paypal" };
            updateItem({
              collection: "pedidos_hertz",
              id: storePedido.pedido.pedidos_id,
              item: status
            });
            router.push("/thanks/");
          }
          createItems({ collection: "pedidos_hertz", items });
          router.push("/thanks/");
        });
      },
      onError: function(err) {
      }
    }).render("#paypal-button").catch((error) => {
      console.error("failed to render the PayPal Buttons", error);
    });
  }).catch((error) => {
    console.error("failed to load the PayPal JS SDK script", error);
  });
  return {};
});
export {
  usePaypalStore as u
};
//# sourceMappingURL=paypal-e560f6dd.js.map
