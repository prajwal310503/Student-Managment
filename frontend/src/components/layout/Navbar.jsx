import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

const Navbar = ({ onMenuToggle, sidebarOpen }) => {
  return (
    <header className="md:hidden sticky top-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
      <Link to="/" className="flex items-center gap-2 font-bold text-gray-900 text-lg">
        <div className="p-1.5 bg-blue-600 rounded-lg">
          <GraduationCap size={20} className="text-white" />
        </div>
        <span>StudentMS</span>
      </Link>
      <button
        onClick={onMenuToggle}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
};

export default Navbar;
