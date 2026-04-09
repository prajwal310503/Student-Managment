import { getInitials } from '../../utils/helpers';

const COLORS = [
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-violet-400 to-purple-600',
  'bg-gradient-to-br from-emerald-400 to-teal-600',
  'bg-gradient-to-br from-amber-400 to-orange-500',
  'bg-gradient-to-br from-rose-400 to-pink-600',
  'bg-gradient-to-br from-cyan-400 to-blue-500',
  'bg-gradient-to-br from-indigo-400 to-indigo-600',
  'bg-gradient-to-br from-fuchsia-400 to-pink-500'
];

const getColor = (name = '') => COLORS[name.charCodeAt(0) % COLORS.length];

const Avatar = ({ name = '', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-20 h-20 text-2xl',
    xl: 'w-32 h-32 text-4xl'
  };

  return (
    <div
      className={`${sizeMap[size]} ${getColor(name)} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
