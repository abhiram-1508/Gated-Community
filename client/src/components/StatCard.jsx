import { ArrowUpRight } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, color = 'blue', hint, trend }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950',
    green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-950',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-950',
    red: 'bg-red-50 text-red-600 dark:bg-red-950',
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-2xl ${colors[color]}`}><Icon size={21} /></div>
        {trend && <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><ArrowUpRight size={14} />{trend}</span>}
      </div>
      <div className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">{title}</div>
      <div className="mt-1 font-display text-2xl font-extrabold text-ink dark:text-white">{value}</div>
      {hint && <div className="mt-2 text-xs text-slate-400">{hint}</div>}
    </div>
  );
}
