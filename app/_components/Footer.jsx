'use client';
import React from 'react';
import {
  Zap,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Globe,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-purple-500/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">THE TRIGGER</h3>
                <p className="text-purple-400 text-xs">Enter the Paradox</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              An extraordinary intellectual challenge where participants dive
              into mind-bending puzzles and thrilling mysteries.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-purple-950/50 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-900/50 hover:border-purple-500/50 transition-all"
              >
                <Instagram className="w-4 h-4 text-purple-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-purple-950/50 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-900/50 hover:border-purple-500/50 transition-all"
              >
                <Linkedin className="w-4 h-4 text-purple-300" />
              </a>
              <a
                href="https://modelclubbits.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-purple-950/50 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-900/50 hover:border-purple-500/50 transition-all"
              >
                <Globe className="w-4 h-4 text-purple-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-white/60 hover:text-purple-400 text-sm transition-colors"
                >
                  About Event
                </Link>
              </li>
              <li>
                <Link
                  href="/#eventflow"
                  className="text-white/60 hover:text-purple-400 text-sm transition-colors"
                >
                  Event Flow
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-white/60 hover:text-purple-400 text-sm transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-white/60 hover:text-purple-400 text-sm transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Event Details</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Globe className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 font-semibold">
                  Online Event
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60">BIT Sindri</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:modelclub.web@gmail.com"
                  className="text-white/60 hover:text-purple-400 transition-colors"
                >
                  modelclub.web@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60">+91 7004199068</span>
              </li>
            </ul>
          </div>

          {/* Model Club */}
          <div>
            <h4 className="text-white font-semibold mb-4">Organized By</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-purple-950/40 to-black/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
                <h5 className="text-purple-300 font-semibold mb-2">
                  Model Club
                </h5>
                <p className="text-white/60 text-sm mb-3">
                  BIT Sindri, Dhanbad
                </p>
                <a
                  href="https://modelclubbits.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/40 text-sm text-center md:text-left">
              © {currentYear} The Trigger: Enter the Paradox. All rights
              reserved.
            </p>

            {/* Created By */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">Created with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-white/40">by</span>
              <a
                href="https://modelclubbits.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Team Model Club
              </a>
            </div>

            {/* Links */}
            <div className="flex gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/40 hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
