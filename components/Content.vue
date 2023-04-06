<template>
<main class="home-content">
    <article class="servicios">
        <figure><img src="@/assets/images/corporativo.jpg"/></figure>
        <section>
            <h2>Conoce nuestros Planes Corporativos</h2>
            <p>Contamos con planes corporativos que se ajustan a las necesidades de las Empresas, con una flota amplia, renovada y variada. 
            </p>
            <button>ver mas</button>
        </section>
    </article>  
    <article class="ofertas"> 
            <h3>DESCUBRE PANAMÁ CON NOSOTROS</h3>  
    </article>
</main>
</template>

<style lang="scss" scoped>
.home-content{
    grid-area: content;
    display: flex;
    flex-direction: column;
    width:100%; 
    margin-top: 20px;
    margin-bottom: 20px;
    .servicios{
        display: flex;
        place-items: center;
        padding: 10px;
        margin-top: 20px;
        margin: auto;
        background-color:white;
        box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
        max-width: 1200px;
    }
    .ofertas{
        background-image:url("@/assets/images/panama-city.jpg ");
        background-color:#0693e3; 
        background-size: cover;
        background-repeat:no-repeat;  
        margin-top: 20px;
        color: white;
        height: 220px;
        display: flex;  
        h3 {
            text-align: center;
            margin: 0 auto;
            align-self: center;
            font-size: 3.5rem; 
            font-weight: bold; 
            font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
    } 
    h2 {
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: bold; 
    }
    p{
        max-width: 400px; 
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
    button {
        background-color: #047EFF;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: white; 
        line-height: 18px;
        margin-top: 20px; 
    }
} 
// Desktop  
@media screen and (min-width: 768px) {  
}
</style>
