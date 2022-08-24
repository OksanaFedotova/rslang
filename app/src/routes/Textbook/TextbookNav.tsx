import React from "react";
import { Link } from "react-router-dom";
import cn from 'classnames';

// import './TextbookNav.css';

 const GROUPS = ["A1 Elementary", "A2 Pre-intermediate", "B1 Intermediate", "B2 Upper-intermediate", "C1 Advanced", "C2 Proficiency", "Difficult words"]

 interface ITextbookNav {
  className?: string,
  handleClick?: () => void
 }
 const TextbookNav: React.FunctionComponent<ITextbookNav>  = ({className, handleClick}) => {

  const pageNumber = 0
  return (
  <div className={className ? className : `groups-wrapper`}>
    {
    GROUPS.map((title, index) => {
      return <Link 
        className={cn('group', title.split(' ')[0])} 
        to={`../textbook/group/${index}/page/${pageNumber}`}
        key={index}
        onClick={handleClick ? handleClick : undefined}
        >
          {title}
      </Link>
      })
    }
  </div>
  )
}
export default TextbookNav;