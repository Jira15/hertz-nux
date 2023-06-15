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
        <article   v-if="storePrechecking.step === 'Info'">
            <div  class="prechecking-info">
                <header>
                    <h2>Kia Picanto o Similar</h2>
                </header>
                <main> 
                    <figure>
                        <img :src="'../_nuxt/assets/images/modelos/xfar.png'" loading="lazy" /> 
                    </figure> 
                    
                    <section class="prechecking-datos">
                        <Info />  
                    </section>
                </main>
            </div>

            <nav class="pre-nav"> 
                <button class="atras-btn" type="submit"  @click="storePrechecking.step = 'Coberturas'" >
                    Cancelar mi reserva
                </button>
                <button class="siguiente-btn" type="submit" @click="storePrechecking.step = 'Coberturas'">
                    Comenzar Prechecking
                </button>
            </nav>  
        </article>  

        <article v-else-if="storePrechecking.step === 'Coberturas'">
            <Coberturas />
            <!-- <Extras /> -->
            <div class="pre-nav">
                <button class="atras-btn" type="submit" @click="storePrechecking.step = 'Info'">
                    Atras
                </button>
                <button class="siguiente-btn" type="submit" @click="storePrechecking.step = 'Info'">
                    Siguiente
                </button>
            </div>
        </article> 
    </Transition>

 
</main>

 




    <!-- <Info />  
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
            </article> -->


</template>
<style lang="scss">
.prechecking-info{
    background-color: #fff; 
    box-shadow: 0 4px 18px 0 rgba(10, 10, 10, 0.384);
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    height: 450px;
    border-radius: 20px;
    display: flex;
    flex-direction: column; 
    header {
        padding: 20px; 
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
        background-color:#FFD002;
        border-radius: 20px 20px 0px 0px;
    }
    figure{
        max-width: 420px;
        margin: 0 auto;
        margin-top: 30px;
        position: relative;  
    }
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100%;
        .prechecking-datos{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            font-size: 20px;
            font-weight: bold;
            width: 400px;
            height: 80%;
            margin: 0 auto;
            margin-top:20px; 
            border-radius: 10px;
            box-shadow: 0 4px 18px 0 rgba(10, 10, 10, 0.384);
        }
    }
} 

.slot-icon {
    height: 12px;
    width: auto;
    padding-left: 5px;
}

.prechecking-steps { 
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
        background-color: #FFD002;
        color: #000000;
    }

    .siguiente-btn{
        background-color: #000000;
        color: #FFD002;
    }
    button {
        background-color: #000000;
        padding:  15px;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: #ffd115; 
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
        justify-content: space-around;
        margin-top: 20px;
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
