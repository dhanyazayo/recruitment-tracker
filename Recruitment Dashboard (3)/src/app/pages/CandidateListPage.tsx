import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, Plus, ChevronUp, ChevronDown, ChevronsUpDown, Filter, Calendar } from 'lucide-react';
import { InterviewSchedulerModal } from '../components/InterviewSchedulerModal';

type Candidate = {
  id: number; name: string; role: string; stage: string;
  daysInStage: number; recruiter: string; slaStatus: 'on-track' | 'approaching' | 'breached';
  location: string; source: string;
};

const CANDIDATES: Candidate[] = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Engineer', stage: 'First Round', daysInStage: 6, recruiter: 'Michael K.', slaStatus: 'approaching', location: 'San Francisco', source: 'LinkedIn' },
  { id: 2, name: 'Michael Torres', role: 'Product Manager', stage: 'Second Round', daysInStage: 4, recruiter: 'Sarah M.', slaStatus: 'on-track', location: 'Austin', source: 'Referral' },
  { id: 3, name: 'Emma Wilson', role: 'UX Designer', stage: 'Initial Discussion', daysInStage: 12, recruiter: 'Emma L.', slaStatus: 'breached', location: 'New York', source: 'Job Board' },
  { id: 4, name: 'James Park', role: 'Data Scientist', stage: 'HR Round', daysInStage: 2, recruiter: 'James R.', slaStatus: 'on-track', location: 'Seattle', source: 'LinkedIn' },
  { id: 5, name: 'Lisa Anderson', role: 'Frontend Developer', stage: 'First Round', daysInStage: 8, recruiter: 'Michael K.', slaStatus: 'breached', location: 'Chicago', source: 'Referral' },
  { id: 6, name: 'David Kim', role: 'Backend Engineer', stage: 'Found', daysInStage: 1, recruiter: 'Sarah M.', slaStatus: 'on-track', location: 'Los Angeles', source: 'LinkedIn' },
  { id: 7, name: 'Rachel Green', role: 'Product Designer', stage: 'Second Round', daysInStage: 6, recruiter: 'Emma L.', slaStatus: 'breached', location: 'Boston', source: 'Job Board' },
  { id: 8, name: 'Tom Bradley', role: 'DevOps Engineer', stage: 'Initial Discussion', daysInStage: 5, recruiter: 'James R.', slaStatus: 'on-track', location: 'Denver', source: 'Campus Hire' },
  { id: 9, name: 'Sophie Turner', role: 'QA Engineer', stage: 'HR Round', daysInStage: 4, recruiter: 'Michael K.', slaStatus: 'approaching', location: 'Portland', source: 'LinkedIn' },
  { id: 10, name: 'Alex Martinez', role: 'Full Stack Dev', stage: 'First Round', daysInStage: 3, recruiter: 'Sarah M.', slaStatus: 'on-track', location: 'Miami', source: 'Referral' },
  { id: 11, name: 'Nina Patel', role: 'UI Designer', stage: 'Found', daysInStage: 3, recruiter: 'Emma L.', slaStatus: 'approaching', location: 'Atlanta', source: 'Job Board' },
  { id: 12, name: 'Chris Evans', role: 'Security Engineer', stage: 'Second Round', daysInStage: 2, recruiter: 'James R.', slaStatus: 'on-track', location: 'Dallas', source: 'LinkedIn' },
];

const STAGES = ['All Stages', 'Found', 'Initial Discussion', 'First Round', 'Second Round', 'HR Round'];
const SLA_FILTERS = ['All', 'On Track', 'Approaching', 'Breached'];

const slaStyle = {
  'on-track': 'bg-green-50 text-green-700 border-green-200',
  'approaching': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'breached': 'bg-red-50 text-red-700 border-red-200',
};
const slaLabel = { 'on-track': 'On Track', 'approaching': 'Approaching', 'breached': 'Breached' };

const stageStyle: Record<string, string> = {
  'Found': 'bg-gray-100 text-gray-700',
  'Initial Discussion': 'bg-blue-50 text-blue-700',
  'First Round': 'bg-purple-50 text-purple-700',
  'Second Round': 'bg-indigo-50 text-indigo-700',
  'HR Round': 'bg-[#FEF3E8] text-[#B85A10]',
};

type SortKey = 'name' | 'stage' | 'daysInStage' | 'slaStatus';

export function CandidateListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [slaFilter, setSlaFilter] = useState('All');
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'daysInStage', dir: 'desc' });
  const [scheduleCandidate, setScheduleCandidate] = useState<Candidate | null>(null);

  const toggleSort = (key: SortKey) => {
    setSort(prev => prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  };

  const filtered = useMemo(() => {
    return CANDIDATES
      .filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.role.toLowerCase().includes(search.toLowerCase()) ||
          c.recruiter.toLowerCase().includes(search.toLowerCase());
        const matchStage = stageFilter === 'All Stages' || c.stage === stageFilter;
        const matchSla = slaFilter === 'All' ||
          (slaFilter === 'On Track' && c.slaStatus === 'on-track') ||
          (slaFilter === 'Approaching' && c.slaStatus === 'approaching') ||
          (slaFilter === 'Breached' && c.slaStatus === 'breached');
        return matchSearch && matchStage && matchSla;
      })
      .sort((a, b) => {
        const dir = sort.dir === 'asc' ? 1 : -1;
        if (sort.key === 'name') return a.name.localeCompare(b.name) * dir;
        if (sort.key === 'stage') return a.stage.localeCompare(b.stage) * dir;
        if (sort.key === 'daysInStage') return (a.daysInStage - b.daysInStage) * dir;
        if (sort.key === 'slaStatus') return a.slaStatus.localeCompare(b.slaStatus) * dir;
        return 0;
      });
  }, [search, stageFilter, slaFilter, sort]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sort.key !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300" />;
    return sort.dir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-[#F47920]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#F47920]" />;
  };

  const counts = {
    total: CANDIDATES.length,
    breached: CANDIDATES.filter(c => c.slaStatus === 'breached').length,
    approaching: CANDIDATES.filter(c => c.slaStatus === 'approaching').length,
    onTrack: CANDIDATES.filter(c => c.slaStatus === 'on-track').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">All Candidates</h1>
            <p className="text-sm text-gray-500">Search, filter and manage every candidate in the pipeline</p>
          </div>
          <button
            onClick={() => navigate('/candidate/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#F47920] text-white text-sm font-semibold rounded-xl hover:bg-[#D96510] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Candidate
          </button>
        </div>

        {/* Summary Pills */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
            <span className="font-bold text-gray-900">{counts.total}</span> Total
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-sm font-medium text-green-700">
            <span className="font-bold">{counts.onTrack}</span> On Track
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2 text-sm font-medium text-yellow-700">
            <span className="font-bold">{counts.approaching}</span> Approaching SLA
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-sm font-medium text-red-700">
            <span className="font-bold">{counts.breached}</span> SLA Breached
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, role, or recruiter…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8] outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:border-[#F47920] outline-none appearance-none cursor-pointer"
            >
              {STAGES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <select
            value={slaFilter}
            onChange={e => setSlaFilter(e.target.value)}
            className="pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:border-[#F47920] outline-none appearance-none cursor-pointer"
          >
            {SLA_FILTERS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-5 py-3.5">
                  <button onClick={() => toggleSort('name')} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                    Candidate <SortIcon col="name" />
                  </button>
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3.5">
                  <button onClick={() => toggleSort('stage')} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                    Stage <SortIcon col="stage" />
                  </button>
                </th>
                <th className="text-left px-5 py-3.5">
                  <button onClick={() => toggleSort('daysInStage')} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                    Days in Stage <SortIcon col="daysInStage" />
                  </button>
                </th>
                <th className="text-left px-5 py-3.5">
                  <button onClick={() => toggleSort('slaStatus')} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                    SLA Status <SortIcon col="slaStatus" />
                  </button>
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recruiter</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors group ${i % 2 === 0 ? '' : 'bg-gray-50/20'}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F47920]/20 to-[#F47920]/5 border border-[#F47920]/20 flex items-center justify-center shrink-0">
                        <span className="text-[#F47920] text-xs font-bold">{c.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.role}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${stageStyle[c.stage] || 'bg-gray-100 text-gray-700'}`}>
                      {c.stage}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-semibold ${c.daysInStage > 7 ? 'text-red-600' : c.daysInStage > 4 ? 'text-yellow-600' : 'text-gray-900'}`}>
                      {c.daysInStage}d
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${slaStyle[c.slaStatus]}`}>
                      {slaLabel[c.slaStatus]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{c.recruiter}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setScheduleCandidate(c)}
                      className="flex items-center gap-1.5 text-xs text-[#F47920] font-medium px-3 py-1.5 rounded-lg border border-[#F47920]/30 bg-[#FEF3E8]/60 hover:bg-[#FEF3E8] transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Schedule
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">No candidates match your filters</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/40 text-xs text-gray-400">
            Showing {filtered.length} of {CANDIDATES.length} candidates
          </div>
        </div>
      </div>

      {scheduleCandidate && (
        <InterviewSchedulerModal
          candidateName={scheduleCandidate.name}
          onClose={() => setScheduleCandidate(null)}
        />
      )}
    </div>
  );
}
