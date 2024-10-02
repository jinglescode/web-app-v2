import { createSlice } from '@reduxjs/toolkit';
import { Contract } from 'src/core/api';

import { getContractStatus, getContracts, getContractsByFilter } from '../thunks/contracts.thunk';

interface ContractsState {
  offers: Contract[];
  page: number;
  limit: number;
  totalCount: number;
  error: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedOfferId?: string;
  filter: 'all' | 'ongoing' | 'archived';
  openSlider: boolean;
}
const initialState = {
  offers: [],
  page: 1,
  limit: 5,
  totalCount: 0,
  error: '',
  status: 'idle',
  filter: 'all',
  openSlider: false,
} as ContractsState;
export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selectedOfferId = action.payload;
    },

    updateStatus: (state, action) => {
      state.offers = state.offers.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              status: action.payload.offerStatus,
              contractStatus: getContractStatus(
                action.payload.type,
                action.payload.paymentType,
                action.payload.offerStatus,
                action.payload.missionStatus,
              ),
              mission: item.mission
                ? { ...item.mission, status: action.payload.missionStatus || item.mission }
                : undefined,
            }
          : item,
      );
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateFeedback: (state, action) => {
      state.offers = state.offers.map(item =>
        item.id === action.payload.id ? { ...item, org_feedback: action.payload.orgFeedback } : item,
      );
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    handleDisplaySlider: (state, action) => {
      state.openSlider = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContracts.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.offers = action.payload.offers;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalCount = action.payload.totalCount;
        state.status = 'succeeded';
        state.error = '';
      })
      .addCase(getContracts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
      .addCase(getContractsByFilter.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getContractsByFilter.fulfilled, (state, action) => {
        state.offers = action.payload.offers;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalCount = action.payload.totalCount;
        state.status = 'succeeded';
        state.error = '';
      })
      .addCase(getContractsByFilter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const { setSelected, updateStatus, updateFeedback, updateFilter, updatePage, handleDisplaySlider } =
  contractsSlice.actions;
