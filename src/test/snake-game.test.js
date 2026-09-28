import { describe, expect, it } from "vitest";
import { advanceGame, BOARD_HEIGHT, BOARD_WIDTH, gameReducer, initialGame, nextFood } from "@/lib/snake-game";

describe("Snake game rules", () => {
  it("only advances while playing", () => {
    const state = initialGame();
    expect(advanceGame(state)).toBe(state);
    const playing = gameReducer(state, { type: "start" });
    expect(advanceGame(playing).snake[0]).toEqual({ x: 8, y: 10 });
    const paused = gameReducer(playing, { type: "pause" });
    expect(advanceGame(paused)).toBe(paused);
    expect(gameReducer(paused, { type: "resume" }).status).toBe("playing");
  });
  it("rejects reversal even when two turns arrive in one frame", () => {
    const state = gameReducer(initialGame(), { type: "start" });
    const first = gameReducer(state, { type: "turn", direction: "left" });
    const second = gameReducer(first, { type: "turn", direction: "up" });
    expect(second.nextDirection).toBe("left");
    expect(advanceGame(second).snake[0]).toEqual({ x: 7, y: 9 });
  });
  it("grows on food, increases score, and never spawns food inside the snake", () => {
    const state = { ...initialGame(), status: "playing", food: { x: 8, y: 10 } };
    const next = advanceGame(state, () => 0);
    expect(next.score).toBe(1);
    expect(next.snake).toHaveLength(5);
    expect(next.snake).not.toContainEqual(next.food);
  });
  it("ends the round on a wall or body collision", () => {
    const wall = { ...initialGame(), status: "playing", snake: [{ x: 8, y: BOARD_HEIGHT - 1 }] };
    expect(advanceGame(wall).status).toBe("lost");
    const body = { ...initialGame(), status: "playing", nextDirection: "left", snake: [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 7, y: 8 }, { x: 8, y: 8 }] };
    expect(advanceGame(body).status).toBe("lost");
  });
  it("allows moving into the vacated tail cell", () => {
    const state = { ...initialGame(), status: "playing", nextDirection: "left", snake: [{ x: 8, y: 9 }, { x: 8, y: 8 }, { x: 7, y: 8 }, { x: 7, y: 9 }] };
    expect(advanceGame(state).status).toBe("playing");
  });
  it("wins at ten food and can restart cleanly", () => {
    const state = { ...initialGame(), status: "playing", score: 9, food: { x: 8, y: 10 } };
    const won = advanceGame(state, () => .5);
    expect(won.status).toBe("won");
    expect(won.score).toBe(10);
    expect(gameReducer(won, { type: "start" })).toEqual({ ...initialGame(), status: "playing" });
  });
  it("handles a full board without an infinite food-placement loop", () => {
    const full = Array.from({ length: BOARD_WIDTH * BOARD_HEIGHT }, (_, index) => ({ x: index % BOARD_WIDTH, y: Math.floor(index / BOARD_WIDTH) }));
    expect(nextFood(full)).toBeNull();
  });
});
