import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Users } from 'lucide-react';

const navLinks = [
  { to: '/',         label: 'Dashboard',     icon: LayoutDashboard, end: true },
  { to: '/students', label: 'Students List', icon: Users,           end: true },
];

const SidebarContent = ({ onClose }) => (
  <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
    {/* Logo */}
    <div className="h-16 flex items-center px-5 border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/40">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-none">StudentMS</p>
          <p className="text-slate-400 text-xs mt-0.5">Management Portal</p>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-5 space-y-1">
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-3">Navigation</p>
      {navLinks.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-blue-500/30 text-blue-400' : 'bg-white/5 text-slate-400'}`}>
                <Icon size={15} />
              </span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Info strip */}
    <div className="px-3 mb-3">
      <div className="px-3 py-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
        <Users size={14} className="text-slate-500" />
        <span className="text-xs text-slate-500 font-medium">Student Records System</span>
      </div>
    </div>

    {/* Footer */}
    <div className="px-4 py-3 border-t border-white/10">
      <p className="text-xs text-slate-600 text-center">StudentMS v1.0.0</p>
    </div>
  </div>
);

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-full flex-shrink-0 shadow-xl overflow-hidden">
        <SidebarContent onClose={() => {}} />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-64 z-50 shadow-2xl animate-slide-in">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
