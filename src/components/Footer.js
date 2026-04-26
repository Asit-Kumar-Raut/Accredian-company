'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LinkedinIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const TwitterIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2-1.7 3c1.2 0 2.4-.4 2.4-.4-.6 1-1.6 1.8-2.6 2.3.1 5.8-4.4 11.2-10.7 11.2-1.9 0-3.6-.5-5-1.5 1.1.1 2.2-.2 3.1-.9-1.5-.1-2.8-1.1-3.2-2.5.2.1.4.1.6.1.3 0 .6 0 .9-.1-1.6-.3-2.8-1.7-2.8-3.4 0 0 .5.3 1 .3-1-.7-1.7-1.8-1.7-3 0-.6.2-1.2.5-1.7 1.7 2.1 4.2 3.5 7 3.6 0-.3-.1-.5-.1-.8 0-1.9 1.5-3.5 3.5-3.5 1 0 1.9.4 2.5 1 .8-.1 1.6-.4 2.3-.8-.3.9-1 1.5-1.7 1.9.7-.1 1.4-.3 2.1-.6-.5.7-1.1 1.3-1.8 1.8z"/></svg>
);
const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const YoutubeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.03 103.03 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.03 103.03 0 0 1-15 0 2 2 0 0 1-2-2z"/><path d="m10 15 5-3-5-3z"/></svg>
);

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-xl border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-black tracking-tighter text-white">
                ACCREDIAN<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Accredian is a leading provider of high-impact training programs for enterprises and professionals. Our mission is to fuel innovation through expert learning.
            </p>
            <div className="flex space-x-4">
              {[FacebookIcon, LinkedinIcon, TwitterIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon size={18} width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Accredian</h4>
            <ul className="space-y-4">
              {['About', 'Blog', 'Why Accredian', 'Careers'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Corporate Training', 'LMS Solutions', 'Strategic Consulting', 'Talent Pipeline'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="text-blue-500 w-5 h-5 shrink-0" />
                <span className="text-gray-400 text-sm">enterprise@accredian.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="text-blue-500 w-5 h-5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  4th Floor, 250, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana
                </span>
              </li>
            </ul>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              className="mt-8 btn-primary !py-2 !px-6 text-sm"
            >
              Enquire Now
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">
            © 2026 Accredian. A Brand of FullStack Education Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
