import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'es', 
        // fallbackLocale: 'es',
        messages: {
            en: { 
                title: 'Hertz Rent a car Panamá',
                description: 'Hertz. We are here to take you there. Enjoy our best fleet yet and award-winning speed, innovation and service at over 10,000 locations worldwide.',

                // menu
                flota: 'Fleet',
                sucursales: 'Locations',
                corporativo: 'Corporate',
                maneja: 'Manage your Reservation', 
                leasing: 'Operative Leasing',
                planes: 'Corporate Plans',
                reservaUSA: 'Reservations to the US',
            

                // reservador
                reservador: 'Book your car',
                select: 'Select a location',
                pickup: 'Pick Up Location',
                return: 'Return Location', 
                pickupDate: 'Pick Up Date',
                returnDate: 'Return Date',


                // botones
                nextButton: 'Next',
                seeMore: 'See more',  
                reservar: 'Book', 
                disponibilidad: 'Check Availability',
                reservarYPagar: 'Book and Pay',
                prepago: 'Prepaid',

                // footer
                contacto: 'Contact',
                reservaciones: 'Reservations',
                asistencia: '24 H Assistance', 
                servicios: 'Services',
                coberturas: 'Coverages',
                requisitos: 'Requirements',
                bolsa: 'Job Opportunities',
                soporte: 'Support',
                reembolso: 'Refund Policy',
                terminos: 'Terms and Conditions',
                privacidad: 'Privacy Policy',
                siguenos: 'Follow us on',

                // home content
                corporatePlans: 'Know our Corporate Plans',
                corporatePlansDescription: ' We have corporate plans that fit the needs of companies, with a wide, renewed and varied fleet.',
                aEstadosUnidos: 'Reservations to the United States',
                aEstadosUnidosDescription: ' Now you can make your reservation from Panama and you move in the United States.',

                // the search
                prompt: 'Make your reservation',
                cambiar: 'Change',  
                sucursalRetiro: 'Pick Up Location',
                sucursalRetorno: 'Return Location',
                fechaRetiro: 'Pick Up Date',
                fechaRetorno: 'Return Date',
                hora: 'Time',
                buscar: 'Search',
 
                
                // Filtros
                marca: 'Brand',
                categoria: 'Category',
                filtrar: 'Filter', 
                
                // car info o desglose
                similar: 'or similar',
                automatic: 'Automatic',
                
                // sucursales 
                telefonos: 'Phones',
                abierto: 'Open 24 hours', 
                lunesAViernes: 'Lunes a Viernes ',
                sabados: 'Saturday ',
                sabadosCerrados: 'Saturday: Closed',
                domingos:  'Sunday ',
                domingosCerrados: 'Sunday: Closed',  
                reservarAqui: 'Book Here', 
 
                
                // clientes
                clientesTitle:'To pay or view your reservation, just enter the reservation number:',
                clientesButton: 'View Reservation',
                clientesDescription: 'When picking up the vehicle, the main driver will be blocked a security deposit on your credit card depending on the category of the car. Debit cards or cash will not be accepted. The office staff will confirm the exact amount of the deposit. Cards accepted for the deposit: American Express, MasterCard and Visa. ',
                clientesWarning: 'Important: Virtual cards are not accepted, nor any other type of card that does not have the embossed stamp.',


                // coberturas
                coberturasTitle: 'Coverages',
                porDia: 'Per day',
                eraTitle: 'Roadside Assistance (ERA)',
                eraDescription: 'ERA | ROAD ASSISTANCE This coverage offers THE LESSEE the following road assistance services at no cost: Loss of car key, towing service, tire replacement, assistance when running out of fuel or battery. The response time by THE LESSOR is subject to the day, time and location of the incident.',

                // Warnings

                warningReserva: 'You need to specify the date and location before continuing', 
                warningRequeridos: 'All fields are required',
                warningCobertura: 'You need to select a coverage before continuing',

                // checkout 
                finaliza: ' Finish your reservation',
                nombre: 'Name',
                apellido: 'Last Name',
                telefono: 'Phone',
                correo: 'Email',
                licencia: 'License',
                fecha: 'Date of Birth', 
                metodos: 'Payment Methods',  

                // desglose

                detalles: 'Reservation Details',
                retiro: 'Pick Up',
                retorno: 'Return',
                diaDeRetiro: 'Pick Up Date',
                diaDeRetorno: 'Return Date',
                modelo: 'Model', 
                impuestoAeropuertos: 'Impuesto de Aeropuerto', 

                // gracias

                gracias: 'Thank you for your reservation',
                graciasDescription: 'Your reservation has been processed, you will soon receive an email with the details of it. If you have any questions or concerns you can contact us through our email or phone.',


            },
            es: { 
                title: 'Hertz Rent A Car Panamá',
                description: 'Hertz. Estamos aquí para llevarlo allá. Disfrute de nuestra mejor flota hasta ahora y de velocidad, innovación y servicio galardonados en más de 10 000 localidades en todo el mundo.',
                
                // menu
                flota: 'Flota',
                sucursales: 'Sucursales',
                corporativo: 'Corporativo',
                maneja: 'Maneja tu Reserva', 
                leasing: 'Leasing Operativo',
                planes: 'Planes Corporativos',
                reservaUSA: 'Reservas a USA',
            


                // reservador
                reservador: 'Reserva tu vehículo',
                select: 'Selecciona una sucursal',
                pickup: 'sucursal de retiro',
                return: 'sucursal de retorno', 
                pickupDate: 'Fecha de Retiro',
                returnDate: 'Fecha de Retorno', 
                
                //botones
                nextButton: 'Siguiente',
                seeMore: 'Ver más',
                reservaciones: 'Reservaciones',
                reservar: 'Reservar',
                disponibilidad: 'Consulta Disponibilidad',
                reservarYPagar: 'Reservar y Pagar',
                prepago: 'Prepago',
  

                // footer
                contacto: 'Contacto', 
                asistencia: 'Asistencia 24 H', 
                servicios: 'Servicios',
                coberturas: 'Coberturas',
                requisitos: 'Requisitos',
                bolsa: 'Bolsa de Trabajo',
                soporte: 'Soporte',
                reembolso: 'Politica de Reembolso',
                terminos: 'Términos y Condiciones',
                privacidad: 'Política de Privacidad',
                siguenos: 'Síguenos en',


                // home content
                corporatePlans: 'Conoce nuestros Planes Corporativos',
                corporatePlansDescription: 'Contamos con planes corporativos que se ajustan a las necesidades de las Empresas, con una flota amplia, renovada y variada.  ',
                aEstadosUnidos: 'Reservas a Estados Unidos',
                aEstadosUnidosDescription: 'Ahora puedes hacer tu reserva desde Panamá y te mueves en Estados Unidos.',


            // the search
            prompt: 'Haz tu reserva',
            cambiar: 'Cambiar',  
            sucursalRetiro: 'sucursal de retiro',
            sucursalRetorno: 'sucursal de devolución',
            fechaRetiro: 'Fecha Retiro',
            fechaRetorno: 'Devolución',
            hora: 'Hora',
            buscar: 'Buscar',
            

                // Filtros
                marca: 'Marca',
                categoria: 'Categoria',
                filtrar: 'Filtrar', 
                
                // car info o desglose
                similar: 'o similar',
                automatic: 'Automático',
                
                // sucursales 
                telefonos: 'Teléfonos',
                abierto: 'Abierto 24 horas', 
                lunesAViernes: 'Lunes a Viernes',
                sabados: 'Sabados',
                sabadosCerrados: 'Sabados: Cerrados',
                domingos:  'Domingos',
                domingosCerrados: 'Domingos: Cerrados', 
                reservarAqui: 'Reservar Aquí',


                // clientes
                clientesTitle:'Para pagar o ver tu reserva,  sólo ingresa el número de la reserva:',
                clientesButton: 'Ver Reserva',
                clientesDescription: 'Al retirar el vehículo, al conductor principal se le bloqueará un depósito de seguridad en su tarjeta de crédito dependiendo de la categoría del auto. No se aceptarán tarjetas de débito ni dinero en metálico. El personal de la oficina confirmará la cantidad exacta del depósito. Tarjetas aceptadas para el deposito: American Express, MasterCard y Visa. ',
                clientesWarning: 'Importante: No se aceptan tarjetas virtuales, ni cualquier otro tipo de tarjeta que no tenga el estampado en relieve.',

                // coberturas
                coberturasTitle: 'Coberturas',
                porDia: 'Por día',
                eraTitle: 'Asistencia Vial(ERA)',
                eraDescription: ' ASISTENCIA VIAL Esta cobertura ofrece a EL ARRENDATARIO los siguientes servicios de asistencia en carretera sin cargo alguno: Pérdida de llave del automóvil, servicio de grúa, reemplazo de neumático, asistencia al quedarse sin combustible o sin batería. El tiempo de respuesta por parte de LA ARRENDADORA está sujeto al día, hora y ubicación del incidente.',


                // Warnings
                warningReserva: 'Necesitas especificar la fecha y sucursal antes de continuar', 
                warningRequeridos: 'Todos los Campos son requeridos', 
                warningCobertura: 'Te Falta elegir un tipo de cobertura para poder continuar',

                // checkout 
                finaliza: 'Finaliza tu reserva',
                nombre: 'Nombre',
                apellido: 'Apellido',
                telefono: 'Teléfono',
                correo: 'Correo electrónico',
                licencia: 'Licencia',
                fecha: 'Fecha de Nacimiento',
                metodos: 'Metodos de Pago', 

                // desglose

                detalles: 'Detalles de la Reserva',
                retiro: 'Retiro',
                retorno: 'Retorno',
                diaDeRetiro: 'Día de Retiro',
                diaDeRetorno: 'Día de Retorno',
                modelo: 'Modelo', 
                impuestoAeropuertos: 'Impuesto de Aeropuerto', 

                // gracias

                gracias: 'Gracias por tu reserva',
                graciasDescription: 'Tu reserva ha sido procesada, en breve recibirás un correo con los detalles de la misma. Si tienes alguna duda o consulta puedes contactarnos a través de nuestro correo electrónico o teléfono.',
            }
        } 
    })

    vueApp.use(i18n)
})  
 