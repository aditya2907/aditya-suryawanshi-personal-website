import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy, Github, Linkedin, Mail } from "lucide-react";
import CodeBlock from "./CodeBlock";

const email = "adityams.dev@gmail.com";
export default function TerminalContact() {
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(email); setCopied(true); setStatus("Email address copied."); }
    catch { setStatus("Copy isn’t available here. You can select the email address in the sidebar."); }
  }
  function compose(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\nFrom: ${name.trim()}\nReply to: ${sender.trim()}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with a draft. Review and send it there. Nothing has been sent from this website.");
  }
  const lines = ["// a conversation is a good place to start", "", "const message = {", `  name: ${JSON.stringify(name || "Your name")},`, `  email: ${JSON.stringify(sender || "you@example.com")},`, `  message: ${JSON.stringify(message || "Let’s build something together.")}`, "};", "", "// Delivered through your own email app.", "// No form data is stored on this site."];
  return <div className="editor-layout"><aside className="editor-sidebar"><div className="sidebar-heading"><ChevronDown size={15} />contacts</div><div className="contact-sidebar-links"><a href={`mailto:${email}`}><Mail size={16} /><span>{email}</span></a><button onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "copied!" : "copy-email"}</button></div><div className="sidebar-heading contact-find"><ChevronDown size={15} />find-me-also-in</div><div className="contact-sidebar-links"><a href="https://github.com/aditya2907" target="_blank" rel="noreferrer"><Github size={16} />GitHub <ArrowUpRight size={12} /></a><a href="https://linkedin.com/in/suryawanshiaditya" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn <ArrowUpRight size={12} /></a></div><div className="sidebar-note"><span>// based in Dublin, Ireland</span><p>Interesting ideas. Challenging problems. Good conversations.</p></div></aside><section className="editor-workspace"><div className="project-list-tab"><span>new-message.ts</span><Mail size={15} /></div><div className="contact-editor"><div className="contact-form-pane"><p className="comment-label">// let’s connect</p><h1>Have something<br />in mind<span className="syntax-variable">?</span></h1><form onSubmit={compose}><label htmlFor="contact-name">_name:</label><input id="contact-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} placeholder="Your name" /><label htmlFor="contact-email">_email:</label><input type="email" id="contact-email" autoComplete="email" value={sender} onChange={(event) => setSender(event.target.value)} required maxLength={180} placeholder="you@example.com" /><label htmlFor="contact-message">_message:</label><textarea id="contact-message" value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={2000} rows={5} placeholder="Tell me what you’re thinking..." /><button className="terminal-button peach" type="submit">compose-email <ArrowUpRight size={16} /></button><p className="form-note">Opens a draft in your email app.<br />You review it and press send.</p></form><p className="contact-feedback" role="status">{status}</p></div><div className="contact-code-pane"><p className="comment-label">// your message, as code</p><CodeBlock lines={lines} label="Live preview of your message" /><div className="contact-code-bottom"><span className="status-led" /> ready when you are.</div></div></div></section></div>;
}
