import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import StudentForm from '../components/students/StudentForm';
import { createStudent } from '../api/studentApi';

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createStudent(formData);
      toast.success('Student added successfully!');
      navigate('/');
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors?.length) {
        errors.forEach((e) => toast.error(`${e.field}: ${e.message}`));
      } else {
        toast.error(err.response?.data?.message || 'Failed to add student');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-sm border border-white/20">
            <UserPlus size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Add New Student</h1>
              <Sparkles size={16} className="text-yellow-300" />
            </div>
            <p className="text-blue-200 text-sm mt-0.5">Fill in the details below to enrol a new student</p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <StudentForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
