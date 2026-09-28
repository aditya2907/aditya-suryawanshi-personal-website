import { useEffect, useRef } from "react";

export default function PortfolioPointer() {
  const pointer = useRef(null);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const node = pointer.current;
    const hide = () => { node.style.opacity = "0"; };
    const move = (event) => {
      if (!media.matches || event.pointerType === "touch") return;
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      node.style.opacity = "1";
      node.dataset.interactive = Boolean(event.target.closest("a,button,input,label,textarea,[role=button]"));
    };
    const sync = () => { document.documentElement.classList.toggle("custom-pointer", media.matches); hide(); };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.documentElement.classList.remove("custom-pointer");
      media.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);
  return <div ref={pointer} className="portfolio-pointer" aria-hidden="true"><i /></div>;
}
