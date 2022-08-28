import React, {useState, useEffect} from "react";
import { Fragment } from "react";
import './Sprint.css';

interface ITimer {
 // onClick: () => void;
  setGame: () => void;
}


const Timer: React.FC<ITimer> = ({setGame}) => {
    const [ seconds, setSeconds ] = useState(30);
    const [ timerActive, setTimerActive ] = useState(false);


    useEffect(() => {
        if (seconds > 0 && timerActive) {
          setTimeout(setSeconds, 1000, seconds - 1);
        } else {
          setTimerActive(false);
        }
      }, [ seconds, timerActive ]);

return (
    <div className="timer-field"
      onClick={setGame}
    >
      {seconds
        ? <Fragment>
            <button className="header-button game-button" 
              onClick={() => setTimerActive(!timerActive)}
            >
              {timerActive ? 'Остановить игру' : 'Начать игру'}
            </button>
            <div className="clock-block">{seconds}</div>
          </Fragment>
        : <button className="header-button game-button" onClick={() => setSeconds(30)}>Сыграть ещё раз</button>
      }
    </div>
  );
}

export default Timer;
