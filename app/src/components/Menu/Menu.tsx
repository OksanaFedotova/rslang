import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';
const MENU = [
    {
        title: 'Учебник',
        to: '/manual'
    },
    {
        title: 'Мини-игры',
        to: '/games'
    },
    {
        title: 'Статистика',
        to: '/statistics'
    },
]

const Menu = () => {
  return (
    <Fragment>
        <div className='menu'>
          <ul>
              {
                  MENU.map(({title, to}, index) => (
                      <li key={index}>
                          <NavLink to={to}>
                              {title}
                          </NavLink>
                      </li>
                  ))
              }
          </ul>
        </div>
    </Fragment>
  )
}

export default Menu;
