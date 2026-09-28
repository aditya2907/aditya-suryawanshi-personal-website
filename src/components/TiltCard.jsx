import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  function move(event) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    ref.current.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    ref.current.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
    ref.current.style.setProperty("--pointer-x", `${x * 100}%`);
    ref.current.style.setProperty("--pointer-y", `${y * 100}%`);
  }
  function reset() {
    ref.current.style.setProperty("--tilt-x", "0deg");
    ref.current.style.setProperty("--tilt-y", "0deg");
  }
  return <div ref={ref} className={`tilt-card ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}
