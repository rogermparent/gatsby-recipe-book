import * as React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";

export const query = graphql`
  query PostsIndex {
    allPost(sort: { date: DESC }) {
      nodes {
        slug
        title
        content
      }
    }
  }
`;

const IndexPage: React.FC<PageProps<Queries.PostsIndexQuery>> = ({ data }) => {
  return (
    <SiteLayout>
      <h1>Index</h1>
      {data.allPost.nodes.map(({ slug, title, content }) => {
        return (
          <Link to={`/post/${slug}`}>
            <h2>{title}</h2>
            <p>{content}</p>
          </Link>
        );
      })}
    </SiteLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
