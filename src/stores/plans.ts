//@ts-ignore
import type { IPlan } from '@/utils/interface/plan/IPlan'

export function setPlans(planData: IPlan[]): void {
  try {
    localStorage.setItem('PLANS_CACHE', JSON.stringify(planData));
  } catch (e) {
    console.error('Erreur lors de la sauvegarde des plans', e);
  }
}

export function getPlans(): IPlan[] | null {
  try {
    const planString = localStorage.getItem('PLANS_CACHE');
    return planString ? JSON.parse(planString) : null;
  } catch (e) {
    console.error('Erreur lors de la récupération des plans', e);
    return null;
  }
}
