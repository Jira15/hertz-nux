import { d as defineStore } from './server.mjs';
import { number } from 'yup';

const usePedidoStore = defineStore(
  "pedido",
  {
    // a function that returns a fresh state - STATE ES COMO DATA 
    state: () => ({
      pedido: {
        reserva: "",
        precio_prepago: Number,
        pedidos_id: "",
        cliente: {
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          licencia: "",
          nacimiento: Date
        },
        carro: {
          id: Number,
          modelo: String,
          clasificacion: String,
          imagen: String,
          tipo: String,
          pasajeros: Number,
          maletas: Number,
          transmision: String,
          combustible: String,
          marca: String,
          puertas: Number,
          precio_thrifty: 0,
          galeria: Array
        },
        cobertura: {
          nombre: String,
          explicacion: String,
          precio: 0,
          precio_2: 0,
          precio_3: Number
        },
        cobertura_e: {
          nombre: String,
          explicacion: String,
          precio: 0,
          precio_2: 0,
          precio_3: Number
        },
        extras: [],
        sucursal: {
          id: Number,
          mapa: Object,
          imagen: String,
          name: String,
          telefono_1: String,
          telefono_2: null,
          horario_cierre: Number,
          LocationCode: String,
          horario_apertura: Number,
          horario_cierre_sabado: Number,
          horario_cierre_domingo: Number,
          horario_apertura_sabado: Number,
          horario_apertura_domingo: Number,
          impuesto: 0
        },
        sucursalRetorno: {
          id: Number,
          mapa: Object,
          imagen: String,
          name: String,
          telefono_1: String,
          telefono_2: null,
          horario_cierre: Number,
          LocationCode: String,
          horario_apertura: Number,
          horario_cierre_sabado: Number,
          horario_cierre_domingo: Number,
          horario_apertura_sabado: Number,
          horario_apertura_domingo: Number,
          impuesto: Number
        },
        diaRetiro: String,
        diaRetorno: String,
        dropoff: number,
        era: 3.99,
        cupon: null,
        prepago: null,
        totalDeDias: number,
        sub_total: number,
        impuesto: number,
        impuesto_aeropuerto: number,
        total: "",
        order_id: String,
        status: String
      }
    }),
    // optional getters GETTER SON COMO COMPUTED 
    getters: {
      getPedido: (state) => {
        return state.pedido;
      }
    },
    actions: {
      addExtra(extra) {
        this.pedido.extras.push(extra);
      },
      removeExtra(extra) {
        const index = this.pedido.extras.indexOf(extra);
        if (index !== -1) {
          this.pedido.extras.splice(index, 1);
        }
      },
      updatePedido(newPedido) {
        if (Array.isArray(newPedido.extras)) {
          this.pedido.extras = newPedido.extras;
        } else {
          console.error("extras must be an array");
        }
      },
      diffDias(retiro, retorno) {
        let difference = new Date(retiro).getTime() - new Date(retorno).getTime();
        let TotalDays = Math.ceil(difference / (1e3 * 3600 * 24));
        return TotalDays;
      },
      checkDropoff(sucursalDeRetiro, sucursalDeRetorno) {
        let dropoff = 0;
        const tier = {
          uno: 0,
          dos: 20,
          tres: 25,
          cuatro: 30,
          cinco: 52,
          seis: 55,
          siete: 85,
          ocho: 90,
          nueve: 125,
          diez: 177,
          once: 190,
          doce: 290
        };
        if (sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HALBROOK") {
          dropoff = tier.dos;
        }
        if (sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "VPORRAS" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "VPORRAS" || sucursalDeRetiro === "VVENETTO" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "VVENETTO" || sucursalDeRetiro === "HZCDELESTE" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HZCDELESTE") {
          dropoff = tier.tres;
        }
        if (sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HZ TORRE") {
          dropoff = tier.cuatro;
        }
        if (sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "VPORRAS" || sucursalDeRetiro === "VPORRAS" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HZCDELESTE" || sucursalDeRetiro === "HZCDELESTE" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "VVENETTO" || sucursalDeRetiro === "VVENETTO" && sucursalDeRetorno === "HCOLON") {
          dropoff = tier.cinco;
        }
        if (sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HAPOCHI") {
          dropoff = tier.seis;
        }
        if (sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HCOLON") {
          dropoff = tier.siete;
        }
        if (sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "EMALEK" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HCHORRER") {
          dropoff = tier.ocho;
        }
        if (sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "VPORRAS" || sucursalDeRetiro === "VPORRAS" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "HZCDELESTE" || sucursalDeRetiro === "HZCDELESTE" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "VVENETTO" || sucursalDeRetiro === "VVENETTO" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "VPORRAS" || sucursalDeRetiro === "VPORRAS" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "HZCDELESTE" || sucursalDeRetiro === "HZCDELESTE" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "VVENETTO" || sucursalDeRetiro === "VVENETTO" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "VPORRAS" || sucursalDeRetiro === "VPORRAS" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HZCDELESTE" || sucursalDeRetiro === "HZCDELESTE" && sucursalDeRetorno === "HSANTIAG" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "VVENETTO" || sucursalDeRetiro === "VVENETTO" && sucursalDeRetorno === "HSANTIAG") {
          dropoff = tier.nueve;
        }
        if (sucursalDeRetiro === "HCHITRE" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HCHITRE" || sucursalDeRetiro === "HAPOCHI" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HAPOCHI" || sucursalDeRetiro === "HSANTIAG" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "HSANTIAG") {
          dropoff = tier.diez;
        }
        if (sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "EMALEK" || sucursalDeRetiro === "HALBROOK" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HALBROOK" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "EMALEK" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "EMALEK" || sucursalDeRetiro === "HCHORRER" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HCHORRER" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "EMALEK" || sucursalDeRetiro === "HZ TORRE" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HZ TORRE" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "VPORRAS" || sucursalDeRetiro === "VPORRAS" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "VPORRAS" || sucursalDeRetiro === "VPORRAS" && sucursalDeRetorno === "EMALEK" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HZCDELESTE" || sucursalDeRetiro === "HZCDELESTE" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "HZCDELESTE" || sucursalDeRetiro === "HZCDELESTE" && sucursalDeRetorno === "EMALEK" || sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "VVENETTO" || sucursalDeRetiro === "VVENETTO" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "VVENETTO" || sucursalDeRetiro === "VVENETTO" && sucursalDeRetorno === "EMALEK") {
          dropoff = tier.once;
        }
        if (sucursalDeRetiro === "DAVIDC" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "DAVIDC" || sucursalDeRetiro === "EMALEK" && sucursalDeRetorno === "HCOLON" || sucursalDeRetiro === "HCOLON" && sucursalDeRetorno === "EMALEK") {
          dropoff = tier.doce;
        }
        return dropoff;
      },
      precioAuto() {
        let precioAuto = 0;
        let tipoReserva = this.pedido.reserva;
        if (tipoReserva === "prepago") {
          const precio = this.pedido.carro.precio_thrifty;
          let descuento = 5;
          const descuentoCalculado = precio * (descuento / 100);
          const nuevoPrecio = precio - descuentoCalculado;
          precioAuto = nuevoPrecio;
        } else {
          precioAuto = this.pedido.carro.precio_thrifty;
        }
        return precioAuto;
      },
      precioCobertura() {
        let precioCobertura;
        let tipoCarro = this.pedido.carro.tipo;
        if (tipoCarro !== "Sedan") {
          precioCobertura = this.pedido.cobertura.precio_2;
        } else {
          precioCobertura = this.pedido.cobertura.precio;
        }
        return precioCobertura;
      },
      extrasSumados() {
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
        if (tipoReserva === "prepago") {
          const precio = this.pedido.carro.precio_thrifty;
          let descuento = 5;
          const descuentoCalculado = precio * (descuento / 100);
          const nuevoPrecio = precio - descuentoCalculado;
          precioAuto = nuevoPrecio;
        } else {
          precioAuto = this.pedido.carro.precio_thrifty;
        }
        let precioCobertura = this.precioCobertura();
        let precioDias = this.pedido.totalDeDias;
        let precioEra = this.pedido.era;
        let precioDropoff = this.pedido.dropoff;
        const preciosASumar = [];
        let extrasSumados = this.extrasSumados();
        preciosASumar.push(precioAuto, precioEra, precioCobertura, extrasSumados);
        const suma = preciosASumar.map((element) => element).reduce((a, b) => a + b, 0);
        const multiplicadoPorDias = suma * precioDias;
        const unSoloMonto = multiplicadoPorDias + precioDropoff;
        const subTotal = unSoloMonto;
        return subTotal;
      },
      impuestoAeropuerto() {
        const precioDias = this.pedido.totalDeDias;
        const extrasArray = this.pedido.extras;
        if (this.pedido.sucursal.impuesto > 0) {
          let precioWifi = 0;
          if (Array.isArray(extrasArray)) {
            const wifiObj = extrasArray.find((obj) => obj.id === 5);
            if (wifiObj) {
              precioWifi = wifiObj.precio;
            }
          }
          let extrasSinWifi = this.extrasSumados() - precioWifi;
          const eraSumado = this.pedido.era * precioDias;
          const precioAutoSumado = this.precioAuto() * precioDias;
          const extrasSinWifiSumado = extrasSinWifi * precioDias;
          let cargasAplicablesSaf = precioAutoSumado + extrasSinWifiSumado + eraSumado;
          let impuestoAeropuerto = this.pedido.sucursal.impuesto;
          const impuestoAeropuertoCalculado = cargasAplicablesSaf * (impuestoAeropuerto / 100);
          const impuestoAeropuertoADeber = +impuestoAeropuertoCalculado.toFixed(2);
          return impuestoAeropuertoADeber;
        } else {
          let impuestoAeropuertoADeber = 0;
          return impuestoAeropuertoADeber;
        }
      },
      impuesto() {
        let subTotal = this.subTotal();
        let impuestoAeropuerto = this.impuestoAeropuerto();
        const nuevoSubtotal = subTotal + impuestoAeropuerto;
        let impuesto = 7;
        const impuestoCalculado = nuevoSubtotal * (impuesto / 100);
        const impuestoADeber = +impuestoCalculado.toFixed(2);
        return impuestoADeber;
      },
      total() {
        let subTotal = this.subTotal();
        let impuestoAeropuerto = this.impuestoAeropuerto();
        let impuesto = this.impuesto();
        const total = subTotal + impuestoAeropuerto + impuesto;
        return new Intl.NumberFormat("en-US").format(total);
      }
    }
  }
);

export { usePedidoStore as u };
//# sourceMappingURL=pedido-45937ac8.mjs.map
