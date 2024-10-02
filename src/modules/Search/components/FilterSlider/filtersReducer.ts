import { Item } from 'src/modules/general/components/CheckboxGroup/index.types';

type LabelValue = { label: string; value: string };

export type FiltersType = {
  causes: LabelValue[];
  skills: LabelValue[];
  organizationSize: Item[];
  location: { value: number; label: string; countryCode: string } | null;
  preference: LabelValue | null;
  jobCategory: LabelValue | null;
  jobLength: Item[];
  experienceLevel: Item[];
  paymentType: LabelValue;
  openToVolunteer: boolean | null;
  events: LabelValue | null;
};

export const initialFilters: FiltersType = {
  causes: [],
  skills: [],
  organizationSize: [],
  location: null,
  preference: null,
  jobCategory: null,
  jobLength: [],
  experienceLevel: [],
  paymentType: { label: 'Paid', value: 'PAID' },
  openToVolunteer: null,
  events: null,
};

export function filtersReducer(filters: FiltersType, action: { type: keyof FiltersType | 'reset'; payload: any }) {
  switch (action.type) {
    case 'reset':
      return { ...initialFilters, paymentType: null };
    case 'causes':
      return { ...filters, causes: action.payload };
    case 'skills':
      return { ...filters, skills: action.payload };
    case 'organizationSize':
      return { ...filters, organizationSize: action.payload };
    case 'location':
      return { ...filters, location: action.payload };
    case 'preference':
      return { ...filters, preference: action.payload };
    case 'jobCategory':
      return { ...filters, jobCategory: action.payload };
    case 'jobLength':
      return { ...filters, jobLength: action.payload };
    case 'experienceLevel':
      return { ...filters, experienceLevel: action.payload };
    case 'paymentType':
      return { ...filters, paymentType: action.payload };
    case 'openToVolunteer':
      return { ...filters, openToVolunteer: action.payload };
    case 'events':
      return { ...filters, events: action.payload };
    default:
      console.log('Not valid', action.payload);
      return filters;
  }
}
