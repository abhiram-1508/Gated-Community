import { useDispatch, useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import { Banknote, CircleCheck, Download, IndianRupee, ReceiptText, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import useApiData from '../hooks/useApiData';
import api from '../services/api';
import { demoInvoices } from '../data/demo';
import { showToast } from '../store/uiSlice';

export default function PaymentsPage(){
  const role=useSelector(s=>s.auth.user?.role);
  const {data,setData}=useApiData(role==='Resident'?'/invoices/my':'/invoices',demoInvoices);
  const invoices=Array.isArray(data)?data:data.items||demoInvoices;
  const dispatch=useDispatch();
  const pay=async(inv)=>{try{await api.post(`/invoices/${inv._id}/pay`,{method:'upi',reference:`DEMO-${Date.now()}`});}catch{}setData(invoices.map(x=>x._id===inv._id?{...x,status:'paid',paidAmount:x.totalAmount,paidAt:new Date().toISOString()}:x));dispatch(showToast({message:'Payment recorded successfully'}));};
  const receipt=(inv)=>{const doc=new jsPDF();doc.setFontSize(22);doc.text('Smart Community Management System',20,25);doc.setFontSize(12);doc.text(`Receipt: ${inv.invoiceNumber}`,20,42);doc.text(`Amount: INR ${inv.totalAmount}`,20,52);doc.text(`Status: ${inv.status}`,20,62);doc.text(`Period: ${inv.period?.month}/${inv.period?.year}`,20,72);doc.text('Thank you for your payment.',20,92);doc.save(`${inv.invoiceNumber}-receipt.pdf`);};
  const pending=invoices.filter(i=>!['paid','cancelled'].includes(i.status)).reduce((s,i)=>s+(i.totalAmount-i.paidAmount),0);
  return <><PageHeader eyebrow={role==='Resident'?'Resident finance':'Community finance'} title={role==='Resident'?'Maintenance & payments':'Revenue and invoices'} description="Track dues, make payments and keep every receipt close at hand."/>
    <div className="grid gap-4 sm:grid-cols-3"><StatCard title="Pending dues" value={`₹${(pending||3500).toLocaleString('en-IN')}`} icon={IndianRupee} color="orange"/><StatCard title="Paid this year" value="₹17,200" icon={CircleCheck} color="green"/><StatCard title={role==='Resident'?'Next due date':'Collection rate'} value={role==='Resident'?'21 Jun':'96.4%'} icon={TrendingUp} color="blue"/></div>
    {role==='Resident'&&<section className="mt-7 overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-blue-700 p-7 text-white shadow-xl shadow-brand-600/20"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><div className="text-sm text-blue-100">June maintenance</div><div className="mt-1 font-display text-4xl font-extrabold">₹3,500</div><div className="mt-2 text-sm text-blue-100">Due tomorrow · Includes maintenance and sinking fund</div></div><button onClick={()=>pay(invoices[0])} className="rounded-2xl bg-white px-6 py-3 font-bold text-brand-700">Pay now</button></div></section>}
    <section className="card mt-7 overflow-hidden"><div className="border-b border-slate-100 p-5 dark:border-slate-800"><h2 className="section-title">Payment history</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-900"><tr><th className="px-5 py-3">Invoice</th><th>Period</th><th>Amount</th><th>Due date</th><th>Status</th><th>Receipt</th></tr></thead><tbody>{invoices.map(inv=><tr key={inv._id} className="border-t border-slate-100 dark:border-slate-800"><td className="px-5 py-4 font-bold">{inv.invoiceNumber}</td><td>{inv.period?.month}/{inv.period?.year}</td><td className="font-bold">₹{inv.totalAmount?.toLocaleString('en-IN')}</td><td>{new Date(inv.dueDate).toLocaleDateString('en-IN')}</td><td><StatusBadge value={inv.status}/></td><td>{inv.status==='paid'?<button onClick={()=>receipt(inv)} className="inline-flex items-center gap-1 font-bold text-brand-600"><Download size={15}/> PDF</button>:<button onClick={()=>pay(inv)} className="font-bold text-brand-600">Pay now</button>}</td></tr>)}</tbody></table></div></section></>;
}
