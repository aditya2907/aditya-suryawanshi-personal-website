import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import SnakeGame from "./SnakeGame";

const roles = ["Software Engineer", "Backend Developer", "Systems Thinker", "ML Enthusiast"];
function Role() {
  const reduced = useReducedMotion();
  const [role, setRole] = useState(0);
  const [letters, setLetters] = useState(roles[0].length);
  const [erasing, setErasing] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => {
      if (!erasing && letters === roles[role].length) setErasing(true);
      else if (erasing && letters === 0) { setRole((value) => (value + 1) % roles.length); setErasing(false); }
      else setLetters((value) => value + (erasing ? -1 : 1));
    }, !erasing && letters === roles[role].length ? 2200 : erasing ? 40 : 85);
    return () => clearTimeout(timer);
  }, [reduced, role, letters, erasing]);
  return <div className="hero-role" aria-label="Software Engineer, Backend Developer, Systems Thinker, ML Enthusiast"><span aria-hidden="true">&gt; </span><span className="role-text" aria-hidden="true">{reduced ? roles[0] : roles[role].slice(0, letters)}</span><span className="terminal-caret" aria-hidden="true" /></div>;
}
export default function TerminalHome() {
  return <div className="terminal-home">
    <div className="home-glow glow-mint" aria-hidden="true" /><div className="home-glow glow-blue" aria-hidden="true" />
    <div className="home-dots" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <section className="terminal-intro" aria-labelledby="intro-title">
      <p className="intro-greeting">Hello, all. I’m</p>
      <h1 id="intro-title">Aditya<span className="name-dot">.</span></h1>
      <Role />
      <div className="intro-code"><p className="syntax-comment">// building systems that make a difference</p><p className="syntax-comment">// based in Dublin, Ireland</p><p className="github-code"><span className="syntax-keyword">const</span> <span className="syntax-variable">githubLink</span> = <a href="https://github.com/adi-swe" target="_blank" rel="noreferrer">"github.com/adi-swe"</a>;</p></div>
      <div className="intro-actions"><Link to="/projects" className="terminal-button">explore-my-work <ArrowUpRight size={17} /></Link><a className="resume-link" href="/Aditya_Suryawanshi_CV.pdf" download>download-cv <ArrowDownRight size={16} /></a></div>
    </section>
    <div className="home-game"><div className="game-eyebrow"><span>01 / AFTER HOURS</span><span>play a little. stay a while.</span></div><SnakeGame /></div>
    <div className="home-status"><span><i /> Dublin, IE</span><span>backend · distributed systems · machine learning</span><span>press <kbd>⌘ K</kbd> to explore</span></div>
  </div>;
}
