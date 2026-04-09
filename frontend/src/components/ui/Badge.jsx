const variantMap = {
  blue:   'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  green:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  yellow: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  red:    'bg-red-50 text-red-700 ring-1 ring-red-200',
  gray:   'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  purple: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
};

const Badge = ({ children, variant = 'blue', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantMap[variant] || variantMap.blue} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
