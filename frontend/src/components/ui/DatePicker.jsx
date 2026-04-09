import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const fmt = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isToday = (d) => isSameDay(d, new Date());

const DatePicker = ({ value, onChange, placeholder = 'Select date', error }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('days');
  const [nav, setNav] = useState(() => value ? new Date(value + 'T00:00:00') : new Date());
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (value) setNav(new Date(value + 'T00:00:00'));
  }, [value]);

  const selected = value ? new Date(value + 'T00:00:00') : null;

  const getDays = () => {
    const year = nav.getFullYear();
    const month = nav.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month, -i), curr: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), curr: true });
    }
    const rem = 42 - days.length;
    for (let i = 1; i <= rem; i++) {
      days.push({ date: new Date(year, month + 1, i), curr: false });
    }
    return days;
  };

  const select = (date) => {
    const iso = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-');
    onChange(iso);
    setOpen(false);
    setView('days');
  };

  const yearStart = Math.floor(nav.getFullYear() / 12) * 12;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 border rounded-xl text-sm transition-all bg-white ${
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-gray-200 hover:border-blue-400'
        } ${open ? 'border-blue-500 ring-2 ring-blue-100' : ''}`}
      >
        <Calendar size={15} className={selected ? 'text-blue-500' : 'text-gray-400'} />
        <span className={`flex-1 text-left ${selected ? 'text-gray-800' : 'text-gray-400'}`}>
          {selected ? fmt(value) : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/80 z-[9999] p-4 w-72 animate-fade-in">

          {view === 'days' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setNav(new Date(nav.getFullYear(), nav.getMonth() - 1, 1))}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setView('months')}
                    className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {MONTHS[nav.getMonth()]}
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('years')}
                    className="text-sm font-bold text-blue-600 hover:text-blue-800 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {nav.getFullYear()}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setNav(new Date(nav.getFullYear(), nav.getMonth() + 1, 1))}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {getDays().map(({ date, curr }, i) => {
                  const sel = selected && isSameDay(date, selected);
                  const tod = isToday(date);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => select(date)}
                      className={`h-8 w-full rounded-lg text-xs font-medium transition-all ${
                        sel
                          ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-200'
                          : tod
                          ? 'bg-blue-50 text-blue-600 font-semibold ring-1 ring-blue-200'
                          : curr
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                <button
                  type="button"
                  onClick={() => { const t = new Date(); setNav(t); select(t); }}
                  className="text-xs text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => { onChange(''); setOpen(false); }}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </>
          )}

          {view === 'months' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setNav(new Date(nav.getFullYear() - 1, nav.getMonth(), 1))}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setView('years')}
                  className="text-sm font-bold text-gray-700 hover:text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {nav.getFullYear()}
                </button>
                <button
                  type="button"
                  onClick={() => setNav(new Date(nav.getFullYear() + 1, nav.getMonth(), 1))}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {MONTHS.map((m, i) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setNav(new Date(nav.getFullYear(), i, 1)); setView('days'); }}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      nav.getMonth() === i
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {m.slice(0, 3)}
                  </button>
                ))}
              </div>
            </>
          )}

          {view === 'years' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setNav(new Date(yearStart - 12, 0, 1))}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-bold text-gray-700">
                  {yearStart} – {yearStart + 11}
                </span>
                <button
                  type="button"
                  onClick={() => setNav(new Date(yearStart + 12, 0, 1))}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 12 }, (_, i) => yearStart + i).map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => { setNav(new Date(y, nav.getMonth(), 1)); setView('months'); }}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      nav.getFullYear() === y
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
