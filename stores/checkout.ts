import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate'; 
import { usePedidoStore } from '@/stores/pedido';     
import { Pedido } from '~~/types/interfaces';   
import moment from 'moment'; 
import { checkoutSchema } from '@/types/checkout-schema-yup'; 
import { createProxyMiddleware }from 'http-proxy-middleware' 
import axios from 'axios';
import qs from 'qs';


export const useCheckoutStore = defineStore('checkout',  () => {  
    const { createItems } = useDirectusItems(); 
    const storePedido = usePedidoStore();
    const totalPedido = storePedido.total();  
 
    const metodos = ref('none')
 
    const tarjeta = ref( {
      ccnumber: '',
      ccexp: '',
      cvv: ''
  })
    const { errors, useFieldModel, handleSubmit, values } = useForm({
        validationSchema: checkoutSchema,
    });

    const [
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento
        ] = useFieldModel([
        'nombre',
        'apellido',
        'email',
        'telefono',
        'licencia',
        'nacimiento'
        ]);
 


        
async function onSubmit(values, origin) { 
    console.log('Submit', JSON.stringify(values, null, 2));
    //   console.log("Values", values);   
    const paramsQ = {
        'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
        'first_name': storePedido.pedido.cliente.nombre,
        'last_name': storePedido.pedido.cliente.apellido,
        'address1': storePedido.pedido.sucursal.name,
        'city': 'Panama City',
        'state': 'PTY',
        'zip' : '12345', 
        'shipping_first_name': storePedido.pedido.cliente.nombre,
        'shipping_last_name': storePedido.pedido.cliente.apellido,
        'shipping_address1': '987 State St',
        'shipping_city': 'Panama City',
        'shipping_state': 'PTY',
        'shipping_zip' : '98765', 
        'type': 'sale',
        'amount': storePedido.pedido.total,
        'ccnumber': this.tarjeta.ccnumber,  
        'ccexp': this.tarjeta.ccexp,
        'cvv': this.tarjeta.cvv
    }     
// Create a URL object with the base API endpoint
 

const url = new URL('/api/tarjeta',origin);

  // Add the query string parameters to the URL using URLSearchParams
// url.search = new URLSearchParams(qs.stringify(paramsQ)).toString(); 


console.log('Final URL:', url.toString()); // Log the final URL

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }, 
        // params: paramsQ 
      }; 



      

      try {
        // const response = await axios(url.toString(), requestOptions);

              
            const response = await axios.post(url.toString(), qs.stringify(paramsQ), {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                },
                params: paramsQ
            });



        const responseText = await response.data;

        console.log('Data:', responseText);
        const router = useRouter();   
        let respuesta =  responseText;
        let codigoAprobado = 'response=1';
        let codigoTransaccionDeclinada = 'response=2';
        let codigoErrorSistema = 'response=3'; 
        
        if (respuesta.includes(codigoAprobado)) { 
              
                console.log('codigoAprobado')   
                var items: Pedido[] = [
                  {
                      nombre: storePedido.pedido.cliente.nombre,
                      apellido: storePedido.pedido.cliente.apellido, 
                      email: storePedido.pedido.cliente.email,
                      telefono: storePedido.pedido.cliente.telefono, 
                      licencia: storePedido.pedido.cliente.licencia,
                      nacimiento:  storePedido.pedido.cliente.nacimiento,
                      retiro: storePedido.pedido.sucursal.name,
                      fecha_retiro: moment(storePedido.pedido.diaRetiro).format(), 
                      retorno: storePedido.pedido.sucursalRetorno.name,
                      fecha_retorno: moment(storePedido.pedido.diaRetorno).format(),
                      carro: storePedido.pedido.carro,
                      cobertura: storePedido.pedido.cobertura,
                      dropoff: storePedido.pedido.dropoff,
                      sucursal_detail: storePedido.pedido.sucursal,
                      sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
                      extras: storePedido.pedido.extras, 
                      status: 'Pagado',
                      tipo_pago: 'Tarjeta',
                      total: totalPedido
                  } ];   
                  createItems<Pedido>({ collection: "pedidos", items });
                  router.push('/thanks/'); 
              }
  
              if (respuesta.includes(codigoTransaccionDeclinada)){ 
                  console.log('Transacción Declinada')   
                  router.push('/error/'); 
              } 
              if (respuesta.includes(codigoErrorSistema)){
                  
                  console.log('Error en el sistema')   
                  router.push('/error/'); 
              } 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
  
    return {
        errors,
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento,
        tarjeta,
        onSubmit
    };
});   