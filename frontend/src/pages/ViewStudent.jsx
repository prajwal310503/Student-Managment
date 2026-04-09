import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { getStudentById, deleteStudent } from '../api/studentApi';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import ConfirmModal from '../components/ui/ConfirmModal';
import { ViewStudentSkeleton } from '../components/ui/Skeletons';
import { buildPhotoUrl, formatDate, formatDateTime } from '../utils/helpers';

const DetailItem = ({ icon: Icon, label, value, fullWidth }) => (
  <div className={fullWidth ? 'col-span-1 sm:col-span-2' : ''}>
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <div className="flex items-start gap-2 text-sm text-gray-800">
      {Icon && <Icon size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />}
      <span className="break-words">{value || '—'}</span>
    </div>
  </div>
);

const ViewStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getStudentById(id)
      .then((res) => setStudent(res.data))
      .catch(() => {
        toast.error('Student not found');
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteStudent(id);
      toast.success('Student deleted successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <ViewStudentSkeleton />;
  if (!student) return null;

  const photoUrl = buildPhotoUrl(student.photo);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Top gradient banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
        <div className="relative flex-shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white/20 shadow-xl"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <Avatar name={student.name} size="lg" className="rounded-full w-24 h-24 text-3xl ring-4 ring-white/20" />
          )}
          <span className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-slate-800 ${student.isActive ? 'bg-emerald-400' : 'bg-gray-400'}`} />
        </div>
        <div className="text-center sm:text-left flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold">{student.name}</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-mono">{student.admissionNumber}</p>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-3 justify-center sm:justify-start">
            <Badge variant="indigo">{student.course}</Badge>
            <Badge variant="purple">Year {student.year}</Badge>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link
            to={`/students/${student._id}/edit`}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors border border-white/20"
          >
            <Pencil size={13} /> Edit
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>

      {/* Details card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Student Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <DetailItem icon={Mail} label="Email Address" value={student.email} />
          <DetailItem icon={Phone} label="Mobile Number" value={student.mobileNumber} />
          <DetailItem icon={GraduationCap} label="Gender" value={student.gender} />
          <DetailItem icon={Calendar} label="Date of Birth" value={formatDate(student.dateOfBirth)} />
          <DetailItem icon={MapPin} label="Address" value={student.address} fullWidth />
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Enrolled on {formatDateTime(student.createdAt)}
          </p>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Student"
        message={`Are you sure you want to permanently delete ${student.name}? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
};

export default ViewStudent;
