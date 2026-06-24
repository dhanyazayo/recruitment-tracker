import { TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const mockCandidates = [
    { name: 'Sarah Chen', role: 'Senior Engineer', days: 3, sla: 'green', stage: 'First' },
    { name: 'Michael Torres', role: 'Product Manager', days: 7, sla: 'yellow', stage: 'Second' },
    { name: 'Emma Wilson', role: 'UX Designer', days: 12, sla: 'red', stage: 'Initial' },
    { name: 'James Park', role: 'Data Scientist', days: 2, sla: 'green', stage: 'HR' },
  ];

  const getSLAColor = (sla: string) => {
    switch (sla) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F47920]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex justify-center">
          {/* Comprehensive Pipeline Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
          >
            {/* Pipeline Board */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recruitment Overview</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm bg-[#FEF3E8] text-[#F47920] rounded-lg font-medium">Live</button>
                  <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg">This Week</button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#FEF3E8] rounded-xl p-4">
                  <div className="text-xs text-[#F47920] mb-1 font-medium">Active</div>
                  <div className="text-2xl font-bold text-[#7A3A08]">37</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-xs text-green-600 mb-1 font-medium">Selected</div>
                  <div className="text-2xl font-bold text-green-900">12</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="text-xs text-yellow-600 mb-1 font-medium">At Risk</div>
                  <div className="text-2xl font-bold text-yellow-900">5</div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Active Pipeline</h3>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
                  ))}
                </div>
              </div>

              {/* Pipeline Stages with Progress */}
              <div className="space-y-3 mb-6">
                {[
                  { stage: 'Found', count: 12, color: 'bg-gray-400' },
                  { stage: 'Initial Discussion', count: 8, color: 'bg-[#FFAA5B]' },
                  { stage: 'First Round', count: 5, color: 'bg-purple-400' },
                  { stage: 'Second Round', count: 3, color: 'bg-indigo-400' },
                  { stage: 'HR Round', count: 2, color: 'bg-green-400' },
                  { stage: 'Selected', count: 7, color: 'bg-emerald-400' },
                ].map((item) => (
                  <div key={item.stage} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium text-gray-900">{item.stage}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${(item.count / 12) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Candidates */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {mockCandidates.slice(0, 3).map((candidate, idx) => (
                    <motion.div
                      key={candidate.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F47920] to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-xs text-gray-500">{candidate.role}</div>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getSLAColor(candidate.sla)} mt-1`}></div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {candidate.days} days
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Feedback pending
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SLA Alerts - CLICKABLE */}
              <a
                href="/sla-breakdown"
                className="block bg-red-50 border-2 border-red-300 rounded-xl p-4 hover:bg-red-100 hover:border-red-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">5 candidates approaching SLA breach</span>
                </div>
                <div className="text-xs text-red-600 hover:text-red-700 font-semibold underline decoration-2 underline-offset-2">
                  View SLA Breakdown →
                </div>
              </a>
            </div>

            {/* Floating Analytics Widgets */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
            >
              <div className="text-xs text-gray-600 mb-1 font-medium">Pipeline Velocity</div>
              <div className="text-2xl font-bold text-gray-900">21 days</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>-9 days improved</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
            >
              <div className="text-xs text-gray-600 mb-2 font-medium">Pipeline Health</div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-8 bg-green-500 rounded"></div>
                  <div className="w-2 h-6 bg-yellow-500 rounded"></div>
                  <div className="w-2 h-3 bg-red-500 rounded"></div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
