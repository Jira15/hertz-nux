import * as Yup from 'yup'; 

export const schema = Yup.object({
    sucursal: Yup.object().required(),
    fechaRetiro: Yup.date().required(), 
    sucursalRetorno: Yup.object().required(),
    fechaRetorno: Yup.date().required(), 
});  