export interface Pedido {  
    nombre: StringConstructor;
    apellido: StringConstructor;
    email: StringConstructor,
    telefono: StringConstructor,
    licencia: StringConstructor,
    nacimiento: DateConstructor,
    retiro: StringConstructor,
    fecha_retiro: Date,  
    retorno: StringConstructor,
    fecha_retorno: Date, 
    carro: object,
    cobertura: object,
    extras: ArrayConstructor,
    dropoff: string,
    sucursal_detail: object,
    sucursal_retorno_detail: object,
    total: string
}  