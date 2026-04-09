import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, PencilLine, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import StudentForm from '../components/students/StudentForm';
import { FormPageSkeleton } from '../components/ui/Skeletons';
import { getStudentById, updateStudent } from '../api/studentApi';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudentById(id)
      .then((res) => setStudent(res.data))
      .catch(() => {
        toast.error('Failed to load student');
        navigate('/');
      })
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateStudent(id, formData);
      toast.success('Student updated successfully!');
      navigate(`/students/${id}`);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors?.length) {
        errors.forEach((e) => toast.error(`${e.field}: ${e.message}`));
      } else {
        toast.error(err.response?.data?.message || 'Failed to update student');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <FormPageSkeleton color="bg-orange-100" />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-200/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-sm border border-white/20">
            <PencilLine size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Edit Student</h1>
              <Sparkles size={16} className="text-yellow-300" />
            </div>
            <p className="text-orange-100 text-sm mt-0.5">
              Updating details for <span className="font-semibold text-white">{student?.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <StudentForm initialData={student} onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
