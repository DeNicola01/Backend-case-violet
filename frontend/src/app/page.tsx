'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Farmer, FindFarmersFilters, PaginationOptions, PaginationMeta } from '@/types/farmer';
import { apiService } from '@/services/api';
import FarmersTable from '@/components/FarmersTable';
import FarmersFilters from '@/components/FarmersFilters';
import Pagination from '@/components/Pagination';
import EditFarmerModal from '@/components/EditFarmerModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import CreateFarmerModal from '@/components/CreateFarmerModal';

export default function Home() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [deletingFarmer, setDeletingFarmer] = useState<Farmer | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Build filters object from search and status
  const buildFilters = useCallback((): FindFarmersFilters => {
    const filters: FindFarmersFilters = {};
    
    if (searchTerm.trim()) {
      const isCpf = /^[\d.\-\s]*$/.test(searchTerm) && searchTerm.replace(/\D/g, '').length > 0;
      if (isCpf) {
        filters.cpf = searchTerm;
      } else {
        filters.name = searchTerm;
      }
    }
    
    if (statusFilter !== '') {
      filters.isActive = statusFilter === 'true';
    }
    
    return filters;
  }, [searchTerm, statusFilter]);

  // Build pagination object
  const buildPagination = useCallback((): PaginationOptions => {
    return { page: currentPage, limit: pageSize };
  }, [currentPage, pageSize]);

  const fetchFarmersRef = useRef<((showLoading?: boolean) => Promise<void>) | null>(null);
  
  const fetchFarmers = useCallback(async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      const filters = buildFilters();
      const pagination = buildPagination();
      const response = await apiService.getFarmers(filters, pagination);
      setFarmers(response.data);
      setPaginationMeta(response.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar agricultores');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, [buildFilters, buildPagination]);

  fetchFarmersRef.current = fetchFarmers;

  // Separate effect for initial load (with loading)
  useEffect(() => {
    if (fetchFarmersRef.current) {
      fetchFarmersRef.current(true);
    }
  }, []);

  // Effect for status filter and pagination changes (without loading)
  useEffect(() => {
    if (fetchFarmersRef.current) {
      fetchFarmersRef.current(false);
    }
  }, [statusFilter, currentPage, pageSize]);

  // Effect for search term with debounce (without loading)
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      if (fetchFarmersRef.current) {
        fetchFarmersRef.current(false);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchTerm]);

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
      await fetchFarmers(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar status do agricultor');
    }
  }, [fetchFarmers]);

  const handleEditSave = () => {
    fetchFarmers(false);
  };

  const handleDeleteConfirm = () => {
    fetchFarmers(false);
  };

  // Handle search change with debounce
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Handle status filter change
  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);


  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('');
    setCurrentPage(1);
  }, []);


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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Agricultores</h1>
            <p className="mt-2 text-gray-600">
              Gerencie os agricultores cadastrados no sistema
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <FarmersFilters
            key="farmers-filters"
            searchValue={searchTerm}
            statusValue={statusFilter}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onClearFilters={clearFilters}
            onCreateFarmer={() => setShowCreateModal(true)}
          />

          <div className="bg-white shadow-xl shadow-gray-200/50 rounded-lg border border-gray-200">
            <FarmersTable
              farmers={farmers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
            
            <Pagination
              meta={paginationMeta || {
                page: currentPage,
                limit: pageSize,
                total: 0,
                totalPages: 0,
                hasPrevious: false,
                hasNext: false
              }}
              onPageChange={handlePageChange}
            />
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