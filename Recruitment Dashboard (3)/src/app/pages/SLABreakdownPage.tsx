import { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { SLAActionModal } from '../components/SLAActionModal';

type ActionTarget = { name: string; stage: string } | null;

export function SLABreakdownPage() {
  const [actionTarget, setActionTarget] = useState<ActionTarget>(null);
  // SLA targets for each stage (in days)
  const slaTargets = {
    'Found': 2,
    'Initial Discussion': 4,
    'First Round': 7,
    'Second Round': 5,
    'HR Round': 3,
  };

  // All candidates with their current status
  const candidates = [
    { name: 'Sarah Chen', role: 'Senior Engineer', stage: 'First Round', daysInStage: 6, recruiter: 'Michael K.' },
    { name: 'Michael Torres', role: 'Product Manager', stage: 'Second Round', daysInStage: 4, recruiter: 'Sarah M.' },
    { name: 'Emma Wilson', role: 'UX Designer', stage: 'Initial Discussion', daysInStage: 12, recruiter: 'Emma L.' },
    { name: 'James Park', role: 'Data Scientist', stage: 'HR Round', daysInStage: 2, recruiter: 'James R.' },
    { name: 'Lisa Anderson', role: 'Frontend Developer', stage: 'First Round', daysInStage: 8, recruiter: 'Michael K.' },
    { name: 'David Kim', role: 'Backend Engineer', stage: 'Found', daysInStage: 1, recruiter: 'Sarah M.' },
    { name: 'Rachel Green', role: 'Product Designer', stage: 'Second Round', daysInStage: 6, recruiter: 'Emma L.' },
    { name: 'Tom Bradley', role: 'DevOps Engineer', stage: 'Initial Discussion', daysInStage: 5, recruiter: 'James R.' },
    { name: 'Sophie Turner', role: 'QA Engineer', stage: 'HR Round', daysInStage: 4, recruiter: 'Michael K.' },
    { name: 'Alex Martinez', role: 'Full Stack Dev', stage: 'First Round', daysInStage: 3, recruiter: 'Sarah M.' },
    { name: 'Nina Patel', role: 'UI Designer', stage: 'Found', daysInStage: 3, recruiter: 'Emma L.' },
    { name: 'Chris Evans', role: 'Security Engineer', stage: 'Second Round', daysInStage: 2, recruiter: 'James R.' },
  ];

  // Calculate SLA status
  const getSLAStatus = (stage: string, daysInStage: number) => {
    const target = slaTargets[stage as keyof typeof slaTargets] || 7;
    const daysRemaining = target - daysInStage;

    if (daysRemaining < 0) {
      return { status: 'breached', label: 'Breached', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', daysRemaining };
    } else if (daysRemaining <= 1) {
      return { status: 'approaching', label: 'Approaching', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', daysRemaining };
    } else {
      return { status: 'on-track', label: 'On Track', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', daysRemaining };
    }
  };

  // Group candidates by SLA status
  const breachedCandidates = candidates.filter(c => getSLAStatus(c.stage, c.daysInStage).status === 'breached');
  const approachingCandidates = candidates.filter(c => getSLAStatus(c.stage, c.daysInStage).status === 'approaching');
  const onTrackCandidates = candidates.filter(c => getSLAStatus(c.stage, c.daysInStage).status === 'on-track');

  return (
    <>
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SLA Breakdown</h1>
          <p className="text-xl text-gray-600">Monitor all candidates and their Service Level Agreement status</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FEE9D1] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#F47920]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Candidates</div>
                <div className="text-2xl font-bold text-gray-900">{candidates.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">On Track</div>
                <div className="text-2xl font-bold text-green-900">{onTrackCandidates.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-yellow-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Approaching</div>
                <div className="text-2xl font-bold text-yellow-900">{approachingCandidates.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-red-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Breached</div>
                <div className="text-2xl font-bold text-red-900">{breachedCandidates.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* SLA Targets Reference */}
        <div className="bg-[#FEF3E8] rounded-2xl p-6 border border-[#FCD5A8] mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">SLA Targets by Stage</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(slaTargets).map(([stage, days]) => (
              <div key={stage} className="bg-white rounded-lg p-3 border border-[#FEE9D1]">
                <div className="text-xs text-gray-600 mb-1">{stage}</div>
                <div className="font-bold text-gray-900">{days} days</div>
              </div>
            ))}
          </div>
        </div>

        {/* Breached Candidates - Critical */}
        {breachedCandidates.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Critical: SLA Breached</h2>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                {breachedCandidates.length}
              </span>
            </div>
            <div className="space-y-3">
              {breachedCandidates.map((candidate) => {
                const slaInfo = getSLAStatus(candidate.stage, candidate.daysInStage);
                const target = slaTargets[candidate.stage as keyof typeof slaTargets];
                return (
                  <div
                    key={candidate.name}
                    className={`bg-white rounded-xl p-6 border-2 ${slaInfo.border} hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-600">{candidate.role}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Current Stage</div>
                          <div className="font-semibold text-gray-900">{candidate.stage}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Days in Stage</div>
                          <div className="font-bold text-red-600">{candidate.daysInStage} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">SLA Target</div>
                          <div className="font-semibold text-gray-900">{target} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Overdue</div>
                          <div className="font-bold text-red-600">{Math.abs(slaInfo.daysRemaining)} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Recruiter</div>
                          <div className="font-semibold text-gray-900">{candidate.recruiter}</div>
                        </div>

                        <button
                          onClick={() => setActionTarget({ name: candidate.name, stage: candidate.stage })}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-semibold cursor-pointer shadow-md hover:shadow-lg hover:scale-105"
                        >
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Approaching Candidates - Warning */}
        {approachingCandidates.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Warning: Approaching SLA Breach</h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                {approachingCandidates.length}
              </span>
            </div>
            <div className="space-y-3">
              {approachingCandidates.map((candidate) => {
                const slaInfo = getSLAStatus(candidate.stage, candidate.daysInStage);
                const target = slaTargets[candidate.stage as keyof typeof slaTargets];
                return (
                  <div
                    key={candidate.name}
                    className={`bg-white rounded-xl p-6 border-2 ${slaInfo.border} hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-600">{candidate.role}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Current Stage</div>
                          <div className="font-semibold text-gray-900">{candidate.stage}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Days in Stage</div>
                          <div className="font-bold text-yellow-600">{candidate.daysInStage} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">SLA Target</div>
                          <div className="font-semibold text-gray-900">{target} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Days Remaining</div>
                          <div className="font-bold text-yellow-600">{slaInfo.daysRemaining} day{slaInfo.daysRemaining !== 1 ? 's' : ''}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Recruiter</div>
                          <div className="font-semibold text-gray-900">{candidate.recruiter}</div>
                        </div>

                        <button
                          onClick={() => setActionTarget({ name: candidate.name, stage: candidate.stage })}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all text-sm font-semibold cursor-pointer shadow-md hover:shadow-lg hover:scale-105"
                        >
                          Schedule Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* On Track Candidates - Good */}
        {onTrackCandidates.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">On Track</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {onTrackCandidates.length}
              </span>
            </div>
            <div className="space-y-3">
              {onTrackCandidates.map((candidate) => {
                const slaInfo = getSLAStatus(candidate.stage, candidate.daysInStage);
                const target = slaTargets[candidate.stage as keyof typeof slaTargets];
                return (
                  <div
                    key={candidate.name}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-600">{candidate.role}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Current Stage</div>
                          <div className="font-semibold text-gray-900">{candidate.stage}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Days in Stage</div>
                          <div className="font-semibold text-gray-900">{candidate.daysInStage} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">SLA Target</div>
                          <div className="font-semibold text-gray-900">{target} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Days Remaining</div>
                          <div className="font-bold text-green-600">{slaInfo.daysRemaining} days</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Recruiter</div>
                          <div className="font-semibold text-gray-900">{candidate.recruiter}</div>
                        </div>

                        <div className={`px-4 py-2 ${slaInfo.bg} ${slaInfo.color} rounded-lg text-sm font-semibold`}>
                          {slaInfo.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>

    {actionTarget && (
      <SLAActionModal
        candidateName={actionTarget.name}
        currentStage={actionTarget.stage}
        onClose={() => setActionTarget(null)}
      />
    )}
    </>
  );
}
