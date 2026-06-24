import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function FinalCTA() {
  const benefits = [
    'Free 14-day trial',
    'No credit card required',
    'Full feature access',
    'Setup in under 5 minutes'
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#7A3A08] to-purple-900"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F47920]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Turn Hiring Into a{' '}
            <span className="bg-gradient-to-r from-[#FFAA5B] to-purple-400 bg-clip-text text-transparent">
              Predictable Process
            </span>
          </h2>

          <p className="text-xl text-[#FEE9D1] mb-8 max-w-3xl mx-auto">
            Join modern recruiting teams who have eliminated hiring delays,
            increased visibility, and accelerated time-to-hire.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#F47920] rounded-xl hover:bg-[#FEF3E8] transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group"
            >
              <span className="font-semibold">Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Schedule Demo
            </motion.button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[#FEE9D1]">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-[#FCD5A8]">
              Trusted by 500+ recruiting teams at companies like Stripe, Linear, Notion, and more
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
