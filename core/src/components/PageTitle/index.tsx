import React, { ReactNode } from "react";
import * as styles from "./styles.css";

const PageTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h1 className={styles.pageTitle}>{children}</h1>
);

export default PageTitle;
