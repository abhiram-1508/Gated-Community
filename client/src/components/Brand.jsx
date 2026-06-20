import { Building2 } from 'lucide-react';

export default function Brand({ compact = false, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
        <Building2 size={22} strokeWidth={2.4} />
      </div>
      {!compact && (
        <div>
          <div className={`font-display text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink dark:text-white'}`}>Smart Community</div>
          <div className={`text-[10px] font-bold uppercase tracking-[.18em] ${light ? 'text-blue-100' : 'text-slate-400'}`}>Smart Community</div>
        </div>
      )}
    </div>
  );
}
