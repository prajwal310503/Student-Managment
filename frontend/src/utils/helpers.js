export const buildPhotoUrl = (photoPath) =>
  photoPath ? `${import.meta.env.VITE_UPLOAD_URL}${photoPath}` : null;

export const getInitials = (name = '') => {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const COURSES = ['B.Tech', 'B.Sc', 'B.Com', 'BCA', 'BBA', 'MBA', 'MCA', 'M.Tech', 'M.Sc', 'Other'];
export const YEARS = [1, 2, 3, 4, 5, 6];
export const GENDERS = ['Male', 'Female', 'Other'];
