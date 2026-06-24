import { useState } from 'react';
import { X, Calendar, Bell, ArrowRight, UserCheck, CheckCircle } from 'lucide-react';
import { InterviewSchedulerModal } from './InterviewSchedulerModal';

type Action = 'schedule' | 'reminder' | 'move' | 'reassign' | null;

const STAGES = ['Initial Discussion', 'First Round', 'Second Round', 'HR Round', 'Selected'];
const RECRUITERS = ['Michael Keane', 'Sarah Mitchell', 'Emma Lawson', 'James Robinson', 'Priya Nair', 'Carlos Mendez'];

type Props = {
  candidateName: string;
  currentStage: string;
  onClose: () => void;
};

export function SLAActionModal({ candidateName, currentStage, onClose }: Props) {
  const [selected, setSelected] = useState<Action>(null);
  const [done, setDone] = useState(false);
  const [doneMsg, setDoneMsg] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);
  const [nextStage, setNextStage] = useState('');
  const [recruiter, setRecruiter] = useState('');

  const actions = [
    {
      id: 'schedule' as Action,
      icon: Calendar,
      label: 'Schedule Interview',
      desc: 'Book an interview slot to keep the process moving',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      activeBorder: 'border-blue-400',
    },
    {
      id: 'reminder' as Action,
      icon: Bell,
      label: 'Send Feedback Reminder',
      desc: 'Nudge the interviewer panel to submit their feedback',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      activeBorder: 'border-yellow-400',
    },
    {
      id: 'move' as Action,
      icon: ArrowRight,
      label: 'Move to Next Stage',
      desc: 'Advance the candidate to the next pipeline stage',
      color: 'text-[#F47920]',
      bg: 'bg-[#FEF3E8]',
      border: 'border-[#F9C495]',
      activeBorder: 'border-[#F47920]',
    },
    {
      id: 'reassign' as Action,
      icon: UserCheck,
      label: 'Reassign Recruiter',
      desc: "Hand off to another recruiter if bandwidth is an issue",
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      activeBorder: 'border-purple-400',
    },
  ];

  const handleConfirm = () => {
    if (selected === 'schedule') { setShowScheduler(true); return; }
    if (selected === 'reminder') setDoneMsg(`Feedback reminder sent to the panel for ${candidateName}`);
    if (selected === 'move' && nextStage) setDoneMsg(`${candidateName} moved to ${nextStage}`);
    if (selected === 'reassign' && recruiter) setDoneMsg(`${candidateName} reassigned to ${recruiter}`);
    else if (selected !== 'reminder') return;
    setDone(true);
    setTimeout(onClose, 2200);
  };

  const canConfirm = selected === 'reminder' ||
    (selected === 'move' && nextStage) ||
    (selected === 'reassign' && recruiter);

  if (showScheduler) {
    return <InterviewSchedulerModal candidateName={candidateName} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
        {done ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Action Taken</h3>
            <p className="text-sm text-gray-500">{doneMsg}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">SLA Action</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  <span className="font-medium text-gray-700">{candidateName}</span> · {currentStage}
                </p>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Choose an action</p>
              {actions.map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelected(a.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left
                    ${selected === a.id ? `${a.bg} ${a.activeBorder}` : `bg-white ${a.border} hover:${a.bg}`}`}
                >
                  <div className={`w-9 h-9 rounded-xl ${a.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <a.icon className={`w-5 h-5 ${a.color}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${selected === a.id ? a.color : 'text-gray-800'}`}>{a.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
                  </div>
                  {selected === a.id && (
                    <div className={`ml-auto w-4 h-4 rounded-full ${a.color.replace('text-', 'bg-').replace('600', '500')} flex items-center justify-center shrink-0 mt-1`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}

              {/* Conditional sub-fields */}
              {selected === 'move' && (
                <div className="pt-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Move to stage</label>
                  <select
                    value={nextStage}
                    onChange={e => setNextStage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8] appearance-none"
                  >
                    <option value="">Select next stage…</option>
                    {STAGES.filter(s => s !== currentStage).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {selected === 'reassign' && (
                <div className="pt-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Reassign to</label>
                  <select
                    value={recruiter}
                    onChange={e => setRecruiter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8] appearance-none"
                  >
                    <option value="">Select recruiter…</option>
                    {RECRUITERS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selected || !canConfirm}
                className="px-5 py-2.5 rounded-xl bg-[#F47920] text-white text-sm font-semibold hover:bg-[#D96510] transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm Action
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
