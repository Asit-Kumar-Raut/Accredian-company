'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('register'); // register, verify
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('verify');
        setMessage('OTP sent to your email!');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        // Upon verification, we could potentially log them in directly
        const user = { name: formData.name, email: formData.email };
        localStorage.setItem('user', JSON.stringify(user));
        window.dispatchEvent(new Event('auth-change'));
        
        setMessage('Account verified! Redirecting to home...');
        setTimeout(() => window.location.href = '/', 2000);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center px-4 py-20 relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl"
      >
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block mb-8">
            <span className="text-3xl font-black tracking-tighter text-white">
              ACCREDIAN<span className="text-blue-500">.</span>
            </span>
          </Link>
          <h1 className="text-4xl font-bold mb-2">{step === 'register' ? 'Create Account' : 'Verify Email'}</h1>
          <p className="text-gray-400">
            {step === 'register' ? 'Join Accredian and start your learning journey.' : `Enter the 6-digit code sent to ${formData.email}`}
          </p>
        </div>

        {step === 'register' ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <input type="text" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="email" required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input type="password" required placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button disabled={loading} className="btn-primary w-full !py-4 font-bold text-lg">
              {loading ? 'Sending OTP...' : 'Register'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-4">
              <input 
                type="text" 
                maxLength="6" 
                required 
                placeholder="######" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-center text-4xl font-bold tracking-[1rem] text-white focus:border-blue-500 focus:outline-none" 
                onChange={(e) => setOtp(e.target.value)} 
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-500 text-sm text-center">{message}</p>}
            <button disabled={loading} className="btn-primary w-full !py-4 font-bold text-lg">
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            <button type="button" onClick={() => setStep('register')} className="w-full text-gray-500 text-sm hover:text-white transition-colors">
              Change Email
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-500 font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
