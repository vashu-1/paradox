'use client';
import React from 'react';
import { Zap, Users, Trophy, Clock, Target, Sparkles } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Mind-Bending Challenges',
      description:
        'Solve riddles that will test your logic and creativity to the limit.',
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
        <div className="text-center mb-16" data-aos="fade-up">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              What is CipherX?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Welcome to CipherX, an online treasure hunt where you solve clues,
            crack codes, and follow hidden trails to reach the final answer.
            This is a solo participation event, so every puzzle you solve and
            every step you take depends entirely on your own skills and
            instincts. Across three rounds, you will face fun, tricky, and
            carefully designed puzzles that test your thinking, creativity, and
            problem-solving abilities. Each clue you solve will lead you to the
            next one, becoming a bit more challenging as you progress. Along the
            way, you may discover hidden patterns, digital secrets, and
            unexpected twists that will push you to think differently. Only the
            best codebreakers will reach the final round and earn the title of
            The Master of Cipher. With every step, you move closer to uncovering
            the mystery that lies at the core of CipherX. Are you ready to begin
            the hunt and prove your skills? Let the adventure begin!
          </p>
        </div>

        {/* Main Description */}
        <div
          className="max-w-4xl mx-auto mb-20"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="bg-gradient-to-br from-purple-950/40 to-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 mb-6">
              The Trigger
            </h3>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              The operation begins with a rapid series of advanced riddles,
              logical traps, and pattern-based challenges. Every answer unlocks
              a piece of the bigger picture — but beware, not every clue is what
              it seems. Top performers will advance to the next phase of the
              mission — where mystery meets misdirection.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              Only Top 30 individuals will move to the second round of the
              event.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              Join us on{' '}
              <span className="text-purple-400 font-semibold">
                December 29, 2025
              </span>
              , and prove that you have what it takes to conquer the trigger and
              emerge victorious!
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
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

        {/* Timeline */}
        <div id="timeline" className="mt-20">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-purple-300 text-sm font-medium">
                Event Timeline
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                Timeline
              </span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
              Mark your calendars for these important milestones
            </p>
          </div>

          <div
            className="max-w-2xl mx-auto"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <img
              src="/timeline.png"
              alt="Event Timeline"
              className="w-full h-[90vh] object-contain rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-900/50 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
