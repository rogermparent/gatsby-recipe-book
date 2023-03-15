import React from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { PostForm } from "core/src/components/Post/Form";
import { PostInput } from "core/src/types";

export const query = graphql`
  query PostEdit($id: String!) {
    post(id: { eq: $id }) {
      filename
      ...PostData
    }
  }
`;

const EditPage: React.FC<PageProps<Queries.PostEditQuery>> = ({ data }) => {
  const {
    post: { title, content, filename },
  } = data;
  const onSubmit = async (data: PostInput) => {
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
    navigate("/");
  };

  return (
    <SiteLayout>
      <h2>Edit Post</h2>
      <PostForm
        submitText="Edit Post"
        onSubmit={onSubmit}
        defaultValues={{ title, content }}
      />
      <button
        onClick={async () => {
          console.log("Deleting", data);
          await fetch(`/api/posts/${filename}`, {
            method: "DELETE",
          });
          console.log("Deleted!");
          navigate("/");
        }}
      >
        Delete
      </button>
    </SiteLayout>
  );
};

export default EditPage;

export const Head: HeadFC = () => <title>Edit a Post</title>;
