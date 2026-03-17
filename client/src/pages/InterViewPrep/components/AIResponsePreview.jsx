import React, { useState } from 'react';
import { LuCheck, LuCode, LuCopy } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
  if (!content) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mt-4">
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';

              const isInline = !className;

              return !isInline ? (
                <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
              ) : (
                <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded" {...props}>
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-3 last:mb-0 text-gray-700 leading-relaxed">{children}</p>;
            },
            strong({ children }) {
              return <strong className="font-semibold text-gray-900">{children}</strong>;
            },
            em({ children }) {
              return <em className="italic text-gray-700">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc list-inside mb-3 space-y-1 text-gray-700">{children}</ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-700">
                  {children}
                </ol>
              );
            },
            li({ children }) {
              return <li className="leading-relaxed">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-indigo-400 bg-indigo-50 pl-4 py-2 italic text-gray-700 rounded-r mb-3">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return <h1 className="text-2xl font-bold text-gray-900 my-4">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-xl font-semibold text-gray-900 my-3">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-lg font-semibold text-gray-800 my-2">{children}</h3>;
            },
            h4({ children }) {
              return <h4 className="text-md font-semibold text-gray-800 my-1">{children}</h4>;
            },
            a({ children, href }) {
              return (
                <a
                  href={href}
                  className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-100 text-gray-700">{children}</thead>;
            },
            tbody({ children }) {
              return <tbody className="divide-y">{children}</tbody>;
            },
            tr({ children }) {
              return <tr className="border-t hover:bg-gray-50 transition">{children}</tr>;
            },
            th({ children }) {
              return <th className="text-left font-semibold py-2 px-3">{children}</th>;
            },
            td({ children }) {
              return <td className="py-2 px-3 text-sm text-gray-700">{children}</td>;
            },
            hr() {
              return <hr className="my-4 border-gray-300" />;
            },
            img({ src, alt }) {
              return <img src={src} alt={alt} className="my-4 rounded-lg shadow-sm max-w-full" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b">
        <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
          <LuCode size={16} />
          <span className="uppercase tracking-wide">{language || 'Code'}</span>
        </div>

        <button
          onClick={copyCode}
          aria-label="Copy code"
          className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 text-xs transition"
        >
          {copied ? <LuCheck size={16} className="text-green-500" /> : <LuCopy size={16} />}

          {copied && <span className="text-green-500 text-xs ml-1">Copied!</span>}
        </button>
      </div>

      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          customStyle={{
            fontSize: 13,
            margin: 0,
            padding: '1rem',
            background: 'transparent',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default AIResponsePreview;
