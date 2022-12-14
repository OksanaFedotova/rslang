import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store/store";
import cn from "classnames";

const GROUPS = [
  "A1 Elementary",
  "A2 Pre-intermediate",
  "B1 Intermediate",
  "B2 Upper-intermediate",
  "C1 Advanced",
  "C2 Proficiency"
];

interface ITextbookNav {
  className?: string;
  handleClick?: (index: number) => void;
}
const TextbookNav: React.FunctionComponent<ITextbookNav> = ({
  className,
  handleClick
}) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const pageNumber = 0;
  return (
    <div className={className ? className : `groups-wrapper`}>
      {GROUPS.map((title, index) => {
        return (
          <Link
            className={cn("group", title.split(" ")[0])}
            to={`../textbook/group/${index}/page/${pageNumber}`}
            key={index}
            onClick={() => {
              handleClick ? handleClick(index) : undefined;
            }}
          >
            {title}
          </Link>
        );
      })}
      {isAuth && (
        <Link className={cn("group", "Difficult")} to={"../textbook/difficult"}>
          Difficult words
        </Link>
      )}
    </div>
  );
};
export default TextbookNav;
