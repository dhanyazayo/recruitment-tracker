import { useState } from 'react';
import { UserPlus, X, Search, TrendingUp, Users, Mail, Shield } from 'lucide-react';

type Recruiter = {
  id: number; name: string; email: string; role: string;
  team: string; activeCandidates: number; performance: number;
};

const INITIAL_RECRUITERS: Recruiter[] = [
  { id: 1, name: 'Michael Keane', email: 'michael.k@zayo.com', role: 'Senior Recruiter', team: 'Engineering', activeCandidates: 12, performance: 94 },
  { id: 2, name: 'Sarah Mitchell', email: 'sarah.m@zayo.com', role: 'Recruiter', team: 'Product', activeCandidates: 8, performance: 88 },
  { id: 3, name: 'Emma Lawson', email: 'emma.l@zayo.com', role: 'Recruiter', team: 'Design', activeCandidates: 6, performance: 91 },
  { id: 4, name: 'James Robinson', email: 'james.r@zayo.com', role: 'Lead Recruiter', team: 'Data & Analytics', activeCandidates: 15, performance: 97 },
  { id: 5, name: 'Priya Nair', email: 'priya.n@zayo.com', role: 'Recruiter', team: 'Engineering', activeCandidates: 9, performance: 82 },
  { id: 6, name: 'Carlos Mendez', email: 'carlos.m@zayo.com', role: 'Senior Recruiter', team: 'Sales', activeCandidates: 11, performance: 89 },
];

const ROLES = ['Recruiter', 'Senior Recruiter', 'Lead Recruiter', 'Recruiting Manager'];
const TEAMS = ['Engineering', 'Product', 'Design', 'Data & Analytics', 'Sales', 'Operations'];

const perfColor = (p: number) =>
  p >= 90 ? 'text-green-700 bg-green-50 border-green-200'
  : p >= 75 ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
  : 'text-red-700 bg-red-50 border-red-200';

export function RecruiterManagementPage() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>(INITIAL_RECRUITERS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', email: '', role: '', team: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filtered = recruiters.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.role.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim()) e.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.role) e.role = 'Role required';
    if (!form.team) e.team = 'Team required';
    return e;
  };

  const handleAdd = () => {
    const e = validateForm();
    setFormErrors(e);
    if (Object.keys(e).length > 0) return;
    const newRec: Recruiter = {
      id: Date.now(), name: form.name, email: form.email,
      role: form.role, team: form.team, activeCandidates: 0, performance: 0,
    };
    setRecruiters(prev => [...prev, newRec]);
    setForm({ name: '', email: '', role: '', team: '' });
    setFormErrors({});
    setShowModal(false);
    showToast(`${newRec.name} added as ${newRec.role}`);
  };

  const totalActive = recruiters.reduce((s, r) => s + r.activeCandidates, 0);
  const avgPerf = Math.round(recruiters.reduce((s, r) => s + r.performance, 0) / recruiters.length);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Toast */}
        {toast && (
          <div className="fixed top-20 right-6 z-50 bg-green-600 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Recruiter Management</h1>
            <p className="text-sm text-gray-500">Manage your recruiting team and track individual performance</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#F47920] text-white text-sm font-semibold rounded-xl hover:bg-[#D96510] transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Add Recruiter
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Recruiters', value: recruiters.length, icon: Users, color: 'text-[#F47920]', bg: 'bg-[#FEF3E8]' },
            { label: 'Active Candidates', value: totalActive, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg. Performance', value: `${avgPerf}%`, icon: Shield, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Teams Covered', value: TEAMS.length, icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or role…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8] outline-none transition-all"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {['Recruiter', 'Email', 'Role', 'Team', 'Active Candidates', 'Performance'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F47920]/10 border border-[#F47920]/20 flex items-center justify-center">
                        <span className="text-[#F47920] text-xs font-bold">
                          {r.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{r.email}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg font-medium">{r.role}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{r.team}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-gray-900">{r.activeCandidates}</span>
                  </td>
                  <td className="px-5 py-4">
                    {r.performance > 0 ? (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${perfColor(r.performance)}`}>
                        {r.performance}%
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">No recruiters found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Recruiter Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Add New Recruiter</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Fill in details to add a team member</p>
                </div>
                <button onClick={() => { setShowModal(false); setFormErrors({}); }} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'Full Name', key: 'name', placeholder: 'e.g. Alex Johnson' },
                  { label: 'Email', key: 'email', placeholder: 'alex.j@zayo.com' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label} <span className="text-[#F47920]">*</span></label>
                    <input
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all
                        ${formErrors[f.key] ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8]'}`}
                    />
                    {formErrors[f.key] && <p className="text-xs text-red-500 mt-1">{formErrors[f.key]}</p>}
                  </div>
                ))}
                {[
                  { label: 'Role', key: 'role', options: ROLES },
                  { label: 'Team', key: 'team', options: TEAMS },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label} <span className="text-[#F47920]">*</span></label>
                    <select
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all appearance-none
                        ${formErrors[f.key] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8]'}`}
                    >
                      <option value="">Select {f.label}</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {formErrors[f.key] && <p className="text-xs text-red-500 mt-1">{formErrors[f.key]}</p>}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                <button onClick={() => { setShowModal(false); setFormErrors({}); }} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl bg-[#F47920] text-white text-sm font-semibold hover:bg-[#D96510] transition-colors">
                  Add Recruiter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
