// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Global page headers:  

    app:{
       head: {
           title: 'Hertz Rent a car Panamá', 
           meta: [
               { charset: 'utf-8' },
               { name: 'viewport', content: 'width=device-width, initial-scale=1' },
               { hid: 'description', name: 'description', content: '' },
               { name: 'Hertz Rent a car Panamá', content: 'Hertz. Estamos aquí para llevarlo allá. Disfrute de nuestra mejor flota hasta ahora y de velocidad, innovación y servicio galardonados en más de 10 000 localidades en todo el mundo.' }
               
           ],
           script: [{ 
               children:"  !function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';    n.queue=[];t=b.createElement(e);t.async=!0;     t.src=v;s=b.getElementsByTagName(e)[0];     s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');    fbq('init', '341027038002326');   fbq('track', 'PageView');" }],
           noscript: [{ 
               children: ' <img height="1" width="1" style="display:none"   src="https://www.facebook.com/tr?id=341027038002326&ev=PageView&noscript=1"/>' 
           }], 
           link: [
               { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
           ]
       },
   },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        // CSS file in the project
        '@/assets/css/main.css',
        // Reset file in the project 
        '@/assets/css/reset.css',
        // SCSS file in the project
        '@/assets/css/main.scss', 
        // https://vue3datepicker.com/installation/#nuxt
        '@vuepic/vue-datepicker/dist/main.css', 
        "@/layout/global.css"
    ],

    // hace que nuxt busque en la direccion para importar
    imports: {
        dirs: ['stores'],
      },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [  
        '@/plugins/vue-datepicker.js', 
        '@/plugins/vee-validate.js',
        '@/plugins/vue-gtm.client.js',  
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [ 
            'nuxt-directus',  
            '@nuxtjs/i18n', 

            // 'nuxt-proxy',  
            [
                '@pinia/nuxt',
                {
                    autoImports: [ 
                        // automatically imports `defineStore`  //  'autoStore',  'sucursalStore'
                        'defineStore', 
                        'storeToRefs',// import { defineStore } from 'pinia'
                        // automatically imports `defineStore` as `definePiniaStore`
                        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                    ],
                },
            ],
        ],
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'es',
        vueI18n: '@plugins/i18n.config.ts'

    },
    // serverMiddleware: [
    //     {
    //         path: '/api/tarjeta',
    //         handler: '@/middleware/proxy.js',
    //     },
    // ],
    vite: {
        server: {
            proxy: {
            '/thrpanama/soap': 'https://rwwebe.barscloud.com:8716/thrpanama/soap',
            },
 
        }
    },


    proxy: {
        options: {
            target: 'https://rwwebe.barscloud.com:8716/thrpanama/soap',
            changeOrigin: true,
            headers: {  
                'Content-Type': 'text/xml',
                'Accept': 'text/xml', 
                'SOAPAction': 'otavehavailrate'
            },
            pathFilter: [
                '/thrpanama/soap', 
              ]
        },
    },
 

    // proxy: {
    //     options: {
    //         target: 'https://secure.networkmerchants.com/api/transact.php',
    //         changeOrigin: true,
    //         headers: {  
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         pathFilter: [
    //             '/api/tarjeta', 
    //           ]
    //     },
    // },
    directus: {
		url: "https://admin.intermarketing.com.pa",
	},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: ['@vuepic/vue-datepicker', 'moment' ]
    },

    devtools: false
})
