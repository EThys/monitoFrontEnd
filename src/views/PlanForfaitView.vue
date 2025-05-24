<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
//@ts-ignore
import { ref, computed, onMounted} from 'vue';
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
//@ts-ignore
import { getToken } from '@/stores/token'
//@ts-ignore
import type { IPlan } from '@/utils/interface/plan/IPlan';
//@ts-ignore
import { clearUser, getUser } from '@/stores/user'
//@ts-ignore
import { clearToken } from '@/stores/token'
//@ts-ignore


const user = getUser();



const toast = useToast()

const planForm = ref<IPlan>({
  PlanName: '',
  PlanDescription: '',
  PlanPrice: 0,
  PlanSpeed: '',
  PlanTotal: 0,
  PlanStatus: 'active',
  PlanId: 0
})

const token = getToken() as string

const getAllPlans = async () => {
  isLoading.value = true;
  try {
    const response = await useAxiosRequestWithToken(token).get(`${ApiRoutes.AllPlan}`);
    plans.value = response.data.data as Array<IPlan>;
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors du chargement des forfaits");
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  // Vous pouvez ajouter un debounce ici si nécessaire
  console.log("Recherche en cours...");
};

const clearSearch = () => {
  searchQuery.value = '';
};


onMounted(() => {
  getAllPlans();
});
const loading = ref(false)
const router = useRouter()
const plans = ref<Array<IPlan>>([{} as IPlan])

const createPlan = async () => {
  loading.value = true

  // Validation simple côté client
  if (!planForm.value.PlanName || planForm.value.PlanPrice <= 0 || !planForm.value.PlanSpeed || planForm.value.PlanTotal <= 0) {
    toast.open({
      message: 'Tous les champs sont obligatoires',
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
    loading.value = false
    return
  }

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
     await useAxiosRequestWithToken(token).post(
      ApiRoutes.storePlan,
      planForm.value,
      { signal: abortSignal }
    )

    clearTimeout(networkTimeout)

    toast.open({
      message: 'Forfait créé avec succès!',
      type: 'success',
      position: 'bottom',
      duration: 5000
    })
    resetForm();
    closeModal();
    getAllPlans();
  } catch (error: any) {
    clearTimeout(networkTimeout)

    const errorMessage = error.response?.data?.message || 'Erreur lors de la création du forfait'
    toast.open({
      message: errorMessage,
      type: 'error',
      position: 'bottom',
      duration: 5000
    })
  } finally {
    loading.value = false
  }
}

const isLoading = ref(false);

// Variables pour les modales
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const planToDelete = ref<typeof plans.value[0] | null>(null);

// Réinitialisation du formulaire
function resetForm() {
  planForm.value = {
    PlanId:0,
    PlanName: '',
    PlanDescription: '',
    PlanPrice: 0,
    PlanSpeed: '',
    PlanTotal: 0,
    PlanStatus: 'active'
  };
}

// Ouverture de la modale de création
function openCreateModal() {
  resetForm();
  isEditing.value = false;
  showModal.value = true;
}

// Édition d'un forfait
function editPlan(plan: typeof plans.value[0]) {
  planForm.value = JSON.parse(JSON.stringify(plan));
  isEditing.value = true;
  showModal.value = true;
}

// Confirmation de suppression
function confirmDeletePlan(plan: typeof plans.value[0]) {
  planToDelete.value = plan;
  showDeleteModal.value = true;
}

// Fermeture des modales
function closeModal() {
  showModal.value = false;
}

// Mise à jour d'un forfait
const updatePlan = async () => {
  loading.value = true;

  if (!planForm.value.PlanId || !planForm.value.PlanName || planForm.value.PlanPrice <= 0 || !planForm.value.PlanSpeed || planForm.value.PlanTotal <= 0) {
    toast.open({
      message: 'Tous les champs sont obligatoires',
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
    loading.value = false;
    return;
  }

  try {
    const response = await useAxiosRequestWithToken(token).put(
      `${ApiRoutes.planUpdate}/${planForm.value.PlanId}`,
      planForm.value
    );

    toast.open({
      message: 'Forfait mis à jour avec succès!',
      type: 'success',
      position: 'bottom',
      duration: 5000
    });

    // Mettre à jour les données locales après l'API
    const index = plans.value.findIndex(p => p.PlanId === planForm.value.PlanId);
    if (index !== -1) {
      plans.value[index] = response.data.data;
    }

    resetForm();
    closeModal();
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Échec de la mise à jour du forfait';
    toast.open({
      message: errorMessage,
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
  } finally {
    loading.value = false;
  }
};

const confirmDelete = async () => {
  if (!planToDelete.value) return;

  loading.value = true;

  try {
    await useAxiosRequestWithToken(token).delete(
      `${ApiRoutes.planDestroy}/${planToDelete.value.PlanId}`
    );

    toast.open({
      message: 'Forfait supprimé avec succès!',
      type: 'success',
      position: 'bottom',
      duration: 5000
    });

    // Mettre à jour les données locales après l'API
    plans.value = plans.value.filter((p: { PlanId: any; }) => p.PlanId !== planToDelete.value?.PlanId);

  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Échec de la suppression du forfait';
    toast.open({
      message: errorMessage,
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
  } finally {
    showDeleteModal.value = false;
    planToDelete.value = null;
    loading.value = false;
  }
};

// Filtres et recherche
const searchQuery = ref('');
const statusFilter = ref('active');

// Forfaits filtrés
const filteredPlans = computed(() => {
  let result = plans.value;

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((plan: { PlanName: string; PlanDescription: string; }) =>
      plan.PlanName.toLowerCase().includes(query) ||
      plan.PlanDescription.toLowerCase().includes(query)
    );
  }

  // Filtre par statut
  if (statusFilter.value) {
    result = result.filter((plan: { PlanStatus: string; }) => plan.PlanStatus === statusFilter.value);
  }

  return result;
});

// Réinitialisation des filtres
function resetFilters() {
  searchQuery.value = '';
  statusFilter.value = 'active';
}

//Header

const isUserMenuOpen = ref(false);

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

function logout() {
  // Implémentez votre logique de déconnexion ici
  console.log('Déconnexion...');
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  clearUser(), clearToken(), router.push('/')
  isUserMenuOpen.value = false;
}


//Header

// Fonctions utilitaires
function getStatusClass(status: string) {
  return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
}

function getStatusIcon(status: string) {
  return status === 'active' ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-gray-400';
}

function getStatusText(status: string) {
  return status === 'active' ? 'Actif' : 'Inactif';
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(price);
}
</script>

<template>
  <!-- Modal de création/modification -->
  <div v-if="showModal" class="fixed inset-0 modal-overlay bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl modal-content shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">
            {{ isEditing ? 'Modifier un forfait' : 'Créer un nouveau forfait' }}
          </h3>
          <button @click="closeModal" class="text-gray-500 cursor-pointer hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="isEditing ? updatePlan() : createPlan()">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom du forfait</label>
              <input
                v-model="planForm.PlanName"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="planForm.PlanDescription"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                <div class="relative">
                  <input
                    v-model.number="planForm.PlanPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    class="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                  <span class="absolute right-3 top-2.5 text-gray-500">$</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Vitesse</label>
                <input
                  v-model="planForm.PlanSpeed"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 50Mbps"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Données totales (GB)</label>
                <input
                  v-model.number="planForm.PlanTotal"
                  type="number"
                  min="0"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                v-model="planForm.PlanStatus"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>

          <div class="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              :disabled="loading"
              class="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-24"
            >
              <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
              {{ isEditing ? 'Mettre à jour' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal de confirmation de suppression -->
  <div v-if="showDeleteModal" class="fixed inset-0 modal-overlay bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white modal-content rounded-xl shadow-2xl w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Confirmer la suppression</h3>
          <button @click="showDeleteModal = false" class="text-gray-500 hover:text-gray-700">
            <i class=" cursor-pointer fas fa-times"></i>
          </button>
        </div>

        <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer le forfait "{{ planToDelete?.PlanName }}" ? Cette action est irréversible.</p>

        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="confirmDelete"
            :disabled="loading"
            class="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700"
          >
          <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
  <!-- Header élégant avec fond dégradé -->
  <header class="bg-gradient-to-r from-blue-800 to-blue-700 shadow-md top-0 z-50 backdrop-blur-sm bg-opacity-90">
  <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
    <!-- Première ligne avec logo et menu utilisateur -->
    <div class="flex justify-between items-center">
      <!-- Logo et nom de l'entreprise -->
      <div class="flex items-center space-x-3">
        <div class="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
          <i class="fas fa-satellite-dish text-white text-lg"></i>
        </div>
        <div>
          <h2 class="font-bold text-white text-xl tracking-tight">Corsatcom</h2>
          <p class="text-blue-100 text-xs">Solutions Haut Débit</p>
          <p class="text-blue-100 text-xs">{{user?.user.UserPhone}}</p>
          <p class="text-blue-100 text-xs">{{user?.user.UserEmail}}</p>
        </div>
      </div>

      <!-- Menu utilisateur et contacts -->
      <div class="flex items-center space-x-6">
        <!-- Contacts discrètement intégrés -->
        <div class="hidden md:flex items-center space-x-4">
          <a href="mailto:contact@corsatcom.net" class="text-blue-100 hover:text-white transition-colors" title="Email">
            <i class="fas fa-envelope mr-1"></i>
            <span class="text-sm">contact@corsatcom.net</span>
          </a>
          <a href="tel:+1234567890" class="text-blue-100 hover:text-white transition-colors" title="Téléphone">
            <i class="fas fa-phone-alt mr-1"></i>
            <span class="text-sm">+243 826 035 322</span>
          </a>
        </div>

        <!-- Menu utilisateur -->
        <!-- Menu utilisateur -->
        <div class="relative">
          <button
            @click.stop="toggleUserMenu"
            class="flex items-center space-x-2 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
          >
            <div class="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-sm">
              <i class="fas fa-user text-sm"></i>
            </div>
            <span class="text-white text-sm hidden md:inline font-medium">Mon compte</span>
          </button>

          <!-- Ajoutez ce div pour la zone de clic externe -->
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
              class="fixed inset-0 z-40"
              @click="isUserMenuOpen = false"
            ></div>
          </transition>

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
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">Compte administrateur</p>
                <p class="text-xs text-gray-500 truncate">{{user?.user.UserEmail}}</p>
              </div>
              <button
                @click="logout"
                class="block w-full cursor-pointer text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Deuxième ligne avec titre et recherche -->
    <div class="mt-8 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end">
      <div class="mb-4 md:mb-0 mb-">
        <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Gestion des forfaits</h1>
        <p class="text-blue-100 mt-2 text-sm md:text-base">Administrez votre réseau et vos solutions haut débit</p>
      </div>

      <div class="relative mt-4 w-full md:w-auto md:min-w-[380px]">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="fas fa-search text-blue-200"></i>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une agence..."
          class="w-full pl-10 pr-10 py-2.5 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all"
          @input="handleSearch"
        >
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white transition-colors"
        >
          <i class="fas fa-times text-blue-200"></i>
        </button>
      </div>
    </div>

    <!-- Navigation principale améliorée -->
    <nav class="flex space-x-1 border-b border-white/20">
      <router-link
        to="/admin/dashboard/agence"
        class="px-4 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
        active-class="text-white font-semibold"
      >
        <span>Agences</span>
        <span class="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-30 transition-opacity" :class="{ 'opacity-100': $route.path.includes('agence') }"></span>
      </router-link>
      <router-link
        to="/admin/dashboard/forfait"
        class="px-4 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
        active-class="text-white font-semibold"
      >
        <span>Forfaits</span>
        <span class="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-30 transition-opacity" :class="{ 'opacity-100': $route.path.includes('forfait') }"></span>
      </router-link>
    </nav>
  </div>
</header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Filtres modernes en carte -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-sliders-h text-blue-600 mr-2"></i>Filtrer les résultats
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <div class="relative">
              <select
                v-model="statusFilter"
                class="appearance-none w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>
          <div class="md:col-span-2 flex items-end">
            <button
              @click="resetFilters"
              class="w-full md:w-auto cursor-pointer flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all hover:shadow-sm"
            >
              <i class="fas fa-redo mr-2"></i>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      <!-- Bouton d'ajout -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Forfaits disponibles</h2>
        <button
          @click="openCreateModal"
          class="flex items-center cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-plus mr-2"></i> Nouveau forfait
        </button>
      </div>

       <!-- Loader -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
      </div>

         <!-- Message si aucun résultat -->
         <div
           v-else-if="plans.length === 0 "
            class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
           >
          <div class="max-w-md mx-auto">
            <div class="h-40 flex items-center justify-center">
              <i class="fas fa-wifi text-gray-300 text-6xl"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-2">Aucun forfait trouvé</h3>
            <p class="text-gray-500 mb-6">Modifiez vos critères de recherche ou créez un nouveau forfait</p>
            <button
              @click="resetFilters"
              class="inline-flex items-center cursor-pointer px-5 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <i class="fas fa-redo mr-2"></i> Réinitialiser les filtres
            </button>
          </div>
      </div>

      <!-- Liste des forfaits en grille moderne -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="plan in filteredPlans"
          :key="plan.PlanId"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
        >
          <!-- Bandeau de statut coloré -->
          <div :class="`h-2 ${plan.PlanStatus === 'active' ? 'bg-blue-600' : 'bg-gray-400'}`"></div>

          <div class="p-6">
            <!-- En-tête du forfait avec icône -->
            <div class="flex items-center mb-5">
              <div class="relative">
                <div class="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-inner">
                  <i class="fas fa-wifi text-blue-600 text-2xl"></i>
                </div>
                <span
                  :class="`absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs ${getStatusClass(plan.PlanStatus)}`"
                >
                  <i :class="getStatusIcon(plan.PlanStatus)"></i>
                </span>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-900">{{ plan.PlanName }}</h2>
                <p class="text-sm text-gray-500">
                  {{ formatPrice(plan.PlanPrice) }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-600 mb-5">{{ plan.PlanDescription }}</p>

            <!-- Détails du forfait -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-xs text-gray-500">Vitesse</p>
                <p class="font-bold text-blue-600">{{ plan.PlanSpeed }}</p>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-xs text-gray-500">Données</p>
                <p class="font-bold text-blue-600">{{ plan.PlanTotal }}GB</p>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-xs text-gray-500">Statut</p>
                <p class="font-bold" :class="plan.PlanStatus === 'active' ? 'text-green-600' : 'text-gray-600'">
                  {{ getStatusText(plan.PlanStatus) }}
                </p>
              </div>
            </div>

            <!-- Boutons d'action -->
            <div class="flex space-x-3">
              <button
                @click.stop="editPlan(plan)"
                class="flex-1 py-2 px-3 cursor-pointer bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white text-sm font-medium transition-colors"
              >
                <i class="fas fa-edit mr-1"></i> Modifier
              </button>
              <button
                @click.stop="confirmDeletePlan(plan)"
                class="flex-1 py-2 px-3 bg-red-500 cursor-pointer hover:bg-red-600 rounded-lg text-white text-sm font-medium transition-colors"
              >
                <i class="fas fa-trash mr-1"></i> Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Animation pour les cartes */
.card-enter-active {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de transition douce */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Style personnalisé pour les barres de défilement */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Styles pour les modales */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  z-index: 1001;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 48rem;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
