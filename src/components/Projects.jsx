import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Github, X } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio-data";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ProjectVisual from "./ProjectVisual";

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog.close(); };
  }, []);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-content">
      <button className="dialog-close icon-button" aria-label="Close project details" onClick={onClose}><X size={22} /></button>
      <p className="eyebrow">PROJECT {project.number} / {project.discipline}</p>
      <h2 id="project-dialog-title">{project.name}</h2>
      <p className="dialog-subtitle">{project.title}</p>
      <div className="tech-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
      <h3>Behind the build</h3>
      <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      {project.github && <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> Explore the repository <ArrowUpRight size={16} /></a>}
    </div>
  </dialog>;
}

export default function Projects() {
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState(null);
  const filtered = portfolioProjects.filter((project) => filter === "All work" || project.category === filter);
  return (
    <section id="projects" className="work-section section-container section-space" aria-labelledby="work-title">
      <Reveal className="section-heading"><div><p className="eyebrow"><span className="section-number">01 /</span> SELECTED WORK</p><h2 id="work-title">Ideas made <span className="serif-accent">real.</span></h2></div><p>A few things I’ve built.<br />Each one, a different kind of challenge.</p></Reveal>
      <div className="work-toolbar"><div className="work-filters" role="group" aria-label="Filter projects">{["All work", "Systems", "AI & data", "Web3"].map((category) => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}{category === "All work" && <span>04</span>}</button>)}</div><span className="mono work-count" role="status">{String(filtered.length).padStart(2, "0")} PROJECTS</span></div>
      <div className="projects-grid">
        {filtered.map((project) => <Reveal key={project.name}>
          <article className={`project-card accent-${project.accent}`}>
            <TiltCard><button className="project-preview-button" onClick={() => setSelected(project)} aria-label={`Explore ${project.name}`}><ProjectVisual type={project.visual} /><span className="preview-open"><ArrowUpRight size={23} /></span></button></TiltCard>
            <div className="project-info"><p className="eyebrow">{project.discipline}<span>{project.number}</span></p><div className="project-title-row"><h3><button onClick={() => setSelected(project)}>{project.name}</button></h3><button className="icon-button project-details-button" onClick={() => setSelected(project)} aria-label={`View ${project.name} details`}><ArrowUpRight size={23} /></button></div><p className="project-description">{project.description}</p><div className="tech-tags">{project.stack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div></div>
          </article>
        </Reveal>)}
      </div>
      <Reveal className="work-end"><span className="mono">ALWAYS BUILDING. ALWAYS LEARNING.</span><a className="text-link" href="https://github.com/adi-swe" target="_blank" rel="noreferrer">More on GitHub <ArrowRight size={17} /></a></Reveal>
      {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
