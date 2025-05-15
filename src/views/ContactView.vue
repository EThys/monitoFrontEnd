<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
//@ts-ignore
import NavBar from '@/components/navbar/NavBarComponent.vue';
//@ts-ignore
import FooterComponent from '@/components/footer/FooterComponent.vue';

// État pour le formulaire
const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Animation d'entrée
const animateElements = () => {
  const elements = document.querySelectorAll('h1, p, .bg-white, .bg-gradient-to-br')
  elements.forEach((el, i) => {
    el.setAttribute('style', 'opacity: 0; transform: translateY(20px)')
    setTimeout(() => {
      el.setAttribute(
        'style',
        'transition: opacity 0.6s ease-out, transform 0.6s ease-out; opacity: 1; transform: translateY(0)'
      )
    }, 100 * i)
  })
}

// Soumission du formulaire
const submitForm = async (event: Event) => {
  event.preventDefault()
  isSubmitting.value = true
  submitError.value = ''

  try {
    // Ici vous pourriez faire un appel API
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData.value)
    // })

    // Simuler une réponse réussie pour la démo
    await new Promise(resolve => setTimeout(resolve, 1500))

    submitSuccess.value = true
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    }

    // Réinitialiser après 5 secondes
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    submitError.value = 'Une erreur est survenue. Veuillez réessayer plus tard.'
    console.error('Erreur lors de la soumission:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Animation au montage
onMounted(() => {
  animateElements()
})

// Types pour les données du formulaire
interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  consent: boolean
}
</script>
<template>
  <NavBar/>
  <div class="min-h-screen bg-gray-50 pt-35 pb-16 px-4 sm:px-6 lg:px-8 contact">
    <!-- En-tête avec animation -->
    <div class="max-w-7xl mx-auto text-center mb-16">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        <span class="block">Contactez-nous</span>
      </h1>
      <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
        Nous serions ravis d'échanger avec vous. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
      </p>
    </div>

    <div class="max-w-7xl mx-auto">
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Section d'informations -->
          <div class="bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white">
            <div class="max-w-md mx-auto">
              <h2 class="text-2xl font-bold mb-8">Nos coordonnées</h2>

              <!-- Carte de contact -->
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-blue-500 rounded-lg p-3">
                    <i class="fas fa-map-marker-alt text-lg"></i>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium">Adresse</h3>
                    <p class="mt-1 text-blue-100">
                      15 Avenue Tanganyika<br>
                      Quartier DIPA, Commune Diulu<br>
                      Mbujimayi, RDC
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-blue-500 rounded-lg p-3">
                    <i class="fas fa-phone-alt text-lg"></i>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium">Téléphone</h3>
                    <p class="mt-1 text-blue-100">
                      +243 893 091 500<br>
                      +243 815 678 901
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-blue-500 rounded-lg p-3">
                    <i class="fas fa-envelope text-lg"></i>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium">Email</h3>
                    <p class="mt-1 text-blue-100">
                      contact@yabiso.com<br>
                      support@yabiso.com
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-blue-500 rounded-lg p-3">
                    <i class="fas fa-clock text-lg"></i>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium">Heures d'ouverture</h3>
                    <p class="mt-1 text-blue-100">
                      Lundi-Vendredi: 8h00-17h00<br>
                      Samedi: 9h00-13h00
                    </p>
                  </div>
                </div>
              </div>

              <!-- Réseaux sociaux -->
              <div class="mt-12">
                <h3 class="text-lg font-medium mb-4">Suivez-nous</h3>
                <div class="flex space-x-4">
                  <a href="#" class="bg-blue-500 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="bg-blue-500 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="bg-blue-500 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" class="bg-blue-500 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <i class="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire de contact -->
          <div class="p-10">
            <div class="max-w-md mx-auto">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>

              <form class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      class="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Votre nom"
                    >
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      class="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="votre@email.com"
                    >
                  </div>
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone (optionnel)</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-phone-alt text-gray-400"></i>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      class="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+243 XXX XXX XXX"
                    >
                  </div>
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700">Sujet</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-tag text-gray-400"></i>
                    </div>
                    <select
                      id="subject"
                      name="subject"
                      class="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="" disabled selected>Sélectionnez un sujet</option>
                      <option value="support">Support technique</option>
                      <option value="sales">Demande commerciale</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i class="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                  <div class="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      class="py-3 px-4 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Décrivez votre demande..."
                    ></textarea>
                  </div>
                </div>

                <div class="flex items-center">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="consent" class="ml-2 block text-sm text-gray-700">
                    J'accepte que mes données soient traitées conformément à la
                    <a href="#" class="text-blue-600 hover:text-blue-500">politique de confidentialité</a>.
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <i class="fas fa-paper-plane mr-2"></i> Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <FooterComponent/>
</template>



<style scoped>
.contact{
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
/* Vos styles existants restent inchangés */
/* ... */

/* Ajout pour les messages de feedback */

</style>
