<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
//@ts-ignore
import carousel1 from '../../assets/one.jpg';
//@ts-ignore
import carousel2 from '../../assets/five.jpg';
//@ts-ignore
import carousel3 from '../../assets/two.jpg'
//@ts-ignore
import carousel4 from '../../assets/four.jpg'
//@ts-ignore
import Navbar from '../navbar/NavbarComponent.vue';

const slides = ref([
  {
    image: carousel1,
    title: "Internet fiable",
    highlight: "partout en RDC",
    subtitle: "Restez connecté, même dans les coins les plus reculés",
    description: "Profitez de nos forfaits internet adaptés à tous vos besoins, avec une couverture nationale exceptionnelle.",
    cta: "Découvrez nos offres"
  },
  {
    image: carousel2,
    title: "Débit ultra-rapide",
    highlight: "pour tous vos usages",
    subtitle: "Streaming, gaming, télétravail sans interruption",
    description: "Notre réseau 4G+ vous offre des vitesses incomparables pour une expérience fluide.",
    cta: "Découvrez nos offres"
  },
  {
    image: carousel3,
    title: "Support client",
    highlight: "24h/24 et 7j/7",
    subtitle: "Une assistance technique toujours disponible",
    description: "Nos experts sont à votre écoute à tout moment pour résoudre vos problèmes rapidement.",
    cta: "Contactez-nous"
  },
  {
    image: carousel4,
    title: "Solutions professionnelles",
    highlight: "pour les entreprises",
    subtitle: "Connectivité sécurisée et performante",
    description: "Des solutions sur mesure pour répondre aux besoins spécifiques de votre entreprise.",
    cta: "Découvrez nos offres"
  }
]);

const currentSlide = ref(0);
const isHovering = ref(false);
let interval: number;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  resetTimer();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
  resetTimer();
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetTimer();
};

const startAutoPlay = () => {
  interval = setInterval(nextSlide, 5000);
};

const stopAutoPlay = () => {
  clearInterval(interval);
};

const resetTimer = () => {
  stopAutoPlay();
  if (!isHovering.value) startAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <Navbar/>
  <div class="hero-carousel h-screen relative overflow-hidden">
    <div
      id="carouselId"
      class="carousel-container w-full h-full"
      @mouseenter="() => { isHovering = true; stopAutoPlay(); }"
      @mouseleave="() => { isHovering = false; startAutoPlay(); }"
    >
      <!-- Carousel Slides -->
      <div
        class="slides-container flex h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide-item w-full h-full flex-shrink-0 relative"
        >
          <div class="gradient-overlay"></div>
          <img
            :src="slide.image"
            class="w-full h-full object-cover"
            :alt="`Slide ${index + 1}: ${slide.title}`"
            loading="lazy"
          />

          <!-- Slide Content -->
          <div class="slide-content">
            <div class="content-wrapper">
              <div class="text-content">
                <h5 class="slide-pre-title">
                  {{ slide.title }} <span class="highlight-text">{{ slide.highlight }}</span>
                </h5>
                <h4 class="slide-title">
                  {{ slide.subtitle }}
                </h4>
                <p class="slide-description">
                  {{ slide.description }}
                </p>
                <a
                  href="#"
                  class="cta-button"
                >
                  {{ slide.cta }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="cta-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <button
        class="carousel-control prev"
        @click="prevSlide"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="control-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <button
        class="carousel-control next"
        @click="nextSlide"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="control-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Carousel Indicators -->
      <div class="indicators-container">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="['indicator', { 'active': currentSlide === index }]"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        >
          <span class="progress-bar" v-if="currentSlide === index && !isHovering"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.hero-carousel {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --text-color: #ffffff;
  --transition-speed: 0.5s;
  font-family: 'Inter', sans-serif;
}

.carousel-container {
  position: relative;
}

.slide-item {
  position: relative;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
}

.slide-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 10%;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.text-content {
  max-width: 600px;
}

.slide-pre-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.highlight-text {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.slide-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all var(--transition-speed) ease;
  text-decoration: none;
}

.cta-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cta-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
  transition: transform var(--transition-speed) ease;
}

.cta-button:hover .cta-icon {
  transform: translateX(3px);
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all var(--transition-speed) ease;
  opacity: 0.7;
}

.carousel-control:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.control-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.indicators-container {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 3;
}

.indicator {
  width: 3rem;
  height: 0.25rem;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 0.125rem;
  cursor: pointer;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.indicator.active {
  background-color: rgba(255, 255, 255, 0.3);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--text-color);
  animation: progress 5s linear forwards;
  transform-origin: left;
}

@keyframes progress {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .slide-content {
    padding: 0 5%;
  }

  .slide-title {
    font-size: 2rem;
  }

  .slide-description {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .slide-content {
    padding: 0 2rem;
    justify-content: center;
    text-align: center;
  }

  .text-content {
    max-width: 100%;
  }

  .gradient-overlay {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  }

  .slide-title {
    font-size: 1.75rem;
  }

  .carousel-control {
    width: 2.5rem;
    height: 2.5rem;
  }

  .indicators-container {
    bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .slide-pre-title {
    font-size: 1rem;
  }

  .highlight-text {
    font-size: 1.25rem;
  }

  .slide-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .slide-description {
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }

  .cta-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .carousel-control {
    width: 2rem;
    height: 2rem;
  }

  .control-icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
