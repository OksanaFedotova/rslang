import React from "react"
import { Link } from "react-router-dom";
import './Pagination.css'

interface IPagination {
  group: number,
  page: number,
  handleClick: () => void
}
const Pagination: React.FunctionComponent<IPagination> = ({group, page, handleClick}) => {
  const PAGINATION = [
    {
      title: '<<',
      to: `../textbook/group/${group}/page/0`
    },
    {
      title: '<',
      to: `../textbook/group/${group}/page/${page - 1}`
    },
    {
      title: `${page + 1}`,
      to: `../textbook/group/${group}/page/${page}`
    },
    {
      title: `>`,
      to: `../textbook/group/${group}/page/${page + 1}`
    },
     {
      title: `>>`,
      to: `../textbook/group/${group}/page/30`
    },
]
  return (
    <div className="pagination">
      <ul className="pagination-ul">
        {
          PAGINATION.map(({title, to}, index) => (
            <li className="pagination__list-item" key={index}>
              <Link
                key={index}
                to={to}
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
   