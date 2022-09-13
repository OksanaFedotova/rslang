import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getStatistic } from "../../services/requestStatistic";
import { setUser, setUserAuth } from "../../store/userSlice";
import { RootState } from "../../store/store";
import IUserStat from "../../Interfaces/IUserStat";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./Statistic.css";

const Statistic = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const user = useSelector((state: RootState) => state.user.data);

  const navigator = useNavigate();
  const [newUser, setIsNew] = useState(true);
  const initialValue: IUserStat = {
    learnedWords: 0,
    optional: {
      currentDate: "",
      learnedWordsPerDay: 0,
      newWordsPerDay: 0,
      sprintCorrect: 0,
      sprintWrong: 0,
      audioCorrect: 0,
      audioWrong: 0,
      longestSeriesAudio: 0,
      longestSeriesSprint: 0,
      newWordsSprint: 0,
      newWordsAudio: 0,
      percentAudio: 0,
      percentSprint: 0
    }
  };

  const [data, setData] = useState(initialValue);
  useEffect(() => {
    const getStat = async () => {
      if (user) {
        const res = await getStatistic(user);
        if (res) {
          setIsNew(false);
          setData(res);
        }
      }
    };
    void getStat();
  }, []);

  const handleClick = () => {
    dispatch(setUser(null));
    dispatch(setUserAuth(false));
    localStorage.removeItem("user");
    navigator("..");
  };

  return (
    <Fragment>
      <Header />
      {isAuth && (
        <div className="page-stat-wrapper">
          <div>
            {newUser && (
              <div>
                Вы новый пользователь, не можем отобразить статистику для Вас
              </div>
            )}
            {!newUser && user && (
              <div className="wrapper-stat-page">
                <h3 className="stat-title">Статистика</h3>
                <div className="user-name">Пользователь: {user.name}</div>
                <div className="stat-blocks-wrapper">
                  <div className="game-stat-block">
                    <div className="block-title">Учебник</div>
                    <div>
                      Всего выученных слов:{" "}
                      <p className="data-block">{data.learnedWords}</p>
                    </div>
                    <div>
                      Выученных слов за день:{" "}
                      <p className="data-block">
                        {data.optional.learnedWordsPerDay}
                      </p>
                    </div>
                    <div>
                      Всего новых слов за день:{" "}
                      <p className="data-block">
                        {data.optional.newWordsPerDay}
                      </p>
                    </div>
                  </div>
                  <div className="game-stat-block">
                    <div className="block-title">Спринт</div>
                    <div>
                      Новых слов за день:{" "}
                      <p className="data-block">
                        {data.optional.newWordsSprint}
                      </p>
                    </div>
                    <div>
                      Процент правильных ответов:{" "}
                      <p className="data-block">
                        {data.optional.percentSprint}%
                      </p>
                    </div>
                    <div>
                      Правильных ответов:{" "}
                      <p className="data-block">
                        {Math.round(data.optional.sprintCorrect || 0)}
                      </p>
                    </div>
                    <div>
                      Неправильных ответов:{" "}
                      <p className="data-block">
                        {Math.round(data.optional.sprintWrong || 0)}
                      </p>
                    </div>
                    <div>
                      Самая длинная серия правильных ответов за день:{" "}
                      <p className="data-block">
                        {data.optional.longestSeriesSprint || 0}
                      </p>
                    </div>
                  </div>
                  <div className="game-stat-block">
                    <div className="block-title">Аудиовызов</div>
                    <div>
                      Новых слов за день:{" "}
                      <p className="data-block">
                        {data.optional.newWordsAudio}
                      </p>
                    </div>
                    <div>
                      Процент правильных ответов:{" "}
                      <p className="data-block">
                        {data.optional.percentAudio}%
                      </p>
                    </div>
                    <div>
                      Правильных ответов:{" "}
                      <p className="data-block">
                        {Math.round(data.optional.audioCorrect)}
                      </p>
                    </div>
                    <div>
                      Неправильных ответов:{" "}
                      <p className="data-block">
                        {Math.round(data.optional.audioWrong)}
                      </p>
                    </div>
                    <div>
                      Самая длинная серия правильных ответов за день:{" "}
                      <p className="data-block">
                        {data.optional.longestSeriesAudio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!isAuth && (
        <div className="page-stat-wrapper">
          <p>Для просмотра статистики войдите или зарегестрируйтесь</p>
        </div>
      )}
      <Footer />
    </Fragment>
  );
};
export default Statistic;
