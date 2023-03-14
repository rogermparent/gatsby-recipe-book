import * as React from "react";

export const Post = ({
  title,
  content,
}: {
  title: string;
  content?: string;
}) => (
  <div>
    <h2>{title}</h2>
    {content && <p>{content}</p>}
  </div>
);
