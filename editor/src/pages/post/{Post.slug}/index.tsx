import * as React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";

export const query = graphql`
  query PostPage($id: String!) {
    post(id: { eq: $id }) {
      title
      content
    }
  }
`;

const PostPage: React.FC<PageProps<Queries.PostPageQuery>> = ({ data }) => {
  const {
    post: { title, content },
  } = data;
  return (
    <SiteLayout>
      <h2>{title}</h2>
      {content && <p>{content}</p>}
      <p>
        <Link to="edit">Edit this page</Link>
      </p>
    </SiteLayout>
  );
};

export default PostPage;

export const Head: HeadFC = () => <title>Home Page</title>;

export async function config() {
  return {
    defer: true,
  };
}
