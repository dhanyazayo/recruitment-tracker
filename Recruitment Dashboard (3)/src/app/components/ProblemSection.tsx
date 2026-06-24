import { AlertTriangle, Clock, EyeOff } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Candidates Get Stuck',
      description: 'Without clear ownership, candidates sit in stages for weeks with no follow-up or progress.',
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      icon: Clock,
      title: 'Feedback Gets Delayed',
      description: 'Interview feedback arrives late or incomplete, slowing down decision-making and losing top talent.',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      icon: EyeOff,
      title: 'No Leadership Visibility',
      description: 'Executives have no real-time view into pipeline health, bottlenecks, or hiring velocity.',
      color: 'text-[#F47920]',
      bg: 'bg-[#FEF3E8]'
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 ${problem.bg} rounded-xl flex items-center justify-center mb-6`}>
                <problem.icon className={`w-6 h-6 ${problem.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
