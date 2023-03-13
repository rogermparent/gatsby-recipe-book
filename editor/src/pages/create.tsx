import React from "react";
import { HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { PostForm } from "core/src/components/PostForm";

const CreatePage: React.FC<PageProps> = () => {
  const onSubmit = async (data: any) => {
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

  return (
    <SiteLayout>
      <h1>New Post</h1>
      <PostForm onSubmit={onSubmit} />
    </SiteLayout>
  );
};

export default CreatePage;

export const Head: HeadFC = () => <title>Create a Post</title>;
