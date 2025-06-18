export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  two_factor_enabled: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  account_locked: boolean;
  failed_login_attempts: number;
  last_login_attempt: string | null;
  created_at: string;
  updated_at: string;
}

export interface SecurityAuditLog {
  id: string;
  user_id: string | null;
  event_type: string;
  event_details: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface PhoneVerification {
  id: string;
  user_id: string | null;
  phone_number: string;
  verification_code: string;
  expires_at: string;
  verified: boolean | null;
  created_at: string | null;
}

export interface Appliance {
  id: string;
  user_id: string;
  name: string;
  brand: string;
  model: string;
  category: ApplianceCategory;
  purchase_date: string;
  warranty_period: number; // in months
  warranty_expiry: string;
  purchase_price: number;
  serial_number?: string;
  warranty_document_url?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceRecord {
  id: string;
  appliance_id: string;
  service_date: string;
  service_type: ServiceType;
  provider_name: string;
  cost: number;
  description: string;
  rating?: number;
  created_at: string;
}

export interface MaintenanceSchedule {
  id: string;
  appliance_id: string;
  next_service_date: string;
  service_type: ServiceType;
  is_completed: boolean;
  reminder_sent: boolean;
}

export type ApplianceCategory = 
  | 'kitchen' 
  | 'laundry' 
  | 'cooling' 
  | 'entertainment' 
  | 'cleaning' 
  | 'personal_care' 
  | 'other';

export type ServiceType = 
  | 'maintenance' 
  | 'repair' 
  | 'inspection' 
  | 'cleaning' 
  | 'warranty_service';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export interface ApplianceState {
  appliances: Appliance[];
  selectedAppliance: Appliance | null;
  isLoading: boolean;
  error: string | null;
  addAppliance: (appliance: Omit<Appliance, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateAppliance: (id: string, updates: Partial<Appliance>) => Promise<void>;
  deleteAppliance: (id: string) => Promise<void>;
  fetchAppliances: () => Promise<void>;
  setSelectedAppliance: (appliance: Appliance | null) => void;
}

export interface ServiceState {
  serviceRecords: ServiceRecord[];
  maintenanceSchedules: MaintenanceSchedule[];
  isLoading: boolean;
  error: string | null;
  addServiceRecord: (record: Omit<ServiceRecord, 'id' | 'created_at'>) => Promise<void>;
  fetchServiceRecords: (applianceId: string) => Promise<void>;
  scheduleMaintenace: (schedule: Omit<MaintenanceSchedule, 'id'>) => Promise<void>;
}
