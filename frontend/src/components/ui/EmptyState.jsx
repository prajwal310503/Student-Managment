import { Users, UserPlus, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ search, hasFilters }) => {
  const isFiltered = search || hasFilters;

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <div className={`p-6 rounded-3xl mb-6 ${isFiltered ? 'bg-amber-50' : 'bg-blue-50'}`}>
        {isFiltered
          ? <SearchX size={44} className="text-amber-400" />
          : <Users size={44} className="text-blue-400" />
        }
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {isFiltered ? 'No matching students' : 'No students yet'}
      </h3>
      <p className="text-sm text-gray-500 max-w-xs mb-8 leading-relaxed">
        {isFiltered
          ? 'Try adjusting your search query or clearing the active filters.'
          : 'Get started by enrolling your first student into the system.'}
      </p>
      {!isFiltered && (
        <Link
          to="/students/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300"
        >
          <UserPlus size={16} />
          Enrol First Student
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
