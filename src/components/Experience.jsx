import { ArrowUpRight, Plus } from "lucide-react";
import { experiences } from "@/lib/portfolio-data";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="experience-section section-container section-space" aria-labelledby="experience-title">
      <Reveal className="section-heading"><div><p className="eyebrow"><span className="section-number">03 /</span> THE JOURNEY SO FAR</p><h2 id="experience-title">Built on <span className="serif-accent">experience.</span></h2></div><a className="text-link" href="/Aditya_Suryawanshi_CV.pdf" download>Full résumé <ArrowUpRight size={17} /></a></Reveal>
      <div className="experience-layout"><p className="mono experience-label">01—03 / EXPERIENCE</p><div className="experience-list">{experiences.filter((item) => item.type === "work").map((item, index) => <Reveal key={item.title} delay={index * 0.04}><details className="experience-item" open={index === 0}><summary><span className="experience-date mono">{item.period}</span><span className="experience-role"><strong>{item.title}</strong><span>{item.company.split(" - ")[0]} <span className="experience-location">/ {item.location}</span></span></span><Plus className="expand-icon" size={20} /></summary><div className="experience-details">{item.company.includes(" - ") && <p className="experience-department">{item.company.split(" - ")[1]}</p>}<ul>{item.bullets.map((text) => <li key={text}>{text}</li>)}</ul><div className="tech-tags">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div></details></Reveal>)}</div></div>
      <div className="experience-layout education-layout"><p className="mono experience-label">04—05 / EDUCATION</p><div className="education-grid">{experiences.filter((item) => item.type === "education").map((item) => <Reveal key={item.title}><article className="education-card"><p className="mono">{item.period}</p><h3>{item.company}</h3><p>{item.title}</p><span className="education-location">{item.location}</span><details><summary>Coursework <Plus size={14} /></summary><ul>{item.bullets.map((text) => <li key={text}>{text}</li>)}</ul></details></article></Reveal>)}</div></div>
    </section>
  );
}
