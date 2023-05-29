import React, { ReactNode, useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import * as styles from "./styles.css";

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className={styles.navLink}>
    {children}
  </Link>
);

export const SiteHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.heading}>
          Gatsby Recipe Book
        </Link>
      </header>
      <nav className={styles.nav}>
        <NavLink to="/">Recipes</NavLink>
        <NavLink to="/ingredients">Ingredients</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/cuisines">Cuisines</NavLink>
        <NavLink to="/recipe/search">Search</NavLink>
      </nav>
    </>
  );
};
