<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref } from 'vue';
//@ts-ignore
import NavBar from '@/components/navbar/NavBarComponent.vue';
//@ts-ignore
import FooterComponent from '@/components/footer/FooterComponent.vue';

// Types pour nos produits et services
interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
  popular?: boolean;
  category: 'internet' | 'mobile' | 'entreprise' | 'cloud';
  icon: string;
}

// Données des produits
const products = ref<Product[]>([
  {
    id: 1,
    name: 'Fibre Optique Pro',
    description: 'Internet ultra-rapide pour les professionnels et particuliers exigeants',
    features: [
      'Débit symétrique jusqu\'à 1Gbps',
      'Latence ultra-faible',
      'Support technique 24/7',
      'Installation professionnelle'
    ],
    price: '49 900 FC/mois',
    popular: true,
    category: 'internet',
    icon: '📶'
  },
  {
    id: 2,
    name: '4G+ Illimité',
    description: 'Forfait mobile avec data illimitée et appels/SMS inclus',
    features: [
      'Data vraiment illimitée',
      'Appels et SMS illimités',
      'Couverture nationale',
      'Hotspot inclus'
    ],
    price: '29 900 FC/mois',
    category: 'mobile',
    icon: '📱'
  },
  {
    id: 3,
    name: 'Solution Cloud Entreprise',
    description: 'Infrastructure cloud sécurisée pour votre business',
    features: [
      'Stockage sécurisé',
      'Sauvegarde automatique',
      'Accès multi-utilisateurs',
      'Support dédié'
    ],
    price: 'Sur devis',
    category: 'entreprise',
    icon: '☁️'
  },
  {
    id: 4,
    name: 'WiFi Public Sécurisé',
    description: 'Solution de hotspot WiFi sécurisé pour établissements',
    features: [
      'Portail captif personnalisable',
      'Analyse des données en temps réel',
      'Gestion des utilisateurs',
      'Sécurité renforcée'
    ],
    price: 'À partir de 99 900 FC/mois',
    category: 'entreprise',
    icon: '🔒'
  },
  {
    id: 5,
    name: 'Internet Satellite',
    description: 'Connectivité même dans les zones les plus reculées',
    features: [
      'Couverture 100% du territoire',
      'Installation rapide',
      'Débit garanti',
      'Maintenance incluse'
    ],
    price: '79 900 FC/mois',
    category: 'internet',
    icon: '🛰️'
  },
  {
    id: 6,
    name: 'Téléphonie IP',
    description: 'Solution de téléphonie professionnelle sur IP',
    features: [
      'Standard téléphonique virtuel',
      'Historique des appels',
      'Conférence audio',
      'Intégration CRM'
    ],
    price: 'À partir de 14 900 FC/mois',
    category: 'entreprise',
    icon: '📞'
  }
]);

const activeCategory = ref<string>('all');
const filteredProducts = ref<Product[]>(products.value);

const filterProducts = (category: string) => {
  activeCategory.value = category;
  if (category === 'all') {
    filteredProducts.value = products.value;
  } else {
    filteredProducts.value = products.value.filter(product => product.category === category);
  }
};
</script>

<template>
  <NavBar/>
  <div  style="font-family: 'Inter', sans-serif;" class="products-page pt-30">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Nos Solutions Connectées</h1>
        <p class="hero-subtitle">Découvrez notre gamme complète de produits et services conçus pour vous garder connecté, où que vous soyez</p>
        <div class="hero-cta">
          <!-- <button class="primary-button">Contactez un conseiller</button>
          <button class="secondary-button">Comparer les offres</button> -->
        </div>
      </div>
      <div class="hero-image">
        <div class="gradient-overlay"></div>
      </div>
    </section>

    <!-- Navigation Catégories -->
    <section class="categories-section">
      <div class="container">
        <div class="categories-nav">
          <button
            :class="['category-button', { 'active': activeCategory === 'all' }]"
            @click="filterProducts('all')"
          >
            Toutes les catégories
          </button>
          <button
            :class="['category-button', { 'active': activeCategory === 'internet' }]"
            @click="filterProducts('internet')"
          >
            Internet Haut Débit
          </button>
          <button
            :class="['category-button', { 'active': activeCategory === 'mobile' }]"
            @click="filterProducts('mobile')"
          >
            Mobile
          </button>
          <button
            :class="['category-button', { 'active': activeCategory === 'entreprise' }]"
            @click="filterProducts('entreprise')"
          >
            Solutions Entreprises
          </button>
        </div>
      </div>
    </section>

    <!-- Produits Grid -->
    <section class="products-section">
      <div class="container">
        <div class="products-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            :class="['product-card', { 'popular': product.popular }]"
          >
            <div v-if="product.popular" class="popular-badge">Populaire</div>
            <div class="product-icon">{{ product.icon }}</div>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>

            <div class="product-features">
              <div v-for="(feature, index) in product.features" :key="index" class="feature-item">
                <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>

            <div class="product-footer">
              <div class="product-price">{{ product.price }}</div>
              <button class="product-button">Détails & Souscription</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Services Additionnels -->
    <!-- <section class="services-section">
      <div class="container">
        <h2 class="section-title">Services Complémentaires</h2>
        <p class="section-subtitle">Améliorez votre expérience avec nos services premium</p>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🛡️</div>
            <h3>Cybersécurité</h3>
            <p>Protection avancée contre les cybermenaces pour votre entreprise et vos données.</p>
            <a href="#" class="service-link">En savoir plus →</a>
          </div>

          <div class="service-card">
            <div class="service-icon">👨‍💻</div>
            <h3>Support Premium</h3>
            <p>Accès prioritaire à notre équipe technique avec temps de réponse garanti.</p>
            <a href="#" class="service-link">En savoir plus →</a>
          </div>

          <div class="service-card">
            <div class="service-icon">🏢</div>
            <h3>Installation Pro</h3>
            <p>Installation et configuration par nos experts certifiés pour des performances optimales.</p>
            <a href="#" class="service-link">En savoir plus →</a>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Section CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Vous avez des besoins spécifiques ?</h2>
          <p>Notre équipe est à votre disposition pour créer une solution sur mesure adaptée à vos exigences.</p>
          <button class="cta-button rounded-xl">
            <router-link class="text-blue-600 rounded" to="/contact">Contactez-nous</router-link>
          </button>
        </div>
      </div>
    </section>
  </div>
  <FooterComponent/>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
/* Variables CSS */
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #10b981;
  --dark: #1e293b;
  --light: #f8fafc;
  --gray: #64748b;
  --light-gray: #e2e8f0;
  --border-radius: 12px;
  --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base Styles */
.products-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--dark);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: 0 3rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-cta {
  display: flex;
  gap: 1rem;
}

.hero-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover no-repeat;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(30, 58, 138, 0.8) 0%, rgba(37, 99, 235, 0.4) 100%);
}

/* Buttons */
.button {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.primary-button {
  background-color: white;
  color: var(--primary);
}

.primary-button:hover {
  background-color: var(--light-gray);
  transform: translateY(-2px);
}

.secondary-button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Categories Navigation */
.categories-section {
  padding: 2rem 0;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.categories-nav {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.categories-nav::-webkit-scrollbar {
  height: 4px;
}

.categories-nav::-webkit-scrollbar-thumb {
  background-color: var(--light-gray);
  border-radius: 2px;
}

.category-button {
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  background-color: var(--light-gray);
  color: var(--gray);
  border: none;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: var(--transition);
}

.category-button:hover {
  background-color: #cbd5e1;
}

.category-button.active {
  background-color: var(--primary);
  color: white;
}

/* Products Grid */
.products-section {
  padding: 4rem 0;
  background-color: #f8fafc;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
}

.section-subtitle {
  color: var(--gray);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.product-card.popular {
  border-top: 4px solid var(--primary);
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background-color: var(--primary);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.product-description {
  color: var(--gray);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.product-features {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.feature-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.product-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

.product-button {
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.product-button:hover {
  background-color: var(--primary-dark);
}

/* Services Section */
.services-section {
  padding: 4rem 0;
  background-color: white;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background-color: #f8fafc;
  border-radius: var(--border-radius);
  padding: 2rem;
  transition: var(--transition);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.service-card p {
  color: var(--gray);
  margin-bottom: 1.5rem;
}

.service-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition);
}

.service-link:hover {
  color: var(--primary-dark);
  gap: 0.5rem;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background-color: white;
  padding: 0.75rem 2rem;
  color: var(--primary);
  border-radius: 10px;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}



/* Responsive Design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    flex-direction: column;
    text-align: center;
    padding: 4rem 0;
  }

  .hero-content {
    padding: 0 1.5rem;
    max-width: 100%;
  }

  .hero-image {
    position: relative;
    width: 100%;
    height: 300px;
    margin-top: 2rem;
  }

  .hero-cta {
    justify-content: center;
  }

  .categories-nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-cta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .category-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .product-card {
    padding: 1.5rem;
  }

  .product-name {
    font-size: 1.25rem;
  }
}
</style>
