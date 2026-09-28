import { useEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { Github, Linkedin, Menu, X, GitBranch, ArrowUpRight } from "lucide-react";
import TerminalPalette from "./TerminalPalette";
import PortfolioPointer from "./PortfolioPointer";

const pages = [
  { path: "/about-me", label: "_about-me" }, { path: "/blog", label: "_blog" },
  { path: "/projects", label: "_projects" }, { path: "/uses", label: "_uses" },
];
export default function TerminalPortfolio() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const main = useRef(null);
  const menuButton = useRef(null);
  useEffect(() => {
    setMenu(false);
    document.title = `${pathname === "/" ? "Aditya Suryawanshi" : (pathname.slice(1).replaceAll("-", " ") + " | Aditya Suryawanshi")} | Software Engineer`;
    main.current?.scrollTo?.({ top: 0 });
    window.scrollTo({ top: 0 });
    main.current?.focus({ preventScroll: true });
  }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const escape = (event) => { if (event.key === "Escape") { setMenu(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  return <div className="terminal-shell">
    <PortfolioPointer />
    <a className="terminal-skip" href="#portfolio-content">Skip to content</a>
    <header className="terminal-header">
      <NavLink className="terminal-brand" to="/" aria-label="Aditya home"><span>aditya<span className="brand-at">@dev</span>:~$</span><i aria-hidden="true" /></NavLink>
      <nav className="terminal-desktop-nav" aria-label="Main navigation">{pages.map((page) => <NavLink key={page.path} to={page.path}>{page.label}</NavLink>)}</nav>
      <div className="header-end"><TerminalPalette /><NavLink className="header-contact" to="/contact-me">_contact-me</NavLink><button ref={menuButton} className="terminal-menu-button" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="terminal-mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X size={22} /> : <Menu size={22} />}</button></div>
    </header>
    {menu && <nav id="terminal-mobile-nav" className="terminal-mobile-nav" aria-label="Mobile navigation">{[{ path: "/", label: "_hello" }, ...pages, { path: "/contact-me", label: "_contact-me" }].map((page) => <NavLink key={page.path} to={page.path} end={page.path === "/"} onClick={() => setMenu(false)}>{page.label}<ArrowUpRight size={16} /></NavLink>)}</nav>}
    <main ref={main} id="portfolio-content" className="terminal-main" tabIndex={-1}><Outlet /></main>
    <footer className="terminal-footer"><span className="footer-find">find me on:</span><a className="footer-social" href="https://linkedin.com/in/suryawanshiaditya" target="_blank" rel="noreferrer" aria-label="Aditya on LinkedIn"><Linkedin size={18} /></a><a className="footer-social" href="https://github.com/adi-swe" target="_blank" rel="noreferrer" aria-label="Aditya on GitHub"><Github size={19} /></a><span className="footer-branch"><GitBranch size={13} /> always-learning</span><a className="reference-credit" href="https://valentinacalabrese.com/" target="_blank" rel="noreferrer">design reference <ArrowUpRight size={12} /><span className="sr-only">: Valentina Calabrese</span></a><a className="footer-handle" href="https://github.com/adi-swe" target="_blank" rel="noreferrer">@adi-swe <Github size={19} /></a></footer>
  </div>;
}

export function TerminalNotFound() {
  return <section className="terminal-not-found"><span className="syntax-comment">// this path hasn’t been built yet</span><h1>404<span className="terminal-caret" /></h1><p>Page not found.</p><Link className="terminal-button peach" to="/">cd ~ <ArrowUpRight size={16} /></Link></section>;
}
