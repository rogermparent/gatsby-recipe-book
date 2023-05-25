import React, { ReactNode } from "react";
import { Link } from "gatsby";

const HeaderLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to}>{children}</Link>
);

const IndexPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div>
    <header>
      <Link to="/">Gatsby Recipe Book</Link>
    </header>
    <nav>
      <HeaderLink to="/">Recipes</HeaderLink>
      <HeaderLink to="/ingredients">Ingredients</HeaderLink>
      <HeaderLink to="/categories">Categories</HeaderLink>
      <HeaderLink to="/cuisines">Cuisines</HeaderLink>
    </nav>
    <main>{children}</main>
  </div>
);

export default IndexPage;
