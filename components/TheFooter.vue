<script setup> 
const { locale } = useI18n() 
</script>


<template>
  <footer class="footer">
    <section>
      <!-- <router-link to="/"><img src="../assets/images/logo.png"/></router-link> --> 
      <h3>{{ $t('contacto') }}</h3>
      <p> 
        {{ $t('reservaciones') }}: (507) 260-0000 <br /> 
        {{ $t('asistencia') }}: (507) 204-9550<br /> 
          Whatsapp: (507) 6768-9626
      </p>  
    </section>

  <section>
    <nav>  
      <h3>{{ $t('servicios') }}</h3>
      <p>
          <NuxtLink to="/paginas/coberturas">{{ $t('coberturas') }}</NuxtLink>
          <NuxtLink to="/paginas/requisitos">{{ $t('requisitos') }}</NuxtLink>
          <NuxtLink to="/vacantes">{{ $t('bolsa') }}</NuxtLink>
      </p> 
    </nav> 
  </section>

    <section> 
      <h3>{{ $t('soporte') }}</h3>
      <p>
     
        <NuxtLink to="/paginas/reembolso">{{ $t('reembolso') }}</NuxtLink>
        <NuxtLink to="/paginas/tyc">{{ $t('terminos') }}</NuxtLink>
        <NuxtLink to="/paginas/privacidad">{{ $t('privacidad') }}</NuxtLink>
      </p> 
    </section> 

    <section class="sociales"> 
      <h3>{{ $t('siguenos') }}</h3> 
      <span>
        <NuxtLink to="https://www.instagram.com/hertzpanama/" taget="_blank">
          <img class="social" src="../assets/images/instagram.svg"/>
        </NuxtLink>
        <NuxtLink to="https://www.facebook.com/HertzPanama" taget="_blank">
          <img class="social" src="../assets/images/facebook.png"/>
        </NuxtLink>  
      </span>  
    </section>

    <p class="copyright">Copyright © 2023 Hertz Panamá</p>

  </footer>
</template>

<style lang="scss" scoped> 
.footer {
  width: 100%;
  background-color: #1d1d1d; 
  display: flex;
  flex-direction: column;
  color: white;  
  min-height: 300px;
  line-height: 1.3;  
  text-align: left; 
  padding:50px; 
  justify-content: space-between;
  h3 {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;

  } 
  nav { 
    display: flex;
    flex-direction: column;   
  }
  p { 
    font-family: sans-serif;  
    display: flex;
    flex-direction: column;
  }
  a {
    margin-bottom: 5px;
    margin-right: 5px;
    font-size: 14px;
  } 
  a:hover {
    color:#ffd115; 
  } 
  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-right: 20px;
  } 
} 
.copyright {
 
  font-size: 12px;
}

.sociales {
  color: #e4e4e4;   
  h3 {
    font-size: 15px;
  }
  a:visited {
    color: #e4e4e4;
  }
  a:link {
    color: #e4e4e4;
  }
  a {
    margin: 5px;
    font-size: 34px;
    color: #e4e4e4;
    width: 40px;
  }
  img {
    max-width: 40px;
  }
  span { 
    display: flex;
  }
} 
// Desktop  
@media screen and (min-width: 768px) { 
  .footer { 
      display: flex;
      flex-direction:row; 
      min-height: 300px; 
  }
  .copyright { 
    position: absolute;
    align-self: end;
  }
}
</style>