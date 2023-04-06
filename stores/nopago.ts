import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate'; 
import { usePedidoStore } from '@/stores/pedido';     
import { Pedido } from '~~/types/interfaces';
import moment from 'moment';
import { checkoutSchema } from '@/types/checkout-schema-yup';


export const useNoPagoStore = defineStore('nopago',  () => { 

    const { createItems } = useDirectusItems(); 
    const storePedido = usePedidoStore();
    
    const subTotal = storePedido.subTotal();    
    const impuestoAeropuerto = storePedido.impuestoAeropuerto();    
    const impuesto = storePedido.impuesto();     
    const totalPedido = storePedido.total();     

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

    async function onSubmit(values) {
      // Submit values to API...  
    //   console.log("Values", values);    
            const router = useRouter();   
                var items: Pedido[] = [
                {
                    nombre: storePedido.pedido.cliente.nombre,
                    apellido: storePedido.pedido.cliente.apellido, 
                    email: storePedido.pedido.cliente.email,
                    telefono: storePedido.pedido.cliente.telefono, 
                    licencia: storePedido.pedido.cliente.licencia,
                    nacimiento:  storePedido.pedido.cliente.nacimiento,
                    retiro: storePedido.pedido.sucursal.name,
                    fecha_retiro:  moment(storePedido.pedido.diaRetiro).format(), 
                    retorno: storePedido.pedido.sucursalRetorno.name,
                    fecha_retorno: moment(storePedido.pedido.diaRetorno).format(), 
                    carro: storePedido.pedido.carro,
                    cobertura: storePedido.pedido.cobertura,
                    dropoff: storePedido.pedido.dropoff,
                    sucursal_detail: storePedido.pedido.sucursal,
                    sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
                    extras:storePedido.pedido.extras, 
                    status: 'Pendiente de Pago',
                    tipo_pago: 'Sin Pago',
                    sub_total: subTotal,
                    impuesto_aeropuerto: impuestoAeropuerto,
                    impuesto: impuesto,
                    total: totalPedido
                } ]; 
                createItems<Pedido>({ collection: "pedidos", items });
                router.push('/thanks/'); 
                 
    } 
    return {
        errors,
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento, 
        onSubmit
    } 
});   