import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
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
      <h1>Post</h1>
      <h2>{title}</h2>
      {content && <p>{content}</p>}
    </SiteLayout>
  );
};

export default PostPage;

export const Head: HeadFC = () => <title>Home Page</title>;
