import { CalendarDays, Clock, UsersRound } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import useApiData from '../../hooks/useApiData';
import { asList } from '../../utils/apiData';

export default function FacilitiesPage() {
  const { data } = useApiData('/facilities', []);
  const facilities = asList(data);

  return (
    <>
      <PageHeader
        eyebrow="Facilities"
        title="Community amenities"
        description="View availability, capacity, slots, and booking status for shared spaces."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {facilities.map((facility) => (
          <article key={facility._id || facility.name} className="card overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-blue-500 to-emerald-400" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-extrabold">{facility.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{facility.description || 'Premium community facility for residents.'}</p>
                </div>
                <StatusBadge value={facility.status || 'Available'} />
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-500">
                <div className="flex items-center gap-2"><UsersRound size={16} /> Capacity {facility.capacity || 20}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> {facility.openHours?.start || '06:00'} - {facility.openHours?.end || '22:00'}</div>
                <div className="flex items-center gap-2"><CalendarDays size={16} /> Advance booking supported</div>
              </div>
              <button className="mt-5 w-full rounded-2xl bg-brand-600 px-4 py-3 font-bold text-white">Book facility</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
