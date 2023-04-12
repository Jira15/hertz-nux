<template>
<main class="home-content">
    <article class="servicios">
        <figure><img src="@/assets/images/corpo1.jpg"/></figure>
        <section>
            <h2>Conoce nuestros Planes Corporativos</h2>
            <p>Contamos con planes corporativos que se ajustan a las necesidades de las Empresas, con una flota amplia, renovada y variada.  </p> 
            <NuxtLink to="/paginas/corporativo" >VER MÁS</NuxtLink> 
        </section>
    </article>  

    <article class="servicios">
        <figure><img src="@/assets/images/usa1.jpg"/></figure>
        <section> 
            <h2> Reservas a Estados Unidos</h2>
            <p>Ahora puedes hacer tu reserva desde Panamá y te mueves en Estados Unidos. </p>
   
          <NuxtLink href="https://wa.link/n4yy20" target="_blank">RESERVACIONES</NuxtLink> 
        </section>
    </article>   
</main>
<Promos />
</template>

<style lang="scss" scoped>
.home-content{
    grid-area: content;
    display: flex;
    flex-direction: column;
    width:100%;  
    margin-bottom: 20px;
    background-color: white;
    .servicios{
        display: flex;
        place-items: center;
        padding: 10px; 
        margin: auto;
        background-color:white;
        box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308); 
    }
 
    h2 {
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: bold; 
    }
    p{
        max-width: 400px; 
        font-size: 14px;
        margin-bottom:18px;
    }
    figure {
        flex:1; 
        text-align: center; 
    }
    section{ 
        padding: 10px;
        flex:1;
        text-align: justify;
    }
    a {
        background-color: #000000;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        color:#FFD115; 
        line-height: 18px; 
    }
} 
// Desktop  
@media screen and (min-width: 768px) {  
    .home-content{
        grid-area: content;
        display: flex;
        flex-direction: row; 
        margin-top: 0px;
        margin-bottom: 0px;
        background-color: white;
        height: 400px;
        .servicios{
            display: flex;
            place-items: center;
            padding: 5px;
            margin-top: 20px;
            margin: auto;
            background-color:white;
            box-shadow:none;
            max-width:550px;
            max-height: 300px;
            section {
                flex:1;
                padding: 10px; 
                text-align: justify;
                font-size: 12px;
                h2 {
                    font-size: 18px;
                }
            }
            figure {
                flex:2; 
                img {
                object-fit:cover;
                width: 100%;
                height: auto; 
                padding: 0;
                margin: 0;
                }
            }
        }
    }
}
</style>
