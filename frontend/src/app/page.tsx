'use client';

import { useState, useEffect, useCallback } from 'react';
import { Farmer, FindFarmersFilters, PaginationOptions, PaginationMeta } from '@/types/farmer';
import { apiService } from '@/services/api';
import FarmersTable from '@/components/FarmersTable';
import FarmersFilters from '@/components/FarmersFilters';
import Pagination from '@/components/Pagination';
import EditFarmerModal from '@/components/EditFarmerModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import CreateFarmerModal from '@/components/CreateFarmerModal';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FindFarmersFilters>({});
  const [pagination, setPagination] = useState<PaginationOptions>({ page: 1, limit: 10 });
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [deletingFarmer, setDeletingFarmer] = useState<Farmer | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState<string>('');

  const fetchFarmers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getFarmers(filters, pagination);
      setFarmers(response.data);
      setPaginationMeta(response.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar agricultores');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  useEffect(() => {
    fetchFarmers();
  }, [fetchFarmers]);

  const handleEdit = useCallback((farmer: Farmer) => {
    setEditingFarmer(farmer);
    setShowEditModal(true);
  }, []);

  const handleDelete = useCallback((farmer: Farmer) => {
    setDeletingFarmer(farmer);
    setShowDeleteModal(true);
  }, []);

  const handleToggleStatus = useCallback(async (farmer: Farmer) => {
    try {
      if (farmer.isActive) {
        await apiService.deactivateFarmer(farmer.id);
      } else {
        await apiService.activateFarmer(farmer.id);
      }
      await fetchFarmers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar status do agricultor');
    }
  }, [fetchFarmers]);

  const handleEditSave = () => {
    fetchFarmers();
  };

  const handleDeleteConfirm = () => {
    fetchFarmers();
  };

  const handleFiltersChange = useCallback((newFilters: FindFarmersFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filters change
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusValue(value);
  }, []);


  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando agricultores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agricultores</h1>
              <p className="mt-2 text-gray-600">
                Gerencie os agricultores cadastrados no sistema
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Novo Agricultor
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <FarmersFilters
            key="farmers-filters"
            searchValue={searchValue}
            statusValue={statusValue}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onFiltersChange={handleFiltersChange}
          />

          <div className="bg-white shadow rounded-lg">
            <FarmersTable
              key="farmers-table"
              farmers={farmers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
            
            {paginationMeta && (
              <Pagination
                meta={paginationMeta}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <EditFarmerModal
        farmer={editingFarmer}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingFarmer(null);
        }}
        onSave={handleEditSave}
      />

      <DeleteConfirmModal
        farmer={deletingFarmer}
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingFarmer(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      <CreateFarmerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleEditSave}
      />
    </div>
  );
}