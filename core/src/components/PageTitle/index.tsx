import React, { ReactNode } from "react";
import * as styles from "./styles.css";

const PageTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className={styles.pageTitle}>{children}</h2>
);

export default PageTitle;
