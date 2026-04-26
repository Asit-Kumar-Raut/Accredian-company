'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Brain, Users, BarChart3, Settings, Globe, CreditCard } from 'lucide-react';

const DomainExpertise = () => {
  const domains = [
    { name: 'Product & Innovation Hub', icon: <Lightbulb size={32} /> },
    { name: 'Gen-AI Mastery', icon: <Brain size={32} /> },
    { name: 'Leadership Elevation', icon: <Users size={32} /> },
    { name: 'Tech & Data Insights', icon: <BarChart3 size={32} /> },
    { name: 'Operations Excellence', icon: <Settings size={32} /> },
    { name: 'Digital Enterprise', icon: <Globe size={32} /> },
    { name: 'Fintech Innovation Lab', icon: <CreditCard size={32} /> },
  ];

  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Our <span className="text-blue-500">Domain Expertise</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Specialized Programs Designed to Fuel Innovation across various sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group cursor-pointer"
            >
              <div className="text-blue-500 mb-4 transition-transform duration-300 group-hover:scale-110">
                {domain.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{domain.name}</h3>
              <p className="text-gray-400 text-sm">
                Mastering the core principles and advanced strategies in {domain.name.toLowerCase()}.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainExpertise;
