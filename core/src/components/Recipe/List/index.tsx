import React from "react";
import { Link } from "gatsby";

interface PostItem {
  slug: string;
  title: string;
  date: string;
  content?: string;
}

export function PostListItem({ slug, title, content, date }: PostItem) {
  return (
    <li>
      <div>{date}</div>
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
      {posts.map(({ slug, title, content, date }) => (
        <PostListItem
          key={slug}
          slug={slug}
          title={title}
          content={content}
          date={date}
        />
      ))}
    </ul>
  );
}
