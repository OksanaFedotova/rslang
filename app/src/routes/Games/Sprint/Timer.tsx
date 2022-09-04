import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router';
import { Fragment } from "react";
import './Sprint.css';

interface ITimer {
  setGame: () => void;
}

const Timer: React.FC<ITimer> = () => {
    const [seconds, setSeconds] = useState(30);
    const [timerActive, setTimerActive] = useState(false);
    const navFromSprint = useNavigate();


    useEffect(() => {
        if (seconds > 0 && timerActive) {
          setTimeout(setSeconds, 1000, seconds - 1);
        } else {
          setTimerActive(false);
        }
      }, [ seconds, timerActive ]);
      


return (
    <div className="timer-field">
      {seconds
        ? <Fragment>
            <button className="header-button game-button" onClick={() => {
              setTimerActive(!timerActive);
              document.querySelector("#root > div > div.guess-word-block")?.classList.add('open');
              const focusButton = document.querySelector("#root > div > div.guess-word-block > div.game-buttons > button.yes-button") as HTMLElement;
              focusButton.focus()
              }}>
              {timerActive ? 'Остановить игру' : 'Начать игру'}
            </button>
            <div className="clock-block">{seconds}</div>
          </Fragment>
        : <>
          {document.querySelector("#root > div > div.result-wrapper")?.classList.add('active')}
          {document.querySelector("#root > div > div.level-wrapper")?.classList.add('hidden')}
          <button className="header-button game-button" onClick={() => window.location.reload()}>Сыграть ещё раз</button>
          <button className="header-button game-button" onClick={() => navFromSprint('../games/audio-challenge')}>Игра Аудиовызов</button>
          <button className="header-button game-button" onClick={() => navFromSprint('..')}>На главную</button>
          <button className="header-button game-button" onClick={() => navFromSprint('../textbook')}>В учебник</button>

        </>
      }
    </div>
  );
}

export default Timer;
