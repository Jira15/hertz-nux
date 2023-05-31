<script setup>
import { usePrecheckingStore } from "@/stores/prechecking";
const storePrechecking = usePrecheckingStore();
onMounted(() => {
    storePrechecking.step = "Info";
});
</script>

<template>
    <main class="prechecking-steps">
        <Transition mode="out-in">
            <article v-if="storePrechecking.step === 'Info'">
                <Info />

                <div class="pre-nav"> 
                    <button class="cancelar-btn" type="submit" @click="storePrechecking.onPrechecking">
                        Cancelar mi reserva
                    </button>
                    <button class="prechecking-btn" type="submit"
                        v-if="storePrechecking.prechecking.status === 'Pendiente de Prechecking'"
                        @click="storePrechecking.step = 'Datos'">
                        Comenzar Prechecking
                    </button>
                </div>
            </article>

            <article v-else-if="storePrechecking.step === 'Datos'">
                <Datos />
                <div class="pre-nav">
                    <button class="atras-btn" type="submit" @click="storePrechecking.step = 'Info'">
                        Atras
                    </button>
                    <button class="siguiente-btn" type="submit" @click="storePrechecking.step = 'Coberturas'">
                        Siguiente
                    </button>
                </div>
            </article>

            <article v-else-if="storePrechecking.step === 'Coberturas'">
                <Coberturas />
                <Extras />
                <div class="pre-nav">
                    <button class="atras-btn" type="submit" @click="storePrechecking.step = 'Datos'">
                        Atras
                    </button>
                    <button class="siguiente-btn" type="submit" @click="storePrechecking.step = 'PrecheckingPago'">
                        Siguiente
                    </button>
                </div>
            </article>

            <article v-else-if="storePrechecking.step === 'PrecheckingPago'">
                <PrecheckingPago />
            </article>

        </Transition>
    </main>
</template>
<style lang="scss">
.slot-icon {
    height: 12px;
    width: auto;
    padding-left: 5px;
}

.prechecking-steps {
    padding: 15px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    align-items: center;
    z-index: 999999;


    .prechecking-btn {
        color: #000000;
        background-color: #9cff88;
    }

    .prechecking-btn:hover {
        background-color: #ffd115;
        color: #000000;
    }

    .prepaid-btn {}

    .prepaid-btn:hover {
        background-color: #ffd115;
        color: #000000;
    }

    .cancelar-btn {
        background-color: #999999;
        color: #000000;
    }
    .atras-btn{
        background-color: #ffd115;
        color: #000000;
    }

    .siguiente-btn{
        background-color: #ffd115;
        color: #000000;
    }
    button {
        background-color: #000000;
        padding: 5px 15px;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: #ffd115;
        width: 100%;
        text-align: center;
        margin: 10px;
        cursor: pointer;
    }

    h2 {
        font-size: 20px;
        font-weight: bold;
        padding: 0.2rem;
        cursor: pointer;
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
    .pre-nav
    {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
}

.fechas {
    display: flex;
    justify-content: space-between;

    .hora {
        margin-left: 30px;
        width: 150px;
    }
}

.sucursales h2 {
    font-size: 16px;
}

.siguiente {
    padding: 8px;
}

.verificar {
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    background: #ffd115;
    color: black;
    align-self: flex-end;
}

// Desktop
@media screen and (min-width: 768px) {
    .siguiente {
        align-self: flex-end;
        margin-bottom: 10px;
    }

    .prechecking-steps {
        display: flex;
        margin-top: -5px;
        width: 100%;

        footer {
            align-self: end;
        }
    }
}
</style>
