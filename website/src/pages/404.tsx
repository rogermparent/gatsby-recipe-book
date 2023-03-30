import React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { Metadata } from "core/src/components/Metadata";

const NotFoundPage: React.FC<PageProps> = () => (
  <SiteLayout>
    <h1>Page not found</h1>
    <p>
      Sorry 😔, we couldn’t find what you were looking for.
      <br />
      <Link to="/">Go home</Link>.
    </p>
  </SiteLayout>
);

export default NotFoundPage;

export const Head: HeadFC = () => <Metadata title="Page not Found" />;
