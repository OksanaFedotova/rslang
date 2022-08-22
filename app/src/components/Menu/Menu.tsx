import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';
import './Menu.css';

const MENU = [
    {
        title: 'Учебник',
        to: '/textbook'
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
          <ul className="menu-list">
              {
                  MENU.map(({title, to}, index) => (
                      <li className="list-item" key={index}>
                          <NavLink className="nav-link" to={to}>
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
