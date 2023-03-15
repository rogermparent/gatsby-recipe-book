import * as React from "react";

export function Post({
  title,
  content,
  date,
}: {
  title: string;
  content?: string;
  date: string;
}) {
  return (
    <div>
      <h2>{title}</h2>
      {content && <p>{content}</p>}
      <p>
        <i>{date}</i>
      </p>
    </div>
  );
}
