import { Farmer, CreateFarmerData, UpdateFarmerData, FindFarmersFilters, PaginationOptions, PaginatedResponse } from '@/types/farmer';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Se a resposta for 204 (No Content), não tenta fazer parse do JSON
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  // Farmers
  async getFarmers(filters?: FindFarmersFilters, pagination?: PaginationOptions): Promise<PaginatedResponse<Farmer>> {
    const params = new URLSearchParams();
    
    if (filters?.name) params.append('name', filters.name);
    if (filters?.cpf) params.append('cpf', filters.cpf);
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    
    const queryString = params.toString();
    const endpoint = queryString ? `/farmers?${queryString}` : '/farmers';
    
    return this.request<PaginatedResponse<Farmer>>(endpoint);
  }

  async getFarmerById(id: string): Promise<Farmer> {
    return this.request<Farmer>(`/farmers/${id}`);
  }

  async getFarmerByCpf(cpf: string): Promise<Farmer> {
    return this.request<Farmer>(`/farmers/cpf/${cpf}`);
  }

  async createFarmer(data: CreateFarmerData): Promise<Farmer> {
    return this.request<Farmer>('/farmers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFarmer(id: string, data: UpdateFarmerData): Promise<Farmer> {
    return this.request<Farmer>(`/farmers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteFarmer(id: string): Promise<void> {
    return this.request<void>(`/farmers/${id}`, {
      method: 'DELETE',
    });
  }

  async activateFarmer(id: string): Promise<Farmer> {
    return this.request<Farmer>(`/farmers/${id}/activate`, {
      method: 'PATCH',
    });
  }

  async deactivateFarmer(id: string): Promise<Farmer> {
    return this.request<Farmer>(`/farmers/${id}/deactivate`, {
      method: 'PATCH',
    });
  }
}

export const apiService = new ApiService();


