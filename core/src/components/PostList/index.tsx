import React from "react";
import { Link } from "gatsby";

export const PostListItem = ({
  slug,
  title,
  content,
}: {
  slug: string;
  title: string;
  content?: string;
}) => {
  return (
    <li>
      <h3>
        <Link to={`/post/${slug}`}>{title}</Link>
      </h3>
      {content && <p>{content}</p>}
    </li>
  );
};

export const PostList = ({ posts }) => (
  <ul>
    {posts.map(({ slug, title, content }) => (
      <PostListItem slug={slug} title={title} content={content} key={slug} />
    ))}
  </ul>
);
