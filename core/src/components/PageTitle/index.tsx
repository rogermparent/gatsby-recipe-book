import React, { ReactNode } from "react";

const PageTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h1>{children}</h1>
);

export default PageTitle;
