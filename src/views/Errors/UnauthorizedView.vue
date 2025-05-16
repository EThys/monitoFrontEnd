<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md text-center">
      <!-- Carte d'erreur -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100 transform transition-all duration-300 hover:shadow-2xl">
        <!-- Bandeau rouge -->
        <div class="h-2 bg-red-500"></div>

        <div class="p-8 md:p-10">
          <!-- Icône d'erreur -->
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <!-- Titre et message -->
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Accès non autorisé</h1>
          <p class="text-gray-600 mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <div class="w-20 h-1 bg-red-500 rounded-full mx-auto mb-8"></div>

          <!-- Actions -->
          <div class="space-y-4">
            <router-link
              to="/"
              class="block w-full px-5 py-3 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
            >
              <i class="fas fa-home mr-2"></i> Retour à l'accueil
            </router-link>

            <button
              @click="goBack"
              class="w-full px-5 py-3 text-center font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
            >
              <i class="fas fa-arrow-left mr-2"></i> Retour à la page précédente
            </button>

            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-500 mb-2">Vous pensez qu'il s'agit d'une erreur ?</p>
              <a
                href="mailto:support@corsatcom.com"
                class="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
              >
                <i class="fas fa-envelope mr-2"></i> Contacter le support
              </a>
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
/* Animation pour l'icône */
svg {
  animation: bounce 0.5s ease infinite alternate;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
}

/* Transition pour les boutons */
button, a {
  transition: all 0.2s ease;
}

button:hover, a:hover {
  transform: translateY(-1px);
}
</style>
