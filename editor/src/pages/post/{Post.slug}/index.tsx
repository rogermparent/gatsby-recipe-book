import * as React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { Post } from "core/src/components/Post";
import { PostInput } from "core/src/types";

export const query = graphql`
  query PostPage($id: String!) {
    post(id: { eq: $id }) {
      title
      content
    }
  }
`;

const PostPage: React.FC<PageProps<Queries.PostPageQuery>> = ({
  data: { post },
}) => {
  const { title, content } = post as PostInput;
  return (
    <SiteLayout>
      <Post title={title} content={content} />
      <p>
        <Link to="edit">Edit this page</Link>
      </p>
    </SiteLayout>
  );
};

export default PostPage;

export const Head: HeadFC<Queries.PostPageQuery> = ({
  data: {
    post: { title },
  },
}) => {
  return <title>{title}</title>;
};
