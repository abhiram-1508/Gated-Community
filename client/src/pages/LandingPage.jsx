import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BellRing, CalendarCheck, CheckCircle2, Quote, ShieldCheck, Sparkles, UsersRound, Wrench } from 'lucide-react';
import Brand from '../components/Brand';

const features = [
  [ShieldCheck, 'Frictionless visitor access', 'Pre-approve guests, issue secure QR passes and keep a clear entry history.'],
  [Wrench, 'Complaints that move', 'Track every request from raised to resolved with transparent status updates.'],
  [CalendarCheck, 'Amenities, without the chaos', 'Discover facilities, select live slots and manage approvals in one place.'],
  [BellRing, 'The right alert, right away', 'Notices, arrivals, dues and emergencies reach the right people instantly.'],
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-ink">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <Brand />
          <nav className="hidden gap-7 text-sm font-semibold text-slate-500 md:flex">
            <a href="#features">Features</a><a href="#community">Community</a><a href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2"><Link className="hidden px-4 py-2 font-bold text-brand-600 sm:block" to="/login">Sign in</Link><Link className="btn-primary !px-4 !py-2.5" to="/register">Join community</Link></div>
        </div>
      </header>

      <main>
        <section className="relative bg-gradient-to-b from-blue-50 via-white to-white pb-20 pt-36">
          <div className="absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute right-[-8rem] top-48 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-sm"><Sparkles size={16} /> One community. Beautifully connected.</div>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-[-.045em] sm:text-6xl lg:text-7xl">Everyday community life, <span className="text-brand-600">made effortless.</span></h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Smart Community Management System brings residents, management, security and service teams together—so your community feels safer, smoother and genuinely more connected.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Link className="btn-primary" to="/login">Explore your dashboard <ArrowRight size={18} /></Link><a className="btn-secondary" href="#features">See what’s inside</a></div>
              <div className="mt-9 flex flex-wrap gap-5 text-sm font-semibold text-slate-500">{['Secure by design', 'Real-time updates', 'Mobile ready'].map(x => <span key={x} className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" />{x}</span>)}</div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-brand-300/30 to-emerald-200/30 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white bg-white p-3 shadow-[0_35px_90px_rgba(37,99,235,.18)]">
                <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                  <div className="flex items-center justify-between"><Brand light /><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">All systems live</span></div>
                  <div className="mt-9"><div className="text-sm text-slate-400">Good morning, Abhiram</div><div className="mt-1 font-display text-2xl font-bold">Here’s your community today.</div></div>
                  <div className="mt-6 grid grid-cols-2 gap-3">{[['₹2,500','Outstanding'],['02','Visitors today'],['01','Open request'],['03','Bookings']].map(([v,l],i)=><div key={l} className={`rounded-2xl p-4 ${i===0?'bg-brand-600':'bg-white/5'}`}><div className="font-display text-xl font-extrabold">{v}</div><div className="mt-1 text-xs text-slate-300">{l}</div></div>)}</div>
                  <div className="mt-5 rounded-2xl bg-white p-4 text-ink"><div className="flex items-start justify-between"><div><div className="text-xs font-bold uppercase tracking-wider text-brand-600">Visitor arriving</div><div className="mt-1 font-bold">Kiran Shah · 11:30 AM</div><div className="text-xs text-slate-400">Family visit · Gate 1</div></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><BadgeCheck /></div></div></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-8 hidden rounded-2xl bg-white p-4 shadow-xl sm:block"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><UsersRound /></div><div><div className="text-xs text-slate-400">Residents connected</div><div className="font-display text-xl font-extrabold">1,250+</div></div></div></div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-2xl"><div className="eyebrow">Thoughtfully connected</div><h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight">Less administration. More community.</h2><p className="mt-4 text-slate-500">Purpose-built workflows for the moments that happen every day.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{features.map(([Icon,title,text],i)=><div key={title} className="rounded-3xl border border-slate-100 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"><div className={`grid h-12 w-12 place-items-center rounded-2xl ${i%2?'bg-emerald-50 text-emerald-600':'bg-blue-50 text-brand-600'}`}><Icon /></div><h3 className="mt-5 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}</div>
        </section>

        <section id="community" className="bg-slate-950 py-24 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
            <div><Quote className="text-brand-400" size={40}/><blockquote className="mt-7 font-display text-3xl font-bold leading-snug">“We stopped chasing updates across five WhatsApp groups. Everything residents need is now calm, clear and in one place.”</blockquote><div className="mt-6 text-slate-400">— Residents Committee, Skyline Enclave</div></div>
            <div className="grid grid-cols-2 gap-4">{[['42%','faster issue resolution'],['3×','quicker gate entry'],['98%','digital collections'],['24/7','community visibility']].map(([v,l])=><div className="rounded-3xl border border-white/10 bg-white/5 p-6"><div className="font-display text-4xl font-extrabold text-emerald-400">{v}</div><div className="mt-2 text-sm text-slate-400">{l}</div></div>)}</div>
          </div>
        </section>
      </main>
      <footer id="contact" className="border-t border-slate-100 bg-white py-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 sm:flex-row sm:items-center"><Brand /><div className="text-sm text-slate-400">© 2026 Smart Community Management System · contact@smartcommunity.local</div></div></footer>
    </div>
  );
}
