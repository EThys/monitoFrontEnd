<template>
  <section class="py-20 bg-gradient-to-b from-white to-blue-50">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- En-tête section -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">NOS SOLUTIONS CONNECTÉES</span>
        <h2 class="text-4xl font-bold text-gray-900 sm:text-5xl">
          Technologies <span class="text-blue-600">ultra-performantes</span> pour votre entreprise
        </h2>
        <p class="mt-6 text-xl text-gray-600">
          Des solutions de connectivité innovantes pour briser les barrières géographiques et booster votre productivité.
        </p>
      </div>

      <!-- Grille de services -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Service 1 - Internet Satellite -->
        <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl group-hover:rotate-[15deg] transition-transform duration-500">
              <i class="fas fa-satellite-dish"></i>
            </div>
          </div>
          <div class="pt-10 text-center">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Internet Satellite Haut Débit</h3>
            <p class="text-gray-600 mb-4">
              Connectivité fiable partout, même dans les zones les plus reculées.
            </p>
            <ul class="text-left text-gray-500 text-sm mb-6 space-y-2">
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Débits jusqu'à 100 Mbps</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Installation professionnelle</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Support technique 24/7</li>
            </ul>
            <a href="#" class="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              Voir les offres
              <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Service 2 - Réseaux d'entreprise -->
        <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl group-hover:rotate-[15deg] transition-transform duration-500">
              <i class="fas fa-network-wired"></i>
            </div>
          </div>
          <div class="pt-10 text-center">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Infrastructures Réseaux</h3>
            <p class="text-gray-600 mb-4">
              Conception et déploiement de réseaux d'entreprise sur mesure.
            </p>
            <ul class="text-left text-gray-500 text-sm mb-6 space-y-2">
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Câblage structuré</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Wi-Fi haute performance</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Sécurité réseau avancée</li>
            </ul>
            <a href="#" class="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              En savoir plus
              <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Service 3 - Téléphonie -->
        <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl group-hover:rotate-[15deg] transition-transform duration-500">
              <i class="fas fa-phone-alt"></i>
            </div>
          </div>
          <div class="pt-10 text-center">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Solutions VoIP Professionnelles</h3>
            <p class="text-gray-600 mb-4">
              Téléphonie IP performante avec fonctionnalités avancées.
            </p>
            <ul class="text-left text-gray-500 text-sm mb-6 space-y-2">
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Appels illimités</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Centre de contact intégré</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Compatible mobile/desktop</li>
            </ul>
            <a href="#" class="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              Voir les tarifs
              <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Service 4 - Surveillance -->
        <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl group-hover:rotate-[15deg] transition-transform duration-500">
              <i class="fas fa-video"></i>
            </div>
          </div>
          <div class="pt-10 text-center">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Surveillance Connectée</h3>
            <p class="text-gray-600 mb-4">
              Systèmes de sécurité et monitoring à distance.
            </p>
            <ul class="text-left text-gray-500 text-sm mb-6 space-y-2">
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Caméras HD 4K</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Détection intelligente</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> </li>
            </ul>
            <a href="#" class="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              Demander un devis
              <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Service 5 - Maintenance -->
        <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl group-hover:rotate-[15deg] transition-transform duration-500">
              <i class="fas fa-tools"></i>
            </div>
          </div>
          <div class="pt-10 text-center">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Support Technique Premium</h3>
            <p class="text-gray-600 mb-4">
              Assistance technique et maintenance proactive.
            </p>
            <ul class="text-left text-gray-500 text-sm mb-6 space-y-2">
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Intervention rapide</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Forfaits adaptés</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-blue-500 mr-2"></i> Experts certifiés</li>
            </ul>
            <a href="#" class="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              Nos engagements
              <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  // Animation au défilement
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.group').forEach(card => {
    observer.observe(card)
  })
})
</script>

<style scoped>
/* Animation des cartes */
.group {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-fadeInUp {
  opacity: 1;
  transform: translateY(0);
}

/* Délais d'animation pour un effet cascade */
.group:nth-child(1) { transition-delay: 0.1s; }
.group:nth-child(2) { transition-delay: 0.2s; }
.group:nth-child(3) { transition-delay: 0.3s; }
.group:nth-child(4) { transition-delay: 0.4s; }
.group:nth-child(5) { transition-delay: 0.5s; }
/* Retire le .group:nth-child(6) si tu n'as plus que 5 services */

.group:hover .fa-arrow-right {
  transform: translateX(5px);
}
</style>
