import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, UserPlus, PencilLine, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import StudentForm from './StudentForm';
import { createStudent, updateStudent, getStudentById } from '../../api/studentApi';
import { FormPageSkeleton } from '../ui/Skeletons';

const StudentFormModal = ({ isOpen, onClose, studentId, onSuccess }) => {
  const isEdit = !!studentId;
  const [student, setStudent] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) { setStudent(null); return; }
    if (isEdit) {
      setFetching(true);
      getStudentById(studentId)
        .then((res) => setStudent(res.data))
        .catch(() => { toast.error('Failed to load student'); onClose(); })
        .finally(() => setFetching(false));
    }
  }, [isOpen, studentId]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateStudent(studentId, formData);
        toast.success('Student updated successfully!');
      } else {
        await createStudent(formData);
        toast.success('Student added successfully!');
      }
      onSuccess();
      onClose();
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors?.length) {
        errors.forEach((e) => toast.error(`${e.field}: ${e.message}`));
      } else {
        toast.error(err.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-stretch sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — full screen on mobile, centered popup on sm+ */}
      <div className="relative w-full sm:max-w-4xl sm:max-h-[90vh] bg-white shadow-2xl flex flex-col sm:rounded-2xl overflow-hidden animate-scale-in">

        {/* Gradient header */}
        <div className={`flex-shrink-0 px-4 py-3 sm:px-6 sm:py-5 text-white ${isEdit
          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500'
          : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600'}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 bg-white/15 rounded-xl border border-white/20 flex-shrink-0">
                {isEdit ? <PencilLine size={18} className="text-white" /> : <UserPlus size={18} className="text-white" />}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base sm:text-lg font-bold leading-tight">
                    {isEdit ? 'Edit Student' : 'Add New Student'}
                  </h2>
                  <Sparkles size={12} className="text-yellow-300 flex-shrink-0" />
                </div>
                <p className={`text-xs mt-0.5 hidden sm:block ${isEdit ? 'text-orange-100' : 'text-blue-200'}`}>
                  {isEdit
                    ? `Updating details for ${student?.name || '...'}`
                    : 'Fill in the details to enrol a new student'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors border border-white/20 flex-shrink-0"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-6">
          {fetching ? (
            <FormPageSkeleton color={isEdit ? 'bg-orange-100' : 'bg-blue-100'} />
          ) : (
            <StudentForm
              initialData={isEdit ? student : null}
              onSubmit={handleSubmit}
              loading={loading}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StudentFormModal;
