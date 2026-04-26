'use client';

import { motion } from 'framer-motion';
import { Target, Cpu, Layers, Workflow, BarChart, Rocket } from 'lucide-react';

const AccredianEdge = () => {
  const steps = [
    { title: 'Tailored Solutions', desc: 'Programs customized to your organization goals.', icon: <Target /> },
    { title: 'Innovative Framework', desc: 'Proprietary methods for impactful results.', icon: <Layers /> },
    { title: 'Diverse Offerings', desc: 'Courses across industries and skill levels.', icon: <Cpu /> },
    { title: 'Flexible Delivery', desc: 'Online and offline options tailored to needs.', icon: <Workflow /> },
    { title: 'Advanced Tech', desc: 'State-of-the-art LMS for seamless learning.', icon: <BarChart /> },
    { title: 'Proven Impact', desc: 'Trusted by leading organizations for ROI.', icon: <Rocket /> },
  ];

  return (
    <section id="edge" className="py-24 bg-blue-900/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title">The <span className="text-blue-500">Accredian Edge</span></h2>
          <p className="text-gray-400 text-lg">Key Aspects of Our Strategic Training</p>
        </motion.div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccredianEdge;
