const gradients = {
  blue:   { card: 'from-blue-500 to-blue-600',   glow: 'shadow-blue-200',   icon: 'bg-white/20' },
  green:  { card: 'from-emerald-500 to-emerald-600', glow: 'shadow-emerald-200', icon: 'bg-white/20' },
  purple: { card: 'from-violet-500 to-purple-600', glow: 'shadow-violet-200', icon: 'bg-white/20' },
  yellow: { card: 'from-amber-400 to-orange-500', glow: 'shadow-amber-200',  icon: 'bg-white/20' }
};

const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle }) => {
  const g = gradients[color] || gradients.blue;
  return (
    <div className={`bg-gradient-to-br ${g.card} rounded-2xl p-5 text-white shadow-lg ${g.glow} hover:scale-[1.02] transition-transform duration-200`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${g.icon} backdrop-blur-sm`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <p className="text-white/70 text-xs font-semibold uppercase tracking-wide truncate">{title}</p>
      <p className="text-3xl font-bold mt-1 leading-none">{value}</p>
      {subtitle && <p className="text-white/60 text-xs mt-2 truncate">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
