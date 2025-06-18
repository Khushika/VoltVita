
import { create } from 'zustand';
import { ApplianceState, Appliance } from '../types';

export const useApplianceStore = create<ApplianceState>((set, get) => ({
  appliances: [],
  selectedAppliance: null,
  isLoading: false,
  error: null,

  addAppliance: async (applianceData) => {
    set({ isLoading: true, error: null });
    try {
      // Mock adding appliance - replace with Supabase
      const newAppliance: Appliance = {
        ...applianceData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      set(state => ({
        appliances: [...state.appliances, newAppliance],
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add appliance',
        isLoading: false 
      });
    }
  },

  updateAppliance: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      set(state => ({
        appliances: state.appliances.map(appliance =>
          appliance.id === id
            ? { ...appliance, ...updates, updated_at: new Date().toISOString() }
            : appliance
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update appliance',
        isLoading: false 
      });
    }
  },

  deleteAppliance: async (id) => {
    set({ isLoading: true, error: null });
    try {
      set(state => ({
        appliances: state.appliances.filter(appliance => appliance.id !== id),
        selectedAppliance: state.selectedAppliance?.id === id ? null : state.selectedAppliance,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete appliance',
        isLoading: false 
      });
    }
  },

  fetchAppliances: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock data - replace with Supabase
      const mockAppliances: Appliance[] = [
        {
          id: '1',
          user_id: '1',
          name: 'Samsung Refrigerator',
          brand: 'Samsung',
          model: 'RT28T3032S8',
          category: 'cooling',
          purchase_date: '2023-01-15',
          warranty_period: 24,
          warranty_expiry: '2025-01-15',
          purchase_price: 25000,
          serial_number: 'SAM123456789',
          created_at: '2023-01-15T00:00:00Z',
          updated_at: '2023-01-15T00:00:00Z',
        },
        {
          id: '2',
          user_id: '1',
          name: 'LG Washing Machine',
          brand: 'LG',
          model: 'FHM1207ZDL',
          category: 'laundry',
          purchase_date: '2023-03-20',
          warranty_period: 12,
          warranty_expiry: '2024-03-20',
          purchase_price: 18000,
          serial_number: 'LG987654321',
          created_at: '2023-03-20T00:00:00Z',
          updated_at: '2023-03-20T00:00:00Z',
        },
      ];

      set({ appliances: mockAppliances, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch appliances',
        isLoading: false 
      });
    }
  },

  setSelectedAppliance: (appliance) => {
    set({ selectedAppliance: appliance });
  },
}));
