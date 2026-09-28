const parts = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/.*$|\b(?:const|export|default|return|import|from|function|true|false|null)\b|\b\d+\b)/g;
export default function CodeBlock({ lines, label = "Code preview", className = "" }) {
  return <pre className={`editor-code ${className}`} aria-label={label}><code>{lines.map((line, index) => <span className="code-line" key={index}><span className="line-number" aria-hidden="true">{index + 1}</span><span>{line.split(parts).map((part, i) => <span key={i} className={part.startsWith("//") ? "syntax-comment" : /^["']/.test(part) ? "syntax-string" : /^(const|export|default|return|import|from|function|true|false|null)$/.test(part) ? "syntax-keyword" : /^\d+$/.test(part) ? "syntax-number" : ""}>{part || " "}</span>)}</span></span>)}</code></pre>;
}
