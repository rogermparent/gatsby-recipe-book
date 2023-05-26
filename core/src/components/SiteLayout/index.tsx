import React, { ReactNode } from "react";
import { SiteHeader } from "../SiteHeader";
import * as styles from "./styles.css";

const IndexPage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div>
    <SiteHeader />
    <main className={styles.main}>{children}</main>
  </div>
);

export default IndexPage;
