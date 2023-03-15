import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { PostForm } from "core/src/components/Post/Form";
import { PostList } from "core/src/components/Post/List";
import { PostInput } from "core/src/types";

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

const createPost = async (data: PostInput) => {
  console.log("Submitting", data);
  await fetch("/api/posts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data, undefined, 2),
  });
  console.log("Submitted!");
};

const IndexPage: React.FC<PageProps<Queries.PostsIndexQuery>> = ({ data }) => {
  const onSubmit = async (data: PostInput) => {
    createPost(data);
  };

  return (
    <SiteLayout>
      <h2>New post</h2>
      <PostForm onSubmit={onSubmit} submitText="Create Post" />
      <h2>Posts</h2>
      <PostList posts={data.allPost.nodes} />
    </SiteLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
