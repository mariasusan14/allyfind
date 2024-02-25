import React, { useState, useRef } from 'react';

function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(25 * 60); // Default duration is 25 minutes
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTimeLeft(duration);
  };

  return (
    <div className="study-tools">
      <h2>Study Tools</h2>
      <div>Time Left: {formatTime(timeLeft)}</div>
      {isRunning ? (
        <button onClick={stopTimer}>Stop Timer</button>
      ) : (
        <button onClick={startTimer}>Start Timer</button>
      )}
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
}

export default PomodoroTimer;
