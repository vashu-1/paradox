'use client';
import React, { useState } from 'react';
import { supabase } from '../../../Services/SupabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Building2,
  Calendar,
  IdCard,
  CheckCircle,
} from 'lucide-react';

const RegisterPage = ({ GoToNext, onDataSubmit }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    batch: '',
    registrationNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate all fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.branch ||
        !formData.batch ||
        !formData.registrationNumber
      ) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('Please sign in first');
        setLoading(false);
        return;
      }

      // Insert registration data
      const { data, error: insertError } = await supabase
        .from('userInfo')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            branch: formData.branch,
            batch: formData.batch,
            registrationNumber: formData.registrationNumber,
            user_id: user.id,
          },
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setLoading(false);

      // Pass form data to parent
      if (onDataSubmit) {
        onDataSubmit(formData);
      }

      // Show success toast
      toast.success('Registration Successful!', {
        description: 'Redirecting to quiz questions...',
        duration: 2000,
      });

      // Move to next step after toast
      setTimeout(() => {
        if (GoToNext) {
          GoToNext();
        } else {
          router.push('/');
        }
      }, 2000);
      // });
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative pt-20 pb-10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-gradient-to-b from-purple-950/40 to-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
                Event Registration
              </span>
            </h1>
            <p className="text-purple-300 text-xs sm:text-sm uppercase tracking-wider">
              The Trigger
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Branch *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-purple-400" />
                </div>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-black">
                    Select your branch
                  </option>
                  <option value="Computer Science" className="bg-black">
                    Computer Science
                  </option>
                  <option value="Cyber Security" className="bg-black">
                    Computer Science with cyber security
                  </option>
                  <option value="Information Technology" className="bg-black">
                    Information Technology
                  </option>
                  <option value="ECE" className="bg-black">
                    ECE
                  </option>
                  <option value="Electrical" className="bg-black">
                    Electrical
                  </option>
                  <option value="Mechanical" className="bg-black">
                    Mechanical
                  </option>
                  <option value="Metallurgy" className="bg-black">
                    Metallurgy
                  </option>
                  <option value="Mining" className="bg-black">
                    Mining
                  </option>
                  <option value="Civil" className="bg-black">
                    Civil
                  </option>
                  <option value="Chemical" className="bg-black">
                    Chemical
                  </option>
                  <option value="Production" className="bg-black">
                    Production
                  </option>
                </select>
              </div>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Batch *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="e.g., 2023-2027"
                  required
                />
              </div>
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Registration Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdCard className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your registration number"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/50 overflow-hidden"
            >
              <span className="relative z-10">
                {loading ? 'Submitting...' : 'Complete Registration'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Back Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/')}
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
