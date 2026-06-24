import { TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function ExecutiveDashboard() {
  const pipelineSummary = [
    { stage: 'Found', count: 45, trend: 'up', change: '+8' },
    { stage: 'Initial Discussion', count: 32, trend: 'up', change: '+5' },
    { stage: 'First Round', count: 18, trend: 'stable', change: '0' },
    { stage: 'Second Round', count: 12, trend: 'down', change: '-2' },
    { stage: 'HR Round', count: 8, trend: 'up', change: '+3' },
  ];

  const delayHotspots = [
    { stage: 'Initial Discussion', avgDelay: 8, severity: 'high', count: 5 },
    { stage: 'First Round', avgDelay: 6, severity: 'medium', count: 3 },
    { stage: 'HR Round', avgDelay: 4, severity: 'low', count: 2 },
  ];

  const recruiterPerformance = [
    { name: 'Sarah M.', pipeline: 38, conversion: 31, velocity: 'fast' },
    { name: 'Michael K.', pipeline: 34, conversion: 29, velocity: 'fast' },
    { name: 'Emma L.', pipeline: 28, conversion: 24, velocity: 'medium' },
    { name: 'James R.', pipeline: 22, conversion: 19, velocity: 'medium' },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Executive Hiring Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time hiring metrics, stage distribution analysis, delay alerts,
            and recruiter performance tracking.
          </p>
        </div>

        {/* Executive Dashboard Mockup */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 shadow-2xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-[#F47920] to-purple-600 text-white p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Executive Hiring Dashboard</h3>
                <p className="text-[#FEE9D1]">Real-time overview • Updated 2 minutes ago</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-lg rounded-lg hover:bg-white/30 transition-colors">
                  Export
                </button>
                <button className="px-4 py-2 bg-white text-[#F47920] rounded-lg hover:bg-[#FEF3E8] transition-colors">
                  Configure
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="text-sm text-[#FEE9D1] mb-1">Total Active</div>
                <div className="text-3xl font-bold mb-2">115</div>
                <div className="flex items-center gap-1 text-sm text-green-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>+14 this week</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="text-sm text-[#FEE9D1] mb-1">Avg Time to Hire</div>
                <div className="text-3xl font-bold mb-2">19d</div>
                <div className="flex items-center gap-1 text-sm text-green-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>-9 days</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="text-sm text-[#FEE9D1] mb-1">Conversion Rate</div>
                <div className="text-3xl font-bold mb-2">68%</div>
                <div className="flex items-center gap-1 text-sm text-green-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="text-sm text-[#FEE9D1] mb-1">At Risk</div>
                <div className="text-3xl font-bold mb-2">10</div>
                <div className="flex items-center gap-1 text-sm text-yellow-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>Needs attention</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pipeline Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Summary</h4>
                <div className="space-y-3">
                  {pipelineSummary.map((stage, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{stage.stage}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-900">{stage.count}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            stage.trend === 'up' ? 'bg-green-100 text-green-700' :
                            stage.trend === 'down' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {stage.change}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#F47920] to-purple-500 h-2 rounded-full"
                          style={{ width: `${(stage.count / 45) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Delay Hotspots */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Delay Hotspots</h4>
                <div className="space-y-3">
                  {delayHotspots.map((hotspot, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl p-4 border ${
                        hotspot.severity === 'high' ? 'bg-red-50 border-red-200' :
                        hotspot.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-[#FEF3E8] border-[#FCD5A8]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{hotspot.stage}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {hotspot.count} candidates delayed
                          </div>
                        </div>
                        <AlertCircle className={`w-5 h-5 ${
                          hotspot.severity === 'high' ? 'text-red-600' :
                          hotspot.severity === 'medium' ? 'text-yellow-600' :
                          'text-[#F47920]'
                        }`} />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Avg {hotspot.avgDelay} days over SLA</span>
                      </div>
                    </div>
                  ))}

                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">All other stages on track</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recruiter Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recruiter Performance</h4>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-white">
                  <div className="text-sm font-medium text-gray-600">Recruiter</div>
                  <div className="text-sm font-medium text-gray-600">Active Pipeline</div>
                  <div className="text-sm font-medium text-gray-600">Conversion Rate</div>
                  <div className="text-sm font-medium text-gray-600">Velocity</div>
                </div>
                {recruiterPerformance.map((recruiter, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 last:border-0">
                    <div className="font-medium text-gray-900">{recruiter.name}</div>
                    <div className="text-gray-700">{recruiter.pipeline} candidates</div>
                    <div className="font-semibold text-[#F47920]">{recruiter.conversion}%</div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        recruiter.velocity === 'fast' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {recruiter.velocity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
