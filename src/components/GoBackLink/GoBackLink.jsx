import { Link } from "react-router-dom";
import css from "./GoBackLink.module.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";

export const GoBackLink = ({ href, children }) => {
  return (
    <Link to={href} className={css.backLink}>
      <IoChevronBackCircleOutline />
      {children}
    </Link>
  );
};
