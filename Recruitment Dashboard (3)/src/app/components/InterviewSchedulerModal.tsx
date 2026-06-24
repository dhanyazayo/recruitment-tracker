import { useState } from 'react';
import { X, Calendar, Clock, User, Users, MessageSquare, CheckCircle } from 'lucide-react';

const INTERVIEWERS = [
  'Raj Patel – Engineering Manager',
  'Linda Chu – Tech Lead',
  'Mark Stevens – Product Director',
  'Aisha Okonkwo – Design Lead',
  'David Flores – Data Science Lead',
  'Nina Sharma – HR Manager',
];

type Props = {
  candidateName?: string;
  onClose: () => void;
};

export function InterviewSchedulerModal({ candidateName = '', onClose }: Props) {
  const [form, setForm] = useState({
    candidate: candidateName,
    interviewer: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scheduled, setScheduled] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.candidate.trim()) e.candidate = 'Candidate name is required';
    if (!form.interviewer) e.interviewer = 'Select an interviewer';
    if (!form.date) e.date = 'Select a date';
    if (!form.time) e.time = 'Select a time';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setScheduled(true);
      setTimeout(onClose, 2000);
    }
  };

  const set = (k: string, v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  const inputCls = (key: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
      errors[key] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8]'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
        {scheduled ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Interview Scheduled</h3>
            <p className="text-sm text-gray-500">
              Invite sent to <span className="font-medium text-gray-700">{form.candidate}</span>
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Schedule Interview</h3>
                {candidateName && <p className="text-xs text-gray-500 mt-0.5">for {candidateName}</p>}
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Candidate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Candidate <span className="text-[#F47920]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={form.candidate}
                    onChange={e => set('candidate', e.target.value)}
                    placeholder="Candidate name"
                    className={`${inputCls('candidate')} pl-10`}
                    readOnly={!!candidateName}
                  />
                </div>
                {errors.candidate && <p className="text-xs text-red-500 mt-1">{errors.candidate}</p>}
              </div>

              {/* Interviewer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Interviewer <span className="text-[#F47920]">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={form.interviewer}
                    onChange={e => set('interviewer', e.target.value)}
                    className={`${inputCls('interviewer')} pl-10 appearance-none`}
                  >
                    <option value="">Select interviewer</option>
                    {INTERVIEWERS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                {errors.interviewer && <p className="text-xs text-red-500 mt-1">{errors.interviewer}</p>}
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date <span className="text-[#F47920]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => set('date', e.target.value)}
                      className={`${inputCls('date')} pl-10`}
                    />
                  </div>
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Time <span className="text-[#F47920]">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="time"
                      value={form.time}
                      onChange={e => set('time', e.target.value)}
                      className={`${inputCls('time')} pl-10`}
                    />
                  </div>
                  {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    placeholder="Interview focus areas, preparation notes…"
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8] transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F47920] text-white text-sm font-semibold hover:bg-[#D96510] transition-colors shadow-sm">
                <Calendar className="w-4 h-4" />
                Schedule Interview
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
