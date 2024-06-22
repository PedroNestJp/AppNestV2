import { useState, useEffect } from 'react';
import { iconTime } from '../img/imgs';

const TEMPO_TOTAL_IN_SECONDS = 18000; // 5 horas em segundos

function Cronometro() {
  const [tempoRestante, setTempoRestante] = useState(TEMPO_TOTAL_IN_SECONDS);

  useEffect(() => {
    const now = Date.now();
    const storedTime = localStorage.getItem('endTime');
    let endTime;

    if (storedTime) {
      endTime = parseInt(storedTime, 10);
      if (now >= endTime) {
        endTime = now + TEMPO_TOTAL_IN_SECONDS * 1000;
        localStorage.setItem('endTime', endTime);
      }
    } else {
      endTime = now + TEMPO_TOTAL_IN_SECONDS * 1000;
      localStorage.setItem('endTime', endTime);
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = Math.round((endTime - currentTime) / 1000);
      
      if (timeLeft <= 0) {
        setTempoRestante(TEMPO_TOTAL_IN_SECONDS);
        endTime = Date.now() + TEMPO_TOTAL_IN_SECONDS * 1000;
        localStorage.setItem('endTime', endTime);
      } else {
        setTempoRestante(timeLeft);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formataTempo = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${hours}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  return (
    <div className='stopwatch'>
      <span className='offersEnd'>A oferta termina em:</span>
      <span className='timeLeft'>{formataTempo(tempoRestante)} <img src={iconTime} alt="time icon" /></span>
    </div>
  );
}

export default Cronometro;