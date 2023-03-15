import React from "react";
import { Link } from "gatsby";

interface PostItem {
  slug: string;
  title: string;
  content?: string;
}

export function PostListItem({ slug, title, content }: PostItem) {
  return (
    <li>
      <h3>
        <Link to={`/post/${slug}`}>{title}</Link>
      </h3>
      {content && <p>{content}</p>}
    </li>
  );
}

export function PostList({ posts }: { posts: PostItem[] }) {
  return (
    <ul>
      {posts.map(({ slug, title, content }) => (
        <PostListItem slug={slug} title={title} content={content} key={slug} />
      ))}
    </ul>
  );
}
