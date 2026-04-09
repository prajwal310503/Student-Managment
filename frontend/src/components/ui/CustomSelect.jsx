import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ value, onChange, options, placeholder = 'Select...', icon: Icon, fullWidth = false, error = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => String(o.value) === String(value));
  const isActive = !!value;

  // Two visual modes:
  // fullWidth=true  → form field style (white bg, full width, shows placeholder text)
  // fullWidth=false → filter pill style (colored when active)
  const btnClass = fullWidth
    ? `w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm border transition-all bg-white ${
        error
          ? 'border-red-400 ring-2 ring-red-100'
          : open
          ? 'border-blue-500 ring-2 ring-blue-100'
          : 'border-gray-200 hover:border-blue-300'
      } ${isActive ? 'text-gray-800' : 'text-gray-400'}`
    : `flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition-all whitespace-nowrap ${
        isActive
          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
      } ${open ? 'ring-2 ring-blue-300' : ''}`;

  return (
    <div ref={ref} className={`relative ${fullWidth ? 'w-full' : ''}`}>
      <button type="button" onClick={() => setOpen(!open)} className={btnClass}>
        {Icon && (
          <Icon
            size={fullWidth ? 14 : 12}
            className={
              fullWidth
                ? isActive ? 'text-blue-500' : 'text-gray-400'
                : isActive ? 'text-white/80' : 'text-gray-400'
            }
          />
        )}
        <span className="flex-1 text-left truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={fullWidth ? 14 : 11}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${
            fullWidth ? 'text-gray-400' : isActive ? 'text-white/70' : 'text-gray-400'
          }`}
        />
      </button>

      {open && (
        <div className={`absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/80 z-[9999] py-1.5 animate-fade-in overflow-hidden ${fullWidth ? 'w-full' : 'min-w-[160px]'}`}>
          {/* "All" option */}
          <button
            type="button"
            onClick={() => { onChange(''); setOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
              !value ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <span>{placeholder}</span>
            {!value && <Check size={14} className="text-blue-500" />}
          </button>

          <div className="h-px bg-gray-100 mx-2 my-1" />

          {options.map((opt) => {
            const isSelected = String(value) === String(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? 'text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="text-blue-500 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
