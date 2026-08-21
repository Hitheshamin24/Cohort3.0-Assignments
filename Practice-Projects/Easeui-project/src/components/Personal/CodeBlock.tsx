import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "tsx" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between px-4 py-2 rounded-t-md"
        style={{ backgroundColor: '#1a1830', borderBottom: '1px solid var(--border-color)' }}
      >
        <span className="text-xs font-mono uppercase" style={{ color: '#8b83b8' }}>{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-2 py-1 text-xs rounded transition-colors duration-200"
          style={{ backgroundColor: '#2e2952', color: '#e9e3ff' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--primary-color)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2e2952')}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-4 rounded-b-md"
        style={{ backgroundColor: '#0d0c1a', border: '1px solid var(--border-color)', borderTop: 'none' }}
      >
        <code className="text-sm" style={{ color: '#c4b5fd' }}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
