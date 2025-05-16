<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md text-center">
      <!-- Carte d'erreur 404 -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
        <!-- Bandeau coloré -->
        <div class="h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

        <div class="p-8 md:p-10">
          <!-- Illustration 404 -->
          <div class="relative mx-auto mb-8 w-48 h-48">
            <div class="absolute inset-0 bg-indigo-100 rounded-full opacity-20"></div>
            <div class="absolute inset-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="absolute bottom-0 right-0 bg-white rounded-full shadow-md w-16 h-16 flex items-center justify-center">
              <span class="text-2xl font-bold text-indigo-600">404</span>
            </div>
          </div>

          <!-- Titre et message -->
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Page introuvable</h1>
          <p class="text-gray-600 mb-6">
            Oups ! La page que vous recherchez semble avoir disparu dans un trou noir.
          </p>
          <div class="w-20 h-1 bg-indigo-500 rounded-full mx-auto mb-8"></div>

          <!-- Actions -->
          <div class="space-y-4">
            <router-link
              to="/"
              class="block w-full px-5 py-3 text-center font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <i class="fas fa-home mr-2"></i> Retour à l'accueil
            </router-link>

            <button
              @click="goBack"
              class="w-full px-5 py-3 text-center font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-300"
            >
              <i class="fas fa-arrow-left mr-2"></i> Retour à la page précédente
            </button>

            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-500 mb-2">Vous cherchez quelque chose en particulier ?</p>
              <div class="relative max-w-xs mx-auto">
                <input
                  type="text"
                  placeholder="Rechercher sur le site..."
                  class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-700">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.state.back) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
/* Animation pour l'illustration */
svg {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Transition pour les boutons */
button, a {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Style pour l'input de recherche */
input {
  transition: all 0.2s ease;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
</style>
