import React from "react";
import { Link } from "gatsby";
import style from "../styles/navigation.module.css";
type NavigationProps = {
  nextPath?: string,
  previousPath?: string,
  nextLabel?: string,
  previousLabel?: string
};
const Navigation: React.SFC<NavigationProps> = ({
  nextPath,
  previousPath,
  nextLabel,
  previousLabel
}) =>
  previousPath || nextPath ? (
    <div className={style.navigation}>
      {previousPath && (
        <span className={style.button}>
          <Link to={previousPath}>
            <span className={style.iconPrev}>←</span>
            <span className={style.buttonText}>{previousLabel}</span>
          </Link>
        </span>
      )}
      {nextPath && (
        <span className={style.button}>
          <Link to={nextPath}>
            <span className={style.buttonText}>{nextLabel}</span>
            <span className={style.iconNext}>→</span>
          </Link>
        </span>
      )}
    </div>
  ) : null;
export default Navigation;
