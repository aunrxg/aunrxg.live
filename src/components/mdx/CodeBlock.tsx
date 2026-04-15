"use client";
import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ children, className }: any) {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace(/language-/, "") : "javascript";
  const code = children ? children.trim() : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden my-8 bg-[#1e1e1e] border border-neutral-800 text-sm md:text-base font-mono">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2a2a2a] text-neutral-400 text-xs border-b border-neutral-800">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2">
           <span className="uppercase">{language}</span>
           <button
             onClick={handleCopy}
             aria-label="Copy code to clipboard"
             className="flex items-center justify-center p-1 hover:bg-neutral-700 hover:text-white rounded transition-colors"
           >
             {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
           </button>
        </div>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 md:p-6 overflow-x-auto selection:bg-[#4d4d4d]" style={{ ...style, backgroundColor: "transparent" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
