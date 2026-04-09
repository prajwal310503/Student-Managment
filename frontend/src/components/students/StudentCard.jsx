import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Mail, Phone, GraduationCap } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';
import { buildPhotoUrl } from '../../utils/helpers';

const COURSE_GRADIENTS = {
  'B.Tech':  'from-blue-500 to-blue-600',
  'M.Tech':  'from-indigo-500 to-indigo-600',
  'BCA':     'from-violet-500 to-purple-600',
  'MCA':     'from-purple-500 to-fuchsia-600',
  'B.Sc':    'from-emerald-500 to-teal-600',
  'M.Sc':    'from-teal-500 to-cyan-600',
  'B.Com':   'from-amber-500 to-orange-500',
  'BBA':     'from-orange-500 to-red-500',
  'MBA':     'from-rose-500 to-pink-600',
  'Other':   'from-gray-500 to-slate-600'
};

const StudentCard = ({ student, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const photoUrl = buildPhotoUrl(student.photo);
  const gradient = COURSE_GRADIENTS[student.course] || 'from-blue-500 to-indigo-600';

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(student._id);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-250 flex flex-col overflow-hidden border border-gray-100">

        {/* Header with gradient bg */}
        <div className={`bg-gradient-to-br ${gradient} p-5 flex flex-col items-center gap-3 relative`}>
          {/* Avatar */}
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={student.name}
              className="w-[72px] h-[72px] rounded-full object-cover ring-2 ring-white/30 shadow-lg"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-[72px] h-[72px] rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden">
              {student.gender === 'Female' ? (
                /* Woman silhouette */
                <svg viewBox="0 0 64 80" className="w-full h-full" fill="none">
                  {/* head */}
                  <circle cx="32" cy="20" r="11" fill="white" fillOpacity="0.95" />
                  {/* hair */}
                  <ellipse cx="32" cy="11" rx="11" ry="5" fill="white" fillOpacity="0.7" />
                  {/* dress / body */}
                  <path d="M18 42 Q20 36 32 34 Q44 36 46 42 L50 70 H14 Z" fill="white" fillOpacity="0.9" />
                  {/* waist belt */}
                  <rect x="22" y="44" width="20" height="5" rx="2" fill="white" fillOpacity="0.6" />
                  {/* arms */}
                  <path d="M18 42 Q10 50 12 60" stroke="white" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d="M46 42 Q54 50 52 60" stroke="white" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              ) : student.gender === 'Male' ? (
                /* Man silhouette */
                <svg viewBox="0 0 64 80" className="w-full h-full" fill="none">
                  {/* head */}
                  <circle cx="32" cy="20" r="11" fill="white" fillOpacity="0.95" />
                  {/* shirt / torso */}
                  <path d="M19 42 Q21 35 32 33 Q43 35 45 42 L45 58 H19 Z" fill="white" fillOpacity="0.9" />
                  {/* collar */}
                  <path d="M28 33 L32 40 L36 33" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
                  {/* trousers */}
                  <path d="M19 58 L22 75 H30 L32 65 L34 75 H42 L45 58 Z" fill="white" fillOpacity="0.85" />
                  {/* arms */}
                  <path d="M19 42 Q11 50 13 61" stroke="white" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d="M45 42 Q53 50 51 61" stroke="white" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              ) : (
                /* Generic person */
                <svg viewBox="0 0 64 80" className="w-full h-full" fill="none">
                  <circle cx="32" cy="20" r="11" fill="white" fillOpacity="0.95" />
                  <path d="M14 68 Q16 36 32 34 Q48 36 50 68 Z" fill="white" fillOpacity="0.85" />
                </svg>
              )}
            </div>
          )}

          {/* Name */}
          <div className="text-center">
            <h3 className="text-white font-bold text-sm leading-snug drop-shadow-sm">{student.name}</h3>
            <p className="text-white/70 text-xs mt-0.5">{student.gender}</p>
          </div>

          {/* Admission badge */}
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-mono font-semibold px-3 py-1 rounded-full border border-white/30">
            {student.admissionNumber}
          </span>
        </div>

        {/* Body */}
        <div className="px-4 py-3 flex flex-col gap-2.5 flex-1">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 bg-gradient-to-br ${gradient} rounded-lg opacity-80`}>
              <GraduationCap size={11} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700 truncate">{student.course} · Year {student.year}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-violet-100 rounded-lg">
              <Mail size={11} className="text-violet-600" />
            </div>
            <span className="text-xs text-gray-500 truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Phone size={11} className="text-emerald-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium">{student.mobileNumber}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-3 pb-3 sm:px-4 sm:pb-4 grid grid-cols-3 gap-1.5 sm:gap-2">
          <button
            onClick={() => navigate(`/students/${student._id}`)}
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-150"
          >
            <Eye size={12} /> View
          </button>
          <button
            onClick={() => onEdit ? onEdit(student._id) : navigate(`/students/${student._id}/edit`)}
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 text-xs font-bold text-amber-600 bg-amber-50 rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-150"
          >
            <Pencil size={12} /> Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 text-xs font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-150"
          >
            <Trash2 size={12} /> Del
          </button>
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
    </>
  );
};

export default StudentCard;
