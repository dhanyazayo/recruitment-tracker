import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export function InteractivePipeline() {
  const stages = [
    { name: 'Found', count: 12, avgDays: 2, conversion: '75%', color: 'from-gray-400 to-gray-500' },
    { name: 'Initial', count: 8, avgDays: 4, conversion: '65%', color: 'from-[#FFAA5B] to-[#F47920]' },
    { name: 'First Round', count: 5, avgDays: 6, conversion: '60%', color: 'from-purple-400 to-purple-500' },
    { name: 'Second Round', count: 3, avgDays: 5, conversion: '67%', color: 'from-indigo-400 to-indigo-500' },
    { name: 'HR Round', count: 2, avgDays: 3, conversion: '100%', color: 'from-green-400 to-green-500' },
    { name: 'Selected', count: 7, avgDays: 0, conversion: '—', color: 'from-emerald-400 to-emerald-500' },
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 via-[#FEF3E8]/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hiring Workflow & Stage Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track candidates through every stage with real-time metrics, conversion rates,
            and bottleneck detection.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
          {stages.map((stage, idx) => (
            <div key={stage.name} className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Stage Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all p-8 group hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    {/* Left - Stage Info */}
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-bold text-white">{stage.count}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stage.name}</h3>
                        <p className="text-sm text-gray-500">Current candidates in stage</p>
                      </div>
                    </div>

                    {/* Right - Metrics */}
                    <div className="flex gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stage.avgDays}</div>
                        <div className="text-xs text-gray-500 mt-1">Avg Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#F47920]">{stage.conversion}</div>
                        <div className="text-xs text-gray-500 mt-1">Conversion</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${stage.color} h-2 rounded-full transition-all duration-500 group-hover:w-full`}
                        style={{ width: `${parseInt(stage.conversion) || 50}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Connector Arrow */}
                {idx < stages.length - 1 && (
                  <div className="flex justify-center my-4">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.2 }}
                    >
                      <ArrowDown className="w-8 h-8 text-gray-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-gray-900">37</div>
            <div className="text-sm text-gray-600 mt-1">Total Active</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-[#F47920]">4.2 days</div>
            <div className="text-sm text-gray-600 mt-1">Avg per Stage</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600">68%</div>
            <div className="text-sm text-gray-600 mt-1">Overall Conversion</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">21 days</div>
            <div className="text-sm text-gray-600 mt-1">Time to Hire</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
