import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, MoveUpRight } from "lucide-react";

export default function Sculpture() {
  const host = useRef(null);
  const scene = useRef(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const enabled = useRef(false);
  enabled.current = !reducedMotion && !paused;
  useEffect(() => {
    let cancelled = false;
    let instance;
    import("@/lib/three-scene").then(({ createSculpture }) => {
      if (cancelled) return;
      try {
        instance = createSculpture(host.current, enabled.current);
        scene.current = instance;
        setReady(true);
      } catch (error) {
        if (import.meta.env.DEV) console.warn("3D preview unavailable:", error);
        setFailed(true);
      }
    }).catch((error) => {
      if (import.meta.env.DEV) console.warn("3D module unavailable:", error);
      if (!cancelled) setFailed(true);
    });
    return () => { cancelled = true; instance?.dispose(); scene.current = null; };
  }, []);
  useEffect(() => { scene.current?.setEnabled(!reducedMotion && !paused); }, [paused, reducedMotion]);
  return (
    <div className="sculpture" aria-label="Interactive metallic knot sculpture">
      <div className="scene-grid" aria-hidden="true" />
      <div className="scene-topline mono"><span><span className="tiny-cross">+</span> SYSTEMS IN MOTION</span><span>FIG. 001</span></div>
      <div className="scene-halo" aria-hidden="true" />
      {!ready && <div className="sculpture-fallback" aria-hidden="true"><i /><i /><i /></div>}
      <div ref={host} className={`scene-stage ${ready ? "is-ready" : ""}`} aria-hidden="true" />
      <div className="scene-coordinate mono" aria-hidden="true">X 53.3498°<br />Y −6.2603°</div>
      <div className="scene-caption"><span className="caption-line" /><span>Complexity, connected.</span><MoveUpRight size={14} /></div>
      <div className="scene-bottomline mono">
        <span>{failed ? "SCULPTURAL STUDY" : reducedMotion ? "STILL STUDY / REDUCED MOTION" : "MOVE YOUR CURSOR TO EXPLORE"}</span>
        {ready && !reducedMotion && <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? "Play 3D animation" : "Pause 3D animation"} aria-pressed={paused}>{paused ? <Play size={12} /> : <Pause size={12} />}{paused ? "PLAY" : "PAUSE"}</button>}
      </div>
    </div>
  );
}
