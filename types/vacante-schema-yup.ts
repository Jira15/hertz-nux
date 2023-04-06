import * as Yup from 'yup'; 

export const vacanteSchema = Yup.object({ 
    nombre: Yup.string().required(),
    apellido: Yup.string().required(),
    email: Yup.string().required(),
    telefono: Yup.string().required(), 
    cv: Yup.mixed().required(),
});    