'use client';
import React, { useState } from 'react';
import { supabase } from '../../Services/SupabaseClient';
import { useRouter } from 'next/navigation';
import { useUser } from '../provider';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if this is modelclub account
      const isModelClubAccount = data.user.email === 'modelclub@gmail.com';

      if (isModelClubAccount) {
        // Handle modelclub account - use modelInfo table
        let { data: existingModelUser, error: modelFetchError } = await supabase
          .from('modelInfo')
          .select('*')
          .eq('email', data.user.email)
          .single();

        // If user doesn't exist in modelInfo, insert them
        if (modelFetchError && modelFetchError.code === 'PGRST116') {
          const { data: newModelUser, error: modelInsertError } = await supabase
            .from('modelInfo')
            .insert([
              {
                email: data.user.email,
                name:
                  data.user.user_metadata?.name ||
                  data.user.email.split('@')[0],
              },
            ])
            .select()
            .single();

          if (modelInsertError) {
            console.error('ModelInfo insert failed:', modelInsertError);
            throw modelInsertError;
          }

          // Save to context with isModelClub flag
          setUser({ ...newModelUser, isModelClub: true });
        } else if (modelFetchError) {
          console.error('ModelInfo fetch error:', modelFetchError);
          throw new Error('Database error: ' + modelFetchError.message);
        } else if (existingModelUser) {
          // Save existing modelclub user to context
          setUser({ ...existingModelUser, isModelClub: true });
        }
      } else {
        // Handle regular users - use Users table
        let { data: existingUser, error: fetchError } = await supabase
          .from('Users')
          .select('*')
          .eq('email', data.user.email)
          .single();

        // If user doesn't exist, insert them
        if (fetchError && fetchError.code === 'PGRST116') {
          const { data: newUser, error: insertError } = await supabase
            .from('Users')
            .insert([
              {
                email: data.user.email,
                name:
                  data.user.user_metadata?.name ||
                  data.user.email.split('@')[0],
              },
            ])
            .select()
            .single();

          if (insertError) {
            console.error('Database insert failed:', insertError);
            throw insertError;
          }

          // Save to context
          setUser({ ...newUser, isModelClub: false });
        } else if (fetchError) {
          // Handle other fetch errors
          console.error('Database fetch error:', fetchError);
          throw new Error('Database error: ' + fetchError.message);
        } else if (existingUser) {
          // Save existing user to context
          setUser({ ...existingUser, isModelClub: false });
        }
      }

      // Redirect on success
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-20 animate-bounce delay-500">
        <svg
          className="w-16 h-16 text-purple-500/20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 animate-pulse">
        <svg
          className="w-12 h-12 text-purple-400/20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <div className="absolute top-1/3 left-20 animate-spin slow-spin">
        <svg
          className="w-8 h-8 text-purple-600/20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-4 grid lg:grid-cols-2 gap-8 items-center px-4 lg:px-8">
        {/* Left Side - Branding and Graphics */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
          {/* Large Logo/Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-3xl"></div>
            <svg
              className="relative w-64 h-64 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M12 6v12M6 12h12"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                strokeWidth={1}
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Event Info */}
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-purple-400">
                CipherX
              </span>
            </h2>
            <p className="text-2xl text-purple-300 font-semibold">
              The Hunt Beyond Logic
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
              <span className="text-purple-400 text-sm">January 3, 2026</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-purple-950/50 border border-purple-500/30 rounded-lg">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-purple-300 text-xs">Fast Access</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-purple-950/50 border border-purple-500/30 rounded-lg">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-purple-300 text-xs">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-purple-950/50 border border-purple-500/30 rounded-lg">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <span className="text-purple-300 text-xs">Exclusive</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-gradient-to-b from-purple-950/40 to-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 lg:p-10 shadow-2xl">
            {/* Logo/Title Section for mobile */}
            <div className="text-center mb-8 lg:hidden">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
                  CipherX
                </span>
              </h1>
              <p className="text-purple-300 text-sm uppercase tracking-wider">
                The Hunt Beyond Logic
              </p>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <svg
                    className="w-12 h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-white/60">
                Sign in to access the event portal
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-300">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-purple-400/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-purple-950/30 border border-purple-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-purple-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-purple-400/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3 bg-purple-950/30 border border-purple-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Security Badge */}
            <div className="mt-6 p-4 bg-purple-950/30 border border-purple-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <div>
                  <p className="text-purple-300 text-sm font-semibold">
                    Secure Authentication
                  </p>
                  <p className="text-white/40 text-xs">
                    Your data is protected and encrypted
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <p className="text-center text-white/40 text-sm">
                By signing in, you agree to our Terms of Service
              </p>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/')}
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-2 mx-auto"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .slow-spin {
          animation: slow-spin 20s linear infinite;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
