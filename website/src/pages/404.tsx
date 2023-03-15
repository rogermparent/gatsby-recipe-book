import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";

const NotFoundPage: React.FC<PageProps> = () => (
  <SiteLayout>
    <h1>Page not found</h1>
    <p>
      Sorry 😔, we couldn’t find what you were looking for.
      <br />
      {process.env.NODE_ENV === "development" ? (
        <>
          <br />
          Try creating a page in <code>src/pages/</code>
          .
          <br />
        </>
      ) : null}
      <br />
      <Link to="/">Go home</Link>.
    </p>
  </SiteLayout>
);

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
