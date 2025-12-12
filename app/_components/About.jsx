'use client';
import React from 'react';
import { Zap, Users, Trophy, Clock, Target, Sparkles } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Mind-Bending Challenges',
      description:
        'Solve paradoxes and riddles that will test your logic and creativity to the limit.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Solo Competition',
      description: 'Compete solo in this thrilling intellectual adventure.',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Exciting Prizes',
      description:
        'Win amazing rewards and recognition for cracking the most complex challenges.',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Time-Based Rounds',
      description:
        'Race against time as you navigate through multiple rounds of increasing difficulty.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Skill Development',
      description:
        'Enhance your problem-solving, critical thinking, and analytical abilities.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Unique Experience',
      description:
        'An unforgettable event that combines entertainment with intellectual stimulation.',
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-purple-300 text-sm font-medium">
              About The Event
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
              What is THE TRIGGER?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The Trigger: Enter the Paradox is an extraordinary intellectual
            challenge where participants dive into a world of mind-bending
            puzzles, logical paradoxes, and thrilling mysteries. Are you ready
            to challenge reality itself?
          </p>
        </div>

        {/* Main Description */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-purple-950/40 to-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 mb-6">
              The Ultimate Mental Challenge
            </h3>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              Step into a dimension where logic defies itself and reality bends
              at your command. The Trigger is not just an event—it's a journey
              through paradoxes that will test your intellect, creativity, and
              determination.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              Each round presents increasingly complex challenges that require
              innovative thinking and sharp individual problem-solving skills.
              Whether you're a puzzle enthusiast, a logic lover, or simply
              seeking an unforgettable experience, The Trigger welcomes all who
              dare to enter.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              Join us on{' '}
              <span className="text-purple-400 font-semibold">
                December 13, 2025
              </span>
              , and prove that you have what it takes to conquer the paradox and
              emerge victorious!
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-purple-950/30 to-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600/20 rounded-lg text-purple-400 group-hover:bg-purple-600/30 group-hover:text-purple-300 transition-all">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
