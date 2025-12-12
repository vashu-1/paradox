'use client';
import React, { useState, useEffect } from 'react';
import questions from './Constant';
import { Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/app/provider';
import { useRouter } from 'next/navigation';
import { supabase } from '@/Services/SupabaseClient';

const QuestionContainer = ({ userData }) => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const context = useUser();
  const user = context?.user || null;
  const router = useRouter();

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

      // Insert score and user data into Supabase
      const { data, error } = await supabase
        .from('score')
        .insert([
          {
            user_id: authUser.id,
            name: userData?.name || user?.Name,

            branch: userData?.branch,
            batch: userData?.batch,
            registrationNumber: userData?.registrationNumber,
            score: score,

            answers: JSON.stringify(answers),
            time_taken: 300 - timeLeft, // Time taken in seconds
          },
        ])
        .select();

      if (error) {
        console.error('Error saving results:', error);
        toast.error('Failed to save results');
        return;
      }

      console.log('Results saved:', data);
      toast.success(
        `Thanks for participating, ${userData?.name || user?.Name}!`
      );

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
        <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-3 sm:p-4 md:p-6 mb-6 sm:mb-8 sticky top-4 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-purple-200 to-white mb-1">
                Puzzle Round
              </h1>
              <p className="text-purple-300 text-xs sm:text-sm">
                Answer all questions to complete the round
              </p>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 ${
                timeLeft <= 60
                  ? 'bg-red-950/50 border-red-500/50'
                  : 'bg-purple-950/50 border-purple-500/30'
              }`}
            >
              <Clock
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                  timeLeft <= 60 ? 'text-red-400' : 'text-purple-400'
                }`}
              />
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Time Remaining
                </p>
                <p
                  className={`text-base sm:text-xl md:text-2xl font-bold ${
                    timeLeft <= 60 ? 'text-red-400' : 'text-white'
                  }`}
                >
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 sm:mt-4">
            <div className="flex justify-between text-xs sm:text-sm text-purple-300 mb-2">
              <span>
                Answered: {answeredCount} / {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-purple-950/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-400 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-gradient-to-br from-purple-950/40 to-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {question.question}
                  </h3>
                  {answers[question.id] && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Answered</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
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
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500 focus:ring-2"
                    />
                    <span
                      className={`flex-1 text-base ${
                        answers[question.id] === option
                          ? 'text-white font-medium'
                          : 'text-gray-300'
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 bottom-4">
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length || isSubmitted}
            className="w-full group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-purple-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <span className="relative flex items-center justify-center gap-3">
              {isSubmitted ? (
                'Submitted Successfully!'
              ) : answeredCount < questions.length ? (
                `Answer ${questions.length - answeredCount} more question${
                  questions.length - answeredCount > 1 ? 's' : ''
                } to submit`
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Submit Quiz
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionContainer;
