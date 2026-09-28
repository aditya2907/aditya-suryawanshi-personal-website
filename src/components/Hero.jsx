import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import Sculpture from "./Sculpture";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="home" className="hero section-container" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · DUBLIN, IE</p></Reveal>
          <Reveal delay={0.08}><h1 id="hero-title">Engineering<br />what’s <span className="serif-accent">next.</span></h1></Reveal>
          <Reveal delay={0.16}><p className="hero-intro">I’m Aditya Suryawanshi.<br /><span>I turn complex problems into thoughtful software.<br className="desktop-break" /> From distributed systems to intelligent experiences.</span></p></Reveal>
          <Reveal delay={0.22} className="hero-actions"><a href="#projects" className="button button-primary">Explore my work <ArrowUpRight size={18} /></a><a href="/Aditya_Suryawanshi_CV.pdf" download className="button button-text">Résumé <Download size={16} /></a></Reveal>
          <Reveal delay={0.3}><div className="hero-note"><span className="note-rule" /><p>BACKEND MINDSET.<br /><strong>FULL-STACK CURIOSITY.</strong></p></div></Reveal>
        </div>
        <div className="hero-art"><Sculpture /></div>
      </div>
      <div className="hero-footer"><a className="scroll-link mono" href="#projects"><span className="circle-arrow"><ArrowDown size={15} /></span>SCROLL TO DISCOVER</a><span className="mono hero-footer-note">BUILT WITH PURPOSE. DESIGNED TO EVOLVE.</span><span className="mono">PORTFOLIO — {new Date().getFullYear()}</span></div>
      <div className="expertise-strip" aria-label="Specialties"><span className="mono">WHERE I FOCUS</span><p>Backend engineering<span>✳</span>Distributed systems<span>✳</span>Machine learning<span>✳</span>Cloud infrastructure</p></div>
    </section>
  );
}
