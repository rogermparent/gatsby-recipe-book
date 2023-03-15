import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { PostList } from "core/src/components/PostList";

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

const IndexPage: React.FC<PageProps<Queries.PostsIndexQuery>> = ({ data }) => (
  <SiteLayout>
    <h2>Posts</h2>
    <PostList posts={data.allPost.nodes} />
  </SiteLayout>
);

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
