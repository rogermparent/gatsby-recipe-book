import React, { ReactNode } from "react";
import { HeadFC, Link } from "gatsby";
import * as styles from "./styles.css";

const HeaderLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className={styles.homeLink}>
    {children}
  </Link>
);

const IndexPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <Link to="/" className={styles.mainHeading}>
        Gatsby Recipe Book
      </Link>
      <HeaderLink to="/">Index</HeaderLink>
      <HeaderLink to="/ingredients">Ingredients</HeaderLink>
      <HeaderLink to="/categories">Categories</HeaderLink>
      <HeaderLink to="/cuisines">Cuisines</HeaderLink>
    </header>
    <main className={styles.main}>{children}</main>
  </div>
);

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
