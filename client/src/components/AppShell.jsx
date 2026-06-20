import { useEffect, useMemo } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bell, BookOpen, Building, CalendarDays, Car, CircleDollarSign, ClipboardList, Home,
  LogOut, Menu, MessageSquareText, Moon, ShieldCheck, Siren, Sun, UserRound, UsersRound, Wrench, X,
} from 'lucide-react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Brand from './Brand';
import { clearToast, setSidebar, toggleDark } from '../store/uiSlice';
import { logout, switchDemoRole } from '../store/authSlice';

const shared = [
  { to: '/app/dashboard', label: 'Dashboard', icon: Home },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
];
const resident = [
  { to: '/app/visitors', label: 'Visitors', icon: UsersRound },
  { to: '/app/complaints', label: 'Complaints', icon: ClipboardList },
  { to: '/app/payments', label: 'Payments', icon: CircleDollarSign },
  { to: '/app/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/app/notices', label: 'Notices', icon: BookOpen },
  { to: '/app/vehicles', label: 'Vehicles', icon: Car },
  { to: '/app/forum', label: 'Community Forum', icon: MessageSquareText },
  { to: '/app/profile', label: 'My Profile', icon: UserRound },
];
const admin = [
  { to: '/app/residents', label: 'Residents & Units', icon: Building },
  { to: '/app/complaints', label: 'Complaints', icon: ClipboardList },
  { to: '/app/visitors', label: 'Visitors', icon: UsersRound },
  { to: '/app/bookings', label: 'Facilities', icon: CalendarDays },
  { to: '/app/payments', label: 'Revenue', icon: CircleDollarSign },
  { to: '/app/notices', label: 'Announcements', icon: BookOpen },
  { to: '/app/reports', label: 'Reports', icon: Wrench },
];
const guard = [
  { to: '/app/visitors', label: 'Visitor Gate', icon: ShieldCheck },
  { to: '/app/vehicles', label: 'Vehicle Lookup', icon: Car },
  { to: '/app/emergency', label: 'Emergency', icon: Siren },
];
const staff = [
  { to: '/app/complaints', label: 'Assigned Tasks', icon: Wrench },
  { to: '/app/profile', label: 'My Profile', icon: UserRound },
];

export default function AppShell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useSelector((s) => s.auth);
  const { dark, sidebarOpen, toast } = useSelector((s) => s.ui);
  const items = useMemo(() => [...shared, ...(user?.role === 'Resident' ? resident : user?.role === 'Guard' ? guard : user?.role === 'Staff' ? staff : admin)], [user?.role]);

  useEffect(() => { dispatch(setSidebar(false)); }, [location.pathname]);
  useEffect(() => { if (!token) navigate('/login', { replace: true }); }, [token]);

  const leave = () => { dispatch(logout()); navigate('/'); };
  const roleLabel = { Guard: 'Security', Staff: 'Maintenance', Resident: 'Resident', Admin: 'Admin', SuperAdmin: 'Admin' }[user?.role];

  return (
    <div className="min-h-screen bg-canvas dark:bg-[#0c1220]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200/70 bg-white p-5 transition-transform dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2">
          <Brand />
          <button className="lg:hidden" onClick={() => dispatch(setSidebar(false))}><X /></button>
        </div>
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-600 to-blue-700 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white/15 font-bold">{user?.name?.split(' ').map((x) => x[0]).slice(0,2).join('')}</div>
            <div className="min-w-0">
              <div className="truncate font-bold">{user?.name}</div>
              <div className="text-xs text-blue-100">{roleLabel} workspace</div>
            </div>
          </div>
          {String(token).startsWith('demo-') && (
            <select value={user?.role} onChange={(e) => { dispatch(switchDemoRole(e.target.value)); navigate('/app/dashboard'); }} className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white outline-none">
              <option className="text-slate-900" value="Resident">Resident demo</option>
              <option className="text-slate-900" value="Admin">Admin demo</option>
              <option className="text-slate-900" value="Guard">Security demo</option>
              <option className="text-slate-900" value="Staff">Maintenance demo</option>
            </select>
          )}
        </div>
        <nav className="mt-6 space-y-1 overflow-y-auto pb-28">
          {items.map(({ to, label, icon: Icon }, index) => (
            <NavLink key={`${to}-${index}`} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-100' : 'text-slate-500 hover:bg-slate-50 hover:text-ink dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'}`}>
              <Icon size={19} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={leave} className="absolute bottom-6 left-5 right-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950"><LogOut size={19} /> Logout</button>
      </aside>

      {sidebarOpen && <button aria-label="Close menu" onClick={() => dispatch(setSidebar(false))} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />}

      <div className="lg:pl-72">
        <header className="glass sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/60 px-4 dark:border-slate-800 md:px-8">
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 dark:border-slate-700 lg:hidden" onClick={() => dispatch(setSidebar(true))}><Menu size={20} /></button>
          <div className="hidden text-sm text-slate-500 lg:block"><span className="status-dot mr-2 bg-emerald-500" />Community services online</div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => dispatch(toggleDark())} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900">{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
            <NavLink to="/app/notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900">
              <Bell size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
            </NavLink>
            <div className="ml-2 hidden text-right sm:block"><div className="text-sm font-bold">{user?.name}</div><div className="text-xs text-slate-400">{roleLabel}</div></div>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 pb-28 md:p-8 lg:pb-8"><Outlet /></main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/95">
        {[
          ['/app/dashboard', Home, 'Home'],
          ['/app/visitors', UsersRound, 'Visitors'],
          ['/app/complaints', ClipboardList, 'Issues'],
          ['/app/notifications', Bell, 'Alerts'],
          ['/app/profile', UserRound, 'Profile'],
        ].map(([to, Icon, label]) => <NavLink key={to} to={to} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-bold ${isActive ? 'text-brand-600' : 'text-slate-400'}`}><Icon size={20} />{label}</NavLink>)}
      </nav>
      {user?.role === 'Resident' && <button onClick={() => dispatch(showToast({ message: 'SOS activated. Security desk has been notified.', severity: 'error' }))} className="fixed bottom-20 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl shadow-red-600/30 md:bottom-8 md:right-8"><Siren /></button>}
      <Snackbar open={!!toast} autoHideDuration={3500} onClose={() => dispatch(clearToast())}><Alert variant="filled" severity={toast?.severity || 'success'}>{toast?.message}</Alert></Snackbar>
    </div>
  );
}
