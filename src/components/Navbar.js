'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, light = false }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-lg ${light ? 'bg-white text-slate-900' : 'bg-[#000a18] text-white'} rounded-3xl p-8 md:p-10 shadow-2xl z-[1001]`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-3xl font-bold tracking-tight ${light ? 'text-slate-900' : 'text-white'}`}>{title}</h2>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }} 
              className={`p-2 hover:bg-black/5 rounded-full ${light ? 'text-slate-400 hover:text-slate-600' : 'text-gray-400 hover:text-white'} transition-colors`}
            >
              <X size={24} />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    window.addEventListener('storage', checkAuth);
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
      
      scrollTimeout = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        
        const sections = ['stats', 'clients', 'edge', 'cat', 'how', 'faqs', 'testimonials'];
        let current = 'Home';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              const mapping = {
                'stats': 'Stats',
                'clients': 'Clients',
                'edge': 'Accredian Edge',
                'cat': 'CAT',
                'how': 'How It Works',
                'faqs': 'FAQs',
                'testimonials': 'Testimonials'
              };
              current = mapping[section] || current;
            }
          }
        }
        setActiveLink(current);
      });
    };

    const handleOpenLogin = () => setShowLogin(true);
    const handleOpenContact = () => setShowContact(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('open-login', handleOpenLogin);
    window.addEventListener('open-contact', handleOpenContact);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-login', handleOpenLogin);
      window.removeEventListener('open-contact', handleOpenContact);
      window.removeEventListener('auth-change', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Stats', href: '/#stats' },
    { name: 'Clients', href: '/#clients' },
    { name: 'Accredian Edge', href: '/#edge' },
    { name: 'CAT', href: '/#cat' },
    { name: 'How It Works', href: '/#how' },
    { name: 'FAQs', href: '/#faqs' },
    { name: 'Testimonials', href: '/#testimonials' },
  ];

  // Modal Form States
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [contactForm, setContactForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    domain: '', 
    candidates: '', 
    mode: '', 
    location: '' 
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [contactStatus, setContactStatus] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Forgot Password States
  const [resetFlow, setResetFlow] = useState('none'); // none, email, otp
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setShowLogin(false);
        window.dispatchEvent(new Event('auth-change'));
      } else {
        setAuthError(data.message || 'Login failed');
      }
    } catch (err) {
      setAuthError('Connection error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setResetError('');
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetFlow('otp');
      } else {
        setResetError(data.message);
      }
    } catch (err) {
      setResetError('Connection error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setResetError('');
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, otp: resetOtp, newPassword: resetPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetSuccess('Password reset successfully! You can now login.');
        setTimeout(() => {
          setResetFlow('none');
          setResetSuccess('');
        }, 3000);
      } else {
        setResetError(data.message);
      }
    } catch (err) {
      setResetError('Connection error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus(null);
    setAuthLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setContactStatus({ type: 'success', message: 'Message sent successfully!' });
        setContactForm({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => {
          setShowContact(false);
          setContactStatus(null);
        }, 2000);
      } else {
        setContactStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setContactStatus({ type: 'error', message: 'Connection error. Please try again.' });
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      <nav className="fixed w-full z-[100] top-0 px-4 pt-6 pointer-events-none">
        <motion.div 
          initial={false}
          animate={{
            y: scrolled ? 0 : -5,
          }}
          className="max-w-[1500px] mx-auto flex justify-between items-center relative pointer-events-auto transition-all duration-500 bg-black/40 backdrop-blur-2xl rounded-full py-2.5 px-6 lg:px-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20"
        >
          {/* Animated glowing border */}
          <div className={`absolute inset-0 rounded-full -z-10 p-[1px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-[gradient:4s_linear_infinite] transition-opacity duration-500 ${scrolled ? 'opacity-40' : 'opacity-20'}`} style={{ borderRadius: 'inherit' }}>
            <div className="w-full h-full bg-black rounded-full" style={{ borderRadius: 'inherit' }} />
          </div>
          {/* Top Shine/Glare */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full -z-5" />

          <div className="flex-shrink-0 relative z-[110]">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <span className="text-xl lg:text-2xl font-black tracking-tighter text-white">
                  ACCREDIAN<span className="text-blue-500">.</span>
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 transition-all duration-700 relative z-[110]">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`relative px-2 lg:px-4 py-2 text-[10px] lg:text-[11px] font-black tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${activeLink === link.name ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {activeLink === link.name && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-[2px]" />
                  </motion.div>
                )}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 relative z-[110]">
            {user ? (
              <div className="flex items-center space-x-4 relative">
                <div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px] cursor-pointer relative"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className="w-full h-full rounded-full bg-[#000a18] flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-lg">{user.name?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {showUserDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-[190]" 
                        onClick={() => setShowUserDropdown(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full mt-3 right-0 w-64 bg-[#000a18] border border-white/10 rounded-3xl p-6 shadow-2xl z-[200] backdrop-blur-xl"
                      >
                        <div className="mb-4 pb-4 border-b border-white/10">
                          <p className="text-white font-bold truncate">{user.name}</p>
                          <p className="text-gray-500 text-xs truncate">{user.email}</p>
                        </div>
                        <button 
                          onClick={() => {
                            handleLogout();
                            setShowUserDropdown(false);
                          }}
                          className="w-full flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors py-2 px-1"
                        >
                          <X size={16} />
                          <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="text-gray-300 hover:text-white text-xs lg:text-sm font-black uppercase tracking-widest transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowContact(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 lg:px-10 text-[10px] lg:text-[11px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                >
                  Enquire Now
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-2 relative z-[110]">
            {!isOpen && !user && (
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20"
              >
                Login
              </button>
            )}
            {user && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2.5 rounded-full bg-white/5 border border-white/10 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="xl:hidden mt-4 mx-auto max-w-sm bg-[#000a18]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl pointer-events-auto"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-6 py-4 text-sm font-black uppercase tracking-widest rounded-2xl transition-all ${activeLink === link.name ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-white/10 mt-4 flex flex-col space-y-4 px-2">
                  <Link 
                    href="/register" 
                    className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-center hover:bg-white/10 transition-all text-xs"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setShowContact(true);
                    }}
                    className="bg-blue-600 w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-xs"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Modal isOpen={showLogin} onClose={() => { setShowLogin(false); setResetFlow('none'); }} title={resetFlow === 'none' ? 'Sign In' : 'Reset Password'}>
        {resetFlow === 'none' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-4">
              <input 
                type="email" 
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none transition-all" 
              />
              <input 
                type="password" 
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Password" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none transition-all" 
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={() => setResetFlow('email')}
                className="text-xs text-blue-500 hover:underline font-bold"
              >
                Forgot Password?
              </button>
            </div>
            {authError && <p className="text-red-500 text-sm bg-red-500/10 py-3 rounded-xl border border-red-500/20 text-center">{authError}</p>}
            <button disabled={authLoading} className="btn-primary w-full !py-4 font-bold text-lg disabled:opacity-50">
              {authLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-gray-500 pt-4">
              Don't have an account? <Link href="/register" className="text-blue-500 font-black uppercase tracking-widest hover:underline" onClick={() => setShowLogin(false)}>Register</Link>
            </p>
          </form>
        ) : resetFlow === 'email' ? (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <p className="text-gray-400 text-sm">Enter your email to receive a password reset OTP.</p>
            <input 
              type="email" 
              required
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none transition-all" 
            />
            {resetError && <p className="text-red-500 text-sm bg-red-500/10 py-3 rounded-xl border border-red-500/20 text-center">{resetError}</p>}
            <button disabled={authLoading} className="btn-primary w-full !py-4 font-bold text-lg disabled:opacity-50">
              {authLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            <button 
              type="button"
              onClick={() => setResetFlow('none')}
              className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <p className="text-gray-400 text-sm">Enter the OTP sent to your email and your new password.</p>
            <div className="space-y-4">
              <input 
                type="text" 
                required
                value={resetOtp}
                onChange={(e) => setResetOtp(e.target.value)}
                placeholder="Enter 6-digit OTP" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none transition-all text-center tracking-[10px] font-bold" 
              />
              <input 
                type="password" 
                required
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                placeholder="New Password" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none transition-all" 
              />
            </div>
            {resetError && <p className="text-red-500 text-sm bg-red-500/10 py-3 rounded-xl border border-red-500/20 text-center">{resetError}</p>}
            {resetSuccess && <p className="text-green-500 text-sm bg-green-500/10 py-3 rounded-xl border border-green-500/20 text-center">{resetSuccess}</p>}
            <button disabled={authLoading} className="btn-primary w-full !py-4 font-bold text-lg disabled:opacity-50">
              {authLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </Modal>

      <Modal isOpen={showContact} onClose={() => setShowContact(false)} title="Enquire Now" light={true}>
        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <input 
                type="text" 
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                placeholder="Enter Name" 
                className="w-full bg-transparent border-b border-slate-200 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none transition-all" 
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                placeholder="Enter Email" 
                className="w-full bg-transparent border-b border-slate-200 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none transition-all" 
              />
            </div>
            <div className="flex items-center space-x-2 border-b border-slate-200 py-2.5">
              <div className="flex items-center space-x-1 pr-2 border-r border-slate-200">
                <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 h-auto" />
                <span className="text-slate-600 text-sm">▾</span>
                <span className="text-slate-800 text-sm">+91</span>
              </div>
              <input 
                type="tel" 
                required
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                placeholder="Mobile Number" 
                className="flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none" 
              />
            </div>
            <div className="relative">
              <input 
                type="text" 
                required
                value={contactForm.company}
                onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                placeholder="Enter company name" 
                className="w-full bg-transparent border-b border-slate-200 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none transition-all" 
              />
            </div>
            <div className="relative">
              <select 
                required
                value={contactForm.domain}
                onChange={(e) => setContactForm({...contactForm, domain: e.target.value})}
                className="w-full bg-transparent border-b border-slate-200 py-2.5 text-slate-800 appearance-none focus:border-blue-500 focus:outline-none transition-all"
              >
                <option value="" disabled>Select Domain</option>
                <option value="Data Science">Data Science</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Human Resource">Human Resource</option>
                <option value="Strategy & Leadership">Strategy & Leadership</option>
                <option value="General Management">General Management</option>
                <option value="Digital Transformation">Digital Transformation</option>
                <option value="Business Management">Business Management</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
            </div>
            <div className="relative">
              <input 
                type="number" 
                required
                value={contactForm.candidates}
                onChange={(e) => setContactForm({...contactForm, candidates: e.target.value})}
                placeholder="Enter No. of candidates" 
                className="w-full bg-transparent border-b border-slate-200 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none transition-all" 
              />
            </div>
            <div className="relative">
              <select 
                required
                value={contactForm.mode}
                onChange={(e) => setContactForm({...contactForm, mode: e.target.value})}
                className="w-full bg-transparent border-b border-slate-200 py-2.5 text-slate-800 appearance-none focus:border-blue-500 focus:outline-none transition-all"
              >
                <option value="" disabled>Select Mode of Delivery *</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
            </div>
            <div className="relative">
              <input 
                type="text" 
                required
                value={contactForm.location}
                onChange={(e) => setContactForm({...contactForm, location: e.target.value})}
                placeholder="Eg: Gurgaon, Delhi, India" 
                className="w-full bg-transparent border-b border-slate-200 py-2.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none transition-all" 
              />
            </div>
          </div>
          {contactStatus && (
            <p className={`text-sm text-center py-2 rounded-lg ${contactStatus.type === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
              {contactStatus.message}
            </p>
          )}
          <button disabled={authLoading} className="bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50">
            {authLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Navbar;
