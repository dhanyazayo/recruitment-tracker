import { User, MessageSquare, Clock, Star, ThumbsUp, ThumbsDown, XCircle, PauseCircle, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { InterviewSchedulerModal } from './InterviewSchedulerModal';

export function ProductDeepDive() {
  const [activeTab, setActiveTab] = useState<'profile' | 'feedback' | 'timeline'>('profile');
  const [showScheduler, setShowScheduler] = useState(false);
  const [actionToast, setActionToast] = useState('');

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(''), 3000);
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'feedback' as const, label: 'Feedback', icon: MessageSquare },
    { id: 'timeline' as const, label: 'Timeline', icon: Clock },
  ];

  return (
    <>
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Candidate Profile & Feedback Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete candidate profiles with feedback tracking, activity timeline,
            and real-time status monitoring.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Candidate Detail Screen */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F47920] to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    SC
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">Sarah Chen</h3>
                    <p className="text-gray-600">Senior Software Engineer</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">Within SLA</span>
                      </div>
                      <span className="text-sm text-gray-500">Stage: First Round</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-[#F47920] text-white rounded-lg hover:bg-[#B85A10] transition-colors text-sm font-semibold">
                      Move to Next Stage
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => triggerToast('Sarah Chen has been rejected')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors text-xs font-semibold"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                      <button
                        onClick={() => triggerToast('Sarah Chen placed on hold')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 transition-colors text-xs font-semibold"
                      >
                        <PauseCircle className="w-3.5 h-3.5" />
                        Hold
                      </button>
                      <button
                        onClick={() => setShowScheduler(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors text-xs font-semibold"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Re-Interview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-[#F47920] text-[#F47920]'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Contact</h4>
                      <div className="space-y-2">
                        <p className="text-gray-900">sarah.chen@email.com</p>
                        <p className="text-gray-900">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Experience</h4>
                      <p className="text-gray-900">8 years in full-stack development</p>
                      <p className="text-gray-600 text-sm mt-1">Previously: Tech Lead at Stripe</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-[#FEF3E8] text-[#B85A10] rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'feedback' && (
                  <div className="space-y-4">
                    {[
                      { interviewer: 'Michael Torres', role: 'Engineering Manager', rating: 'strong-yes', date: '2 days ago' },
                      { interviewer: 'Emma Wilson', role: 'Senior Engineer', rating: 'yes', date: '3 days ago' },
                    ].map((feedback, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-medium text-gray-900">{feedback.interviewer}</div>
                            <div className="text-sm text-gray-600">{feedback.role}</div>
                          </div>
                          <div className="text-xs text-gray-500">{feedback.date}</div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <ThumbsUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600 capitalize">
                            {feedback.rating.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Strong technical skills, excellent communication. Would be a great addition to the team.
                        </p>
                      </div>
                    ))}

                    <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#FFAA5B] hover:text-[#F47920] transition-colors">
                      + Add Feedback
                    </button>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    {[
                      { event: 'Moved to First Round', user: 'System', time: '3 days ago', icon: Activity },
                      { event: 'Feedback submitted', user: 'Michael Torres', time: '2 days ago', icon: MessageSquare },
                      { event: 'Interview scheduled', user: 'Emma Wilson', time: '4 days ago', icon: Clock },
                      { event: 'Application received', user: 'System', time: '1 week ago', icon: User },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#FEE9D1] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-[#F47920]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">{item.event}</p>
                          <p className="text-sm text-gray-600">{item.user} • {item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SLA Indicator System & Feedback Modal */}
          <div className="space-y-6">
            {/* SLA Status Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">SLA Status</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <div className="font-medium text-green-900">Within SLA</div>
                      <div className="text-xs text-green-700">3 days remaining</div>
                    </div>
                  </div>
                  <Star className="w-5 h-5 text-green-600" />
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-2">SLA Targets</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Round:</span>
                      <span className="font-medium text-gray-900">7 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-green-600">4 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Feedback Modal */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Feedback</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors text-sm">
                      Strong Yes
                    </button>
                    <button className="flex-1 py-2 px-3 border border-gray-200 rounded-lg hover:bg-[#FEF3E8] hover:border-[#FFC880] transition-colors text-sm">
                      Yes
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 py-2 px-3 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors text-sm">
                      Maybe
                    </button>
                    <button className="flex-1 py-2 px-3 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors text-sm">
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Comments</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47920] text-sm"
                    rows={3}
                    placeholder="Share your feedback..."
                  ></textarea>
                </div>

                <button className="w-full py-2 bg-[#F47920] text-white rounded-lg hover:bg-[#B85A10] transition-colors">
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {showScheduler && (
      <InterviewSchedulerModal candidateName="Sarah Chen" onClose={() => setShowScheduler(false)} />
    )}

    {actionToast && (
      <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        {actionToast}
      </div>
    )}
    </>
  );
}
