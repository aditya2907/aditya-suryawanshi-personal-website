import { useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { ArrowUpRight, BriefcaseBusiness, FileDown, Github, Home, Mail, Search, UserRound, X } from "lucide-react";

const destinations = [
  { label: "Back to the beginning", keywords: ["home", "hero"], href: "#home", Icon: Home, hint: "01" },
  { label: "Explore selected work", keywords: ["projects", "TensorFleet", "fraud", "lending", "machine learning"], href: "#projects", Icon: BriefcaseBusiness, hint: "02" },
  { label: "Meet the engineer", keywords: ["about", "skills", "Aditya"], href: "#about", Icon: UserRound, hint: "03" },
  { label: "Experience & education", keywords: ["career", "university", "Bank of America"], href: "#experience", Icon: BriefcaseBusiness, hint: "04" },
  { label: "Start a conversation", keywords: ["contact", "email"], href: "#contact", Icon: Mail, hint: "05" },
  { label: "Download résumé", keywords: ["CV", "resume"], href: "/Aditya_Suryawanshi_CV.pdf", Icon: FileDown, download: true, hint: "PDF" },
  { label: "Open GitHub", keywords: ["code", "repositories"], href: "https://github.com/adi-swe", Icon: Github, external: true, hint: "↗" },
];

export default function CommandPalette() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const shortcut = (event) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;
      // Never stack the palette over another modal.
      if (!open && document.querySelector("dialog[open]")) return;
      event.preventDefault();
      setOpen((value) => !value);
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);

  function close() { setOpen(false); setQuery(""); }
  function navigate(item) {
    close();
    if (item.href.startsWith("#")) {
      // Wait until dialog cleanup has restored focus before focusing the destination.
      requestAnimationFrame(() => {
        const target = document.querySelector(item.href);
        if (!target) return;
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: "start" });
        history.replaceState(null, "", item.href);
      });
    } else {
      const link = document.createElement("a");
      link.href = item.href;
      if (item.download) link.download = "Aditya_Suryawanshi_CV.pdf";
      if (item.external) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
      link.click();
    }
  }

  return <>
    <button ref={trigger} className="command-trigger" onClick={() => setOpen(true)} aria-label="Open quick navigation" aria-keyshortcuts="Meta+K Control+K"><Search size={15} /><span>Quick jump</span><kbd>⌘ K</kbd></button>
    {open && <dialog ref={dialog} className="command-dialog" aria-labelledby="command-title" onCancel={(event) => { event.preventDefault(); close(); }} onClose={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <Command label="Quick navigation" loop>
        <div className="command-topline mono"><span id="command-title"><span>⌘</span> YOUR SHORTCUT THROUGH THE SITE</span><button aria-label="Close quick navigation" onClick={close}><X size={18} /></button></div>
        <div className="command-search"><Search size={20} /><Command.Input autoFocus placeholder="Where would you like to go?" value={query} onValueChange={setQuery} /></div>
        <Command.List>
          <Command.Empty>No matches. Try “projects”, “contact”, or “résumé”.</Command.Empty>
          <Command.Group heading="EXPLORE & CONNECT">
            {destinations.map((item) => <Command.Item key={item.label} value={item.label} keywords={item.keywords} onSelect={() => navigate(item)}><item.Icon size={18} /><span>{item.label}</span><span className="command-hint mono">{item.hint}</span><ArrowUpRight className="command-selected-arrow" size={17} /></Command.Item>)}
          </Command.Group>
        </Command.List>
        <div className="command-footer mono"><span><kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>
      </Command>
    </dialog>}
  </>;
}
