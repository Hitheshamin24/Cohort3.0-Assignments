import { useState } from "react";
import { Code } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden shadow-sm"
      style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--surface)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Preview
        </span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors duration-200"
          style={{
            backgroundColor: 'var(--primary-subtle)',
            color: 'var(--primary-color)',
            border: '1px solid var(--border-color)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--primary-color)';
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--primary-subtle)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-color)';
          }}
        >
          <Code size={14} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div
        className="py-20 px-4 flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        {children}
      </div>

      {isCodeVisible && (
        <div style={{ borderTop: '1px solid var(--border-color)' }}>
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
