import { Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function SolutionSection() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-center">
          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Pipeline Dashboard</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-[#FEF3E8] text-[#F47920] rounded-lg">Live</button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">This Week</button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#FEF3E8] rounded-lg p-3">
                    <div className="text-xs text-[#F47920] mb-1">Active</div>
                    <div className="text-2xl font-bold text-[#7A3A08]">37</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs text-green-600 mb-1">Selected</div>
                    <div className="text-2xl font-bold text-green-900">12</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="text-xs text-yellow-600 mb-1">At Risk</div>
                    <div className="text-2xl font-bold text-yellow-900">5</div>
                  </div>
                </div>
              </div>

              {/* Pipeline Stages */}
              <div className="p-6 space-y-3">
                {[
                  { stage: 'Found', count: 12, color: 'bg-gray-400' },
                  { stage: 'Initial Discussion', count: 8, color: 'bg-[#FFAA5B]' },
                  { stage: 'First Round', count: 5, color: 'bg-purple-400' },
                  { stage: 'Second Round', count: 3, color: 'bg-indigo-400' },
                  { stage: 'HR Round', count: 2, color: 'bg-green-400' },
                ].map((item) => (
                  <div key={item.stage} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium text-gray-900">{item.stage}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / 12) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SLA Alerts */}
              <div className="p-6 pt-0">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-900">5 candidates approaching SLA breach</span>
                  </div>
                  <button className="text-xs text-red-600 hover:text-red-700">View details →</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
