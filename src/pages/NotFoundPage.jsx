import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Opps, sorry :( </h1>
      <div className={css.nav}>
        <Link to="/" className={css.link}>
          Back to home page
        </Link>
        <Link to="/movies" className={css.link}>
          Back to movies page
        </Link>
      </div>
    </div>
  );
}
