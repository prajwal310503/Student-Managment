import { useState } from 'react';
import { UserPlus, Users, LayoutGrid, List } from 'lucide-react';
import toast from 'react-hot-toast';
import useStudents from '../hooks/useStudents';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import Pagination from '../components/ui/Pagination';
import StudentCard from '../components/students/StudentCard';
import StudentTable from '../components/students/StudentTable';
import StudentFormModal from '../components/students/StudentFormModal';
import { DashboardSkeleton } from '../components/ui/Skeletons';
import EmptyState from '../components/ui/EmptyState';

const StudentsList = () => {
  const {
    students, loading, error, pagination,
    search, setSearch, filters, setFilters,
    refetch, deleteStudent
  } = useStudents();

  const [viewMode, setViewMode] = useState('card');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const openAdd  = () => { setEditingId(null); setModalOpen(true); };
  const openEdit = (id) => { setEditingId(id); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingId(null); };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success('Student deleted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete student');
    }
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="max-w-screen-xl mx-auto space-y-4 sm:space-y-5">

      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg shadow-violet-200">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Users size={13} className="text-violet-200 flex-shrink-0" />
              <span className="text-violet-200 text-xs font-semibold uppercase tracking-wide">All Records</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">Students List</h1>
            <p className="text-violet-200 text-xs sm:text-sm mt-0.5 hidden sm:block">Browse, search and manage all enrolled students</p>
          </div>
          <button
            onClick={openAdd}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 sm:px-5 sm:py-2.5 bg-white text-violet-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-violet-50 transition-colors shadow-md"
          >
            <UserPlus size={14} /> <span className="hidden sm:inline">Add Student</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          {/* View toggle — always visible */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl flex-shrink-0">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'card' ? 'bg-white shadow text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Card view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Table view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      {/* Content */}
      {loading ? (
        <DashboardSkeleton viewMode={viewMode} />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button onClick={() => refetch(pagination.currentPage)} className="px-5 py-2 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
            Retry
          </button>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <EmptyState search={search} hasFilters={hasFilters} />
        </div>
      ) : (
        <>
          {/* Card view — always on mobile, optional on desktop */}
          {(viewMode === 'card' || viewMode !== 'table') && (
            <div className={viewMode === 'table' ? 'md:hidden' : ''}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {students.map((s) => (
                  <StudentCard key={s._id} student={s} onDelete={handleDelete} onEdit={openEdit} />
                ))}
              </div>
            </div>
          )}

          {/* Table view — only on md+ */}
          {viewMode === 'table' && (
            <>
              <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <StudentTable students={students} onDelete={handleDelete} onEdit={openEdit} />
              </div>
              {/* Fallback to cards on mobile when table selected */}
              <div className="md:hidden">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {students.map((s) => (
                    <StudentCard key={s._id} student={s} onDelete={handleDelete} onEdit={openEdit} />
                  ))}
                </div>
              </div>
            </>
          )}

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={(page) => refetch(page)}
          />
        </>
      )}

      {/* Modal */}
      <StudentFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        studentId={editingId}
        onSuccess={() => refetch(pagination.currentPage)}
      />
    </div>
  );
};

export default StudentsList;
