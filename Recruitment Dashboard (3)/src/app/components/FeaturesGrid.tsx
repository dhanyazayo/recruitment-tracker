import { Users, Calendar, MessageSquare, Clock, BarChart3, Shield } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: Users,
      title: 'Candidate Management',
      description: 'Centralized database with complete profiles, documents, and communication history.',
      color: 'from-[#F47920] to-[#B85A10]'
    },
    {
      icon: Calendar,
      title: 'Interview Scheduling',
      description: 'Automated scheduling with calendar sync, reminders, and interview kit preparation.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Feedback Collection',
      description: 'Structured feedback forms with ratings, comments, and instant team visibility.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: 'SLA Tracking',
      description: 'Real-time monitoring with automated alerts for candidates approaching SLA breach.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: BarChart3,
      title: 'Reporting & Analytics',
      description: 'Comprehensive dashboards with pipeline metrics, conversion rates, and trends.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Granular permissions for recruiters, interviewers, managers, and executives.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Hire Better
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete platform designed for modern recruiting teams who demand
            visibility, accountability, and results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
