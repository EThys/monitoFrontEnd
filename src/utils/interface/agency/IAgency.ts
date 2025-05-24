import type { IPlan } from "../plan/IPlan"

export interface IAgency {
  AgencyId: number;
  AgencyName: string;
  AgencyAddress: string;
  AgencyPhone: string;
  AgencyCity: string;
  AgencyRegion: string;
  PlanId: number;
  AgencyStatus: 'active' | 'inactive' | 'pending';
  AgencyStartDate: string;
  AgencyEndDate: string;
  AgencyUsed: string;
  AgencyDuration: number;
  plan?: IPlan;
}
