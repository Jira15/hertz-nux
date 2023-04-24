<script>
import { useWindowSize } from "@/composables/useWindowSize";
import { ref, computed } from "vue";
// import { useLenguajesStore } from "@/stores/lenguajes";
// const storeLenguaje = useLenguajesStore();

export default {
  setup() {
    const isMenuVisible = ref(false);
    const { width } = useWindowSize();

    const isMobile = computed(() => width.value < 768);
    const isDesktop = computed(() => width.value >= 768);

    const toggleMenu = () => {
      isMenuVisible.value = !isMenuVisible.value;
    };

    return {
      isMenuVisible,
      toggleMenu,
      isMobile,
      isDesktop,
    };
  },
};
</script>

<template>
  <header class="menu">
    <nav class="burger-menu">
      <NuxtLink to="/"><img src="../assets/images/logo.png" /></NuxtLink>

      <button @click="toggleMenu" class="burger-btn" v-if="isMobile">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <transition name="slide-fade">
        <div v-if="isDesktop || isMenuVisible" class="menu-items">
          <ul>
            <li><NuxtLink to="/flota">Flota</NuxtLink></li>
            <li><NuxtLink to="/sucursales">Sucursales</NuxtLink></li>
            <li>
              <a href="#">Corporativo</a>
              <ul class="dropdown" aria-label="submenu">
                <li><NuxtLink to="/paginas/operativo">Leasing Operativo</NuxtLink></li>
                <li>
                  <NuxtLink to="/paginas/corporativo">Planes Corporativos</NuxtLink>
                </li>
              </ul>
            </li>
            <li><NuxtLink to="/clientes">Maneja tu Reserva</NuxtLink></li>
            <li>
              <button @click="storeLenguaje.setEN()">EN</button> |
              <button @click="storeLenguaje.setES()">ES</button>
            </li>
          </ul>
        </div>
      </transition>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.menu {
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  box-shadow: 0px 5px 5px rgba(32, 32, 32, 0.788);

  .router-link-active {
    color: rgb(112, 112, 112);
  }

  nav {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #888888;
    z-index: 9999999;
  }

  img {
    height: 50px;
    margin-right: 20px;
    margin-left: 20px;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
  }
}

.burger-menu {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.burger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
}

.burger-btn span {
  width: 100%;
  height: 3px;
  background: #000000;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.menu-items {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-items ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-items li {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.menu-items li:last-child {
  border-bottom: none;
}

.menu-items a {
  text-decoration: none;
  color: #333;
}
/*  desktop */
@media screen and (min-width: 768px) {
  .menu {
    width: 100%;
    display: flex;
    box-shadow: 0px 5px 5px rgba(32, 32, 32, 0.788);
    padding: 20px;

    .dropdown {
      display: none;
      position: absolute;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 0;
      min-width: 200px;
      max-width: 200px;
    }

    .dropdown {
      a {
        color: #0f0f0f;
      }
      li {
        padding: 10px;
        border-bottom: 1px solid #eee;
      }
      li:last-child {
        border-bottom: none;
      }
    }

    .menu-items li:hover .dropdown {
      display: block;
    }
  }
  .menu-items,
  .menu-items.menu-visible {
    display: flex;
    position: static;
    box-shadow: none;
    background: none;
  }

  .menu-items {
    a {
      color: #000000;
    }
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }

    li {
      padding: 15px;
      border-bottom: none;
      color: #646464;
    }
    li:last-child {
      border-right: none;
    }
  }
}
</style>
