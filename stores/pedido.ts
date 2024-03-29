import { defineStore } from 'pinia' 
import { array, date, number } from 'yup';
import { Extra } from '@/types/extra';

import { useExtrasStore } from "@/stores/extras";
 
export const usePedidoStore = defineStore(
    'pedido', 
    { 
// a function that returns a fresh state - STATE ES COMO DATA 
state: () => ({
            pedido: {
                reserva: '',
                precio_prepago: 0,
                pedidos_id: '',
                pedidos_hertz_id: '',
                cliente: {
                    nombre: '',
                    apellido: '',
                    email: '',
                    telefono: '',
                    licencia: '',
                    nacimiento: new Date(),
                },
                carro: {
                    id: 0,
                    modelo: '',
                    clasificacion: '',
                    imagen: '',
                    tipo: '',
                    pasajeros: 0,
                    maletas: 0,
                    transmision: '',
                    combustible: '',
                    marca: '',
                    puertas: 0,
                    precio_thrifty: 0.0,
                    precio_hertz: 0.0,
                    descuento_prepago: 0.0,
                    galeria: [],
                },
                cobertura: {
                    nombre: '',
                    explicacion: '',
                    precio: 0.0,
                    precio_2: 0.0,
                    precio_3: 0,
                },
                cobertura_e: {
                    nombre: '',
                    explicacion: '',
                    precio: 0.0,
                    precio_2: 0.0,
                    precio_3: 0,
                },
                extras: [],
                sucursal: {
                    id: 0,
                    mapa: {},
                    imagen: '',
                    name: '',
                    telefono_1: '',
                    telefono_2: null,
                    horario_cierre: 0,
                    LocationCode: '',
                    horario_apertura: 0,
                    horario_cierre_sabado: 0,
                    horario_cierre_domingo: 0,
                    horario_apertura_sabado: 0,
                    horario_apertura_domingo: 0,
                    impuesto: 0,
                },
                sucursalRetorno: {
                    id: 0,
                    mapa: {},
                    imagen: '',
                    name: '',
                    telefono_1: '',
                    telefono_2: null,
                    horario_cierre: 0,
                    LocationCode: '',
                    horario_apertura: 0,
                    horario_cierre_sabado: 0,
                    horario_cierre_domingo: 0,
                    horario_apertura_sabado: 0,
                    horario_apertura_domingo: 0,
                    impuesto: 0,
                },
                diaRetiro: '',
                diaRetorno: '',
                dropoff: 0,
                era: 3.99,
                cupon: null,
                prepago: null,
                totalDeDias: 0,
                sub_total: 0,
                impuesto: 0,
                impuesto_aeropuerto: 0,
                total: '',
                order_id: '',
                status: '',
            },
        }), 
        // optional getters GETTER SON COMO COMPUTED 
        getters: {
                getPedido: (state) => { 
                    return state.pedido 
                },   
  
            },      
        actions: {    
            addExtra(extra) { 
                    this.pedido.extras.push(extra)
 
              },
              removeExtra(extra) {
                const index = this.pedido.extras.indexOf(extra)
                if (index !== -1) {
                  this.pedido.extras.splice(index, 1)
                }
              },
              updatePedido(newPedido) {
                if (Array.isArray(newPedido.extras)) { // check if newPedido.extras is an array
                  this.pedido.extras = newPedido.extras
                } else {
                  console.error('extras must be an array')
                }
                // other logic
              },
            diffDias(retiro, retorno){
                    let difference = new Date(retiro).getTime() - new Date(retorno).getTime();
                    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return TotalDays;
            },
            checkDropoff(sucursalDeRetiro, sucursalDeRetorno) { 
                let dropoff = 0;
                const tier = {
                    uno: 0.00, 
                    dos: 20.00,
                    tres: 25.00,
                    cuatro: 30.00,
                    cinco: 52.00,
                    seis: 55.00,
                    siete: 85.00,
                    ocho: 90.00, 
                    nueve: 125.00,
                    diez: 177.00,  
                    once: 190.00, 
                    doce: 290.00,
                    trece: 15.00
            }  

             // tier 13 
             if (  
                sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'APOTOCUM' 
                || sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'VPORRAS'  


                || sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'APOTOCUM' 
                || sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'HZCDELESTE' 

                || sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'APOTOCUM' 
                || sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'ALBROOK' 


                || sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'APOTOCUM' 
                || sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'VVENETTO' 




                )
                { dropoff = tier.trece; }  




                // tier 2  
                if (  
                    sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HALBROOK' 
                    || sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'HZ TORRE'  
                    || sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'HZ TORRE' 
                    || sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HALBROOK' 



                    || sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'APOTOCUM' 
                    || sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'HALBROOK' 

                     



                    )


                    { dropoff = tier.dos; }  

                // tier tres: 25.00
                if ( sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'HCHORRER' 
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HALBROOK' 

                    ||  sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'HCHORRER' 
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'VPORRAS' 

                    ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'HCHORRER' 
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'VVENETTO' 

                    ||  sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'HCHORRER' 
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HZCDELESTE' 
                    ) 
                    { dropoff = tier.tres;  } 

                // tier cuatro: 30.00,
                if ( sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HCHORRER' 
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HZ TORRE'  
                    ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HCHORRER' 
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HZ TORRE'  

                    ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'HCHORRER' 
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'APOTOCUM'  

                     
                    ) 
                { dropoff = tier.cuatro; } 

                //tier cinco: 52.00,
                if ( sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'HCOLON' 
                ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HALBROOK' 

                ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'VPORRAS'
                ||  sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'HCOLON'

                ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HZCDELESTE'
                ||  sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'HCOLON'

                ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'HCOLON' 
                )
                {  dropoff = tier.cinco;  } 

                // tier seis: 55
                if (
                    sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'HSANTIAG' 
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HCHITRE'  
                
                ||  sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'HSANTIAG' 
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HAPOCHI'  )
                {  dropoff = tier.seis; } 


                // tier siete: 85
                if ( 
                        sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HCHORRER'
                    ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HCOLON'
    
                    ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HZ TORRE'
                    ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HCOLON'
    
                    ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HZ TORRE'
                    ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HCOLON' 


                    ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'HCOLON'  
                    ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'APOTOCUM'  
                    )
                {  dropoff = tier.siete; } 



                // tier ocho: 90  
                if ( 
                    sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'HCHORRER'
                ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HCHITRE'


                || sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'HCHORRER'
                ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HAPOCHI'




                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HSANTIAG'
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'DAVIDC'

                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'HSANTIAG'
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'EMALEK'

                ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'HSANTIAG'
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HCHORRER' 
                )
                { dropoff = tier.ocho; } 



                // tier nueve: 125   
                if ( 
                    sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HCHITRE'

                ||  sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'HALBROOK'
                ||  sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'HCHITRE'


                ||  sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HCHITRE' 

                ||  sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'VPORRAS'
                ||  sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'HCHITRE'

                ||  sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'HZCDELESTE'
                ||  sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'HCHITRE'

                ||  sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'HCHITRE'  

                ||  sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HCHITRE' 




                || sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HAPOCHI'

                ||  sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'HALBROOK'
                ||  sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'HAPOCHI'


                ||  sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HAPOCHI' 

                ||  sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'VPORRAS'
                ||  sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'HAPOCHI'

                ||  sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'HZCDELESTE'
                ||  sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'HAPOCHI'

                ||  sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'HAPOCHI'  

                ||  sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HAPOCHI' 
 
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'HCHITRE'  
                ||  sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'APOTOCUM'   


                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'HSANTIAG'  
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'APOTOCUM'   


 
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HALBROOK'
                ||  sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'HSANTIAG'

                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'VPORRAS'
                ||  sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'HSANTIAG'
 
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HSANTIAG'
 
                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'HSANTIAG' 
 

                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HZCDELESTE'
                ||  sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'HSANTIAG'

                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'HSANTIAG'   

 
                )
                { dropoff = tier.nueve; } 

                // tier diez: 177   
                if ( 
                    sucursalDeRetiro === 'HCHITRE' && sucursalDeRetorno === 'HCOLON'
                ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HCHITRE' 


                || sucursalDeRetiro === 'HAPOCHI' && sucursalDeRetorno === 'HCOLON'
                ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HAPOCHI' 



                ||  sucursalDeRetiro === 'HSANTIAG' && sucursalDeRetorno === 'HCOLON'
                ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'HSANTIAG' 
                )
                { dropoff = tier.diez; }  
                // tier once: 190   
                if ( 
                    
                    sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'HALBROOK'
                ||  sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'EMALEK' 
                ||  sucursalDeRetiro === 'HALBROOK' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HALBROOK'

                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'EMALEK' 
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HZ TORRE'


                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'HCHORRER'
                ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'EMALEK' 
                ||  sucursalDeRetiro === 'HCHORRER' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HCHORRER'


                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'HZ TORRE'
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'EMALEK' 
                ||  sucursalDeRetiro === 'HZ TORRE' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HZ TORRE'



                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'VPORRAS'
                ||  sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'VPORRAS'
                ||  sucursalDeRetiro === 'VPORRAS' && sucursalDeRetorno === 'EMALEK' 
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HZCDELESTE'
                ||  sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'HZCDELESTE'
                ||  sucursalDeRetiro === 'HZCDELESTE' && sucursalDeRetorno === 'EMALEK'


                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'DAVIDC'  
                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'EMALEK'   

 

                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'APOTOCUM'
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'DAVIDC'  
                ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'APOTOCUM'
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'EMALEK'   



                
                )
                { dropoff = tier.once; } 


                // tier doce: 290  EMALEK DAVIDC HSANTIAG HCHORRER HCHITRE HALBROOK HZ TORRE HZ TORRE HALBROOK
                if (  
                        sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'HCOLON'
                    ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'DAVIDC'  
                    ||  sucursalDeRetiro === 'EMALEK' && sucursalDeRetorno === 'HCOLON'
                    ||  sucursalDeRetiro === 'HCOLON' && sucursalDeRetorno === 'EMALEK'   
                )
                { dropoff = tier.doce; }  

                //tier uno  0 dolares (sucursalDeRetiro === sucursalDeRetorno)
                // else
                // {
                //     dropoff = tier.uno;
                // }  
                return  dropoff; 
                // return new Intl.NumberFormat('en-US').format(dropoff); 
            },
            precioAuto(){
                let precioAuto = 0
                let tipoReserva = this.pedido.reserva;
                    if(tipoReserva === 'prepago'){
                        const precio = this.pedido.carro.precio_hertz;  
                        let descuento = this.pedido.carro.descuento_prepago;  
                        const descuentoCalculado = precio * (descuento / 100);  
                        const nuevoPrecio = precio - descuentoCalculado; 
                        precioAuto = nuevoPrecio 
                    }
                    else{
                        precioAuto = this.pedido.carro.precio_hertz ; 
                    } 
                return precioAuto
            },
            precioCobertura(){ 
                let precioCobertura
                let tipoCarro = this.pedido.carro.tipo;
                if(tipoCarro !== 'Sedan'){
                    precioCobertura = this.pedido.cobertura.precio_2; 
                }
                else {
                    precioCobertura = this.pedido.cobertura.precio; 
                }
                return precioCobertura;
            }, 
            extrasSumados(){  
                let extrasSumados = 0;
                if (Array.isArray(this.pedido.extras)) {
                    for (const extra of this.pedido.extras) {
                    extrasSumados += extra.precio;
                    }
                }
                return extrasSumados;
            },
            subTotal() {
 
                let precioAuto = this.precioAuto();
                let tipoReserva = this.pedido.reserva;
                if(tipoReserva === 'prepago'){
                    const precio = this.pedido.carro.precio_hertz;  
                    let descuento = this.pedido.carro.descuento_prepago;  
                    const descuentoCalculado = precio * (descuento / 100);  
                    const nuevoPrecio = precio - descuentoCalculado; 
                    precioAuto = nuevoPrecio 
                }
                else{
                    precioAuto = this.pedido.carro.precio_hertz ; 
                } 

                let precioCobertura = this.precioCobertura();
 
                let precioDias = this.pedido.totalDeDias;  
                let precioEra = this.pedido.era; 
                let precioDropoff = this.pedido.dropoff;
  
                const preciosASumar = [];   

                let extrasSumados = this.extrasSumados(); 
                // const extrasSumados =  this.pedido.extras.reduce((acc: number, extra: any) => acc + extra.precio, 0);
 
                preciosASumar.push( precioAuto, precioEra, precioCobertura, extrasSumados); 
 
                // sumo todo en el array
                const suma = preciosASumar.map(element => element).reduce((a, b) => a + b, 0);

                const multiplicadoPorDias = suma * precioDias; 

                const unSoloMonto = multiplicadoPorDias + precioDropoff; 
                 
                const subTotal = unSoloMonto; 
                return subTotal; 
            },
            impuestoAeropuerto(){ 
                // impuesto sobre el subtotal pero no la cobertura ni wifi  
                const precioDias = this.pedido.totalDeDias;
                const extrasArray = this.pedido.extras;
                if (this.pedido.sucursal.impuesto > 0){  
                    let precioWifi = 0; 
                    if (Array.isArray(extrasArray)) {
                        // find the object with name property set to 'wifi'
                        const wifiObj = extrasArray.find(obj => obj.id === 5); 
                            if (wifiObj) {  
                            precioWifi =  wifiObj.precio; 
                            // console.log('mi lista tiene wifi este es el precio' + precioWifi ); 
                            } else {
                            // console.log('no contiene "wifi"');
                            } 
                        } 
                    else {
                            // console.log('no hay extras');
                    } 
                    let extrasSinWifi = this.extrasSumados() - precioWifi;
                    const eraSumado = this.pedido.era * precioDias;
                    const precioAutoSumado = this.precioAuto() * precioDias; 
                    const extrasSinWifiSumado = extrasSinWifi * precioDias; 

                    let cargasAplicablesSaf = precioAutoSumado + extrasSinWifiSumado + eraSumado; 
                    // console.log(    'precioAuto' + precioAutoSumado +
                    //                 'extras sumados?' +  this.extrasSumados() +
                    //                 'extrasSinWifi' + extrasSinWifi +
                    //                 'extrasSinWifiSumado' + extrasSinWifiSumado +
                    //                 'eraSumado' + eraSumado +
                    //                 'cargasAplicablesSaf' + cargasAplicablesSaf)   
                    let impuestoAeropuerto = this.pedido.sucursal.impuesto;    

                    const impuestoAeropuertoCalculado = cargasAplicablesSaf * (impuestoAeropuerto / 100);  
                    const impuestoAeropuertoADeber = +(impuestoAeropuertoCalculado.toFixed(2)); 

                    return  impuestoAeropuertoADeber  
                }
                else{
                    let impuestoAeropuertoADeber = 0;    
                    return impuestoAeropuertoADeber
                }
            }, 
            impuesto(){ 
                let subTotal = this.subTotal(); 
                let impuestoAeropuerto = this.impuestoAeropuerto();
 
                const nuevoSubtotal = subTotal + impuestoAeropuerto; 
                let impuesto = 7; 
                // Calculate tax due
                const impuestoCalculado = nuevoSubtotal * (impuesto / 100);  

                const impuestoADeber = +(impuestoCalculado.toFixed(2));
        
                // que siempre formatee como dolares 
                return  impuestoADeber  
            }, 
            total() {
                // cuando llamamos la funcion es store.total y el state es store.pedido.total
 
                let subTotal = this.subTotal();
                let impuestoAeropuerto = this.impuestoAeropuerto();
                let impuesto = this.impuesto();  
 
                const total = subTotal + impuestoAeropuerto + impuesto; 
 
                return new Intl.NumberFormat('en-US').format(total); 
            }   
        } 
    }   
)     