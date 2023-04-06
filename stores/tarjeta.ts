import { Pedido } from '~~/types/interfaces';
 
export const useTarjetaStore = defineStore
('tarjeta', 
{ 
    state: () => ({
        orden: [],
        tarjeta: {
            ccnumber: '',
            ccexp: '',
            cvv: ''
        }
    } ),  
    actions: { 
        async onSubmit() {  
            const orderId = this.orden.pedidos_id 
            // console.log(orderId)
            const bodyData = {
                // wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4 TEST API
                'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
                'first_name': this.orden.nombre,
                'last_name': this.orden.apellido,
                'address1': this.orden.retiro,
                'city': 'Panama City',
                'state': 'PTY',
                'zip' : '12345', 
                'shipping_first_name': this.orden.nombre, 
                'shipping_last_name': this.orden.apellido,
                'shipping_address1': '987 State St',
                'shipping_city': 'Panama City',
                'shipping_state': 'PTY',
                'shipping_zip' : '98765', 
                'type': 'sale',
                'amount': this.orden.total,
                'ccnumber': this.tarjeta.ccnumber, 
                'ccexp': this.tarjeta.ccexp,
                'cvv': this.tarjeta.cvv
            }   
            
            await $fetch( '/api/tarjeta', { 
                method: 'POST',
                // headers: {  
                //     'Content-Type': 'application/x-www-form-urlencoded',
                // },
                params: bodyData,
                body: bodyData ,   
            }).then(function (response) {    
                const router = useRouter(); 
                // console.log('THEN' + orderId)   
                let respuesta = response; 
                let codigoAprobado = 'response=1';
                let codigoTransaccionDeclinada = 'response=2';
                let codigoErrorSistema = 'response=3'; 

                if (respuesta.includes(codigoAprobado)){  
                    const { updateItem  } = useDirectusItems();  

                    console.log('Transacción Aprobada' + orderId)    
                    var status = { status: 'Pagado' }   
                    updateItem<Pedido>({ 
                        collection: "pedidos",
                        id: orderId,
                        item: status });  
                    
                    router.push('/thanks/'); 
                }

                else if (respuesta.includes(codigoTransaccionDeclinada)) { 
                    console.log('Transacción Declinada');   
                    router.push('/error/'); 
                  } else if (respuesta.includes(codigoErrorSistema)) {
                    console.log('Error en el sistema');   
                    router.push('/error/'); 
                  }
            })
        }   
    }
}) 