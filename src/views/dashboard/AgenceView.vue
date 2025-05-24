<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
//@ts-ignore
import { ref, computed, onMounted, watch } from 'vue';
//@ts-ignore
import { useAxiosRequestWithToken } from '@/utils/service/axios_api'
//@ts-ignore
import { ApiRoutes } from '@/utils/service/endpoints/api'
//@ts-ignore
import { useToast } from 'vue-toast-notification'
//@ts-ignore
import type { IPlan } from '@/utils/interface/plan/IPlan';
//@ts-ignore
import { getToken } from '@/stores/token'
//@ts-ignore
import type { IAgency } from '@/utils/interface/agency/IAgency';

//@ts-ignore
import { clearUser } from '@/stores/user'
//@ts-ignore
import { clearToken } from '@/stores/token'
//@ts-ignore
import { getUser } from '@/stores/user'

//Header

const isUserMenuOpen = ref(false);
const user = getUser();

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



const toast = useToast()
const token = getToken() as string
const plans = ref<Array<IPlan>>([{} as IPlan])
const isLoading = ref(false)
const router = useRouter()

// Filtres
const searchQuery = ref('');
const statusFilter = ref('');
const regionFilter = ref('');
const regions = ref([
  'Kinshasa',
  'Kongo Central',
  'Kwango',
  'Kwilu',
  'Mai-Ndombe',
  'Équateur',
  'Tshuapa',
  'Mongala',
  'Nord-Ubangi',
  'Sud-Ubangi',
  'Haut-Uele',
  'Bas-Uele',
  'Tshopo',
  'Haut-Lomami',
  'Lomami',
  'Sankuru',
  'Maniema',
  'Ituri',
  'Nord-Kivu',
  'Sud-Kivu',
  'Tanganyika',
  'Haut-Katanga',
  'Lualaba',
  'Kasaï',
  'Kasaï-Central',
  'Kasaï-Oriental'
]);


// Formulaire d'agence
const agencyForm = ref<IAgency>({
  AgencyName: '',
  AgencyAddress: '',
  AgencyPhone: '',
  AgencyCity: '',
  AgencyRegion: regions.value[0],
  PlanId: 0,
  AgencyStatus: 'active',
  AgencyId: 0,
  AgencyStartDate: new Date().toISOString().split('T')[0],
  AgencyEndDate: '',
  AgencyUsed: '0',
  AgencyDuration: 30
});

// Modals
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const loading = ref(false);
const agencyToDelete = ref<IAgency | null>(null);

// Liste des agences
const agencies = ref<Array<{
  id: number;
  name: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  status: string;
  package: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    total: string;
    used: string;
    speed: string;
    status: string;
  };
}>>([]);




const handleSearch = () => {
  // Vous pouvez ajouter un debounce ici si nécessaire
  console.log("Recherche en cours...");
};

const clearSearch = () => {
  searchQuery.value = '';
};



// Calculer la date de fin automatiquement
const calculateEndDate = () => {
  if (agencyForm.value.AgencyStartDate && agencyForm.value.AgencyDuration) {
    const startDate = new Date(agencyForm.value.AgencyStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + agencyForm.value.AgencyDuration);
    agencyForm.value.AgencyEndDate = endDate.toISOString().split('T')[0];
  }
};

// Charger les forfaits
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

// Ajouter cette fonction pour vérifier et mettre à jour le statut
const isNearEnd = (endDate: string): boolean => {
  const end = new Date(endDate);
  const now = new Date();
  const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 2;
};


const checkUsageAndUpdateStatus = async () => {
  try {
    for (const agency of agencies.value) {
      const used = parseFloat(agency.package.used);
      const total = parseFloat(agency.package.total);

      console.log("ebongo",used,total)

      if (used >= total && agency.status !== 'inactive') {

        // Mettre à jour le statut de l'agence
        const rep=await useAxiosRequestWithToken(token).put(
          `${ApiRoutes.putAgency}/${agency.id}`,
          {
            ...agencyForm.value,
            AgencyStatus: 'inactive'
          }
        );
        console.log("ebongo",rep)

        // Mettre à jour localement
        agency.status = 'inactive';

        toast.open({
          message: `L'agence ${agency.name} a été désactivée car le forfait est épuisé`,
          type: 'warning',
          position: 'bottom',
          duration: 5000
        });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
  }
};

// Modifier la fonction getAllAgencies pour inclure la vérification
const getAllAgencies = async () => {
  isLoading.value = true;
  try {
    const response = await useAxiosRequestWithToken(token).get(ApiRoutes.agenciesAll);
    agencies.value = response.data.data.map((agency: IAgency) => ({
      id: agency.AgencyId,
      name: agency.AgencyName,
      address: agency.AgencyAddress,
      city: agency.AgencyCity,
      region: agency.AgencyRegion,
      phone: agency.AgencyPhone,
      status: agency.AgencyStatus, // Statut de l'agence
      package: {
        id: agency.PlanId,
        name: agency.plan?.PlanName || 'Forfait non attribué',
        startDate: agency.AgencyStartDate,
        endDate: agency.AgencyEndDate,
        total: agency.plan?.PlanTotal || '0',
        used: agency.AgencyUsed,
        speed: agency.plan?.PlanSpeed || '0 Mbps',
        status: getPackageStatus(agency.AgencyStartDate, agency.AgencyEndDate, agency.AgencyUsed, String(agency.plan?.PlanTotal || '0'))
      }
    }));

    // Vérifier les consommations après chargement
    await checkUsageAndUpdateStatus();
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors du chargement des agences");
  } finally {
    isLoading.value = false;
  }
};

// Déterminer le statut du forfait
// Modifier getPackageStatus pour plus de précision
const getPackageStatus = (startDate: string, endDate: string, used: string, total: string): string => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const usedValue = parseFloat(used);
  const totalValue = parseFloat(total);

  if (now > end) return 'expired';
  if (usedValue >= totalValue) return 'exhausted';
  if (now < start) return 'pending';
  return 'active';
};

// Ajouter cette fonction pour vérifier périodiquement
const startUsageChecker = () => {
  // Vérifier toutes les heures
  setInterval(checkUsageAndUpdateStatus, 3600000);
};


const calculateAutoUsage = (startDate: string, endDate: string, total: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // Vérifier si les dates sont valides
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "0";
  }

  // Calculer la durée totale en jours (jusqu'à 2 jours avant la fin)
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const adjustedTotalDays = Math.max(totalDays - 2, 1); // On s'arrête 2 jours avant la fin

  // Calculer les jours écoulés (mais pas plus que adjustedTotalDays)
  const elapsedDays = Math.min(
    Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    adjustedTotalDays
  );

  // Calculer la progression (entre 0 et 1)
  const progress = Math.min(elapsedDays / adjustedTotalDays, 1);

  // Calculer la consommation (en Go)
  const totalValue = parseFloat(total) || 0;
  const consumed = (totalValue * progress).toFixed(2);

  return consumed;
};

const getDaysRemaining = (endDate: string): string => {
  const end = new Date(endDate);
  const now = new Date();
  const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Expiré";
  if (diffDays === 1) return "1 jour";
  return `${diffDays} jours`;
};

const updateAgenciesWithAutoUsage = () => {
  agencies.value = agencies.value.map(agency => {
    // Calculer la consommation automatique
    const autoUsed = calculateAutoUsage(
      agency.package.startDate,
      agency.package.endDate,
      agency.package.total
    );

    // Calculer le pourcentage de consommation
    const totalValue = parseFloat(agency.package.total) || 1; // Éviter la division par zéro
    const usagePercentage = (parseFloat(autoUsed) / totalValue) * 100;

    return {
      ...agency,
      package: {
        ...agency.package,
        used: autoUsed,
        status: getPackageStatus(
          agency.package.startDate,
          agency.package.endDate,
          autoUsed,
          agency.package.total
        ),
        // Ajoutez une propriété pour le pourcentage si nécessaire
        usagePercentage: Math.min(usagePercentage, 100) // Ne pas dépasser 100%
      }
    };
  });
};






// Calculer la durée entre deux dates
const calculateDuration = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) return 30;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

// Calculer l'utilisation dynamique
const calculateDynamicUsage = (startDate: string, endDate: string, used: string, total: string): number => {
  const usedValue = parseFloat(used);
  const totalValue = parseFloat(total);
  const realUsagePercentage = (usedValue / totalValue) * 100;

  if (!startDate || !endDate) {
    return realUsagePercentage;
  }

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();

  if (isNaN(start) || isNaN(end) || start >= end) {
    return realUsagePercentage;
  }

  const totalDuration = end - start;
  const elapsed = Math.min(Math.max(now - start, 0), totalDuration);
  const timePercentage = (elapsed / totalDuration) * 100;

  return Math.min(Math.max(realUsagePercentage, timePercentage), 100);
};

// Créer une agence
const createAgency = async () => {
  loading.value = true;

  if (!agencyForm.value.AgencyName || !agencyForm.value.PlanId) {
    toast.open({
      message: 'Le nom de l\'agence et le plan sont obligatoires',
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
    loading.value = false;
    return;
  }

  try {
    await useAxiosRequestWithToken(token).post(
      ApiRoutes.storeAgency,
      agencyForm.value
    );

    toast.open({
      message: 'Agence créée avec succès!',
      type: 'success',
      position: 'bottom',
      duration: 5000
    });
    resetForm();
    closeModal();
    await getAllAgencies();
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erreur lors de la création de l\'agence';
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

// Mettre à jour une agence
const updateAgency = async () => {
  loading.value = true;

  if (!agencyForm.value.AgencyName || !agencyForm.value.PlanId) {
    toast.open({
      message: 'Le nom de l\'agence et le plan sont obligatoires',
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
    loading.value = false;
    return;
  }

  try {
     await useAxiosRequestWithToken(token).put(
      `${ApiRoutes.putAgency}/${agencyForm.value.AgencyId}`,
      agencyForm.value
    );

    toast.open({
      message: 'Agence mise à jour avec succès!',
      type: 'success',
      position: 'bottom',
      duration: 5000
    });
    closeModal();
    await getAllAgencies();
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour de l\'agence';
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

// Supprimer une agence
const confirmDelete = async () => {
  if (!agencyToDelete.value) return;

  loading.value = true;
  try {
    await useAxiosRequestWithToken(token).delete(
      `${ApiRoutes.deleteAgency}/${agencyToDelete.value.AgencyId}`
    );

    agencies.value = agencies.value.filter(a => a.id !== agencyToDelete.value?.AgencyId);
    toast.open({
      message: `Agence "${agencyToDelete.value.AgencyName}" supprimée avec succès!`,
      type: 'success',
      position: 'bottom',
      duration: 5000
    });
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erreur lors de la suppression de l\'agence';
    toast.open({
      message: errorMessage,
      type: 'error',
      position: 'bottom',
      duration: 5000
    });
  } finally {
    loading.value = false;
    showDeleteModal.value = false;
    agencyToDelete.value = null;
  }
};

// Gestion des modals
const openCreateModal = () => {
  resetForm();
  isEditing.value = false;
  showModal.value = true;
};

const editAgency = (agency: any) => {
  agencyForm.value = {
    AgencyId: agency.id,
    AgencyName: agency.name,
    AgencyCity: agency.city,
    AgencyRegion: agency.region,
    AgencyPhone: agency.phone,
    AgencyStatus: agency.status as 'active' | 'inactive' | 'pending',
    AgencyAddress: agency.address,
    PlanId: agency.package.id,
    AgencyStartDate: agency.package.startDate || new Date().toISOString().split('T')[0],
    AgencyEndDate: agency.package.endDate || '',
    AgencyUsed: agency.package.used || '0',
    AgencyDuration: calculateDuration(agency.package.startDate, agency.package.endDate) || 30
  };
  isEditing.value = true;
  showModal.value = true;
};

const confirmDeleteAgency = (agency: any) => {
  agencyToDelete.value = {
    AgencyId: agency.id,
    AgencyName: agency.name
  } as IAgency;
  showDeleteModal.value = true;
};




const closeModal = () => {
  showModal.value = false;
};

const resetForm = () => {
  agencyForm.value = {
    AgencyId: 0,
    AgencyName: "",
    AgencyAddress: "",
    AgencyPhone: "",
    AgencyCity: "",
    AgencyRegion: regions.value[0],
    PlanId: 0,
    AgencyStatus: 'active',
    AgencyStartDate: new Date().toISOString().split('T')[0],
    AgencyEndDate: "",
    AgencyUsed: "0",
    AgencyDuration: 30
  };
  calculateEndDate();
};



// Filtrage des agences
const filteredAgencies = computed(() => {
  let result = agencies.value;


  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((agency: { name: string; city: string; }) =>
      agency.name.toLowerCase().includes(query) ||
      agency.city.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value) {
    result = result.filter(agency => agency.status === statusFilter.value);
  }

  if (regionFilter.value) {
    result = result.filter(agency => agency.region === regionFilter.value);
  }

  return result;
});

// Utilitaires d'affichage
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// const formatPhone = (phone: string | null | undefined) => {
//   if (!phone) return 'Non renseigné';
//   return phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
// };

const getStatusClass = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-red-100 text-red-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Actif';
    case 'inactive': return 'Inactif';
    case 'pending': return 'En attente';
    default: return 'Inconnu';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return 'fas fa-check-circle text-green-600';
    case 'inactive': return 'fas fa-times-circle text-red-600';
    case 'pending': return 'fas fa-clock text-yellow-600';
    default: return 'fas fa-question-circle text-gray-600';
  }
};

const getStatusBackGClass = (status: string) => {
  switch (status) {
    case 'active': return 'bg-blue-600';
    case 'inactive': return 'bg-red-500';
    case 'pending': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const getPackageStatusBgClass = (status: string) => {
  switch (status) {
    case 'active': return 'bg-blue-600';
    case 'exhausted': return 'bg-yellow-500';
    case 'expired': return 'bg-red-500';
    case 'pending': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

const getProgressBarClass = (percentage: number) => {
  if (percentage < 70) return 'bg-gradient-to-r from-blue-500 to-blue-400';
  if (percentage < 90) return 'bg-gradient-to-r from-yellow-500 to-yellow-400';
  return 'bg-gradient-to-r from-red-500 to-red-400';
};

const resetFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
  regionFilter.value = '';
};

onMounted(() => {
  // Mettre à jour immédiatement
  updateAgenciesWithAutoUsage();

  // Mettre à jour toutes les 24 heures
  setInterval(updateAgenciesWithAutoUsage, 24 * 60 * 60 * 1000);
  startUsageChecker();
  getAllPlans();
  getAllAgencies();
});


// Watcher pour calcul automatique de la date de fin
watch(() => [agencyForm.value.AgencyStartDate, agencyForm.value.AgencyDuration], () => {
  calculateEndDate();
}, { deep: true });
</script>

<template>
  <!-- Modal de création/modification -->
  <div v-if="showModal" class="fixed inset-0 modal-overlay bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl modal-content shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">
            {{ isEditing ? 'Modifier une agence' : 'Créer une nouvelle agence' }}
          </h3>
          <button @click="closeModal" class="text-gray-500 cursor-pointer hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="isEditing ? updateAgency() : createAgency()">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Champs du formulaire inchangés -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'agence</label>
              <input
                v-model="agencyForm.AgencyName"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input
                v-model="agencyForm.AgencyCity"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Région</label>
              <select
                v-model="agencyForm.AgencyRegion"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="region in regions" :value="region" :key="region">{{ region }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                v-model="agencyForm.AgencyPhone"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                v-model="agencyForm.AgencyAddress"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                v-model="agencyForm.AgencyStatus"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="pending">En attente</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
              <input
                v-model="agencyForm.AgencyStartDate"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Durée (jours)</label>
              <input
                v-model="agencyForm.AgencyDuration"
                type="number"
                min="1"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
              <input
                v-model="agencyForm.AgencyEndDate"
                type="date"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Consommation (Go)</label>
              <input
                v-model="agencyForm.AgencyUsed"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Forfait internet</label>
              <select
                v-model="agencyForm.PlanId"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionnez un forfait</option>
                <option
                  v-for="plan in plans"
                  :key="plan.PlanId"
                  :value="plan.PlanId"
                >
                  {{ plan.PlanName }} ({{ plan.PlanPrice }}$/mois)
                </option>
              </select>
            </div>
          </div>

          <div class="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700"
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
            <i class="fas fa-times"></i>
          </button>
        </div>

        <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer l'agence "{{ agencyToDelete?.AgencyName }}" ? Cette action est irréversible.</p>

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
              <router-link
                  to="/register"
                  class="block w-full cursor-pointer text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <i class="fas fa-user-plus mr-2"></i> Créer un compte
              </router-link>
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
        <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Gestion des agences</h1>
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
      <!-- Filtres -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-sliders-h text-blue-600 mr-2"></i>Filtrer les résultats
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Région</label>
            <div class="relative">
              <select
                v-model="regionFilter"
                class="appearance-none w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Toutes les régions</option>
                <option v-for="region in regions" :value="region" :key="region">{{ region }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Statut de l'agence</label>
            <div class="relative">
              <select
                v-model="statusFilter"
                class="appearance-none w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="pending">En attente</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>
          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="w-full flex items-center cursor-pointer justify-center px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all hover:shadow-sm"
            >
              <i class="fas fa-redo mr-2"></i>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      <!-- Bouton d'action -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Liste des Agences</h2>
        <div class="flex space-x-3">
          <button
            @click="openCreateModal"
            class="flex items-center cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <i class="fas fa-plus mr-2"></i> Nouvelle agence
          </button>
        </div>
      </div>

      <!-- Liste des agences -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="agency in filteredAgencies"
    :key="agency.name"
     :value="agency.id"
    class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
  >
    <!-- Bandeau de statut coloré -->
    <div :class="`h-2 ${getStatusBackGClass(agency.status)}`"></div>

    <div class="p-6">
      <!-- En-tête de l'agence -->
      <div class="flex items-center mb-5">
        <div class="relative">
          <div class="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-inner">
            <i class="fas fa-store text-blue-600 text-2xl"></i>
          </div>
          <span
            :class="`absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs ${getStatusClass(agency.status)}`"
          >
            <i :class="getStatusIcon(agency.status)"></i>
          </span>
        </div>
        <div class="ml-4">
          <h2 class="text-lg font-semibold text-gray-900">{{ agency.name }}</h2>
          <p class="text-sm text-gray-500 flex items-center">
            <i class="fas fa-map-marker-alt mr-1.5 text-gray-400"></i>
            {{ agency.city }}, {{ agency.region }}
          </p>
        </div>
      </div>

      <!-- Carte du forfait -->
      <div class="mt-5 bg-gradient-to-br from-gray-50 to-white rounded-lg p-5 border border-gray-100 shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-md font-bold text-gray-800">{{ agency.package.name }}</h3>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <i class="far fa-calendar-alt mr-2"></i>
              <span>{{ formatDate(agency.package.startDate) }} - {{ formatDate(agency.package.endDate) }}</span>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <span
              :class="`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(agency.status)}`"
            >
              {{ getStatusText(agency.status) }}
            </span>
            <span class="mt-1 text-xs font-medium text-gray-500">
              {{ agency.package.total }} Go total
            </span>
          </div>
        </div>

        <!-- Barre de progression améliorée -->
        <!-- Dans la carte d'agence, modifiez la barre de progression -->
        <div class="mb-4">
  <div class="flex justify-between items-center mb-2">
    <span class="text-xs font-medium text-gray-500">Evolution du forfait</span>
    <div class="flex items-center">
      <span class="text-xs font-semibold" :class="{
        'text-green-600': (parseFloat(agency.package.used) / parseFloat(agency.package.total) * 100) < 70,
        'text-yellow-600': (parseFloat(agency.package.used) / parseFloat(agency.package.total) * 100) >= 70 && (parseFloat(agency.package.used) / parseFloat(agency.package.total) * 100) < 90,
        'text-red-600': (parseFloat(agency.package.used) / parseFloat(agency.package.total) * 100) >= 90
      }">
        {{ Math.round((parseFloat(agency.package.used) / parseFloat(agency.package.total) * 100)) }}%
      </span>
      <span class="mx-1 text-gray-300">•</span>
      <span class="text-xs font-medium text-gray-500">
        {{ agency.package.used }} / {{ agency.package.total }} Go
      </span>
    </div>
  </div>
  <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
    <div
      :class="`h-full rounded-full ${
        isNearEnd(agency.package.endDate)
          ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
          : 'bg-gradient-to-r from-blue-500 to-indigo-400'
      }`"
      :style="`width: ${(parseFloat(agency.package.used) / parseFloat(agency.package.total) * 100)}%`"
    ></div>
  </div>
  <div v-if="isNearEnd(agency.package.endDate)" class="text-right text-xs text-yellow-600 mt-1">
    <i class="fas fa-exclamation-triangle mr-1"></i>
    Fin prévue: {{ formatDate(agency.package.endDate) }}
    ({{ getDaysRemaining(agency.package.endDate) }} jours restants)
  </div>
</div>

        <!-- Détails du forfait - Version améliorée -->
        <div class="grid grid-cols-3 gap-3 text-center mb-4">
          <div class="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
            <p class="text-xs font-medium text-blue-500 mb-1">VITESSE</p>
            <p class="text-sm font-bold text-blue-700">{{ agency.package.speed }}</p>
          </div>
          <div class="bg-green-50/50 rounded-lg p-3 border border-green-100">
            <p class="text-xs font-medium text-green-500 mb-1">UTILISÉ</p>
            <p class="text-sm font-bold text-green-700">{{ agency.package.used }} Go</p>
          </div>
          <div class="bg-indigo-50/50 rounded-lg p-3 border border-indigo-100">
            <p class="text-xs font-medium text-indigo-500 mb-1">TOTAL</p>
            <p class="text-sm font-bold text-indigo-700">{{ agency.package.total }} Go</p>
          </div>
        </div>

        <!-- Projection de consommation -->
        <div v-if="calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total) > 0"
             class="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
          <div class="flex justify-between items-center mb-1">
            <span class="text-xs font-medium text-gray-500">Projection</span>
            <span class="text-xs font-semibold" :class="{
              'text-green-600': calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total) < 70,
              'text-yellow-600': calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total) >= 70 && calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total) < 90,
              'text-red-600': calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total) >= 90
            }">
              {{ Math.round(calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total)) }}%
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              :class="`h-full rounded-full ${
                calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total) >= 90
                  ? 'bg-gradient-to-r from-red-500 to-pink-500'
                  : calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total) >= 70
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                  : 'bg-gradient-to-r from-green-500 to-teal-400'
              }`"
              :style="`width: ${calculateDynamicUsage(agency.package.startDate, agency.package.endDate, agency.package.used, agency.package.total)}%`"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-1 text-center">
            Estimation fin de période
          </p>
        </div>

        <!-- Boutons d'action -->
        <div class="mt-4 flex space-x-3">
          <button
            @click.stop="editAgency(agency)"
            class="flex-1 flex items-center cursor-pointer justify-center py-2 px-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            <i class="fas fa-edit mr-2"></i> Modifier
          </button>
          <button
            @click.stop="confirmDeleteAgency(agency)"
            class="flex-1 cursor-pointer flex items-center justify-center py-2 px-3 bg-red-100 hover:bg-red-200 rounded-lg text-red-600 text-sm font-medium transition-colors"
          >
            <i class="fas fa-trash mr-2"></i> Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
      <!-- Loader -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
      </div>

      <!-- Message si aucun résultat -->
      <div
        v-else-if="filteredAgencies.length === 0"
        class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
      >
        <div class="max-w-md mx-auto">
          <div class="h-40 flex items-center justify-center">
            <i class="fas fa-map-marked-alt text-gray-300 text-6xl"></i>
          </div>
          <h3 class="text-xl font-medium text-gray-800 mb-2">Aucune agence trouvée</h3>
          <p class="text-gray-500 mb-6">Modifiez vos critères de recherche ou créez une nouvelle agence</p>
          <button
            @click="resetFilters"
            class="inline-flex items-center cursor-pointer px-5 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            <i class="fas fa-redo mr-2"></i> Réinitialiser les filtres
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Styles inchangés */
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

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.bg-exhausted {
  background-color: #f59e0b;
}
.text-exhausted {
  color: #f59e0b;
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

.card-actions button {
  transition: all 0.2s ease;
}

.card-actions button:hover {
  transform: translateY(-1px);
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
