import { useState, useEffect } from 'react';
import { iconTime } from '../img/imgs';

function Cronometro() {
  const TEMPO_TOTAL = 3000;
  const [tempoRestante, setTempoRestante] = useState(TEMPO_TOTAL);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTempoRestante(prevState => prevState - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formataTempo = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  } 
  return (
    <div className='stopwatch'>
      <span className='offersEnd'>A oferta termina em:</span>
      <span className='timeLeft'>1 DIA 5:{formataTempo(tempoRestante)} <img src={iconTime}/> </span>
    </div>
  )
}

export default Cronometro;
