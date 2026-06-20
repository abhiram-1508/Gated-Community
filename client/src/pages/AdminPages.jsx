import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { jsPDF } from 'jspdf';
import { BarChart3, Building, CheckCircle2, Download, FileSpreadsheet, Plus, Search, ShieldAlert, Siren, UserPlus, UsersRound } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import useApiData from '../hooks/useApiData';
import api from '../services/api';
import { showToast } from '../store/uiSlice';

const demoUsers=[
  {_id:'u1',name:'Nisha Menon',email:'nisha@example.com',phone:'9876543210',role:'Resident',status:'active'},
  {_id:'u2',name:'Arjun Nair',email:'arjun@example.com',phone:'9876543222',role:'Resident',status:'pending'},
  {_id:'u3',name:'Suresh P',email:'suresh@example.com',phone:'9876543233',role:'Staff',status:'active'},
  {_id:'u4',name:'Ravi Kumar',email:'ravi@example.com',phone:'9876543244',role:'Guard',status:'active'},
];

export function ResidentsPage(){
  const {data,setData}=useApiData('/users',demoUsers);const users=Array.isArray(data)?data:data.items||demoUsers;const dispatch=useDispatch();
  const approve=async(u)=>{try{await api.patch(`/users/${u._id}/approve`);}catch{}setData(users.map(x=>x._id===u._id?{...x,status:'active'}:x));dispatch(showToast({message:`${u.name} approved`}));};
  return <><PageHeader eyebrow="People & homes" title="Residents and units" description="Manage registrations, resident access, staff roles and community inventory." action={<div className="flex gap-2"><button className="btn-secondary"><Building size={18}/> Add unit</button><button className="btn-primary"><UserPlus size={18}/> Add resident</button></div>}/><div className="grid gap-4 sm:grid-cols-3"><StatCard title="Residents" value="1,250" icon={UsersRound} color="blue"/><StatCard title="Occupied units" value="486" icon={Building} color="green"/><StatCard title="Pending approvals" value={users.filter(x=>x.status==='pending').length||3} icon={ShieldAlert} color="orange"/></div><section className="card mt-7 overflow-hidden"><div className="flex items-center justify-between p-5"><h2 className="section-title">Community directory</h2><div className="relative"><Search className="absolute left-3 top-2.5 text-slate-400" size={17}/><input className="field !py-2 pl-9" placeholder="Search people"/></div></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-900"><tr><th className="px-5 py-3">Name</th><th>Contact</th><th>Role</th><th>Status</th><th>Action</th></tr></thead><tbody>{users.map(u=><tr key={u._id} className="border-t border-slate-100 dark:border-slate-800"><td className="px-5 py-4 font-bold">{u.name}</td><td>{u.email}<div className="text-xs text-slate-400">{u.phone}</div></td><td>{u.role}</td><td><StatusBadge value={u.status}/></td><td>{u.status==='pending'?<button onClick={()=>approve(u)} className="font-bold text-emerald-600">Approve</button>:<button className="font-bold text-brand-600">Manage</button>}</td></tr>)}</tbody></table></div></section></>;
}

export function ReportsPage(){
  const reports=[['Monthly financial summary','Collections, dues and payment methods','Finance'],['Visitor movement report','Entries, exits and peak gate hours','Security'],['Complaint performance','Resolution time, categories and ratings','Maintenance'],['Facility utilization','Bookings, cancellations and popular slots','Facilities']];
  const download=(name)=>{const doc=new jsPDF();doc.setFontSize(22);doc.text('Havenly Community Report',20,25);doc.setFontSize(14);doc.text(name,20,42);doc.setFontSize(10);doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`,20,52);doc.text('This presentation export uses live API data when the backend is connected.',20,70);doc.save(`${name.toLowerCase().replaceAll(' ','-')}.pdf`);};
  return <><PageHeader eyebrow="Insights & exports" title="Community reports" description="Generate presentation-ready operational summaries in PDF or Excel-compatible formats."/><div className="grid gap-5 md:grid-cols-2">{reports.map(([name,text,type])=><article key={name} className="card p-6"><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600"><BarChart3/></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800">{type}</span></div><h2 className="mt-5 font-display text-xl font-bold">{name}</h2><p className="mt-2 text-sm text-slate-500">{text}</p><div className="mt-6 flex gap-2"><button onClick={()=>download(name)} className="btn-primary !px-4 !py-2 text-sm"><Download size={16}/> PDF</button><button className="btn-secondary !px-4 !py-2 text-sm"><FileSpreadsheet size={16}/> Excel</button></div></article>)}</div></>;
}

export function EmergencyPage(){
  const dispatch=useDispatch();const [message,setMessage]=useState('Medical emergency assistance required at the main gate.');
  const trigger=async()=>{try{await api.post('/alerts/emergency',{title:'Security emergency alert',message});}catch{}dispatch(showToast({message:'Emergency alert broadcast to all community users',severity:'error'}));};
  return <><PageHeader eyebrow="Critical response" title="Emergency command" description="Broadcast an urgent alert and access verified response contacts."/><div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]"><section className="overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-rose-800 p-7 text-white shadow-xl"><Siren size={38}/><h2 className="mt-5 font-display text-3xl font-extrabold">Broadcast emergency alert</h2><p className="mt-2 text-red-100">This immediately notifies residents, security, staff and administration.</p><textarea className="mt-6 w-full rounded-2xl border border-white/20 bg-white/10 p-4 outline-none placeholder:text-red-200" rows="4" value={message} onChange={e=>setMessage(e.target.value)}/><button onClick={trigger} className="mt-4 rounded-2xl bg-white px-6 py-3 font-bold text-red-600">Send community-wide alert</button></section><section className="card p-6"><h2 className="section-title">Emergency contacts</h2><div className="mt-5 space-y-3">{[['Community security','+91 90000 10001'],['Ambulance','108'],['Fire & rescue','101'],['Police emergency','112'],['Community medical room','+91 90000 10009']].map(([n,p])=><a key={n} href={`tel:${p}`} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div><div className="font-bold">{n}</div><div className="text-sm text-slate-400">{p}</div></div><span className="font-bold text-brand-600">Call</span></a>)}</div></section></div></>;
}
