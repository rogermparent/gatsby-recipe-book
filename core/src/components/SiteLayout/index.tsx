import React, { ReactNode } from "react";
import { HeadFC, Link } from "gatsby";

const IndexPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <header>
        <Link to="/">Index</Link>
        <Link to="/create">Create</Link>
      </header>
      <main>{children}</main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
