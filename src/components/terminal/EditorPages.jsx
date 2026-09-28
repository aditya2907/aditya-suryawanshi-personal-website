import { useState } from "react";
import { Link } from "react-router-dom";
import { Braces, ChevronDown, ChevronRight, FileCode2, FileText, Folder, Terminal, ArrowUpRight } from "lucide-react";
import { experiences } from "@/lib/portfolio-data";
import CodeBlock from "./CodeBlock";

function EditorLayout({ title, files, active, onSelect, children, sideNote }) {
  return <div className="editor-layout">
    <aside className="editor-sidebar"><div className="sidebar-heading"><ChevronDown size={15} />{title}</div><div className="sidebar-tree"><div className="folder-label"><ChevronDown size={15} /><Folder size={16} fill="currentColor" />portfolio</div>{files.map((file) => <button key={file.id} className={`file-link ${active === file.id ? "selected" : ""}`} aria-pressed={active === file.id} onClick={() => onSelect(file.id)}><FileCode2 size={16} /><span>{file.label}</span></button>)}</div><div className="sidebar-note"><span>// a bit of context</span><p>{sideNote}</p><a href="/Aditya_Suryawanshi_CV.pdf" download><FileText size={15} /> download-cv <ArrowUpRight size={13} /></a></div></aside>
    <section className="editor-workspace"><div className="editor-tabs" role="tablist" aria-label={`${title} files`}>{files.map((file) => <button role="tab" id={`tab-${file.id}`} aria-controls={`panel-${active}`} aria-selected={active === file.id} tabIndex={active === file.id ? 0 : -1} key={file.id} className={active === file.id ? "active" : ""} onClick={() => onSelect(file.id)} onKeyDown={(event) => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? files.length - 1 : (files.findIndex((item) => item.id === active) + (event.key === "ArrowRight" ? 1 : -1) + files.length) % files.length; onSelect(files[next].id); document.getElementById(`tab-${files[next].id}`)?.focus(); }}><FileCode2 size={15} />{file.label}{active === file.id && <span className="tab-dot" aria-hidden="true" />}</button>)}</div><div id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`} className="editor-body" tabIndex={0}>{children}</div><div className="editor-status"><span><Braces size={13} /> UTF-8</span><span>Aditya / {files.find((file) => file.id === active)?.label}</span><span>Ln 1, Col 1</span></div></section>
  </div>;
}

const aboutFiles = [{ id: "bio", label: "about-me.md" }, { id: "skills", label: "skills.json" }, { id: "approach", label: "approach.ts" }];
const bio = [
  "// Hello, I’m Aditya.", "// Software engineer. Curious by default.", "",
  "const profile = {", '  name: "Aditya Suryawanshi",', '  location: "Dublin, Ireland",', '  focus: "Backend & distributed systems",', '  experience: "3+ years in engineering",', "};", "",
  "// I like understanding how things work", "// beneath the surface, then making them", "// simpler, faster, and more reliable.", "",
  "// At Bank of America, I built APIs,", "// data pipelines, and reconciliation", "// services for enterprise finance.", "",
  "// My projects explore distributed ML,", "// explainable AI, and full-stack systems.", "",
  "// Good software starts with curiosity.", "// Great software keeps earning trust.",
];
const skills = ["{", '  "languages": [', '    "Python", "Java", "Go", "C++",', '    "JavaScript", "TypeScript", "SQL"', "  ],", '  "backend": ["Flask", "FastAPI", "REST", "gRPC"],', '  "frontend": ["React", "Angular"],', '  "data": [', '    "PostgreSQL", "MongoDB", "Redis",', '    "Kafka", "Spark", "Airflow"', "  ],", '  "cloud": ["AWS", "Google Cloud"],', '  "infrastructure": ["Docker", "Kubernetes"],', '  "ml": ["TensorFlow", "Scikit-learn", "SHAP"]', "}"];
const approach = ["// How I approach a new problem", "", "const engineering = {", '  first: "Understand the actual problem",', '  then: "Make the simplest useful version",', '  always: [', '    "Design for failure",', '    "Make systems observable",', '    "Measure before optimizing",', '    "Document the decisions"', "  ],", '  finally: "Keep learning from real use",', "};", "", "export default engineering;"];
export function TerminalAbout() {
  const [active, setActive] = useState("bio");
  return <EditorLayout title="about-me" files={aboutFiles} active={active} onSelect={setActive} sideNote="Backend mindset. Full-stack curiosity. Always interested in the next good problem."><div className="about-editor"><div><div className="document-breadcrumb">portfolio <ChevronRight size={12} /> {aboutFiles.find((file) => file.id === active).label}</div><CodeBlock lines={active === "bio" ? bio : active === "skills" ? skills : approach} label={active === "bio" ? "About Aditya" : active === "skills" ? "Technical skills" : "Engineering approach"} /></div><aside className="editor-insights"><p className="comment-label">// some things I’ve worked on</p><article className="snippet-card"><div><Terminal size={17} /><span>engineering-impact.log</span><span className="snippet-dot" /></div><p><span className="syntax-variable">2M</span> records reconciled daily</p><p><span className="syntax-variable">65%</span> faster report generation</p><p><span className="syntax-variable">50+</span> analysts supported by APIs</p><footer>Bank of America · 2022–2025</footer></article><article className="snippet-card"><div><Braces size={17} /><span>currently-exploring.ts</span></div><CodeBlock lines={['const interests = [', '  "Distributed intelligence",', '  "Reliable infrastructure",', '  "Explainable AI"', "];", "", "// ideas → systems → impact"]} /></article><Link to="/projects" className="editor-inline-link">see-the-projects <ArrowUpRight size={16} /></Link></aside></div></EditorLayout>;
}

const careerFiles = [{ id: "work", label: "experience.md" }, { id: "education", label: "education.md" }];
export function TerminalExperience() {
  const [active, setActive] = useState("work");
  return <EditorLayout title="experience" files={careerFiles} active={active} onSelect={setActive} sideNote="From enterprise finance in Mumbai to computer science in Dublin. Every chapter adds a new perspective."><div className="career-document"><p className="comment-label">// {active === "work" ? "the journey so far" : "a foundation for what comes next"}</p><h1>{active === "work" ? "Work experience" : "Education"}<span className="syntax-variable">.</span></h1>{experiences.filter((item) => item.type === (active === "work" ? "work" : "education")).map((item, index) => <article className="career-entry" key={item.title}><span className="career-index">0{index + 1}</span><div><p className="career-period">{item.period} <span>· {item.location}</span></p><h2>{item.title}</h2><p className="career-company">{item.company}</p><ul>{item.bullets.map((text) => <li key={text}>{text}</li>)}</ul><div className="terminal-tags">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></article>)}</div></EditorLayout>;
}

const usesFiles = [{ id: "backend", label: "backend.ts" }, { id: "data", label: "data-and-ai.json" }, { id: "cloud", label: "infrastructure.ts" }];
const toolkit = {
  backend: ["// Tools I’ve used to turn ideas into services.", "", "const backend = {", '  languages: ["Python", "Go", "Java"],', '  frameworks: ["Flask", "FastAPI"],', '  communication: ["REST", "gRPC"],', '  frontend: ["React", "Angular"],', "};", "", "// The right tool depends on the problem.", "// Readability and reliability come first."],
  data: ["{", '  "storage": ["PostgreSQL", "MongoDB", "Redis"],', '  "pipelines": ["Kafka", "Spark", "Airflow"],', '  "machine_learning": [', '    "TensorFlow", "Scikit-learn",', '    "XGBoost", "LightGBM", "CatBoost"', "  ],", '  "explainability": ["SHAP", "LIME"],', '  "interfaces": ["Streamlit", "React"]', "}"],
  cloud: ["// From a local build to a distributed system.", "", "const infrastructure = {", '  cloud: ["AWS", "Google Cloud"],', '  containers: "Docker",', '  orchestration: "Kubernetes",', '  metrics: "Prometheus",', '  dashboards: "Grafana",', '  objectStorage: "MinIO",', '  environment: "Linux",', "};", "", "export default infrastructure;"],
};
export function TerminalUses() {
  const [active, setActive] = useState("backend");
  return <EditorLayout title="uses" files={usesFiles} active={active} onSelect={setActive} sideNote="A toolkit, not a shopping list. These are technologies from my engineering work and projects."><div className="toolkit-document"><p className="comment-label">// tools of the trade</p><h1>My engineering toolkit<span className="syntax-variable">.</span></h1><p className="document-intro">Different problems. Different tools. The same attention to what happens underneath.</p><CodeBlock lines={toolkit[active]} label="Engineering toolkit" /><Link className="editor-inline-link" to="/projects">see-them-in-action <ArrowUpRight size={16} /></Link></div></EditorLayout>;
}
