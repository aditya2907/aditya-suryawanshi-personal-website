import { Cpu, Database, Layers, LockKeyhole, Network, ScanLine } from "lucide-react";

export default function ProjectVisual({ type }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-topline mono"><span>{type === "fleet" ? "TF / ORCHESTRATION" : type === "fraud" ? "FD / INTELLIGENCE" : type === "lending" ? "P2P / TRUST LAYER" : "RUL / PREDICTION"}</span><span>CONCEPT STUDY ↗</span></div>
      {type === "fleet" && <div className="fleet-diagram">
        <svg className="network-lines" viewBox="0 0 450 250"><path d="M225 70 V120 M95 160 V120 H355 V160 M225 120 V180" /><circle cx="225" cy="120" r="4" /></svg>
        <div className="system-node node-main"><Layers size={26} /><span>orchestrator</span><i /></div>
        <div className="system-node node-one"><Cpu size={21} /><span>worker_01</span></div>
        <div className="system-node node-two"><Database size={21} /><span>shared state</span></div>
        <div className="system-node node-three"><Cpu size={21} /><span>worker_02</span></div>
      </div>}
      {type === "fraud" && <div className="fraud-diagram">
        <div className="radar-orbit"><div /><div /><div /><span className="radar-dot" /></div>
        <div className="insight-panel"><ScanLine size={21} /><span className="mono">SIGNAL DETECTED</span><div className="signal-bars">{[30, 58, 44, 78, 57, 95, 68, 42, 85, 55, 35, 65].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><span className="mono">PREDICT → EXPLAIN</span></div>
      </div>}
      {type === "lending" && <div className="lending-diagram"><div className="chain-ring" /><div className="chain-ring ring-two" /><span className="chain-label mono"><LockKeyhole size={14} /> TRUST, BY DESIGN</span></div>}
      {type === "bearing" && <div className="bearing-diagram"><svg viewBox="0 0 500 220"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e7a273" stopOpacity=".25" /><stop offset="100%" stopColor="#e7a273" stopOpacity="0" /></linearGradient></defs><path d="M0 185 L25 185 L40 165 L55 182 L75 171 L95 173 L112 145 L129 163 L147 139 L167 153 L190 122 L212 144 L233 102 L253 124 L272 88 L291 107 L317 72 L340 92 L360 59 L382 75 L405 37 L430 55 L452 20 L478 34 L500 5 V220 H0Z" fill="url(#chart-fill)" /><path d="M0 185 L25 185 L40 165 L55 182 L75 171 L95 173 L112 145 L129 163 L147 139 L167 153 L190 122 L212 144 L233 102 L253 124 L272 88 L291 107 L317 72 L340 92 L360 59 L382 75 L405 37 L430 55 L452 20 L478 34 L500 5" fill="none" stroke="#e7a273" strokeWidth="2" /><path d="M0 190 Q230 150 500 8" fill="none" stroke="#ffe6ca" strokeDasharray="5 7" /></svg><span className="bearing-label mono"><Network size={15} /> FROM PATTERNS TO PREDICTIONS</span></div>}
      <div className="visual-bottomline mono"><span>{type === "fleet" ? "Go + Python + Kubernetes" : type === "fraud" ? "Ensemble models + SHAP" : type === "lending" ? "Python + Solidity + React" : "Python + Scikit-learn"}</span><span>●</span></div>
    </div>
  );
}
