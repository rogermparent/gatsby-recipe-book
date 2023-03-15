import * as React from "react";

export function Post({ title, content }: { title: string; content?: string }) {
  return (
    <div>
      <h2>{title}</h2>
      {content && <p>{content}</p>}
    </div>
  );
}
