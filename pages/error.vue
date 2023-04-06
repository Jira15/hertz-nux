<template>
    <main class="error">  
        <h5>
            Ha ocurrido un error en su compra, esto se debe a una de las siguientes opciones:
        </h5>
        <p>La Tarjeta ha sido declinada</p>
        <p>Informacion erronea en la tarjeta</p>

        <NuxtLink to="/clientes">Volver a pagina de pago</NuxtLink>
    </main> 
</template>
<style scoped lang="scss">

      /* autos flota id */ 
    .error {   
            background-color: white;
            border-radius: 5px; 
            padding: 10px;
            display: flex;
            flex-direction: column;
            min-width: 350px; 
            margin:5px; 
            text-align: justify; 
        h5 {
            font-weight: bold;
            font-size: 24px;  
            width: 100%; 
        } 
        p {  
            font-size: 15px; 
            padding: 5px;
            color: red;
        }
        a {
            font-weight: bold;
            color: #001e36 ;
        }
    }   
    // Desktop  
    @media screen and (min-width: 768px) {  
        .error {   
            background-color: white;
            border-radius: 5px; 
            padding: 10px;
            display: flex;
            flex-direction: column;
            max-width:1000px; 
            margin:0 auto; 
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: justify; 
        }
    }
</style> 