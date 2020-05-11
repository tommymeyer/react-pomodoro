import React, { useState, useRef } from 'react';
import './App.sass';


const padTime = (time) => {
  return time.toString().padStart(2, "0");
}


export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [title, setTitle] = useState("Do your best and forget the rest.");
  const intervalRef = useRef(null);


  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle("Let's do this!");

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();

        setCount(prevCount => {
          console.log(prevCount);
          return prevCount + (1 / 2);
        });

        console.log(count);

        return 0;
      });
    }, 1000);
  }

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTitle("Can't stop won't stop!");

    setIsRunning(false);
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("I'm ready to go.")
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{count}</span>
        <span>/</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
