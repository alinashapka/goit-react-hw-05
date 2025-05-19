import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getActiveLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};


export default function Navigation() {
  return (<header className={clsx(css.header)}>
    <nav className={clsx(css.nav)}>
      <NavLink to="/" className={getActiveLinkClass}>Home</NavLink>
      <NavLink to="/movies" className={getActiveLinkClass}>Movies</NavLink>
    </nav>
  </header>);
}