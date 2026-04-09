import { BookOpen, GraduationCap, Users, X, Activity, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import CustomSelect from './CustomSelect';
import { COURSES, YEARS, GENDERS } from '../../utils/helpers';

const courseOptions = COURSES.map((c) => ({ value: c, label: c }));
const yearOptions = YEARS.map((y) => ({ value: y, label: `Year ${y}` }));
const genderOptions = GENDERS.map((g) => ({ value: g, label: g }));
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
const sortOptions = [
  { value: 'createdAt_desc', label: 'Newest First' },
  { value: 'createdAt_asc', label: 'Oldest First' },
  { value: 'name_asc', label: 'Name A–Z' },
  { value: 'name_desc', label: 'Name Z–A' },
  { value: 'year_asc', label: 'Year ↑' },
  { value: 'year_desc', label: 'Year ↓' },
];

const FilterBar = ({ filters, onChange }) => {
  const activeCount = ['course', 'year', 'gender', 'status', 'sortBy'].filter((k) => filters[k]).length;

  const set = (key, value) => onChange({ ...filters, [key]: value });

  const handleSort = (value) => {
    if (!value) {
      onChange({ ...filters, sortBy: '', sortOrder: '' });
    } else {
      const [sortBy, sortOrder] = value.split('_');
      onChange({ ...filters, sortBy, sortOrder });
    }
  };

  const sortValue = filters.sortBy ? `${filters.sortBy}_${filters.sortOrder}` : '';

  const clearAll = () => onChange({ course: '', year: '', gender: '', status: '', sortBy: '', sortOrder: '' });

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
      <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wide flex-shrink-0">
        <SlidersHorizontal size={11} />
        Filter:
      </span>

      <div className="flex items-center gap-2 flex-shrink-0">
        <CustomSelect
          value={filters.course}
          onChange={(v) => set('course', v)}
          options={courseOptions}
          placeholder="Course"
          icon={BookOpen}
        />
        <CustomSelect
          value={filters.year}
          onChange={(v) => set('year', v)}
          options={yearOptions}
          placeholder="Year"
          icon={GraduationCap}
        />
        <CustomSelect
          value={filters.gender}
          onChange={(v) => set('gender', v)}
          options={genderOptions}
          placeholder="Gender"
          icon={Users}
        />
        <CustomSelect
          value={filters.status}
          onChange={(v) => set('status', v)}
          options={statusOptions}
          placeholder="Status"
          icon={Activity}
        />

        <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

        <CustomSelect
          value={sortValue}
          onChange={handleSort}
          options={sortOptions}
          placeholder="Sort"
          icon={ArrowUpDown}
        />

        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors flex-shrink-0 whitespace-nowrap"
          >
            <X size={11} /> Clear {activeCount > 1 ? `(${activeCount})` : ''}
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
