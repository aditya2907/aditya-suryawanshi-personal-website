export const BOARD_WIDTH = 18;
export const BOARD_HEIGHT = 24;
export const FOOD_TARGET = 10;
export const DIRECTIONS = {
  up: { x: 0, y: -1 }, down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
};

export function initialGame() {
  return {
    snake: [{ x: 8, y: 9 }, { x: 8, y: 8 }, { x: 8, y: 7 }, { x: 8, y: 6 }],
    direction: "down", nextDirection: "down", food: { x: 12, y: 16 },
    score: 0, status: "ready",
  };
}

export function nextFood(snake, random = Math.random) {
  const free = [];
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (!snake.some((part) => part.x === x && part.y === y)) free.push({ x, y });
    }
  }
  return free.length ? free[Math.min(Math.floor(random() * free.length), free.length - 1)] : null;
}

export function advanceGame(state, random = Math.random) {
  if (state.status !== "playing") return state;
  const direction = state.nextDirection;
  const delta = DIRECTIONS[direction];
  const head = { x: state.snake[0].x + delta.x, y: state.snake[0].y + delta.y };
  const eating = head.x === state.food.x && head.y === state.food.y;
  const body = eating ? state.snake : state.snake.slice(0, -1);
  const collision = head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT || body.some((p) => p.x === head.x && p.y === head.y);
  if (collision) return { ...state, status: "lost" };
  const snake = [head, ...state.snake];
  if (!eating) snake.pop();
  const score = state.score + (eating ? 1 : 0);
  const food = eating ? nextFood(snake, random) : state.food;
  return { ...state, snake, direction, score, food, status: score >= FOOD_TARGET || !food ? "won" : "playing" };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case "start": return { ...initialGame(), status: "playing" };
    case "tick": return advanceGame(state);
    case "pause": return state.status === "playing" ? { ...state, status: "paused" } : state;
    case "resume": return state.status === "paused" ? { ...state, status: "playing" } : state;
    case "turn": {
      if (state.status !== "playing" || !DIRECTIONS[action.direction]) return state;
      const current = DIRECTIONS[state.direction];
      const next = DIRECTIONS[action.direction];
      if (current.x + next.x === 0 && current.y + next.y === 0) return state;
      return { ...state, nextDirection: action.direction };
    }
    default: return state;
  }
}
