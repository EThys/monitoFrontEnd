<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Gestion de l'état du scroll
const isScrolled = ref(false);
const windowWidth = ref(window.innerWidth);

// Gestion de l'état du menu mobile
const isMobileMenuOpen = ref(false);

// Détermine si on est sur mobile
const isMobile = computed(() => windowWidth.value < 768);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  // Fermer le menu mobile si on passe en desktop
  if (!isMobile.value) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <!-- Navbar -->
  <div
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{
      'bg-white shadow-md': isScrolled,
      'bg-transparent': !isScrolled,
    }"
  >
    <div
      class="container mx-auto px-0 transition-all duration-300"
      :class="{
        'w-full': isScrolled || isMobile,
        'w-4/5': !isScrolled && !isMobile,
      }"
    >
      <!-- Topbar - Masquée sur mobile -->
      <div v-if="!isMobile" class="backG py-2 px-4">
        <div class="flex flex-wrap justify-between items-center w-full">
          <!-- Email et téléphone à gauche -->
          <div class="flex flex-wrap gap-4 text-sm">
            <a href="#" class="text-white hover:text-gray-200 flex items-center">
              <i class="fas fa-envelope mr-1"></i>contact@corsatcom.net
            </a>
            <a href="#" class="text-white hover:text-gray-200 flex items-center">
              <i class="fas fa-phone-alt mr-1"></i>+243 826 035 322
            </a>
          </div>

          <!-- Icônes des réseaux sociaux à droite -->
          <div class="flex space-x-3">
            <a href="#" class="text-white hover:text-gray-200">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-white hover:text-gray-200">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-white hover:text-gray-200">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Navbar principale -->
      <nav
        style="font-family: 'Inter', sans-serif;"
        class="flex items-center justify-between p-4 bg-white rounded-b-lg"
      >
        <!-- Logo - Toujours visible -->
        <router-link to="/" class="text-blue-600 font-bold text-xl">
          Corsatcom
        </router-link>

        <!-- Menu pour desktop - Masqué sur mobile -->
        <div v-if="!isMobile" class="flex items-center space-x-6">
          <router-link to="/" class="text-gray-700 hover:text-blue-600 font-medium">Accueil</router-link>
          <router-link to="/produit" class="text-gray-700 hover:text-blue-600 font-medium">Produits & Services</router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-blue-600 font-medium">Contact</router-link>
        </div>

        <!-- Bouton CTA - Masqué sur mobile -->
        <router-link
          v-if="!isMobile"
          to="/login"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all text-sm font-medium"
        >
          Se connecter
        </router-link>

        <!-- Bouton du menu mobile - Visible uniquement sur mobile -->
        <button
          v-if="isMobile"
          class="text-blue-600 focus:outline-none"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-2xl"></i>
        </button>
      </nav>

      <!-- Menu mobile - Visible uniquement sur mobile -->
      <div
        v-if="isMobile && isMobileMenuOpen"
        class="bg-white shadow-lg rounded-b-lg animate-fade-in"
      >
        <div class="flex flex-col space-y-3 p-4">
          <router-link
            to="/"
            class="text-gray-700 hover:text-blue-600 p-2 rounded hover:bg-gray-50"
            @click="isMobileMenuOpen = false"
          >
            Accueil
          </router-link>
          <router-link
            to="/about"
            class="text-gray-700 hover:text-blue-600 p-2 rounded hover:bg-gray-50"
            @click="isMobileMenuOpen = false"
          >
            Produits & Services
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-700 hover:text-blue-600 p-2 rounded hover:bg-gray-50"
            @click="isMobileMenuOpen = false"
          >
            Contact
          </router-link>
          <router-link
            to="/login"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all text-center mt-2"
            @click="isMobileMenuOpen = false"
          >
            Se connecter
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.backG {
  background-color: #3466d8;
  font-family: 'Inter', sans-serif;
}

/* Animation pour le menu mobile */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out forwards;
}

/* Ajustements pour mobile */
@media (max-width: 640px) {
  nav {
    padding: 0.75rem;
  }
}
</style>
