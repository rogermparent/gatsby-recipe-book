import React, { ReactNode } from "react";
import { HeadFC, Link } from "gatsby";
import "./styles.css";

const IndexPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <header>
      <h1>
        <Link to="/">Gatsby Recipe Book</Link>
      </h1>
    </header>
    <hr />
    <main>{children}</main>
  </>
);

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
