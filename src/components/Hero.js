'use client';

import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  const features = [
    'Tailored Solutions',
    'Industry Insights',
    'Expert Guidance'
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-[3rem] p-8 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Content Left */}
          <div className="flex-1 z-10 text-left">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-slate-900"
            >
              Next-Gen <span className="text-blue-600">Expertise</span><br />
              For Your <span className="text-blue-500">Enterprise</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg font-medium"
            >
              Cultivate high-performance teams through expert learning. Specialized programs designed to fuel innovation and drive results.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 mb-12"
            >
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-3 text-slate-700">
                  <div className="bg-green-100 p-1 rounded-full">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3 group"
              >
                <span>Enquire Now</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Image Right */}
          <div className="flex-1 relative w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative z-10"
            >
              <img 
                src="/assets/hero-team.png" 
                alt="Expert Team"
                className="w-full h-auto object-cover rounded-[2rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
              />
            </motion.div>
            
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 blur-[100px] -z-10 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Page background orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Hero;
