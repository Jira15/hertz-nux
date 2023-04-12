<script setup>
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import { useSucursalStore } from "@/stores/sucursal";
import { defineRule, Form, Field, ErrorMessage, configure } from "vee-validate";
import { ref, computed } from "vue";
const date = ref(new Date());

const storeSearch = useSearchStore();

const storeSucursal = useSucursalStore();

const sucursales = computed(() => {
  return storeSucursal.sucursales;
});
onMounted(() => {
  storeSucursal.fetchSucursales();
  // storeSearch.options = sucursales;
});

function minimoDeDias(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function minimoDeHoras(date, horas) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + horas);
  return newDate;
}

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
  if (domingoApertura === 0 && domingoCierre === 0) {
    return [0];
  }
}

function horarioFines(openingTime, closingTime) {
  let fines = [];
  for (let i = openingTime; i < closingTime; i++) {
    fines.push({ text: `${i}`, value: i });
  }
  return fines;
}

const minutesArray = [
  { text: "00", value: 0 },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
  { text: "45", value: 45 },
];
</script>
<template>
  <form class="reservador" @submit="storeSearch.siguiente">
    <article>
      <h2>Reserva tu vehículo</h2>
      <div class="sucursales">
        <section>
          <legend>sucursal de retiro</legend>
          <label class="sucursal">
            <select
              v-model="storeSearch.sucursal"
              name="sucursal"
              as="select"
              rules="required"
            >
              <option disabled value="">Selecciona una sucursal</option>
              <option v-for="option in sucursales" :key="option" :value="option">
                {{ option.name }}
              </option>
            </select>
          </label>
        </section>
        <section>
          <legend>sucursal de retorno</legend>
          <label class="sucursal">
            <select
              v-model="storeSearch.sucursalRetorno"
              name="sucursalRetorno"
              as="select"
              rules="required"
            >
              <option disabled value="">Selecciona una sucursal</option>
              <option v-for="option in sucursales" :key="option" :value="option">
                {{ option.name }}
              </option>
            </select>
          </label>
        </section>
      </div>
      <section class="fechas">
        <div v-if="storeSearch.sucursal">
          <label>Fecha de Retiro </label>
          <date-picker
            :start-time="startTime"
            locale="es"
            v-model="storeSearch.fechaRetiro"
            :minDate="new Date()"
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
            <template #time-picker="{ time, updateTime }">
              <div class="custom-time-picker-component">
                <select
                  class="select-input"
                  :value="time.hours"
                  @change="updateTime(+$event.target.value)"
                >
                  <option
                    v-for="h in getWorkingHours(
                      storeSearch.sucursal.horario_apertura,
                      storeSearch.sucursal.horario_cierre
                    )"
                    :key="h.value"
                    :value="h.value"
                  >
                    {{ h.text }}
                  </option>
                </select>

                <select
                  class="select-input"
                  :value="time.minutes"
                  @change="updateTime(+$event.target.value, false)"
                >
                  <option v-for="m in minutesArray" :key="m.value" :value="m.value">
                    {{ m.text }}
                  </option>
                </select>
              </div>
            </template>
          </date-picker>
        </div>

        <div v-if="storeSearch.sucursalRetorno">
          <label>Fecha de Retorno</label>
          <date-picker
            locale="es"
            :start-time="startTime"
            v-model="storeSearch.fechaRetorno"
            :minDate="
              minimoDeDias(
                storeSearch.fechaRetiro,
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
            <template #time-picker="{ time, updateTime }">
              <div class="custom-time-picker-component">
                <select
                  class="select-input"
                  :value="time.hours"
                  @change="updateTime(+$event.target.value)"
                >
                  <option
                    v-for="h in getWorkingHours(
                      storeSearch.sucursalRetorno.horario_apertura,
                      storeSearch.sucursalRetorno.horario_cierre
                    )"
                    :key="h.value"
                    :value="h.value"
                  >
                    {{ h.text }}
                  </option>
                </select>

                <select
                  class="select-input"
                  :value="time.minutes"
                  @change="updateTime(+$event.target.value, false)"
                >
                  <option v-for="m in minutesArray" :key="m.value" :value="m.value">
                    {{ m.text }}
                  </option>
                </select>
              </div>
            </template>
          </date-picker>
        </div>
      </section>
      <div class="verificar-wrap">
        <button
          class="verificar"
          type="submit"
          @click="storeSearch.searchIs = 'TheProgress'"
        >
          Siguiente
        </button>
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
    font-weight: bold;
    font-size: 14px;
  }
  select {
    width: 100%;
    height: 40px;
  }
}
.fechas {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  .hora {
    margin-left: 30px;
    width: 150px;
  }
}
.sucursales {
  width: 100%;
  h2 {
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
  background: #FFD115;
  color: rgb(0, 0, 0);
  margin-top: 5px;
  align-self: end;
  cursor: pointer;
  border-radius: 3px;
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
    justify-content: space-around;
    .sucursales {
      display: flex;
      justify-content: space-around;
    }
    .fechas {
      display: flex;
      justify-content: space-between;
      flex-direction: row; 
      .dpicker {
        padding-right: 20px;
      }
      div {
        display: flex;
        flex-direction: column;
      }
      input {
        width: 100%;
      }
    }
    footer {
      align-self: end;
    }
  }
}
</style>
