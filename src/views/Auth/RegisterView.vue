<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { ref } from 'vue'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
import { useRouter } from 'vue-router'
//@ts-ignore
import type { IUser } from '@/utils/interface/user/IUser'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
//@ts-ignore
import { getToken } from '@/stores/token'
import 'vue-toast-notification/dist/theme-sugar.css'

const router = useRouter()
const toast = useToast()
const token = getToken() as string
const loading = ref<Boolean>(false)
const user = ref({
  UserName: '',
  UserPassword: '',
  UserPhone: '',
  UserEmail: ''
})
const confirmPassword = ref('')
const showPassword = ref(false)
const termsAccepted = ref(false)

const register = async () => {
  loading.value = true
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  const networkTimeout = setTimeout(() => {
    abortController.abort()
    loading.value = false
    toast.open({
      message: 'Erreur réseau, veuillez vérifier votre connexion Internet.',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
  }, 30000)

  try {
    const response = await useAxiosRequestWithToken(token).post(
      ApiRoutes.register,
      user.value,
      { signal: abortSignal }
    )

    clearTimeout(networkTimeout)
    toast.open({
      message: 'Inscription réussie! Veuillez vous connecter.',
      type: 'success',
      position: 'bottom',
      duration: 5000
    })
    router.push('/login')
  } catch (error: any) {
    clearTimeout(networkTimeout)
    toast.open({
      message: error.response?.data?.message || "Erreur lors de l'inscription",
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
  } finally {
    loading.value = false
  }
}

const validateRegister = async () => {
  if (!termsAccepted.value) {
    toast.open({
      message: 'Veuillez accepter les conditions générales',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
    return
  }

  if (user.value.UserPassword !== confirmPassword.value) {
    toast.open({
      message: 'Les mots de passe ne correspondent pas',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
    return
  }

  if (
    !user.value.UserName ||
    !user.value.UserEmail ||
    !user.value.UserPassword ||
    !user.value.UserPhone
  ) {
    toast.open({
      message: 'Veuillez remplir tous les champs obligatoires',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
    return
  }

  await register()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
    <div class="w-full max-w-md">
      <!-- Carte d'inscription -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <!-- En-tête -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
          <h1 class="text-2xl font-bold text-white">Créer un compte</h1>
          <p class="text-blue-100 mt-1">Rejoignez notre plateforme</p>
        </div>

        <!-- Formulaire -->
        <div class="p-8 md:p-10">
          <form class="space-y-5" @submit.prevent="validateRegister">
            <!-- Nom complet -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                Nom complet <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  v-model="user.UserName"
                  id="username"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  placeholder="Votre nom complet"
                >
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  v-model="user.UserEmail"
                  id="email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  placeholder="votre@email.com"
                >
              </div>
            </div>

            <!-- Téléphone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  v-model="user.UserPhone"
                  id="phone"
                  type="tel"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  placeholder="+123 456 7890"
                >
              </div>
            </div>

            <!-- Mot de passe -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  v-model="user.UserPassword"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  placeholder="••••••••"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Minimum 8 caractères avec chiffres et lettres
              </p>
            </div>

            <!-- Confirmation mot de passe -->
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe <span class="text-red-500">*</span>
              </label>
              <input
                v-model="confirmPassword"
                id="confirm-password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                placeholder="••••••••"
              >
            </div>

            <!-- Conditions d'utilisation -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="termsAccepted"
                  type="checkbox"
                  class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-gray-700">
                  J'accepte les <a href="#" class="text-blue-600 hover:text-blue-500">conditions générales</a>
                </label>
              </div>
            </div>

            <!-- Bouton d'inscription -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">S'inscrire</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création du compte...
                </span>
              </button>
            </div>
          </form>

          <!-- Lien de connexion -->
          <div class="mt-6 text-center text-sm">
            <p class="text-gray-600">
              Vous avez déjà un compte?
              <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
                Connectez-vous
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation du spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Transition pour les inputs */
input {
  transition: all 0.3s ease;
}

/* Style pour le bouton désactivé */
button:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

/* Effet de focus amélioré */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}
</style>
