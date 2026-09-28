import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import CommandPalette from "./CommandPalette";

const links = [{ label: "Work", id: "projects" }, { label: "About", id: "about" }, { label: "Experience", id: "experience" }];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#home" aria-label="Aditya Suryawanshi home" onClick={() => setOpen(false)}><span className="brand-mark">a<span>↗</span></span><span className="brand-name">ADITYA<br />SURYAWANSHI<span className="brand-dot">.</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(({ label, id }, i) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined}><span className="nav-index">0{i + 1}</span>{label}</a>)}</nav>
        <CommandPalette />
        <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
        <button ref={menuButton} className="mobile-menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...links, { label: "Contact", id: "contact" }].map(({ id, label }, i) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{label}<ArrowUpRight size={20} /></a>)}</nav>}
    </header>
  );
}
