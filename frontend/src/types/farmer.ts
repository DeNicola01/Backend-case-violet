export interface Farmer {
  id: string;
  fullName: string;
  cpf: string;
  birthDate?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFarmerData {
  fullName: string;
  cpf: string;
  birthDate?: string;
  phone?: string;
  isActive?: boolean;
}

export interface UpdateFarmerData {
  fullName?: string;
  birthDate?: string;
  phone?: string;
  isActive?: boolean;
}

export interface FindFarmersFilters {
  name?: string;
  cpf?: string;
  isActive?: boolean;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}


