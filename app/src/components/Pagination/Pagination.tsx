import React from "react"
import { Link } from "react-router-dom";
import './Pagination.css'

interface IPagination {
  group: number,
  page: number,
  handleClick: () => void,
}
const Pagination: React.FunctionComponent<IPagination> = ({group, page, handleClick}) => {
  const PAGINATION = [
    {
      title: '<<',
      to: `../textbook/group/${group}/page/0`,
      result: 0
    },
    {
      title: '<',
      to: `../textbook/group/${group}/page/${page - 1}`,
      result: page - 1
    },
    {
      title: `${page + 1}`,
      to: `../textbook/group/${group}/page/${page}`,
      result: page
    },
    {
      title: `>`,
      to: `../textbook/group/${group}/page/${page + 1}`,
      result: page + 1
    },
     {
      title: `>>`,
      to: `../textbook/group/${group}/page/29`,
      result: 29
    },
]
  return (
    <div className="pagination">
      <ul className="pagination-ul">
        {
          PAGINATION.map(({title, to, result}, index) => (
            <li className="pagination__list-item" key={index}>
              <Link
                key={index}
                to={to}
                style={
                  result < 0 || result > 29 ? {pointerEvents: 'none'} : undefined
                } 
                onClick={
                  handleClick
                }
              >
                {title}
              </Link>
            </li>
            )
          )
        }
      </ul>
    </div>
  )
}
export default Pagination;
   