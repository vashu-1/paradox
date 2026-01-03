'use client';
import React, { useState, useEffect } from 'react';
import questions from './Constant';
import { Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/app/provider';
import { useRouter } from 'next/navigation';
import { supabase } from '@/Services/SupabaseClient';
import Image from 'next/image';

const QuestionContainer = ({ userData }) => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 5 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionId] = useState(() => {
    // Generate or retrieve session ID
    let currentSessionId = sessionStorage.getItem('quizSessionId');
    if (!currentSessionId) {
      currentSessionId = Date.now().toString();
      sessionStorage.setItem('quizSessionId', currentSessionId);
      // Clear old localStorage data when new session starts
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('quizTimeLeft');
      localStorage.removeItem('quizIsSubmitted');
    }
    return currentSessionId;
  });
  const context = useUser();
  const user = context?.user || null;
  const router = useRouter();

  // Load saved data from localStorage on mount (only for current session)
  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    const savedTimeLeft = localStorage.getItem('quizTimeLeft');
    const savedIsSubmitted = localStorage.getItem('quizIsSubmitted');

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedTimeLeft && parseInt(savedTimeLeft) < 600) {
      setTimeLeft(parseInt(savedTimeLeft));
    }
    if (savedIsSubmitted === 'true') {
      setIsSubmitted(true);
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  // Save timeLeft to localStorage whenever it changes
  useEffect(() => {
    if (timeLeft < 600) {
      localStorage.setItem('quizTimeLeft', timeLeft.toString());
    }
  }, [timeLeft]);

  // Save submission status to localStorage
  useEffect(() => {
    localStorage.setItem('quizIsSubmitted', isSubmitted.toString());
  }, [isSubmitted]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;

    setIsSubmitted(true);

    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    try {
      // Get current user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        toast.error('User not authenticated');
        return;
      }

      // Determine which score table to use
      const isModelClub =
        user?.isModelClub || authUser.email === 'modelclub@gmail.com';
      const scoreTable = isModelClub ? 'modelScore' : 'round2score';

      // Insert score and user data into appropriate Supabase table
      const { data, error } = await supabase
        .from(scoreTable)
        .insert([
          {
            user_id: authUser.id,
            name: userData?.name || user?.Name || user?.name,

            branch: userData?.branch,
            batch: userData?.batch,
            registrationNumber: userData?.registrationNumber,
            score: score,

            answers: JSON.stringify(answers),
            time_taken: 600 - timeLeft, // Time taken in seconds
          },
        ])
        .select();

      if (error) {
        console.error('Error saving results:', error);
        toast.error('Failed to save results');
        return;
      }

      console.log('Results saved to', scoreTable, ':', data);
      toast.success(
        `Thanks for participating, ${
          userData?.name || user?.Name || user?.name
        }!`
      );

      // Clear localStorage and sessionStorage after successful submission
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('quizTimeLeft');
      localStorage.removeItem('quizIsSubmitted');
      sessionStorage.removeItem('quizSessionId');

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred during submission');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/40 to-purple-900/40 backdrop-blur-xl rounded-xl border border-purple-500/30 p-2 sm:p-3 md:p-4 mb-4 sm:mb-6 sticky top-2 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
            <div>
              <h1 className="text-sm sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-purple-200 to-white mb-0.5">
                Puzzle Round
              </h1>
              <p className="text-purple-300 text-[10px] sm:text-xs">
                Answer all questions to complete the round
              </p>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border-2 ${
                timeLeft <= 60
                  ? 'bg-red-950/50 border-red-500/50'
                  : 'bg-purple-950/50 border-purple-500/30'
              }`}
            >
              <Clock
                className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                  timeLeft <= 60 ? 'text-red-400' : 'text-purple-400'
                }`}
              />
              <div>
                <p className="text-[9px] sm:text-[10px] text-gray-400">
                  Time Remaining
                </p>
                <p
                  className={`text-sm sm:text-lg md:text-xl font-bold ${
                    timeLeft <= 60 ? 'text-red-400' : 'text-white'
                  }`}
                >
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 sm:mt-3">
            <div className="flex justify-between text-[10px] sm:text-xs text-purple-300 mb-1.5">
              <span>
                Answered: {answeredCount} / {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-purple-950/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-400 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-gradient-to-br from-purple-950/40 to-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 p-4 sm:p-5 hover:border-purple-500/50 transition-all duration-300 shadow-lg"
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-2 whitespace-pre-line leading-relaxed">
                    {question.question}
                  </h3>

                  {/* Image Display */}
                  {question.image && (
                    <div
                      className={`my-3 rounded-lg overflow-hidden border-2 border-purple-500/30 mx-auto ${
                        question.id === 7 || question.id === 10
                          ? 'max-w-xs'
                          : 'max-w-md'
                      }`}
                    >
                      <Image
                        src={question.image}
                        alt={`Question ${question.id} visual`}
                        width={
                          question.id === 7 || question.id === 10 ? 300 : 400
                        }
                        height={
                          question.id === 7 || question.id === 10 ? 225 : 300
                        }
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}

                  {/* Clickable Link */}
                  {question.link && (
                    <a
                      href={question.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 text-xs sm:text-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {question.linkText || 'View Resource'}
                    </a>
                  )}

                  {/* Note/Key Display */}
                  {question.note && (
                    <div className="mt-3 p-2.5 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                      <p className="text-xs sm:text-sm text-yellow-200/90 whitespace-pre-line leading-relaxed">
                        {question.note}
                      </p>
                    </div>
                  )}

                  {answers[question.id] && (
                    <div className="flex items-center gap-1.5 text-green-400 text-xs mt-2">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Answered</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="grid gap-2">
                {question.options.length > 0 ? (
                  question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`group relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                        answers[question.id] === option
                          ? 'bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-500/20'
                          : 'bg-purple-950/20 border-purple-500/20 hover:border-purple-500/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        disabled={isSubmitted}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 focus:ring-2"
                      />
                      <span
                        className={`flex-1 text-sm ${
                          answers[question.id] === option
                            ? 'text-white font-medium'
                            : 'text-gray-300'
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  ))
                ) : (
                  // Text input for questions without options (like Q6)
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    value={answers[question.id] || ''}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    disabled={isSubmitted}
                    className="w-full px-3 py-2 text-sm bg-purple-950/30 border-2 border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 bottom-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="w-full group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-purple-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <span className="relative flex items-center justify-center gap-3">
              {isSubmitted ? (
                'Submitted Successfully!'
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit Quiz ({answeredCount}/{questions.length} answered)
                </>
              )}
            </span>
          </button>
          {!isSubmitted && answeredCount < questions.length && (
            <p className="text-center text-purple-300 text-xs mt-2">
              You can submit anytime. Unanswered questions will be marked as
              incorrect.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionContainer;
