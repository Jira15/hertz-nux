<script setup>  
import { useLenguajesStore } from '@/stores/lenguajes'; 
const storeLenguaje = useLenguajesStore();
    // onMounted(() => {
    //     storeLenguaje.setES(); 
    // }) 
</script>

<script>
export default {
    data() {
        return {
            showMobileMenu: false,
        };
    },
    methods: {
            showMenu() {
                if (this.showMobileMenu !== undefined) {
                    this.showMobileMenu = !this.showMobileMenu;
                } 
            },
        },
    };
</script>

<template>
<header class="menu">
    <nav>  
        <ClientOnly>
            <i class="fas fa-bars" @click="showMenu()">Menu</i>
        </ClientOnly>
        <div class="nav-content" :class="showMobileMenu ? 'open-menu' : 'closed-menu'">   

            <ul class="nav-items">
                <li><NuxtLink to="/"><img src="../assets/images/logo.png"></NuxtLink></li> 
                <li><NuxtLink to="/flota">Flota</NuxtLink></li>
                <li><NuxtLink to="/sucursales">Sucursales</NuxtLink></li>
                <li><a href="#">Corporativo</a>
                    <ul class="dropdown" aria-label="submenu">
                        <li><NuxtLink to="/paginas/operativo">Leasing Operativo</NuxtLink></li>
                        <li><NuxtLink to="/paginas/corporativo">Planes Corporativos</NuxtLink></li> 
                    </ul>
                </li>  
                <li><NuxtLink to="/clientes">Maneja tu Reserva</NuxtLink></li>
                <li>  
                    <button @click="storeLenguaje.setEN()"> EN </button> |
                    <button @click="storeLenguaje.setES()"> ES </button>
                </li> 
            </ul> 
        </div>
        <!-- LENGUAJE ACTUAL:   {{ storeLenguaje.lenguaje }}  -->
    </nav>   
</header>
</template>

<style lang="scss" scoped> 
.menu {
    width: 100%;
    background:#ffffff;
    background-color: white;
border-bottom: solid 5px #FFD115;
    display: flex; 
    z-index: -80000;
    .NuxtLink-active {
    color:#d8d8d8;
    }
    nav {
    background:#fff;
    width: 100%;  
    align-items: center;
    font-weight: bold; 
    color: #5f5f5f; 
        img {
            max-height: 35px; 
        } 
    }
    .nav-content {
        display: flex;
        justify-content: space-between;
        padding: 10px  0px;
        align-items: center;

        ul { 
            display: flex;
            justify-content: space-around;
            width: 100%;
            list-style: none;
            margin: 0; 
        } 
        li {
            color: #5f5f5f; 
            display: block;
            float: left;
            padding: 1rem;
            position: relative;
            text-decoration: none;
            transition-duration: 0.5s;
        }  
        li:hover, li:focus-within {  
            cursor: pointer;
        } 
        li:focus-within a {
            outline: none;
        }
        
        ul li ul {
            background: #ffffff ;
            visibility: hidden;
            opacity: 0;
            min-width: 5rem;
            position: absolute;
            transition: all 0.5s ease;
            margin-top: 1rem;
            left: 0;
            display: none;
            z-index: 101;
        }
            
        ul li:hover > ul,
        ul li:focus-within > ul,
        ul li ul:hover, ul li ul:hover {
            visibility: visible;
            opacity: 1;
            display: block;
        } 
        ul li ul li {
        clear: both;
        width: 100%;
        } 
    } 
    
}  
.nav-items {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
    padding: 0 10px;
    }
}
i {
display: none;
}

// Mobile version - hidden menu
@media screen and (max-width: 768px) {
    nav {
        background: #ffffff ;
        width: 100%;  
        align-items: center;
        font-weight: bold;
        color: #5f5f5f; 
        .nav-content { 
            flex-direction: column;
            z-index: 100;
            position: relative;
            transition: all 0.2s ease-out;
            background: #ffffff ;
        
            li{
                width: 100%;
            }
            
            li:hover, li:focus-within {  
                cursor: pointer;
            }  
            
            ul li ul {
                background: #ffffff ;
                visibility: visible;
                opacity: 1;
                display: block;
                min-width: 5rem;
                position: relative;
                transition: all 0.5s ease;
                margin-top: 1rem;
                left: auto; 
                
                
            }
            
            ul li:active > ul,
            ul li:focus-within > ul,
            ul li ul:active, ul li ul:focus {
                visibility: visible;
                opacity: 1;
                display: block;
            }  
        } 
        
    }   
    .open-menu {
        opacity: 1;
 
    }
    .closed-menu {
        opacity: 0;
        height: 0;
        padding: 0;
    }

    .nav-items {
        width: 100%;
        flex-direction: column;
        background: #ffffff ;
        visibility: visible;
        opacity: 1;
        display: block; 
    }
    i {
        display: block;
        text-align: right;
        padding: 0 10px 10px 0;
        color: #5f5f5f;
    } 
}
</style> 