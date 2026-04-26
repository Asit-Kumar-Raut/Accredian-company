'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'ADP',
      text: 'We would like to thank Accredian for the wonderful support and the beautiful journey. The team turned our vision into reality with unparalleled dedication.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/ADP_logo.svg'
    },
    {
      name: 'Bayer',
      text: "Accredian's commitment to excellence is unmatched. They consistently go the extra mile to ensure our needs are met and exceeded.",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Bayer_logo.svg'
    }
  ];

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Testimonials from <span className="text-blue-500">Our Partners</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card relative group"
            >
              <div className="absolute top-6 right-8 text-blue-500 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote size={48} />
              </div>
              <div className="flex items-center mb-6">
                <div className="h-12 bg-white/10 rounded-lg p-2 flex items-center justify-center">
                  <img src={t.logo} alt={t.name} className="h-full object-contain brightness-0 invert" />
                </div>
              </div>
              <p className="text-gray-300 text-lg italic leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
