'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  // Event date and time - December 13, 2024
  const eventDate = new Date('2025-12-27T20:00:00');
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatEventDateTime = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return eventDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid overlay */}
      <div className="bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Content */}
      <div className="relative z-10 mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
            CipherX
          </span>
        </h1>

        {/* Subtitle */}
        <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400">
            The Hunt Beyond Logic
          </span>
        </div>

        {/* Event Description */}
        <p className="text-white/80 text-md sm:text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          Prepare to challenge reality. A journey beyond the ordinary awaits
          those brave enough to step through the portal.
        </p>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/40 to-purple-900/40 backdrop-blur-md rounded-2xl border border-purple-500/30 p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-purple-300 text-sm uppercase tracking-wider font-semibold">
                Event Countdown
              </span>
            </div>

            {/* Timer Display */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-4 min-w-[80px] sm:min-w-[100px]">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-purple-300 text-xs sm:text-sm mt-2 uppercase tracking-wider">
                  Days
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-4 min-w-[80px] sm:min-w-[100px]">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-purple-300 text-xs sm:text-sm mt-2 uppercase tracking-wider">
                  Hours
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-4 min-w-[80px] sm:min-w-[100px]">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-purple-300 text-xs sm:text-sm mt-2 uppercase tracking-wider">
                  Minutes
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-4 min-w-[80px] sm:min-w-[100px]">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-purple-300 text-xs sm:text-sm mt-2 uppercase tracking-wider">
                  Seconds
                </span>
              </div>
            </div>

            {/* Event Date */}
            <time className="text-lg sm:text-xl font-semibold text-purple-200">
              {formatEventDateTime()}
            </time>
          </div>
        </div>

        {/* Google Login Warning */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-amber-900/40 via-amber-800/40 to-amber-900/40 backdrop-blur-md rounded-xl border-2 border-amber-500/40 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-amber-300 font-bold text-lg mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Important: Login Required
                </h3>
                <p className="text-amber-100/90 text-sm leading-relaxed mb-2">
                  Please make sure you are{' '}
                  <span className="font-bold text-amber-200">
                    logged in with Google
                  </span>{' '}
                  before entering the event. Authentication is mandatory for
                  registration and quiz participation.
                </p>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-3">
                  <p className="text-amber-200/90 text-xs font-medium">
                    ⚠️ Without Google login, the event registration and quiz
                    will not work properly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              router.push('/event');
            }}
            className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Enter the Event</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-purple-950/30 backdrop-blur-sm">
            Learn More
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
