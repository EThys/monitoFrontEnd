/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

/**
 * Fonction générique pour les opérations CRUD
 * @param config Configuration de l'opération
 */

const useCrudOperation = <T extends Record<string, any>>() => {
  const loading = ref(false);

  const executeOperation = async (
    config: {
      action: 'create' | 'update' | 'delete';
      apiCall: () => Promise<any>;
      successMessage: string;
      errorMessage: string;
      validation?: (data: T) => boolean | string;
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
      abortTimeout?: number;
    },
    formData: T
  ) => {
    loading.value = true;

    // Validation
    if (config.validation) {
      const validationResult = config.validation(formData);
      if (validationResult !== true) {
        toast.open({
          message: typeof validationResult === 'string' ? validationResult : 'Validation failed',
          type: 'error',
          position: 'bottom',
          duration: 5000
        });
        loading.value = false;
        return;
      }
    }

    const abortController = new AbortController();
    const networkTimeout = setTimeout(() => {
      abortController.abort();
      loading.value = false;
      toast.open({
        message: 'Erreur réseau',
        type: 'error',
        position: 'bottom',
        duration: 5000
      });
    }, config.abortTimeout || 30000);

    try {
      const response = await config.apiCall();
      clearTimeout(networkTimeout);

      toast.open({
        message: config.successMessage,
        type: 'success',
        position: 'bottom',
        duration: 5000
      });

      if (config.onSuccess) {
        config.onSuccess(response);
      }
    } catch (error: any) {
      clearTimeout(networkTimeout);
      const message = error.response?.data?.message || config.errorMessage;

      toast.open({
        message,
        type: 'error',
        position: 'bottom',
        duration: 5000
      });

      if (config.onError) {
        config.onError(error);
      }
    } finally {
      loading.value = false;
    }
  };

  return { loading, executeOperation };
};
