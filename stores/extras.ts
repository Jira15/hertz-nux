import { defineStore } from 'pinia' 
import { Extra } from '@/types/extra';

export const useExtrasStore = defineStore( 'extras', { 
    state: () => ({
        extras: [] as Extra[],
      }), 
  actions: {
    async fetchExtras(){
        try {
            const { getItems } = useDirectusItems(); 
            const extras = await getItems(
                { collection: "extras"}); 
            this.extras = extras  
        } catch (error) {
                console.error(error); 
        }
      },
      getExtras() {
        return this.extras;
      }, 
      getExtraById(id) {
        return this.extras.find(extra => extra.id === id)
      }
  }, 
})  
 
 