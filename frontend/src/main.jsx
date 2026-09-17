import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const today = () => new Date().toLocaleDateString('en-CA');
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
const api = async (path, token, options = {}) => {
  const response = await fetch(`/api${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

function App() {
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('lunchledger_session') || 'null'));
  const [mode, setMode] = useState('login');
  const [auth, setAuth] = useState({ name: '', email: '', password: '' });
  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', address: '', monthlyPrice: '', startDate: today() });
  const [selected, setSelected] = useState(null);
  const [bill, setBill] = useState(null);
  const [month, setMonth] = useState(today().slice(0, 7));
  const [pause, setPause] = useState({ startDate: today(), endDate: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = session?.token;
  const alertError = error => setMessage(error.message);

  const load = async () => {
    if (!token) return;
    try {
      const params = new URLSearchParams({ q: query, sort, order, page: String(page), limit: '8' });
      const data = await api(`/customers?${params}`, token);
      setCustomers(data.items); setMeta(data);
      if (selected) setSelected(data.items.find(c => c._id === selected._id) || selected);
    } catch (error) { alertError(error); }
  };
  useEffect(() => { load(); }, [token, query, sort, order, page]);
  useEffect(() => { if (!selected) return; api(`/customers/${selected._id}/bill?month=${month}`, token).then(setBill).catch(alertError); }, [selected, month]);

  const login = async event => {
    event.preventDefault(); setMessage(''); setLoading(true);
    try {
      const data = await api(`/auth/${mode}`, null, { method: 'POST', body: JSON.stringify(auth) });
      localStorage.setItem('lunchledger_session', JSON.stringify(data)); setSession(data);
    } catch (error) { alertError(error); } finally { setLoading(false); }
  };
  const addCustomer = async event => {
    event.preventDefault(); setMessage(''); setLoading(true);
    try {
      await api('/customers', token, { method: 'POST', body: JSON.stringify(form) });
      setForm({ name: '', phone: '', address: '', monthlyPrice: '', startDate: today() });
      setPage(1); await load(); setMessage('Customer subscribed.');
    } catch (error) { alertError(error); } finally { setLoading(false); }
  };
  const changePause = async (path, body) => {
    setMessage(''); setLoading(true);
    try {
      const data = await api(`/customers/${selected._id}/${path}`, token, { method: 'POST', body: JSON.stringify(body) });
      setSelected(data); await load(); setMessage(path === 'pause' ? 'Pause saved.' : 'Customer resumed.');
    } catch (error) { alertError(error); } finally { setLoading(false); }
  };

  return <>
    <header className="topbar"><a href="#home" className="brand"><span className="brand-mark">✳</span> LunchLedger</a><nav><a href="#how">How it works</a><a href="#next">What’s next</a>{session && <button className="text-button" onClick={() => { localStorage.removeItem('lunchledger_session'); setSession(null); setSelected(null); }}>Log out</button>}</nav></header>
    {!session ? <main className="landing" id="home"><section className="hero"><div><p className="eyebrow">FOR HOME-STYLE TIFFIN SERVICES</p><h1>Every lunch counts.<br/><em>Every bill is fair.</em></h1><p className="lede">A simple desk for tiffin owners to track monthly customers, pause deliveries, and charge only for weekdays actually served.</p><div className="hero-points"><span>✓ Monthly subscriptions</span><span>✓ Pause & resume</span><span>✓ Prorated bills</span></div></div><div className="auth-card"><div className="card-heading"><span className="small-icon">↗</span><div><h2>{mode === 'login' ? 'Welcome back' : 'Create owner account'}</h2><p>Manage your lunch service in one place.</p></div></div><form onSubmit={login}>{mode === 'register' && <label>Your name<input required value={auth.name} onChange={e => setAuth({ ...auth, name: e.target.value })}/></label>}<label>Email<input required type="email" value={auth.email} onChange={e => setAuth({ ...auth, email: e.target.value })}/></label><label>Password<input required type="password" minLength={mode === 'register' ? 8 : undefined} value={auth.password} onChange={e => setAuth({ ...auth, password: e.target.value })}/></label><button className="primary" disabled={loading}>{mode === 'login' ? 'Log in' : 'Create account'} <span>→</span></button></form><p className="switch">{mode === 'login' ? 'New here?' : 'Already have an account?'} <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(''); }}>{mode === 'login' ? 'Create an account' : 'Log in'}</button></p>{message && <p className="notice error">{message}</p>}</div></section><section className="feature-section" id="how"><div className="section-title"><p className="eyebrow">BUILT FOR THE DAILY ROUTINE</p><h2>From first subscription to month-end.</h2></div><div className="features"><article><b>01</b><h3>Subscribe once</h3><p>Save a customer’s phone, address, monthly plan price, and start date.</p></article><article><b>02</b><h3>Pause when life happens</h3><p>Mark travel or holidays as paused days, then resume the plan.</p></article><article><b>03</b><h3>Bill with confidence</h3><p>See delivered weekdays, paused weekdays, and the exact prorated amount.</p></article></div></section><section className="next-section" id="next"><p className="eyebrow">IDEAS FOR WHAT’S NEXT</p><h2>More useful, one step at a time.</h2><div className="next-list"><span>Delivery confirmation by driver</span><span>WhatsApp bill reminders</span><span>Online payments & receipts</span></div></section></main> : <main className="dashboard"><div className="dashboard-head"><div><p className="eyebrow">OWNER DASHBOARD</p><h1>Good day, {session.owner.name.split(' ')[0]}.</h1><p>Keep every plan and pause in view.</p></div><div className="date-chip">◷ &nbsp; {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div></div>{message && <p className="notice" role="status">{message}</p>}<div className="dashboard-grid"><section className="panel customers"><div className="panel-head"><div><h2>Customers</h2><p>{meta.total} matching subscriptions</p></div><span className="pill">Live plans</span></div><div className="toolbar"><input aria-label="Search by name or phone" placeholder="Search name or phone…" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }}/><select aria-label="Sort by" value={sort} onChange={e => setSort(e.target.value)}><option value="name">Name</option><option value="phone">Phone</option><option value="startDate">Start date</option><option value="monthlyPrice">Plan price</option></select><button className="sort-button" title="Reverse sort" onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>{order === 'asc' ? '↑' : '↓'}</button></div><div className="customer-list">{customers.length ? customers.map(c => <button key={c._id} className={`customer-row ${selected?._id === c._id ? 'selected' : ''}`} onClick={() => { setSelected(c); setBill(null); }}><span className="avatar">{c.name[0].toUpperCase()}</span><span className="customer-info"><strong>{c.name}</strong><small>{c.phone}</small></span><span className={`status ${c.status}`}>{c.status}</span><span className="row-arrow">›</span></button>) : <div className="empty">No customers found. Add your first subscription below.</div>}</div><div className="pagination"><button disabled={page <= 1} onClick={() => setPage(page - 1)}>← Previous</button><span>Page {meta.page} of {meta.pages}</span><button disabled={page >= meta.pages} onClick={() => setPage(page + 1)}>Next →</button></div></section><section className="panel add-panel"><div className="panel-head"><div><h2>New subscription</h2><p>Add a customer to the lunch list.</p></div><span className="small-icon">＋</span></div><form onSubmit={addCustomer} className="add-form"><label>Customer name<input required placeholder="e.g. Priya Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/></label><label>Phone number<input required placeholder="e.g. 9876543210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/></label><label>Delivery address<input required placeholder="House, street, area" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}/></label><div className="two"><label>Monthly price (₹)<input required type="number" min="0.01" step="0.01" value={form.monthlyPrice} onChange={e => setForm({ ...form, monthlyPrice: e.target.value })}/></label><label>Start date<input required type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })}/></label></div><button className="primary" disabled={loading}>Add subscription <span>→</span></button></form></section></div>{selected && <section className="panel detail"><div className="panel-head"><div><p className="eyebrow">SUBSCRIPTION DETAIL</p><h2>{selected.name} <span className={`status ${selected.status}`}>{selected.status}</span></h2><p>{selected.phone} · {selected.address}</p></div><button className="close" onClick={() => setSelected(null)}>✕</button></div><div className="detail-grid"><div><div className="summary"><span>Monthly plan<strong>{money(selected.monthlyPrice)}</strong></span><span>Started<strong>{selected.startDate}</strong></span></div><h3>Pause deliveries</h3><p className="hint">Start and end dates are included. Leave end date empty until the customer resumes.</p><div className="two"><label>From<input type="date" value={pause.startDate} onChange={e => setPause({ ...pause, startDate: e.target.value })}/></label><label>Through (optional)<input type="date" value={pause.endDate} onChange={e => setPause({ ...pause, endDate: e.target.value })}/></label></div><div className="actions"><button className="secondary" disabled={loading} onClick={() => changePause('pause', pause)}>Save pause</button>{selected.pauses.some(p => !p.endDate) && <button className="secondary" disabled={loading} onClick={() => changePause('resume', { resumeDate: today() })}>Resume today</button>}</div><h3>Pause history</h3><div className="pause-history">{selected.pauses.length ? selected.pauses.map(p => <div key={p._id}>{p.startDate} → {p.endDate || 'ongoing'}</div>) : 'No pauses yet'}</div></div><div className="bill-card"><div className="bill-head"><div><p className="eyebrow">MONTHLY BILL</p><h3>What to charge</h3></div><input aria-label="Billing month" type="month" value={month} onChange={e => setMonth(e.target.value)}/></div>{bill && <><div className="bill-amount">{money(bill.amount)}</div><div className="bill-lines"><div><span>Weekdays in month</span><strong>{bill.weekdays}</strong></div><div><span>Days delivered</span><strong>{bill.deliveredDays}</strong></div><div><span>Paused weekdays</span><strong>{bill.pausedDays}</strong></div><div><span>Plan price</span><strong>{money(bill.monthlyPrice)}</strong></div></div><p className="bill-note">{bill.provisional ? `Provisional through ${bill.through || 'before month start'}. ` : ''}Plan price ÷ weekdays in month × delivered days. Weekends are excluded.</p></>}</div></div></section>}</main>}
    <footer>LunchLedger <span>Made for the people who make lunch feel like home.</span></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
