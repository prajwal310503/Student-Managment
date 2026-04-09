import { useState, useEffect, useCallback } from 'react';
import { getStudents, deleteStudent as apiDeleteStudent } from '../api/studentApi';
import useDebounce from './useDebounce';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ course: '', year: '', gender: '', status: '', sortBy: '', sortOrder: '' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 8
  });

  const debouncedSearch = useDebounce(search, 250);

  const fetchStudents = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page,
          limit: pagination.limit,
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(filters.course && { course: filters.course }),
          ...(filters.year && { year: filters.year }),
          ...(filters.gender && { gender: filters.gender }),
          ...(filters.status && { status: filters.status }),
          ...(filters.sortBy && { sortBy: filters.sortBy }),
          ...(filters.sortOrder && { sortOrder: filters.sortOrder })
        };
        const res = await getStudents(params);
        setStudents(res.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          total: res.total
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, filters, pagination.limit]
  );

  useEffect(() => {
    fetchStudents(1);
  }, [debouncedSearch, filters]);

  const deleteStudent = async (id) => {
    await apiDeleteStudent(id);
    fetchStudents(pagination.currentPage);
  };

  return {
    students,
    loading,
    error,
    pagination,
    search,
    setSearch,
    filters,
    setFilters,
    refetch: fetchStudents,
    deleteStudent
  };
};

export default useStudents;
