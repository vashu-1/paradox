'use client';
import React, { useState } from 'react';
import RegisterPage from './_components/register';
import QuestionContainer from './_components/questions';
import CountdownTimer from './_components/CountdownTimer';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/app/provider';
import { AlertCircle, Clock, Award, X } from 'lucide-react';

const page = () => {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isEventClosed, setIsEventClosed] = useState(false);
  const context = useUser();
  const user = context?.user || null;

  const targetDate = '2025-12-28 18:00:00';
  const eventDurationHours = 1; // Event will be open for 2 hours after start
  const handleTimerEnd = () => {
    setIsTimerExpired(true);
  };

  const handleEventExpired = () => {
    setIsEventClosed(true);
  };

  const handleRegistrationSubmit = (data) => {
    setRegistrationData(data);
    setShowInstructions(true);
  };

  const startQuiz = () => {
    setShowInstructions(false);
    setStep(2);
  };

  const nextPage = () => {
    setShowInstructions(true);
  };

  // Show timer if not expired or show closed message if event ended
  if (!isTimerExpired || isEventClosed) {
    return (
      <CountdownTimer
        targetDate={targetDate}
        eventDurationHours={eventDurationHours}
        onTimerEnd={handleTimerEnd}
        onEventExpired={handleEventExpired}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900">
      {/* Progress Bar Section - Only show on step 1 */}
      {step === 1 && (
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-purple-500/20">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-3">
              {/* Step Indicator */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                      step >= 1
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-purple-950/50 border-purple-500/30 text-purple-400'
                    }`}
                  >
                    1
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= 1 ? 'text-white' : 'text-purple-400'
                    }`}
                  >
                    Registration
                  </span>
                </div>

                <div className="flex-1 h-0.5 bg-purple-500/20 mx-4">
                  <div
                    className={`h-full transition-all duration-500 ${
                      step >= 2
                        ? 'bg-purple-500 w-full'
                        : 'bg-purple-500/50 w-0'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                      step >= 2
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-purple-950/50 border-purple-500/30 text-purple-400'
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= 2 ? 'text-white' : 'text-purple-400'
                    }`}
                  >
                    Quiz Questions
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-purple-300">
                  <span>Step {step} of 2</span>
                  <span>{step * 50}% Complete</span>
                </div>
                <Progress
                  value={step * 50}
                  className="h-2 bg-purple-950/50 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-purple-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div>
        {step === 1
          ? user && (
              <RegisterPage
                GoToNext={() => nextPage()}
                onDataSubmit={handleRegistrationSubmit}
              />
            )
          : step === 2
          ? user && <QuestionContainer userData={registrationData} />
          : null}
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-gradient-to-br from-purple-950/95 to-black/95 backdrop-blur-xl rounded-2xl border-2 border-purple-500/30 p-4 sm:p-6 md:p-8 max-w-2xl w-full shadow-2xl shadow-purple-500/20 animate-in fade-in zoom-in duration-300 my-8">
            {/* Close Button */}
            <button
              onClick={startQuiz}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
            </button>

            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 mb-3 sm:mb-4">
                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-2">
                Quiz Instructions
              </h2>
              <p className="text-sm sm:text-base text-purple-300">
                Please read carefully before starting
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    Time Limit: 5 Minutes
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-300">
                    You have exactly 5 minutes to complete all 20 questions. The
                    quiz will auto-submit when time runs out.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    Total Questions: 20
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-300">
                    All questions are interconnected puzzles. Each answer leads
                    to the next question.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    Important Rules
                  </h3>
                  <ul className="text-xs sm:text-sm text-purple-300 space-y-1 list-disc list-inside">
                    <li>Answer all questions to submit the quiz</li>
                    <li>You cannot go back once submitted</li>
                    <li>No external resources or help allowed</li>
                    <li>Do not refresh the page after registration.</li>
                    <li>You cannot attempt the quiz after submitting.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startQuiz}
              className="w-full group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-purple-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                <span className="hidden sm:inline">
                  I Understand, Start Quiz
                </span>
                <span className="sm:hidden">Start Quiz</span>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </button>

            <p className="text-center text-xs sm:text-sm text-purple-400 mt-3 sm:mt-4">
              Click the button to begin
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
