'use client';
// Build trigger: 2026-04-26

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DomainExpertise from '@/components/DomainExpertise';
import AccredianEdge from '@/components/AccredianEdge';
import CourseSegmentation from '@/components/CourseSegmentation';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Background3D from '@/components/Background3D';

export default function Home() {
  return (
    <main className="relative">
      <Background3D />
      <Navbar />
      <Hero />
      <DomainExpertise />
      <AccredianEdge />
      <CourseSegmentation />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
