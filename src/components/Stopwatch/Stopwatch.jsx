import React, { useState, useEffect } from 'react';
import styles from './Stopwatch.module.css';

const Stopwatch = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((new Date() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, startTime]);

  const startStopwatch = () => {
    if (!isRunning) {
      setStartTime(new Date() - elapsedTime * 1000);
      setIsRunning(true);
    }
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const saveLap = () => {
    if (isRunning) {
      setLaps([...laps, convertTimeToObject(elapsedTime)]);
    }
  };

  const deleteLap = (index) => {
    setLaps(laps.filter((_, i) => i !== index));
  };

  const convertTimeToObject = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, seconds: secs };
  };

  const formatTime = (timeObj) => {
    const { hours, minutes, seconds } = timeObj;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const elapsedTimeObj = convertTimeToObject(elapsedTime);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.container}>
        <h1 className={styles.time}>{formatTime(elapsedTimeObj)}</h1>
        <div>
          <button className={`${styles.button} ${styles.start}`} onClick={startStopwatch}>Start</button>
          <button className={`${styles.button} ${styles.stop}`} onClick={stopStopwatch}>Stop</button>
          <button className={`${styles.button} ${styles.reset}`} onClick={resetStopwatch}>Reset</button>
          <button className={`${styles.button} ${styles.lap}`} onClick={saveLap}>Lap</button>
        </div>
        <ul className={styles.lapList}>
          {laps.map((lap, index) => (
            <li key={index} className={styles.lapItem}>
              {formatTime(lap)}
              <button
                className={styles.deleteButton}
                onClick={() => deleteLap(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;