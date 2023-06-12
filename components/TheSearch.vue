<script setup>
import { useSearchStore } from "@/stores/search"; 
import { useSucursalStore } from "@/stores/sucursal"; 
import moment from 'moment';
import { usePedidoStore } from '@/stores/pedido';    
 
// import { defineRule, Form, Field, ErrorMessage, configure } from "vee-validate";

  
const storeSearch = useSearchStore(); 
const storeSucursal = useSucursalStore();
const storePedido = usePedidoStore(); 
   
 


 
// const time = ref({
//   hours: new Date().getHours(),
//   minutes: new Date().getMinutes()
// });
 
// const datePick = ref( new Date() );
// const timePick = ref();
// const minutePick = ref();
// const dateBack = ref( );
// const timeBack = ref();
// const minuteBack = ref();

 
// const fechaRetiroConstruida = computed(() => {

//         // Your data
//       const datePick = storeSearch.datePick;
//       const timePick = storeSearch.timePick; // change this to your desired hour
//       const minutePick = storeSearch.minutePick; // change this to your desired minute

//       // Creating new date with the new hour and minute
//       const newDate = new Date(datePick.setHours(timePick, minutePick));

//       // Converting to string
//       const newDateString = newDate.toString(); 

//       return storeSearch.fechaRetiro = newDateString;
// });

const fechaFormat = value => {  return moment(value).format('yyyy MMM DD') }


onMounted(() => {
  storeSucursal.fetchSucursales();
  // storeSearch.options = useSucursalStore.fetchSucursales();
}); 
 
 
const sucursales = computed(() => {
  return storeSucursal.sucursales;
});


function minimoDeDias(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

// function minimoDeHoras(date, horas) {
//   const newDate = new Date(date);
//   newDate.setDate(newDate.getDate() + horas);
//   return newDate;
// }

const currentDate = new Date();
const currentTime = currentDate.getTime();
const oneDay = 4 * 60 * 60 * 1000;
const newTime = currentTime + oneDay;
const nextDay = new Date(newTime);


// const retornoStartDay = new Date(newTime);




const startTime = ref({ hours: 10, minutes: 15 });

function getWorkingHours(openingTime, closingTime) {
  let workingHours = [];
  // con fecha queremos revisar si la fecha de retiro es hoy y sumarle horas
  for (let i = openingTime; i < closingTime; i++) {
    workingHours.push({ text: `${i}`, value: i });
  }
  return workingHours;
}

function domingoCerrados(domingoApertura, domingoCierre) {
  if (domingoApertura === 24 && domingoCierre === 0) {
    return [0];
  }
}

// function horarioFines(openingTime, closingTime) {
//   let fines = [];
//   for (let i = openingTime; i < closingTime; i++) {
//     fines.push({ text: `${i}`, value: i });
//   }
//   return fines;
// }

const minutesArray = [
  { text: "00", value: 0 },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
  { text: "45", value: 45 },
];
</script>
<template>
  <!-- <form class="reservador" @submit="storeSearch.siguiente"> -->
  <form class="reservador"> 
    <h2> {{ $t('prompt') }}</h2>
    <article>   
 
      <section class="retiro">  

        <div class="retiro-sucursal">
          <legend>{{ $t('sucursalRetiro') }}</legend>
          <label class="sucursal">
            <select  v-model="storeSearch.sucursal"  name="sucursal"  as="select" rules="required" >
              <option disabled value="">Selecciona una sucursal</option>
              <option v-for="option in sucursales" :key="option" :value="option">
                {{ option.name }}
              </option>
            </select>
          </label>
        </div>  

        <div class="fechas"  v-if="storeSearch.sucursal"> 

          <div class="dia">
            <legend>{{ $t('fechaRetiro') }}</legend> 
 
            <date-picker 
              class="picker"
              :partial-range="false"
              :enable-time-picker="false" 
              
              :minDate="nextDay" 
              v-model="storeSearch.datePick"
              locale="es" 
              :start-time="startTime"
              :disabled-week-days="
              domingoCerrados(
                storeSearch.sucursal.horario_apertura_domingo,
                storeSearch.sucursal.horario_cierre_domingo
              )
            " 
              :highlight="storeSearch.sucursal.dias_festivos"
              :disabled-dates="storeSearch.sucursal.dias_festivos"
              highlight-disabled-days 
              > 
                <template #trigger>
                  <p class="pick"  > {{  fechaFormat(storeSearch.datePick)  }}  </p>
                </template>
            </date-picker>
          </div>  
    
          <div class="horas"> 
            <legend>{{ $t('hora') }}</legend>

            <div class="horas-select">
              <select  v-model="storeSearch.timePick"  name="sucursal"   as="select"  rules="required" >
                <option 
                  v-for="h in getWorkingHours(storeSearch.sucursal.horario_apertura,  storeSearch.sucursal.horario_cierre)"
                  :key="h.value"
                  :value="h.value" >
                  {{ h.text }}
                </option>
              </select>

              <select v-model="storeSearch.minutePick" >
                <option v-for="m in minutesArray" :key="m.value" :value="m.value">
                  {{ m.text }}
                </option>
              </select>  
            </div> 

          </div>
          
        </div>
        
      </section>


          <!-- <date-picker
            v-model="timePick"   
            time-picker 
            disable-time-range-validation  
            placeholder="Hora de Retiro"
          />  -->

      <!-- <section class="fechas">
      <date-picker
                    :start-time="startTime"
            locale="es"
            v-model="storeSearch.fechaRetiro"
            :minDate="nextDay"
            :disabled-week-days="
              domingoCerrados(
                storeSearch.sucursal.horario_apertura_domingo,
                storeSearch.sucursal.horario_cierre_domingo
              )
            "
            :highlight="storeSearch.sucursal.dias_festivos"
            :disabled-dates="storeSearch.sucursal.dias_festivos"
            highlight-disabled-days
                    />   
                    
      <date-picker v-model="storeSearch.fechas" minutesIncrement="30" time-picker disable-time-range-validation range placeholder="Select Time" />
      </section> -->


 
 
    <section class="retiro">    
      <div class="retorno-sucursal">
          <legend>{{ $t('sucursalRetorno') }}</legend>
          <label class="sucursal">
            <select  v-model="storeSearch.sucursalRetorno"  name="sucursalRetorno"   as="select"  rules="required" >
              <option disabled value="">Selecciona una sucursal</option>
              <option v-for="option in sucursales" :key="option" :value="option">
                {{ option.name }}
              </option>
            </select>
          </label>
      </div>
      
      <div class="fechas" v-if="storeSearch.sucursalRetorno">
        <div class="dia">
          <legend>{{ $t('fechaRetorno') }}</legend> 


          <date-picker
          class="picker"
          locale="es"
          
          :partial-range="false"
          :enable-time-picker="false" 
          :start-time="startTime"
          v-model="storeSearch.dateBack"
          :minDate="
            minimoDeDias(
              storeSearch.datePick,
              storeSearch.sucursalRetorno.minimo_dias
            )
          " 
          :disabled-week-days="
            domingoCerrados(
              storeSearch.sucursalRetorno.horario_apertura_domingo,
              storeSearch.sucursalRetorno.horario_cierre_domingo
            )
          "
          :highlight="storeSearch.sucursalRetorno.dias_festivos"
          :disabled-dates="storeSearch.sucursalRetorno.dias_festivos"
          highlight-disabled-days
        > 

            <template #trigger>
              <p class="pick"> {{ fechaFormat(storeSearch.dateBack) }}  </p>
            </template>
          </date-picker>
        </div>  
        <div class="horas"> 
          <legend>{{ $t('hora') }}</legend>  
          <div class="horas-select">
            <select  v-model="storeSearch.timeBack"  name="sucursalRetorno"   as="select"  rules="required" >
              <option 
                v-for="h in getWorkingHours(storeSearch.sucursalRetorno.horario_apertura,  storeSearch.sucursalRetorno.horario_cierre)"
                :key="h.value"
                :value="h.value" >
                {{ h.text }}
              </option>
            </select>  

            <select v-model="storeSearch.minuteBack" >
              <option v-for="m in minutesArray" :key="m.value" :value="m.value">
                {{ m.text }}
              </option>
            </select>    
          </div>  
        </div>
              
      </div> 
    </section> 
      <div class="verificar-wrap"> 
 
        <div  class="verificar"  @click="storeSearch.siguiente"  :class="{ disabled: !storeSearch.isAllFilled }" > 
        {{ $t('buscar') }} 
        </div>


        <!-- <button class="verificar" type="submit" @click="storeSearch.searchIs = 'TheProgress'" >
          Buscar
        </button> -->
      </div>
      <!-- <ErrorMessage name="sucursal" >
                <p class="warn">Todos los Campos son requeridos</p> 
            </ErrorMessage>   -->

    </article>
  </form>
</template>
<style lang="scss">
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #ffd115;
  --dp-primary-text-color: #000000;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #000000a1;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #000000a1;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: #be7d7d;
}

.custom-time-picker-component {
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-input {
  margin: 5px 3px;
  padding: 5px;
  width: 100px;
  border-color: var(--dp-border-color);
  outline: none;
  -webkit-appearance: menulist;
}
.fechas {
  margin-top: 5px; 
  display: flex; 
  width: 100%;
  justify-content: space-between;
  .picker {  
    border-radius: 3px; 
    color: #212121;   
    margin: 5px 5px 5px 0px;
    background-color: white;
    height: 40px;
    p { 
      text-align: center;
      padding: 10px;
    }
  } 
  .dia {
    display: flex; 
    flex-direction: column;  
    width: 100%;
    padding: 5px;
  } 
  .horas {
    display: flex;
    flex-direction: column;   
    width: 100%; 
    padding: 5px;
    justify-content: space-between;
  }
  .horas-select {
    padding: 5px;
    padding-left: 0px;
    display: flex;  
    justify-content: space-between;
  } 
 
}
.warn {
  font-size: 12px;
}
.dpicker {
  width: 100%;
}
.slot-icon {
  height: 12px;
  width: auto;
  padding-left: 5px;
}
.reservador {
  background: #282828;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  color: white;
  align-items: center;
  h2 {
    font-size: 20px;
    font-weight: bold;
    padding: 0.2rem;
  }
  legend {
    font-size: 14px;
    font-weight: bold;
  }

  section {
    padding: 0.5rem; 
    font-size: 14px;
  }
  select {
    width: 100%;
    height: 40px;
    margin-left: 5px;
  }
} 
.sucursales {
  width: 100%;
  h2 {
    
    font-weight: bold;
    font-size: 16px;
  }
}

.siguiente {
  padding: 8px;
}

.verificar {
  padding: 10px;
  font-weight: bold;
  font-size: 14px;
  background: #ffd115;
  color: rgb(0, 0, 0);
  margin-top: 25px;
  align-self: end;
  cursor: pointer;
  border-radius: 3px;
 
}
.verificar.disabled {
  pointer-events: none;
  cursor: default;
  color: gray;
}
.verificar-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}
// Desktop
@media screen and (min-width: 768px) {
  .siguiente {
    align-self: flex-end;
    margin-bottom: 10px; 
  }
  .reservador { 
    .verificar-wrap {
      width: auto;
      min-height: 100%;
      place-content: end;
      margin-bottom: 20px;
    }
    article {
      display: flex;
    } 
  }
}
</style>
