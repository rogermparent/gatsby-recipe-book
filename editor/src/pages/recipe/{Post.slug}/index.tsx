import * as React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { Post } from "core/src/components/Post";

export const query = graphql`
  query PostPage($id: String!) {
    post(id: { eq: $id }) {
      ...PostData
    }
  }
`;

const PostPage: React.FC<PageProps<Queries.PostPageQuery>> = ({
  data: { post },
}) => {
  const { title, content, date } = post;
  return (
    <SiteLayout>
      <Post title={title} content={content} date={date} />
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
