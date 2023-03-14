import React, { ReactNode } from "react";
import { HeadFC, Link } from "gatsby";
import "./styles.css";

const IndexPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Gatsby Dual Renderer Proof-of-Concept</Link>
        </h1>
      </header>
      <hr />
      <main>{children}</main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
