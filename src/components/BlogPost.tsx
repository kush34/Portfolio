import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

type Props = {
  content: string;
};

export default function BlogPost({ content }: Props) {
  return (
    <div className="w-full h-screen flex flex-col items-center overflow-y-scroll overflow-x-scroll">
      <article className="max-w-3xl article">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-6 text-6xl font-bold text-zinc-500">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="article-head-secondary mt-10 mb-4 text-6xl font-bold text-black">
                {children}
              </h2>
            ),
            p: ({ children }) => (
              <p className="article-para my-4 text-zinc-900 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="my-4 list-disc pl-6 text-zinc-300">
                {children}
              </ul>
            ),
            code({ inline, className, children, ...props }) {
              if (inline) {
                return (
                  <code className="rounded px-1.5 py-0.5 text-sm text-zinc-100">
                    {children}
                  </code>
                );
              }

              return (
                <pre className="my-6 overflow-x-auto rounded-lg p-4 text-sm">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>

  );
}
