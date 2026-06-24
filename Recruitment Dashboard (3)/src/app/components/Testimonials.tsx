import { Quote, Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Jessica Martinez',
      role: 'Senior Recruiter',
      company: 'TechCorp',
      image: 'JM',
      quote: 'PipelineHQ cut our time-to-hire by 40%. We finally have full visibility into where candidates are and what\'s blocking them.',
      rating: 5
    },
    {
      name: 'David Park',
      role: 'VP Engineering',
      company: 'InnovateLabs',
      image: 'DP',
      quote: 'The SLA tracking is a game-changer. No more candidates falling through the cracks. Our hiring process is now predictable and efficient.',
      rating: 5
    },
    {
      name: 'Rachel Foster',
      role: 'VP Talent',
      company: 'GrowthCo',
      image: 'RF',
      quote: 'Executive visibility into our hiring pipeline has transformed how we plan headcount. The analytics are exactly what leadership needs.',
      rating: 5
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Recruiting Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how teams are accelerating hiring and improving candidate experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#FEE9D1]" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F47920] to-purple-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
