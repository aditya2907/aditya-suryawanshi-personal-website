import { ArrowUpRight, Braces, Database, Cloud, Workflow } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const capabilities = [
  { icon: Braces, title: "Backend & systems", text: "Python · Java · Go · C++ · REST APIs" },
  { icon: Database, title: "Data & intelligence", text: "PostgreSQL · MongoDB · Redis · Kafka · Spark · Airflow" },
  { icon: Cloud, title: "Cloud & infrastructure", text: "AWS · Google Cloud · Docker · Kubernetes" },
  { icon: Workflow, title: "End-to-end thinking", text: "React · Angular · JavaScript · TypeScript" },
];

export default function About() {
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="section-container">
        <Reveal><p className="eyebrow"><span className="section-number">02 /</span> THE PERSON BEHIND THE CODE</p></Reveal>
        <div className="about-layout">
          <Reveal className="about-copy"><h2 id="about-title">Curiosity is<br />my <span className="serif-accent">constant.</span></h2><p className="about-lead">I care about what happens<br />beneath the surface.</p><p>I’m a software engineer based in Dublin, with 3+ years of experience building backend services, data pipelines, and distributed systems. I like making complicated things work simply—and reliably.</p><p>From enterprise finance at Bank of America to machine learning infrastructure, my work lives at the intersection of thoughtful architecture and practical impact.</p><a className="text-link" href="/Aditya_Suryawanshi_CV.pdf" download>A little more about me <ArrowUpRight size={17} /></a></Reveal>
          <Reveal delay={0.1} className="about-right"><TiltCard className="principle-card"><span className="mono">MY APPROACH / 001</span><div className="isometric-stack" aria-hidden="true"><i /><i /><i /><span>✳</span></div><h3>Think deeply.<br />Build deliberately.</h3><p>Good systems start with good questions.</p><span className="principle-corner">↗</span></TiltCard></Reveal>
        </div>
        <Reveal className="impact-strip"><div><strong>3<span>+</span></strong><p>Years in engineering</p></div><div><strong>2M</strong><p>Records reconciled daily</p></div><div><strong>65<span>%</span></strong><p>Faster report generation</p></div><div><strong>50<span>+</span></strong><p>Analysts supported</p></div></Reveal>
        <div className="capability-grid">{capabilities.map(({ icon: Icon, title, text }, index) => <Reveal delay={index * 0.04} key={title}><div className="capability"><Icon size={22} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}
