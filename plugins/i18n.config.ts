import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'es', 
        // fallbackLocale: 'es',
        messages: {
            en: {
                welcome: 'Welcome',
                flota: 'Fleet',
                sucursales: 'Locations',
                corporativo: 'Corporate',
                maneja: 'Manage your Reservation', 
                title: 'Hertz Rent a car Panamá',
                description: 'Hertz. We are here to take you there. Enjoy our best fleet yet and award-winning speed, innovation and service at over 10,000 locations worldwide.',
                reservador: 'Book your car',
                select: 'Select a location',
                pickup: 'Pick Up Location',
                return: 'Return Location', 
                pickupDate: 'Pick Up Date',
                returnDate: 'Return Date',
                nextButton: 'Next',
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
                
            },
            es: {
                welcome: 'Bienvenido',
                flota: 'Flota',
                sucursales: 'Sucursales',
                corporativo: 'Corporativo',
                maneja: 'Maneja tu Reserva', 
                title: 'Hertz Rent A Car Panamá',
                description: 'Hertz. Estamos aquí para llevarlo allá. Disfrute de nuestra mejor flota hasta ahora y de velocidad, innovación y servicio galardonados en más de 10 000 localidades en todo el mundo.',
                reservador: 'Reserva tu vehículo',
                select: 'Selecciona una sucursal',
                pickup: 'sucursal de retiro',
                return: 'sucursal de retorno', 
                pickupDate: 'Fecha de Retiro',
                returnDate: 'Fecha de Retorno',  
                nextButton: 'Siguiente',

                contacto: 'Contacto',
                reservaciones: 'Reservaciones',
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

            }
        } 
    })

    vueApp.use(i18n)
})
 