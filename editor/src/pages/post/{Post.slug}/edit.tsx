import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { PostForm } from "core/src/components/PostForm";

export const query = graphql`
  query PostEdit($id: String!) {
    post(id: { eq: $id }) {
      filename
      title
      content
    }
  }
`;

const EditPage: React.FC<PageProps<Queries.PostEditQuery>> = ({ data }) => {
  const {
    post: { title, content, filename },
  } = data;
  const onSubmit = async (data: any) => {
    console.log("Submitting", data);
    await fetch(`/api/posts/${filename}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data, undefined, 2),
    });
    console.log("Submitted!");
  };

  return (
    <SiteLayout>
      <h1>Edit Post</h1>
      <PostForm onSubmit={onSubmit} defaultValues={{ title, content }} />
    </SiteLayout>
  );
};

export default EditPage;

export const Head: HeadFC = () => <title>Edit a Post</title>;
