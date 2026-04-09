import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Mail, Phone, GraduationCap, Hash } from 'lucide-react';
import Avatar from '../ui/Avatar';
import ConfirmModal from '../ui/ConfirmModal';
import { buildPhotoUrl } from '../../utils/helpers';

const COURSE_COLORS = {
  'B.Tech':  'bg-blue-100 text-blue-700',
  'M.Tech':  'bg-indigo-100 text-indigo-700',
  'BCA':     'bg-violet-100 text-violet-700',
  'MCA':     'bg-purple-100 text-purple-700',
  'B.Sc':    'bg-emerald-100 text-emerald-700',
  'M.Sc':    'bg-teal-100 text-teal-700',
  'B.Com':   'bg-amber-100 text-amber-700',
  'BBA':     'bg-orange-100 text-orange-700',
  'MBA':     'bg-rose-100 text-rose-700',
  'Other':   'bg-gray-100 text-gray-600',
};

const StudentTable = ({ students, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const studentToDelete = students.find((s) => s._id === confirmId);

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try {
      await onDelete(confirmId);
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Student</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Admission</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Course</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student, idx) => {
              const photoUrl = buildPhotoUrl(student.photo);
              const courseColor = COURSE_COLORS[student.course] || 'bg-gray-100 text-gray-600';
              return (
                <tr
                  key={student._id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* Index */}
                  <td className="px-5 py-4 text-xs text-gray-400 font-medium">{idx + 1}</td>

                  {/* Student name + photo */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {photoUrl ? (
                        <img src={photoUrl} alt={student.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0" />
                      ) : (
                        <Avatar name={student.name} size="md" className="flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 leading-tight">{student.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{student.gender}</p>
                      </div>
                    </div>
                  </td>

                  {/* Admission number */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 rounded-lg">
                        <Hash size={11} className="text-blue-500" />
                      </div>
                      <span className="font-mono text-xs font-bold text-blue-600">{student.admissionNumber}</span>
                    </div>
                  </td>

                  {/* Course + Year */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg w-fit ${courseColor}`}>
                        <GraduationCap size={11} />
                        {student.course}
                      </span>
                      <span className="text-xs text-gray-400 pl-0.5">Year {student.year || '—'}</span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-violet-50 rounded-md flex-shrink-0">
                          <Mail size={10} className="text-violet-500" />
                        </div>
                        <span className="text-xs text-gray-600 truncate max-w-[150px]">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-emerald-50 rounded-md flex-shrink-0">
                          <Phone size={10} className="text-emerald-500" />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{student.mobileNumber}</span>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/students/${student._id}`)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-150 shadow-sm"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onEdit ? onEdit(student._id) : navigate(`/students/${student._id}/edit`)}
                        className="p-2 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-150 shadow-sm"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmId(student._id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-150 shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </>
  );
};

export default StudentTable;
