'use client';
import React from 'react';
import {
  CheckCircle,
  Zap,
  Target,
  Trophy,
  Clock,
  Users,
  Brain,
  Sparkles,
} from 'lucide-react';

const EventFlow = () => {
  const rounds = [
    {
      number: 1,
      title: 'Round 1: The Trigger',

      description:
        'Begin your journey with mind-bending riddles and logical challenges. Test your pattern recognition, critical thinking, and problem-solving abilities with a variety of brain teasers.',
      duration: '5 minutes',
      participants: 'All Participants',
      icon: <Zap className="w-12 h-12" />,
      color: 'from-purple-600 to-purple-800',
      features: [
        'Logic riddles with option',
        'Word association puzzles',
        'Top 30 performers advance to next round',
      ],
    },
    {
      number: 2,
      title: 'Round 2: The Hidden Transmission',
      description:
        'Agents who make it through will receive a classified email containing encrypted data, secret links, and hidden coordinates. Clues may lurk in attachments, metadata, or URLs — you’ll need keen eyes and sharper minds to decode the digital maze. Only the best codebreakers will find the real message buried in the noise and move on to the final showdown. ',
      duration: '15 minutes',
      participants: 'Shortlisted Participants',
      icon: <Target className="w-12 h-12" />,
      color: 'from-purple-700 to-purple-900',
      features: [
        'Logic-based challenges',
        'Multi-layered logic puzzles',
        'Time-sensitive problem solving',
        'Best 10 performers proceed to Final Round',
      ],
    },
    {
      number: 3,
      title: 'Round 3: The Final Breach',
      subtitle: 'Real-World Application',
      description:
        'Present innovative solutions to complex real-world problems. Showcase your analytical thinking, creativity, and presentation skills in this final challenge.',
      duration: '60 minutes',
      participants: 'Finalists',
      icon: <Brain className="w-12 h-12" />,
      color: 'from-purple-800 to-purple-950',
      features: [
        'Industry-relevant case studies',
        'Individual solution development',
        'The top 3 participants will be declared the final winners',
        'The top contestant will earn the title of Master of Cipher.',
      ],
    },
  ];

  return (
    <section id="eventflow" className="relative py-20 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"></div>
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
              Event Structure
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
              Event Flow
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Navigate through three challenging rounds designed to test your
            knowledge, skills, and creativity
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {rounds.map((round, index) => (
            <div key={round.number} className="relative mb-12 last:mb-0">
              {/* Connecting Line */}
              {index < rounds.length - 1 && (
                <div className="absolute left-8 top-32 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent hidden lg:block" />
              )}

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Round Number Badge */}
                <div className="lg:col-span-2 flex lg:justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                    <div
                      className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${round.color} flex items-center justify-center shadow-lg shadow-purple-500/50 border-2 border-purple-400/30`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {round.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Round Content */}
                <div className="lg:col-span-10">
                  <div className="bg-gradient-to-br from-purple-950/40 to-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`p-4 bg-gradient-to-br ${round.color} rounded-xl text-white group-hover:scale-110 transition-transform`}
                        >
                          {round.icon}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                            {round.title}
                          </h3>

                          <div className="flex gap-3">
                            <div className="px-3 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full flex items-center gap-2">
                              <Clock className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-200 text-sm">
                                {round.duration}
                              </span>
                            </div>
                            <div className="px-3 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-200 text-sm">
                                {round.participants}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-white/70 text-lg mb-6 leading-relaxed">
                          {round.description}
                        </p>

                        {/* Features */}
                        <div className="grid sm:grid-cols-2 gap-3">
                          {round.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                              <span className="text-white/80 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Prize Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-400" />
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300 mb-4">
              Grand Finale
            </h3>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Top 3 contestants will be awarded with exciting prizes,
              certificates, and the glory of conquering "Master of Cipher"!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <span className="text-yellow-400 font-bold text-lg">
                  🥇 1st Place
                </span>
              </div>
              <div className="px-6 py-3 bg-gray-400/20 border border-gray-400/30 rounded-lg">
                <span className="text-gray-300 font-bold text-lg">
                  🥈 2nd Place
                </span>
              </div>
              <div className="px-6 py-3 bg-orange-600/20 border border-orange-600/30 rounded-lg">
                <span className="text-orange-400 font-bold text-lg">
                  🥉 3rd Place
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventFlow;
