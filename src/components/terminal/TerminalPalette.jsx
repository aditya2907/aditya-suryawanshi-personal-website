import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { Search, ArrowUpRight, X } from "lucide-react";

const commands = [
  { label: "_hello", description: "Home & Snake game", path: "/", keywords: ["game", "snake", "home"] },
  { label: "_about-me", description: "The person behind the code", path: "/about-me", keywords: ["bio", "skills"] },
  { label: "_experience", description: "Work & education", path: "/experience", keywords: ["career", "university", "Bank of America"] },
  { label: "_projects", description: "Things I’ve built", path: "/projects", keywords: ["TensorFleet", "fraud", "lending", "machine learning"] },
  { label: "_uses", description: "My engineering toolkit", path: "/uses", keywords: ["tools", "stack", "Python"] },
  { label: "_contact-me", description: "Let’s build something", path: "/contact-me", keywords: ["email", "contact"] },
];
export default function TerminalPalette() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    function shortcut(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        if (!open && document.querySelector("dialog[open]")) return;
        event.preventDefault(); setOpen((current) => !current);
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const before = document.activeElement;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = overflow; before?.focus(); };
  }, [open]);
  return <>
    <button className="terminal-search-trigger" aria-label="Open command palette" aria-keyshortcuts="Meta+K Control+K" onClick={() => setOpen(true)}><Search size={16} /><span>Search...</span><kbd>⌘K</kbd></button>
    {open && <dialog className="terminal-palette" ref={dialog} aria-label="Command palette" onCancel={(event) => { event.preventDefault(); setOpen(false); }} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <Command label="Navigate the portfolio" loop>
        <div className="palette-search"><Search size={20} /><Command.Input autoFocus placeholder="Where would you like to go?" /><button className="plain-icon" aria-label="Close command palette" onClick={() => setOpen(false)}><X size={20} /></button></div>
        <Command.List><Command.Empty>// no matches. try “projects” or “contact”.</Command.Empty><Command.Group heading="// navigate">
          {commands.map((command) => <Command.Item key={command.path} value={command.label} keywords={command.keywords} onSelect={() => { setOpen(false); navigate(command.path); }}><span><strong>{command.label}</strong><small>{command.description}</small></span><ArrowUpRight size={18} /></Command.Item>)}
        </Command.Group></Command.List><div className="palette-footer"><span>↑ ↓ navigate · ↵ select</span><span>esc to close</span></div>
      </Command>
    </dialog>}
  </>;
}
