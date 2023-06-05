<script setup> 
import { useFiltroStore } from '@/stores/filtros' 
import { useAutosStore } from '@/stores/autos'
 
const storeAutos = useAutosStore()

const storeFiltro = useFiltroStore()

const opciones = computed(() => {
    return storeFiltro.opciones
}) 
 onMounted(() => {
    //  storeFiltro.fetchMarcas(); 
 })

</script>

<template> 
    <fieldset class="filtros"> 
        <p>
            <label for="marca">{{ $t('marca') }}:</label>
            <select  name="marca"  v-model="storeFiltro.filtros.marca"> 
                <option value=""> Todas </option>
                <option v-for="option in opciones.marca" :key="option" :value="option">
                    {{ option }}
                </option> 
            </select>   
        </p> 
        <!-- <p>
            <label for="precio">Precio </label>
            <select  name="precio"  v-model="storeFiltro.filtros.precio">  
                <option value="price">Menor a Mayor</option>
                <option value="-price">Mayor a Menor</option>  
            </select>  
        </p> -->
        <p>
            <label for="ciudad"> {{ $t('categoria') }}: </label>
            <select  name="ciudad"  v-model="storeFiltro.filtros.tipo" > 
                <option value=""> Todas </option>
                <option v-for="option in opciones.tipo" :key="option" :value="option">
                    {{ option  }}
                </option> 
            </select>   
        </p>

        <button v-on:click="storeAutos.fetchAutos()"> {{ $t('filtrar') }} </button>
    </fieldset> 
</template> 
<style lang="scss"> 
.filtros {
    margin: 10px; 
    display: flex;
    justify-content: space-around; 
    button {
        background-color: #282828;
        padding: 5px;
        border-radius:5px;
        color:white;
        cursor: pointer;
    }
} 

</style>