<template>
<header class="bg-white shadow-sm sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo et navigation principale -->
      <div class="flex items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <i class="fas fa-wifi text-blue-600 text-2xl mr-2"></i>
          <span class="text-xl font-bold text-gray-800">NETCONNECT</span>
        </div>

        <!-- Navigation desktop -->
        <nav class="hidden md:ml-8 md:flex md:space-x-8">
          <router-link
            to="/dashboard"
            class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            Tableau de bord
          </router-link>

          <router-link
            to="/agences"
            class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            Agences
          </router-link>

          <router-link
            to="/forfaits"
            class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            Forfaits
          </router-link>
        </nav>
      </div>

      <!-- Right section -->
      <div class="flex items-center">
        <!-- Search bar -->
        <div class="relative mx-4 hidden md:block">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-search text-gray-400"></i>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
          >
        </div>

        <!-- User dropdown -->
        <div class="ml-4 relative flex-shrink-0">
          <div>
            <button
              @click="toggleUserMenu"
              class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              id="user-menu"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Ouvrir le menu utilisateur</span>
              <div class="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                {{ userInitials }}
              </div>
              <span class="ml-2 text-gray-700 text-sm font-medium hidden md:inline">{{ userName }}</span>
              <i class="fas fa-chevron-down ml-1 text-gray-400 text-xs hidden md:inline"></i>
            </button>
          </div>

          <!-- Dropdown menu -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isUserMenuOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Mon profil
              </router-link>

              <router-link
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Paramètres
              </router-link>

              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Se déconnecter
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div class="md:hidden border-t border-gray-200">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <router-link
        to="/dashboard"
        class="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
        active-class="text-blue-600 bg-blue-50"
      >
        Tableau de bord
      </router-link>

      <router-link
        to="/agences"
        class="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
        active-class="text-blue-600 bg-blue-50"
      >
        Agences
      </router-link>

      <router-link
        to="/forfaits"
        class="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
        active-class="text-blue-600 bg-blue-50"
      >
        Forfaits
      </router-link>
    </div>
  </div>
</header>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// Ajoutez ces variables
const isUserMenuOpen = ref(false);
const userName = "Admin"; // Remplacez par le nom réel de l'utilisateur
const userInitials = computed(() => {
  return userName.split(' ').map(n => n[0]).join('').toUpperCase();
});

// Méthodes
function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

function logout() {
  // Implémentez la logique de déconnexion
  router.push('/login');
  isUserMenuOpen.value = false;
}
</script>

<style scoped>
.nav-button {
  color: white;
  transition: all 0.2s ease;
}

.nav-button:hover {
  transform: translateY(-1px);
}

.nav-button i {
  transition: transform 0.2s ease;
}

.nav-button:hover i {
  transform: scale(1.1);
}

/* Animation pour le menu mobile */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
