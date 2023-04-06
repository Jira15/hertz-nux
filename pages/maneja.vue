<script setup>   
import { getAssetURL } from "@/utils/get-asset-url";
import { storeToRefs } from 'pinia' 
import { useActualizarStore } from '@/stores/actualizar'
import { usePedidoStore } from '@/stores/pedido';  
import moment from 'moment';  
 
const { getItemById } = useDirectusItems(); 
const storeActualizar = useActualizarStore();
const storePedido = usePedidoStore();
const route = useRoute()
const pedido = await  getItemById({
        collection: "pedidos",
        id: '6d1ced9e-ae42-43a8-a736-a601f44c2d00',
    });   
onMounted(() => {  
    storePedido.pedido = pedido;
}) 
const fechaFormat = function(value) {
    if (value) {
        return moment(value).format('DD MMM YYYY')
    }
}
</script> 
<template>  
    <article class="manage-pedido"> 
        <h2>
            Tu reserva:
        </h2>
            <section class="info-pedido">
                <header> 
                    <div> 
                        <h3>
                            {{ pedido.carro.marca }} 
                            {{ pedido.carro.marca }}  
                        </h3>   
                        <em>o similar</em> 
                    </div> 
                    <figure> 
                        <img :src="getAssetURL(pedido.carro.imagen)"  loading="lazy" /> 
                    </figure> 
                </header>

                <section class="info-cliente"> 
                    <h6>Detalles:</h6>  
                        <dl>
                            <dt>
                                Nombre: 
                            </dt> 
                            <dd>
                                {{ pedido.nombre }} {{ pedido.apellido }}
                            </dd>
                        </dl> 
                        <dl>
                            <dt>
                                Correo: 
                            </dt> 
                            <dd>
                                {{ pedido.email }} 
                            </dd>
                        </dl> 
                        <dl>
                            <dt>
                                Telefono: 
                            </dt> 
                            <dd>
                                {{ pedido.telefono }}
                            </dd>
                        </dl> 
                        <dl>
                            <dt>
                                Licencia: 
                            </dt> 
                            <dd>
                                {{ pedido.licencia }}
                            </dd>
                        </dl> 
                        <h6>Modelo:</h6>
                        <dl>
                            <dt>
                                {{ pedido.carro.tipo }} 
                            </dt> 
                            <dd>
                                {{ pedido.carro.precio_thrifty }} 
                            </dd>
                        </dl>
                </section> 

                <section class="info-sucursal">
                    <h6>Sucursal:</h6>
                    <dl>
                        <dt>
                            Retiro:<br/>{{ pedido.retiro }}
                        </dt> 
                        <dd>
                            Retorno: <br/>{{ pedido.retorno }} 
                        </dd>
                    </dl> 
                    <dl>
                        <dt>
                            Día de Retiro:
                        </dt> 
                        <dd>
                            {{ fechaFormat(pedido.fecha_retiro) }}   {{  pedido.hora_retiro  }}
                        </dd>
                    </dl> 
                    <dl>
                        <dt>
                            Día de Retorno: 
                        </dt> 
                        <dd>
                            {{ fechaFormat(pedido.fecha_retorno) }}  {{  pedido.hora_retorno   }}
                        </dd>
                    </dl>   
                    <!-- <dl v-if="(precioDropoff > 0)">
                        <dt>
                            Drop-off 
                        </dt> 
                        <dd>
                            {{ precioDropoff }}
                        </dd>
                    </dl> -->
                

                </section> 
           
        <section class="info-coberturas">
            <h6>Coberturas:</h6> 
            <dl>
                <dt> 
                    {{ pedido.cobertura.nombre }} 
                </dt> 
                <dd>
                    {{ pedido.cobertura.precio}} 
                </dd> 
            </dl> 
            <dl >
                <dt> 
                    Asistencia Vial(ERA)
                </dt> 
                <dd>
                    {{ pedido.era }} 
                </dd> 
            </dl> 
    
            <!-- <h6>Extras:</h6> 
            <dl v-if="pedido.extras" class="extras">
                <div v-for="extra in pedido.extras">
                    <dt>
                        {{ extra.nombre }}
                    </dt>  
                    <dd>
                        {{ extra.precio }}
                    </dd> 
                </div>
            </dl> --> 
        </section> 
        <footer>
            <h6>Sub-Total:  </h6> 

            <dl>
                <dt> 
                </dt>
                <dd >
                    B/.  {{ pedido.total }} 
                </dd> 
            </dl>   
          {{ pedido.status }} 
            <div class="status" v-if="pedido.status === 'Pagado'"> 
                <h4>Esta reserva ya esta paga</h4>
            </div>
            <div class="status"  v-if="pedido.status === 'Cancelado'"> 
                <h4>El Pedido ha sido cancelado</h4>
            </div>
            <div class="status" v-if="pedido.status === 'Pendiente de Pago'"> 
                <button type="submit" @click="storeActualizar.onCancelar">Cancelar Reserva</button> 
                <!-- <button type="submit" @click="storeActualizar.onSubmit">pagar</button> -->
            </div>

          
        </footer> 
    </section> 

    <section class="metodos" v-if="pedido.status === 'Pendiente de Pago'"> 
        <h4>Metodos de Pago</h4>

        
            <section class="tarjeta">  
                    <p>
                        <label>CC Number</label>  
                        <div id="demoCcnumber"></div> 
                    </p>  
                    <p>
                        <label>CVV Collect</label>  
                        <div id="demoCvv"></div> 
                    </p> 
                    <p>
                        <label>MM/YY</label> 
                        <div id="demoCcexp"></div>
                    </p>   

            </section>


        <div id="paypal-button">
        </div>
    </section>
    <!-- Botones de Pago -->
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
    background-color:white;
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
            font-weight:bold;
            background-color: #cde4ff;
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
            object-fit:contain;
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
            background-color: #047EFF;
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

    .metodos {
        margin-top: 40px;
        border-top:2px solid gray ;
    }

}  
// Desktop  
@media screen and (min-width: 768px) { 

    .manage-pedido { 
        display: flex;
        flex-direction: column;  
        margin: auto; 
        max-width: 1000px;
        h2 {
            margin: 20px;
            font-size: 28px;
            font-weight: bold;
        }
        h3 {
            font-weight: bold;
            font-size: 24px;
            margin-bottom:0px;
        } 
        .info-pedido {
            display: flex;
            flex-direction: column; 
            line-height: 1.5;
            h6 {
                font-weight:bold;
                background-color: #cde4ff;
            }
            dl {
                display: flex;
                justify-content: space-between;
                background-color: #f8fbff; 
            }
            header { 
                display:contents; 
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
                object-fit:contain;
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
                background-color: #047EFF;
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
    
        .metodos {
            margin-top: 40px;
            border-top:2px solid gray ;
        }
    
    }  
}
</style>
