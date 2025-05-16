<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { ref } from 'vue'
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
import { useRouter } from 'vue-router'
//@ts-ignore
import type { IUser, IUserAuth } from '@/utils/interface/user/IUser'
//@ts-ignore
import type { IToken } from '@/utils/interface/token'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
//@ts-ignore
import { setUser } from '@/stores/user'
//@ts-ignore
import { setToken } from '@/stores/token'

const router = useRouter()
const toast = useToast()
const loading = ref<Boolean>(false)
const auth = ref<IUserAuth>({
  UserEmail: '',
  UserPassword: ''
})

const login = async () => {
  loading.value = true
  const data = JSON.parse(JSON.stringify(auth.value))
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

  await useAxiosRequestWithToken()
    .post(`${ApiRoutes.login}`, data, { signal: abortSignal })
    .then(function (response) {
      //success
      clearTimeout(networkTimeout)
      const token = response.data.data.token
      console.log("heooooooooooooooooooo",response.data.data.role)
      if (token != null) {
        setToken(token as IToken)
        setUser(response.data.data as IUser)
      }
      if (response.data.data.role === 'admin') {
        router.push('/admin/dashboard/agence'); // Route pour les admins
      } else {
        router.push('/user/dashboard/mes-agences'); // Route pour les utilisateurs normaux
      }
      loading.value = false
    })
    .catch(function (error) {
      //error
      clearTimeout(networkTimeout)
      toast.open({
        message: error.response.data.message,
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    })
}

const loginValidate = async () => {
  loading.value = true
  if (
    !auth.value.UserEmail ||
    !auth.value.UserPassword ||
    auth.value.UserEmail.trim() === '' ||
    auth.value.UserPassword.trim() === ''
  ) {
    setTimeout(() => {
      toast.open({
        message: 'Oops...Veuillez remplir vos informations!',
        type: 'error',
        position: 'bottom',
        duration: 5000
      })
      loading.value = false
    }, 300)
    return
  } else {
    await login()
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
    <div class="w-full max-w-md"> <!-- Réduit la largeur max pour le formulaire seul -->
      <!-- Carte de connexion simplifiée -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <!-- Partie Formulaire seule - Centrée -->
        <div class="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
          <!-- Logo -->
          <div class="flex items-center justify-center mb-8 transform transition-transform duration-300 hover:scale-105">
            <div class="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center shadow-sm backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold ml-3 text-gray-800 tracking-tight">Corsat<span class="font-light">Com</span></h1>
          </div>

          <!-- Titre -->
          <div class="space-y-1 mb-8 text-center">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Connexion sécurisée</h2>
            <p class="text-gray-500">Authentifiez-vous pour accéder à votre espace</p>
            <div class="w-16 h-1 bg-blue-500 rounded-full mt-2 mx-auto"></div>
          </div>

          <!-- Formulaire -->
          <form class="space-y-6" @submit.prevent="loginValidate" method="post">
            <!-- Champ Email -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700 flex items-center">
                <span>Adresse email professionnelle</span>
                <span class="ml-1 text-xs text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  v-model="auth.UserEmail"
                  id="email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-700 shadow-sm hover:shadow-md"
                  placeholder="votre@entreprise.com"
                >
              </div>
            </div>

            <!-- Champ Mot de passe -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label for="password" class="block text-sm font-medium text-gray-700 flex items-center">
                  <span>Mot de passe</span>
                  <span class="ml-1 text-xs text-red-500">*</span>
                </label>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-500 transition-all font-medium flex items-center">
                  Mot de passe oublié ?
                </a>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  v-model="auth.UserPassword"
                  id="password"
                  type="password"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-700 shadow-sm hover:shadow-md"
                  placeholder="••••••••"
                >
                <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Options -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">Se souvenir de moi</label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-all flex items-center">
                  Aide à la connexion
                </a>
              </div>
            </div>

           <!-- Bouton de connexion -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">Se connecter</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
                <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>

          </form>

          <!-- Lien d'inscription -->
          <div class="mt-8 text-center text-sm text-gray-500">
            <p class="inline-flex items-center justify-center">
              Vous n'avez pas de compte ?
              <a href="#" class="ml-2 font-medium text-blue-600 hover:text-blue-500 transition-all flex items-center">
                Contactez notre service
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Effets de transition améliorés */
input, button, a, svg, div {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effet de focus plus visible */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}

/* Effet de flou pour les éléments de fond */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
/* Animation du spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Désactivation du bouton pendant le chargement */
button:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

</style>
