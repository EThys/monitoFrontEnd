<template>
  <footer style="  font-family: 'Inter', sans-serif;" class="bg-white text-gray-700 py-16 px-4 border-t border-gray-100">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

        <!-- Logo & Description -->
        <div class="space-y-6">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-gray-900 tracking-tight">Corsatcom</span>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed">
           Profitez de nos forfaits internet adaptés à tous vos besoins, avec une couverture nationale exceptionnelle.
          </p>
          <div class="flex space-x-4 pt-2">
            <router-link to="contact">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              Nous contacter
            </button>
            </router-link>
          </div>
        </div>

        <!-- Liens rapides -->
        <div>
          <h3 class="text-gray-900 font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-600">
            Liens rapides
          </h3>
          <ul class="space-y-3">
            <router-link to="/">
              <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span class="w-1 h-1 bg-gray-400 mr-2 group-hover:bg-blue-600 transition-colors duration-300 rounded-full"></span>
                Accueil
              </a></li>
            </router-link>
            <router-link to="produit">
              <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span class="w-1 h-1 bg-gray-400 mr-2 group-hover:bg-blue-600 transition-colors duration-300 rounded-full"></span>
                Services
              </a></li>
            </router-link>
            <router-link to="contact">
              <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
              <span class="w-1 h-1 bg-gray-400 mr-2 group-hover:bg-blue-600 transition-colors duration-300 rounded-full"></span>
             Contact
              </a></li>
            </router-link>
          </ul>
        </div>

        <!-- Informations légales -->
        <div>
          <h3 class="text-gray-900 font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-600">
            Légales
          </h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-300">Politique de confidentialité</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-300">Conditions d'utilisation</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-300">Politique des cookies</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-gray-900 font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-600">
            Newsletter
          </h3>
          <p class="text-gray-500 text-sm mb-4">
            Abonnez-vous pour recevoir nos dernières actualités et offres spéciales.
          </p>
          <form class="space-y-3">
            <input type="email" placeholder="Votre email" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-300">
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              S'abonner
            </button>
          </form>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-8"></div>

      <!-- Bottom section -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Copyright -->
        <div class="text-gray-500 text-sm mb-4 md:mb-0">
          &copy; 2025 <span class="text-gray-900 font-medium">Corsatcom</span>. Tous droits réservés.
        </div>

        <!-- Social media -->
        <!-- <div class="flex space-x-6">
          <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110" aria-label="Twitter">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
            </svg>
          </a>
          <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110" aria-label="Facebook">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
          </a>
          <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110" aria-label="LinkedIn">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110" aria-label="Instagram">
            <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Animation pour les liens */
a {
  position: relative;
}

a:hover {
  text-decoration: none;
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #2563eb;
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}

/* Animation pour les boutons */
button {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

button:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Animation pour les icônes sociales */
svg {
  transition: all 0.3s ease;
}

/* Style pour le champ de formulaire */
input:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
</style>
