import { useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw } from "lucide-react";
import { BOARD_WIDTH, BOARD_HEIGHT, FOOD_TARGET, gameReducer, initialGame } from "@/lib/snake-game";

const keys = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
export default function SnakeGame() {
  const [game, dispatch] = useReducer(gameReducer, undefined, initialGame);
  const board = useRef(null);
  useEffect(() => {
    if (game.status !== "playing") return;
    const interval = window.setInterval(() => dispatch({ type: "tick" }), Math.max(100, 180 - game.score * 6));
    return () => window.clearInterval(interval);
  }, [game.status, game.score]);
  useEffect(() => {
    const pause = () => dispatch({ type: "pause" });
    const visibility = () => { if (document.hidden) pause(); };
    window.addEventListener("blur", pause);
    document.addEventListener("visibilitychange", visibility);
    return () => { window.removeEventListener("blur", pause); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  function start() { dispatch({ type: "start" }); board.current?.focus({ preventScroll: true }); }
  function resume() { dispatch({ type: "resume" }); board.current?.focus({ preventScroll: true }); }
  function keydown(event) {
    const direction = keys[event.key];
    if (direction && game.status === "playing") { event.preventDefault(); dispatch({ type: "turn", direction }); }
    if (event.key === " " && ["playing", "paused"].includes(game.status)) {
      event.preventDefault();
      dispatch({ type: game.status === "playing" ? "pause" : "resume" });
    }
    if (event.key === "Escape") dispatch({ type: "pause" });
  }
  return <section className="snake-machine" aria-label="Playable Snake game" onKeyDown={keydown} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) dispatch({ type: "pause" }); }}>
    <i className="machine-screw screw-tl" aria-hidden="true">×</i><i className="machine-screw screw-tr" aria-hidden="true">×</i><i className="machine-screw screw-bl" aria-hidden="true">×</i><i className="machine-screw screw-br" aria-hidden="true">×</i>
    <div ref={board} className="snake-board" tabIndex={0} role="group" aria-label="Snake board. Use arrow keys or WASD to move, Space to pause, Escape to release." style={{ "--columns": BOARD_WIDTH, "--rows": BOARD_HEIGHT }}>
      <div className="snake-grid" aria-hidden="true" />
      {game.snake.map((part, index) => <i aria-hidden="true" key={`${part.x}-${part.y}`} className={`snake-cell ${index === 0 ? "snake-head" : ""}`} style={{ left: `${part.x / BOARD_WIDTH * 100}%`, top: `${part.y / BOARD_HEIGHT * 100}%`, opacity: Math.max(.22, 1 - index * .085) }} />)}
      {game.food && <i className="snake-food" aria-hidden="true" style={{ left: `${game.food.x / BOARD_WIDTH * 100}%`, top: `${game.food.y / BOARD_HEIGHT * 100}%` }} />}
      {game.status !== "playing" && <div className={`snake-overlay ${game.status === "ready" ? "snake-ready" : ""}`}>
        {game.status === "ready" && <><span className="game-watermark" aria-hidden="true">SNAKE<span>v.01</span></span><button className="terminal-button peach" onClick={start}>start-game</button></>}
        {game.status === "paused" && <><h2>// paused</h2><p>Take your time.</p><button className="terminal-button peach" onClick={resume}><Play size={15} /> resume</button></>}
        {game.status === "lost" && <><h2>// game over</h2><p>{game.score * 10} points. Another round?</p><button className="terminal-button peach" onClick={start}><RotateCcw size={15} /> try-again</button></>}
        {game.status === "won" && <><h2>// nicely done!</h2><p>All 10 collected.</p><Link className="terminal-button peach" to="/about-me">meet-the-engineer →</Link><button className="game-text-button" onClick={start}>play-again</button></>}
      </div>}
    </div>
    <div className="snake-controls">
      <div className="game-instructions"><p>// a little break<br />// between builds</p><p>// arrows or WASD<br />// space to pause</p><div className="arrow-pad">{[{ direction: "up", Icon: ArrowUp }, { direction: "left", Icon: ArrowLeft }, { direction: "down", Icon: ArrowDown }, { direction: "right", Icon: ArrowRight }].map(({ direction, Icon }) => <button key={direction} className={`key-${direction}`} aria-label={`Move ${direction}`} disabled={game.status !== "playing"} onClick={() => dispatch({ type: "turn", direction })}><Icon size={19} fill="currentColor" /></button>)}</div></div>
      <div className="game-score" role="status" aria-live="polite"><p>// food left: {String(FOOD_TARGET - game.score).padStart(2, "0")}</p><div className="food-progress" aria-hidden="true">{Array.from({ length: FOOD_TARGET }, (_, index) => <i key={index} className={index < FOOD_TARGET - game.score ? "remaining" : ""} />)}</div><p>// score: <span>{String(game.score * 10).padStart(3, "0")}</span></p><span className="sr-only">{game.status === "lost" ? "Game over." : game.status === "won" ? "You won!" : game.status === "paused" ? "Paused." : ""}</span></div>
      <div className="game-actions">{game.status === "playing" && <button className="game-pause" onClick={() => dispatch({ type: "pause" })}><Pause size={14} /> pause</button>}<Link className="game-skip" to="/about-me">skip <ArrowRight size={15} /></Link></div>
    </div>
  </section>;
}
