import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, FileText, Folder, Terminal, BookOpen } from "lucide-react";
import { experiences } from "@/lib/portfolio-data";
import CodeBlock from "./CodeBlock";

function Console() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  function run(event) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    setInput("");
    if (command === "clear") { setHistory([]); return; }
    const paths = { projects: "/projects", contact: "/contact-me", blog: "/blog", uses: "/uses" };
    if (paths[command]) { navigate(paths[command]); return; }
    const replies = { help: "help · whoami · skills · projects · blog · uses · contact · clear", whoami: "Aditya Suryawanshi — software engineer based in Dublin, Ireland.", skills: "Python · Go · Java · React · SQL · Docker · Kubernetes · Machine Learning" };
    if (command) setHistory((items) => [...items, { command: input, reply: replies[command] || `Command not found: ${input}. Type help to explore.` }].slice(-30));
  }
  return <section className="profile-console" aria-label="Interactive portfolio terminal"><h2><Terminal size={17} /> Terminal</h2><div className="console-content"><p>Welcome to AdityaOS v1.0.0</p><p>Type ‘help’ to explore the portfolio.</p><div role="log" aria-live="polite">{history.map((entry, i) => <div className="console-entry" key={i}><p>aditya@dev:~$ {entry.command}</p><p>{entry.reply}</p></div>)}</div><form onSubmit={run}><label htmlFor="portfolio-command">aditya@dev:~$</label><input id="portfolio-command" aria-label="Terminal command" autoComplete="off" spellCheck={false} value={input} onChange={(e) => setInput(e.target.value)} /></form></div></section>;
}
const introduction = ["", "/**", " * ABOUT ME", " *", " * Hi, I’m Aditya Suryawanshi.", " * I’m a software engineer based in Dublin,", " * working across backend systems, data, and AI.", " *", " * I enjoy understanding how systems work", " * beneath the surface — and making them", " * simpler, faster, and more reliable.", " *", " * At Bank of America, I worked on APIs,", " * reconciliation services, and data workflows", " * for enterprise risk and finance technology.", " *", " * My projects explore distributed machine", " * learning, explainable AI, and full-stack", " * applications with real engineering depth.", " *", " * I care about thoughtful architecture,", " * clear interfaces, and the small decisions", " * that make software easier to maintain.", " *", " * Always curious. Always building.", " */"];
export function ProfileAbout() {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState({ education: true, work: true });
  const selected = experiences.find((entry) => entry.title === active);
  const lines = selected ? ["", "/**", ` * ${selected.title}`, ` * ${selected.company}`, ` * ${selected.period}`, ` * ${selected.location}`, " */", "", ...selected.bullets.flatMap((text) => ["// " + text, ""])] : introduction;
  return <div className="profile-layout"><aside className="editor-sidebar"><button className="sidebar-heading" onClick={() => setActive(null)}><ChevronDown size={15} /> personal-info</button>{["education", "work"].map((group) => <div key={group}><button className={`profile-folder folder-${group}`} aria-expanded={open[group]} onClick={() => setOpen((state) => ({ ...state, [group]: !state[group] }))}>{open[group] ? <ChevronDown size={15} /> : <ChevronRight size={15} />}<Folder size={15} fill="currentColor" />{group}</button>{open[group] && experiences.filter((entry) => entry.type === group).map((entry, i) => <button className={`file-link ${active === entry.title ? "selected" : ""}`} key={entry.title} onClick={() => setActive(entry.title)}><FileText size={14} /><span>{group === "education" ? i === 0 ? "masters" : "bachelors" : ["software-engineer", "technology-associate", "ml-intern"][i]}</span></button>)}</div>)}</aside><section className="profile-document"><CodeBlock lines={lines} label="About Aditya" /></section><Console /></div>;
}
const configurations = {
  "editor.json": ['{', '  "editor": "Visual Studio Code",', '  "font": "Fira Code",', '  "terminal": "zsh",', '  "browser": "Google Chrome",', '  "version_control": "Git"', '}'],
  "backend.yaml": ['languages:', '  - Python', '  - Go', '  - Java', '', 'frameworks:', '  - Flask', '  - FastAPI', '', 'interfaces:', '  - REST', '  - gRPC', '', 'frontend:', '  - React', '  - Angular'],
  "infrastructure.json": ['{', '  "cloud": ["AWS", "Google Cloud"],', '  "containers": "Docker",', '  "orchestration": "Kubernetes",', '  "storage": ["PostgreSQL", "MongoDB", "Redis"],', '  "pipelines": ["Kafka", "Spark", "Airflow"],', '  "observability": ["Prometheus", "Grafana"],', '  "machine_learning": ["TensorFlow", "Scikit-learn"]', '}']
};
export function ProfileUses() {
  const [active, setActive] = useState("editor.json");
  const [open, setOpen] = useState(true);
  return <div className="editor-layout config-layout"><aside className="editor-sidebar"><div className="sidebar-heading"><ChevronDown size={15} />uses</div><button className="profile-folder folder-education" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}<Folder size={15} fill="currentColor" /> config</button>{open && Object.keys(configurations).map((name) => <button className={`file-link ${active === name ? "selected" : ""}`} key={name} onClick={() => setActive(name)}><FileText size={14} />{name}</button>)}</aside><section className="editor-workspace"><div className="config-tab"><FileText size={14} />{active}</div><CodeBlock lines={configurations[active]} label="Engineering toolkit" /></section></div>;
}
export function ProfileBlog() {
  return <section className="blog-page"><header className="blog-banner"><span className="blog-orbit" aria-hidden="true" /><h1>Blog Posts</h1></header><div className="blog-empty"><BookOpen size={34} strokeWidth={1.2} /><p className="syntax-variable">// the next chapter is being written</p><h2>No posts published yet.</h2><p>Until then, explore the systems and experiments in my project collection.</p><Link className="terminal-button" to="/projects">explore-projects →</Link></div></section>;
}
