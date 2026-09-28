import { useState } from "react";
import { ArrowUpRight, ArrowUp, Copy, Check } from "lucide-react";
import Reveal from "./Reveal";

const email = "adityams.dev@gmail.com";
export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied to clipboard.");
    } catch { setCopyStatus("Select the email address above to copy it, or open it to email me."); }
  }
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="section-container">
        <Reveal className="contact-topline"><p className="eyebrow"><span className="section-number">04 /</span> GOOD THINGS START WITH A CONVERSATION</p><span className="contact-star" aria-hidden="true">✳</span></Reveal>
        <Reveal><h2 id="contact-title">Have something<br />in <span className="serif-accent">mind?</span><a href={`mailto:${email}`} className="contact-arrow" aria-label="Start a conversation by email"><ArrowUpRight strokeWidth={1} /></a></h2></Reveal>
        <Reveal className="contact-bottom"><div><p>Interesting ideas. Challenging problems. New possibilities.<br />I’d love to hear what you’re thinking.</p><div className="email-row"><a href={`mailto:${email}`}>{email}</a><button className="icon-button" onClick={copyEmail} aria-label="Copy email address">{copyStatus.startsWith("Email copied") ? <Check size={18} /> : <Copy size={18} />}</button></div><p className="copy-status" role="status">{copyStatus}</p></div><div className="contact-socials"><a href="https://github.com/adi-swe" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a><a href="https://linkedin.com/in/suryawanshiaditya" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={17} /></a><a href="/Aditya_Suryawanshi_CV.pdf" download>Résumé <ArrowUpRight size={17} /></a></div></Reveal>
        <footer className="site-footer"><a className="footer-brand" href="#home">aditya<span aria-hidden="true">↗</span></a><p className="mono">© {new Date().getFullYear()} ADITYA SURYAWANSHI</p><a className="back-top mono" href="#home">BACK TO TOP <ArrowUp size={15} /></a></footer>
      </div>
    </section>
  );
}
