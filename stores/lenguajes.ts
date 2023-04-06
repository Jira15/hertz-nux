import { defineStore } from 'pinia'

export const useLenguajesStore = defineStore('lenguajes', {
    
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    lenguaje: 'ES', 
    paginas: [],
    traducciones: {
        EN: {
            titulo: 'Ingles',
            contenido: 'Ingles',
            }, 
        ES: {  
            titulo: 'Español',
            contenido: 'Español',        
        },
        seleccionado: []
    }, 
}),
// optional getters GETTER SON COMO COMPUTED 
getters: { 
    getPaginas: (state) => { 
        return state.paginas
    },  
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        async fetchPaginas(){
            try {
                const { getItemById } = useDirectusItems(); 
                const route = useRoute() 
                const pagina = await  getItemById({
                        collection: "paginas",
                        id: route.params.id,
                    });
    
                const paginaTranslations =  await  getItemById({
                    collection: "paginas_translations",
                    id: pagina.translations,
                });  
    
                    if(this.lenguaje === 'EN'){
                        
                        this.paginas = pagina 
                        this.paginas.contenido = paginaTranslations.contenido
                        this.paginas.titulo = paginaTranslations.titulo 
                    }
                    else {
                        
                    this.paginas = pagina 
                    }

            } catch (error) {
                    console.error(error); 
            }
        }, 
        async setEN(){ 
            this.lenguaje = 'EN'
            this.fetchPaginas() 
        },
        async setES(){ 
            this.lenguaje = 'ES'
            this.fetchPaginas() 
        } 
    },
})  