import { defineStore } from 'pinia'
import moment from 'moment'; 
import { useForm } from 'vee-validate'; 
import { usePedidoStore } from '@/stores/pedido';  
import { schema } from '@/types/search-schema-yup';

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchIs: 'default',
        mostrarWarning: false,
        errors: null,
        sucursal: null,
        fechaRetiro: '1',
        fechaRetorno: '',
        sucursalRetorno: null,
        datePick:  new Date,
        timePick: null,
        minutePick: null,
        dateBack: new Date,
        timeBack: null,
        minuteBack: null,
    }),
    getters: { 
 
        fechaRetiroConstruida: (state) => { 
            const datePick = state.datePick;
            const timePick = state.timePick;  
            const minutePick = state.minutePick;  
            
            const newDate = new Date(datePick.setHours(timePick, minutePick)); 
            
            const newDateString = newDate.toString(); 

            return state.fechaRetiro = newDateString;
        },
        fechaRetornoConstruida: (state) => { 
            const dateBack = state.dateBack;
            const timeBack = state.timeBack;  
            const minuteBack = state.minuteBack;  
            
            const newDate = new Date(dateBack.setHours(timeBack, minuteBack)); 
            
            const newDateString = newDate.toString(); 

            return state.fechaRetorno = newDateString;
        },
        isAllFilled(state) {
            return state.timePick !== null && state.minutePick !== null && state.timeBack !== null && state.minuteBack !== null;
        },
    },
    actions: { 
        siguiente() { 
            const storePedido = usePedidoStore(); 
            const router = useRouter(); 
            // send values to API
            // console.log('Submit', JSON.stringify(values, null, 2));
            // console.log("en Search Store", values);
            storePedido.pedido.sucursal = this.sucursal; 
            storePedido.pedido.diaRetiro = this.fechaRetiroConstruida; 
            storePedido.pedido.sucursalRetorno = this.sucursalRetorno; 
            storePedido.pedido.diaRetorno = this.fechaRetornoConstruida;   
            
            this.searchIs = 'TheProgress';  
            router.push('/reserva/');  
        }
    }
});
