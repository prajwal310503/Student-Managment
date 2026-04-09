import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, BookOpen, Award, TrendingUp, UserPlus,
  GraduationCap, Activity, BarChart2, PieChart as PieIcon
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { getStats, getStudents } from '../api/studentApi';
import { StatCardSkeleton } from '../components/ui/Skeletons';
import StudentFormModal from '../components/students/StudentFormModal';

// ── Stat Card ─────────────────────────────────────────────────────────
const COLORS_MAP = {
  blue:   { bg: 'from-blue-500 to-blue-600',     shadow: 'shadow-blue-200',   icon: 'bg-blue-400/30' },
  green:  { bg: 'from-emerald-500 to-teal-500',  shadow: 'shadow-emerald-200',icon: 'bg-emerald-400/30' },
  purple: { bg: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200', icon: 'bg-violet-400/30' },
  yellow: { bg: 'from-amber-400 to-orange-500',  shadow: 'shadow-amber-200',  icon: 'bg-amber-400/30' },
  red:    { bg: 'from-rose-500 to-pink-600',     shadow: 'shadow-rose-200',   icon: 'bg-rose-400/30' },
  pink:   { bg: 'from-pink-500 to-fuchsia-600', shadow: 'shadow-pink-200',   icon: 'bg-pink-400/30' },
};
const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
  const c = COLORS_MAP[color] || COLORS_MAP.blue;
  return (
    <div className={`bg-gradient-to-br ${c.bg} rounded-2xl p-4 sm:p-5 text-white shadow-lg ${c.shadow} hover:scale-[1.02] transition-transform duration-200`}>
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <p className="text-white/70 text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-tight">{title}</p>
        <div className={`p-1.5 sm:p-2 ${c.icon} rounded-xl flex-shrink-0`}><Icon size={15} className="sm:hidden" /><Icon size={18} className="hidden sm:block" /></div>
      </div>
      <p className="text-2xl sm:text-3xl font-extrabold">{value ?? '—'}</p>
      {subtitle && <p className="text-white/60 text-[10px] sm:text-xs mt-1 sm:mt-1.5">{subtitle}</p>}
    </div>
  );
};

// ── Chart card wrapper ─────────────────────────────────────────────────
const ChartCard = ({ title, icon: Icon, iconColor, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-center gap-2 mb-5">
      <div className={`p-1.5 ${iconColor} rounded-lg`}><Icon size={14} className="text-white" /></div>
      <h3 className="text-sm font-bold text-gray-700">{title}</h3>
    </div>
    {children}
  </div>
);

// ── Custom tooltip ─────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xl px-3 py-2 text-xs">
      {label && <p className="font-bold text-gray-700 mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill }} className="font-semibold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const CHART_COLORS = ['#6366f1','#06b6d4','#10b981','#f59e0b','#f43f5e','#8b5cf6','#ec4899','#3b82f6','#14b8a6','#f97316'];
const GENDER_COLORS = { Male: '#6366f1', Female: '#ec4899', Other: '#10b981' };

// ── Recent student row ─────────────────────────────────────────────────
const RecentRow = ({ student, idx }) => (
  <Link
    to={`/students/${student._id}`}
    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
  >
    <span className="text-xs font-bold text-gray-300 w-5 text-center">{idx + 1}</span>
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
      {student.name?.[0]?.toUpperCase()}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">{student.name}</p>
      <p className="text-xs text-gray-400 truncate">{student.course} · Year {student.year || '—'}</p>
    </div>
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${student.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
      {student.isActive ? 'Active' : 'Inactive'}
    </span>
  </Link>
);

// ── Dashboard ──────────────────────────────────────────────────────────
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const refresh = () => {
    getStats().then((res) => setStats(res.data)).catch(() => {});
    getStudents({ limit: 5, page: 1 }).then((res) => setRecent(res.data)).catch(() => {});
  };

  useEffect(() => { refresh(); }, []);

  // Derived chart data
  const courseData = stats?.courseWise?.map((c) => ({ name: c._id, students: c.count })) || [];
  const genderData = stats?.genderWise?.map((g) => ({ name: g._id, value: g.count })) || [];
  const yearData   = stats?.yearWise?.map((y) => ({ year: `Year ${y._id}`, students: y.count })) || [];
  const activeData = stats ? [
    { name: 'Active',   value: stats.activeStudents,                         color: '#10b981' },
    { name: 'Inactive', value: stats.totalStudents - stats.activeStudents,   color: '#f43f5e' },
  ] : [];

  return (
    <>
    <div className="max-w-screen-xl mx-auto space-y-4 sm:space-y-6">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg shadow-blue-200">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={13} className="text-blue-200 flex-shrink-0" />
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide truncate">Analytics Overview</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">Student Dashboard</h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-0.5 hidden sm:block">Real-time insights on all enrolled students</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 sm:px-5 sm:py-2.5 bg-white text-blue-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md"
          >
            <UserPlus size={14} /> <span className="hidden sm:inline">Add Student</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats ? (
          <>
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Courses Offered"
              value={stats.courseWise.length}
              icon={BookOpen}
              color="purple"
              subtitle={stats.courseWise[0] ? `Top: ${stats.courseWise[0]._id}` : undefined}
            />
            <StatCard
              title="Male Students"
              value={stats.genderWise.find(g => g._id === 'Male')?.count ?? 0}
              icon={GraduationCap}
              color="yellow"
              subtitle="Gender: Male"
            />
            <StatCard
              title="Female Students"
              value={stats.genderWise.find(g => g._id === 'Female')?.count ?? 0}
              icon={Award}
              color="pink"
              subtitle="Gender: Female"
            />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        )}
      </div>

      {/* Row 1: Course bar + Gender pie */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* Course distribution — bar */}
        <div className="md:col-span-2 lg:col-span-2">
          <ChartCard title="Students by Course" icon={BarChart2} iconColor="bg-indigo-500">
            {courseData.length ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={courseData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="students" name="Students" radius={[6,6,0,0]}>
                    {courseData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">No data</div>}
          </ChartCard>
        </div>

        {/* Gender pie */}
        <ChartCard title="Gender Distribution" icon={PieIcon} iconColor="bg-pink-500">
          {genderData.length ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%" cy="45%"
                  innerRadius={55} outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {genderData.map((g, i) => (
                    <Cell key={i} fill={GENDER_COLORS[g.name] || CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">No data</div>}
        </ChartCard>
      </div>

      {/* Row 2: Year area + Active/Inactive donut + Recent */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* Year distribution area */}
        <ChartCard title="Students by Year" icon={GraduationCap} iconColor="bg-cyan-500">
          {yearData.length ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={yearData}>
                <defs>
                  <linearGradient id="yearGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="students" name="Students" stroke="#06b6d4" strokeWidth={2.5} fill="url(#yearGrad)" dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">No data</div>}
        </ChartCard>

        {/* Active vs Inactive donut */}
        <ChartCard title="Active vs Inactive" icon={Activity} iconColor="bg-emerald-500">
          {activeData.length && stats ? (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={activeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {activeData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                {activeData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-gray-500">{d.name}: <span className="font-bold text-gray-700">{d.value}</span></span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <p className="text-2xl font-extrabold text-gray-800">
                  {stats.totalStudents ? Math.round((stats.activeStudents / stats.totalStudents) * 100) : 0}%
                </p>
                <p className="text-xs text-gray-400">Active rate</p>
              </div>
            </div>
          ) : <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">No data</div>}
        </ChartCard>

        {/* Recent admissions */}
        <ChartCard title="Recent Admissions" icon={Award} iconColor="bg-amber-500">
          <div className="space-y-0.5">
            {recent.length ? (
              <>
                {recent.map((s, i) => <RecentRow key={s._id} student={s} idx={i} />)}
                <Link
                  to="/students"
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors py-2"
                >
                  View all students →
                </Link>
              </>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">No students yet</div>
            )}
          </div>
        </ChartCard>
      </div>

    </div>

    <StudentFormModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      studentId={null}
      onSuccess={refresh}
    />
    </>
  );
};

export default Dashboard;
