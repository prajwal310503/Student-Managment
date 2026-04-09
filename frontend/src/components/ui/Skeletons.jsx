// Base shimmer block
const S = ({ className = '' }) => (
  <div className={`shimmer rounded-lg ${className}`} />
);

// ── Stat card skeleton ───────────────────────────────────────────────
export const StatCardSkeleton = () => (
  <div className="rounded-2xl p-5 bg-gray-100 space-y-3">
    <div className="flex items-center justify-between">
      <S className="h-3 w-24" />
      <S className="h-9 w-9 rounded-xl" />
    </div>
    <S className="h-8 w-16" />
    <S className="h-2.5 w-20" />
  </div>
);

// ── Student card skeleton ────────────────────────────────────────────
export const StudentCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="bg-gray-100 p-5 flex flex-col items-center gap-3">
      <S className="w-[72px] h-[72px] rounded-full" />
      <S className="h-3.5 w-24" />
      <S className="h-3 w-16" />
      <S className="h-6 w-28 rounded-full" />
    </div>
    <div className="px-4 py-3 space-y-2.5">
      <div className="flex items-center gap-2">
        <S className="w-6 h-6 rounded-lg flex-shrink-0" />
        <S className="h-3 w-32 flex-1" />
      </div>
      <div className="flex items-center gap-2">
        <S className="w-6 h-6 rounded-lg flex-shrink-0" />
        <S className="h-3 w-36 flex-1" />
      </div>
      <div className="flex items-center gap-2">
        <S className="w-6 h-6 rounded-lg flex-shrink-0" />
        <S className="h-3 w-24 flex-1" />
      </div>
    </div>
    <div className="px-4 pb-4 grid grid-cols-3 gap-2">
      <S className="h-8 rounded-xl" />
      <S className="h-8 rounded-xl" />
      <S className="h-8 rounded-xl" />
    </div>
  </div>
);

// ── Table row skeleton ───────────────────────────────────────────────
export const TableRowSkeleton = () => (
  <tr className="border-b border-gray-50">
    <td className="px-5 py-4"><S className="h-3 w-4" /></td>
    <td className="px-5 py-4">
      <div className="flex items-center gap-3">
        <S className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="space-y-1.5">
          <S className="h-3 w-28" />
          <S className="h-2.5 w-14" />
        </div>
      </div>
    </td>
    <td className="px-5 py-4"><S className="h-6 w-32 rounded-lg" /></td>
    <td className="px-5 py-4">
      <div className="space-y-1.5">
        <S className="h-5 w-16 rounded-full" />
        <S className="h-2.5 w-10" />
      </div>
    </td>
    <td className="px-5 py-4">
      <div className="space-y-1.5">
        <S className="h-3 w-36" />
        <S className="h-3 w-24" />
      </div>
    </td>
    <td className="px-5 py-4">
      <div className="flex items-center justify-end gap-1.5">
        <S className="h-8 w-8 rounded-xl" />
        <S className="h-8 w-8 rounded-xl" />
        <S className="h-8 w-8 rounded-xl" />
      </div>
    </td>
  </tr>
);

// ── Dashboard skeleton (cards + grid) ───────────────────────────────
export const DashboardSkeleton = ({ viewMode = 'card' }) => (
  <div className="space-y-4 sm:space-y-6">
    {/* stat cards */}
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
    </div>
    {/* controls */}
    <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 space-y-3 shadow-sm">
      <S className="h-10 w-full rounded-xl" />
      <div className="flex gap-2 overflow-x-auto pb-1">
        <S className="h-8 w-20 rounded-xl flex-shrink-0" />
        <S className="h-8 w-16 rounded-xl flex-shrink-0" />
        <S className="h-8 w-20 rounded-xl flex-shrink-0" />
        <S className="h-8 w-16 rounded-xl flex-shrink-0" />
      </div>
    </div>
    {/* students */}
    {viewMode === 'card' ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <StudentCardSkeleton key={i} />)}
      </div>
    ) : (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['#','Student','Admission','Course','Contact','Actions'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left">
                  <S className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} />)}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

// ── View student skeleton ────────────────────────────────────────────
export const ViewStudentSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-4">
    <S className="h-4 w-36" />
    <div className="bg-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
      <S className="w-24 h-24 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3 w-full">
        <S className="h-6 w-48" />
        <S className="h-3.5 w-32" />
        <div className="flex gap-2">
          <S className="h-6 w-20 rounded-full" />
          <S className="h-6 w-16 rounded-full" />
          <S className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <S className="h-9 w-20 rounded-xl" />
        <S className="h-9 w-20 rounded-xl" />
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <S className="h-3.5 w-40" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`space-y-1.5 ${i === 4 ? 'col-span-1 sm:col-span-2' : ''}`}>
            <S className="h-2.5 w-24" />
            <S className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Form page skeleton ───────────────────────────────────────────────
export const FormPageSkeleton = ({ color = 'bg-blue-100' }) => (
  <div className="max-w-3xl mx-auto space-y-5">
    <div className={`${color} rounded-2xl p-6`}>
      <S className="h-3 w-24 mb-4" />
      <div className="flex items-center gap-4">
        <S className="w-14 h-14 rounded-2xl flex-shrink-0" />
        <div className="space-y-2">
          <S className="h-6 w-48" />
          <S className="h-3 w-56" />
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <S className="h-2.5 w-20" />
            <S className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <S className="h-2.5 w-20" />
            <S className="h-10 w-full rounded-xl" />
          </div>
        </div>
      ))}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <S className="h-10 w-24 rounded-xl" />
        <S className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  </div>
);
