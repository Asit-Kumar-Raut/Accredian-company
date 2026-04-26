'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: 'What types of corporate training programs does Accredian offer?',
      answer: 'Accredian offers a wide range of programs including Data Science, AI, Product Management, Leadership, and Digital Transformation tailored for enterprise needs.'
    },
    {
      question: 'What domain specializations are available?',
      answer: 'We specialize in Fintech, Healthcare, E-commerce, Manufacturing, and more, ensuring industry-relevant training.'
    },
    {
      question: 'How do you measure the ROI of your training programs?',
      answer: 'We use advanced assessment tools and project-based learning to track skill acquisition and business impact.'
    }
  ];

  return (
    <section id="faqs" className="py-24 bg-blue-900/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Frequently Asked <span className="text-blue-500">Questions</span></h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card !p-0 overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-white">{faq.question}</span>
                <ChevronDown 
                  className={`text-blue-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
