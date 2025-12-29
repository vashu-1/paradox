'use client';
import React, { useState, useEffect } from 'react';
import { Clock, Lock, Unlock, XCircle } from 'lucide-react';

const CountdownTimer = ({
  targetDate,
  eventDurationHours = 2,
  onTimerEnd,
  onEventExpired,
}) => {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isEventClosed, setIsEventClosed] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const eventEndTime = target + eventDurationHours * 60 * 60 * 1000; // Add duration to start time
      const difference = target - now;
      const eventCloseDifference = eventEndTime - now;

      // Check if event has closed (past the 2-hour window)
      if (eventCloseDifference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, total: 0 });
        setIsExpired(true);
        setIsEventClosed(true);
        if (onEventExpired) onEventExpired();
        return;
      }

      // Check if event has started but not closed yet
      if (difference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, total: 0 });
        setIsExpired(true);
        setIsEventClosed(false);
        if (onTimerEnd) onTimerEnd();
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds, total: difference });
      setIsExpired(false);
      setIsEventClosed(false);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate, eventDurationHours, onTimerEnd, onEventExpired]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Timer Card */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-600/20 border-2 border-purple-500/30 mb-6">
              {isEventClosed ? (
                <XCircle className="w-10 h-10 text-red-400" />
              ) : isExpired ? (
                <Unlock className="w-10 h-10 text-green-400" />
              ) : (
                <Lock className="w-10 h-10 text-purple-400" />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {isEventClosed
                ? 'Event Has Closed'
                : isExpired
                ? 'Event Started!'
                : 'Event Starting Soon'}
            </h1>
            <p className="text-purple-300 text-lg">
              {isEventClosed
                ? `The ${eventDurationHours}-hour event window has ended`
                : isExpired
                ? `Registration and Quiz are available for ${eventDurationHours} hours`
                : 'Please wait for the countdown to complete'}
            </p>
          </div>

          {/* Countdown Display */}
          {!isExpired && (
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 md:gap-6 mb-6">
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-lg border border-purple-400/30">
                    <div className="text-4xl md:text-6xl font-bold text-white font-mono">
                      {formatNumber(timeRemaining.hours)}
                    </div>
                  </div>
                  <span className="text-purple-300 text-sm md:text-base mt-2 font-medium">
                    Hours
                  </span>
                </div>

                <span className="text-4xl md:text-6xl text-purple-400 font-bold mb-8">
                  :
                </span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-lg border border-purple-400/30">
                    <div className="text-4xl md:text-6xl font-bold text-white font-mono">
                      {formatNumber(timeRemaining.minutes)}
                    </div>
                  </div>
                  <span className="text-purple-300 text-sm md:text-base mt-2 font-medium">
                    Minutes
                  </span>
                </div>

                <span className="text-4xl md:text-6xl text-purple-400 font-bold mb-8">
                  :
                </span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-lg border border-purple-400/30">
                    <div className="text-4xl md:text-6xl font-bold text-white font-mono">
                      {formatNumber(timeRemaining.seconds)}
                    </div>
                  </div>
                  <span className="text-purple-300 text-sm md:text-base mt-2 font-medium">
                    Seconds
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-purple-950/50 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {isExpired && !isEventClosed && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 text-green-400">
                <Clock className="w-6 h-6" />
                <p className="text-lg font-medium">
                  Timer has ended - Access granted!
                </p>
              </div>
            </div>
          )}

          {/* Event Closed Message */}
          {isEventClosed && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 text-red-400">
                <XCircle className="w-6 h-6" />
                <p className="text-lg font-medium">
                  Registration and Quiz are no longer available
                </p>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="bg-purple-500/5 rounded-xl p-6 border border-purple-500/10">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="text-purple-200 text-sm leading-relaxed">
                {isEventClosed ? (
                  <p>
                    The event duration has ended. Registration and quiz
                    submissions are no longer accepted. Thank you for your
                    interest!
                  </p>
                ) : isExpired ? (
                  <p>
                    You can now proceed to register and take the quiz. You have{' '}
                    {eventDurationHours} hours from the event start time. Good
                    luck!
                  </p>
                ) : (
                  <p>
                    The registration and quiz will be accessible once the
                    countdown reaches 00:00:00. The event will remain open for{' '}
                    {eventDurationHours} hour. Please stay on this page.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {!isExpired && (
          <div className="text-center mt-6">
            <p className="text-purple-400/70 text-sm">
              Please do not refresh the page during the countdown
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
