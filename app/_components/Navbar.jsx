'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '../provider';
import { Menu, X, Zap, Calendar, Trophy, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/Services/SupabaseClient';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const context = useUser();
  const user = context?.user || null;
  console.log(user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    context?.setUser(null);
    router.push('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-purple-500/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div>
              <Image
                src="/logo.png"
                alt="Logo"
                height={100}
                width={100}
                className="h-15 w-15 object-contain transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#about"
              className="px-4 py-2 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/#eventflow"
              className="px-4 py-2 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Event Flow
            </Link>

            <Link
              href="/#footer"
              className="px-4 py-2 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Side - Auth */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="cursor-pointer"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-purple-300 bg-purple-900/50 rounded-full">
                      {user.email?.[0]?.toUpperCase() ||
                        user.name?.[0]?.toUpperCase() ||
                        'U'}
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl shadow-purple-500/20 overflow-hidden z-50">
                    <Link
                      href="/event"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-purple-200 hover:bg-purple-900/50 hover:text-white transition-all"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Event
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth" className="hidden md:block">
                <button className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Sign In
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg bg-purple-950/50 border border-purple-500/30 hover:border-purple-500/50 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-purple-300" />
              ) : (
                <Menu className="h-6 w-6 text-purple-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-purple-500/20 py-4 md:hidden">
            <div className="flex flex-col space-y-2">
              <Link
                href="/#about"
                className="px-4 py-3 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#eventflow"
                className="px-4 py-3 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition-all flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar className="w-4 h-4" />
                Event Flow
              </Link>
              <Link
                href="/#footer"
                className="px-4 py-3 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition-all flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Trophy className="w-4 h-4" />
                Contact
              </Link>
              {user && (
                <>
                  <Link
                    href="/contact"
                    className="px-4 py-3 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>

                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all text-left flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              )}
              {!user && (
                <Link
                  href="/auth"
                  className="mx-4 mt-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all text-center flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Zap className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
