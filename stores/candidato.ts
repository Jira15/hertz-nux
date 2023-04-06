import { defineStore } from 'pinia'; 
import { ref, computed } from 'vue'; 
export const useCandidatoStore = defineStore('candidato',  () => { 

    const { createItems } = useDirectusItems();
    const nombre = ref('');
    const apellido = ref('');
    const telefono = ref('');
    const email = ref('');
    const cv = ref(null);

    function handleFileUpload(event) {
        cv.value = event.target.files[0];
    }

async function handleSubmit() { 
    try {
        // Upload the file to the Directus file library 
        const formData = new FormData(); 
        formData.append('cv',  cv.value); 
        const fileResponse =  await fetch('https://admin.intermarketing.com.pa/files', {
                method: 'POST',
                headers: {
                'Authorization': 'uiN-pHJwLhUKcmbMCH8PXfJjKT9D5cfh',
                'Accept-Encoding': 'multipart/form-data'
                },
                body: formData,
            }).then(response => response.json())
            .then(function (data) {
                const itemResponse = createItems({
                    collection: 'candidatos',
                        items: {
                            nombre: nombre.value,
                            apellido: apellido.value, 
                            email: email.value,
                            telefono: telefono.value,  
                            cv:  data.data.id,
                        },
                    })   
                console.log('esto es data', data.data.id)
                console.log('item response', itemResponse)
            })
            .catch(error => console.error(error)) 
 
        const router = useRouter();  
        router.push('/vacante-gracias/');    
    }   catch (error) {
        console.error(error);
    }
} 
return {
        nombre,
        apellido,
        email,
        telefono,
        cv,
        handleFileUpload,
        handleSubmit
    };

});    