import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

export function AnalyticsSection() {
  const funnelData = [
    { stage: 'Found', count: 120 },
    { stage: 'Initial', count: 85 },
    { stage: 'First', count: 52 },
    { stage: 'Second', count: 31 },
    { stage: 'HR', count: 22 },
    { stage: 'Selected', count: 18 },
  ];

  const trendData = [
    { week: 'W1', time: 28 },
    { week: 'W2', time: 24 },
    { week: 'W3', time: 21 },
    { week: 'W4', time: 19 },
  ];

  const distributionData = [
    { name: 'Engineering', value: 45, color: '#F47920' },
    { name: 'Product', value: 25, color: '#8B5CF6' },
    { name: 'Design', value: 20, color: '#10B981' },
    { name: 'Sales', value: 10, color: '#F59E0B' },
  ];

  const recruiterData = [
    { name: 'Sarah M.', candidates: 28, selected: 8, rate: 29 },
    { name: 'Michael K.', candidates: 24, selected: 7, rate: 29 },
    { name: 'Emma L.', candidates: 21, selected: 5, rate: 24 },
    { name: 'James R.', candidates: 18, selected: 4, rate: 22 },
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-900 via-[#7A3A08] to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Measure What Matters
          </h2>
          <p className="text-xl text-[#FEE9D1] max-w-3xl mx-auto">
            Real-time analytics and insights to optimize your hiring process and make data-driven decisions.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#FFAA5B]" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold mb-1">127</div>
            <div className="text-sm text-[#FEE9D1]">Candidates in Pipeline</div>
            <div className="mt-2 text-xs text-green-400">+18% from last month</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold mb-1">68%</div>
            <div className="text-sm text-[#FEE9D1]">Conversion Rate</div>
            <div className="mt-2 text-xs text-green-400">+12% improvement</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold mb-1">19 days</div>
            <div className="text-sm text-[#FEE9D1]">Time to Hire</div>
            <div className="mt-2 text-xs text-green-400">-9 days improvement</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs">5</div>
            </div>
            <div className="text-3xl font-bold mb-1">5</div>
            <div className="text-sm text-[#FEE9D1]">Aging Candidates</div>
            <div className="mt-2 text-xs text-yellow-400">Needs attention</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Funnel Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-6">Pipeline Funnel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="stage" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#F47920" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Time to Hire Trend */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-6">Time-to-Hire Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="time" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pipeline Distribution */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-6">Pipeline by Department</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {distributionData.map((dept) => (
                <div key={dept.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                  <span className="text-sm">{dept.name}: {dept.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Leaderboard */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-6">Recruiter Performance</h3>
            <div className="space-y-4">
              {recruiterData.map((recruiter, idx) => (
                <div key={recruiter.name} className="flex items-center gap-4">
                  <div className="text-lg font-bold text-[#FFAA5B] w-8">#{idx + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{recruiter.name}</span>
                      <span className="text-sm text-[#FEE9D1]">{recruiter.rate}% success</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#F47920] to-purple-500 h-2 rounded-full"
                        style={{ width: `${recruiter.rate * 3}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-[#FEE9D1]">
                      <span>{recruiter.candidates} candidates</span>
                      <span>{recruiter.selected} selected</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
