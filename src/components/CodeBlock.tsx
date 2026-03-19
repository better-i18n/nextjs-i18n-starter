"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code?: string;
  filename?: string;
  showTabs?: { labels: string[]; codes: string[] };
}

function highlightSyntax(code: string): string {
  // Single-pass tokenizer — prevents cascading replacements that corrupt HTML tags
  return code.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|from|export|const|let|var|function|return|async|await|default|type)\b)|([{}()[\]=;,])/gm,
    (match, comment, str, keyword, bracket) => {
      if (comment) return `<span class="text-gray-500">${comment}</span>`;
      if (str) return `<span class="text-emerald-400">${str}</span>`;
      if (keyword) return `<span class="text-purple-400">${keyword}</span>`;
      if (bracket) return `<span class="text-gray-400">${bracket}</span>`;
      return match;
    }
  );
}

export function CodeBlock({ code, filename, showTabs }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const displayCode = showTabs ? showTabs.codes[activeTab] : (code ?? "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-xl">
      {/* Terminal chrome */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          {filename && (
            <span className="text-xs text-gray-500">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showTabs && (
            <div className="mr-2 flex gap-1 rounded-lg bg-gray-800 p-0.5">
              {showTabs.labels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(i)}
                  className={`rounded-md px-2.5 py-1 text-xs transition ${
                    activeTab === i
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-400 hover:text-white"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
      {/* Code content */}
      <div className="overflow-x-auto p-6 text-sm leading-relaxed">
        <pre>
          <code
            className="text-gray-100"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: highlightSyntax(displayCode) }}
          />
        </pre>
      </div>
    </div>
  );
}
