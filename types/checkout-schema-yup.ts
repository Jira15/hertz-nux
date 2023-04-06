import * as Yup from 'yup'; 

export const checkoutSchema = Yup.object({ 
    nombre: Yup.string().required(),
    apellido: Yup.string().required(),
    email: Yup.string().required(),
    telefono: Yup.string().required(),
    licencia: Yup.string().required(),
    nacimiento: Yup.string().required(),
});    