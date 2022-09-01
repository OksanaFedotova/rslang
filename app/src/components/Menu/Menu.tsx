import React, { Fragment} from "react";
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
    }
]

interface IMenu {
    active: boolean,
    setActive: (active: boolean) => void,
}

const Menu: React.FunctionComponent<IMenu> = ({active}) => {
  return (
    <Fragment>
        <div className='menu'>
          <ul className={active ? 'menu-list active' : 'menu-list'}>
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
