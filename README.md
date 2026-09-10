# TaskFlow

A small task-management app (React + TypeScript + Vite), used as a live-coding exercise.

## Setup

Requirements: Node 20+.

```bash
npm install
npm run dev       # starts the app at http://localhost:5173
npm test          # runs the test suite (some tests fail on purpose — see TASKS.md)
```

No API keys, no database, no external services required. Everything runs in memory in the browser, including the simulated backend.

## Project layout

```
src/
  api/            simulated backend (in-memory, with realistic network latency)
  components/     UI components
  context/        global state (React context + useReducer)
  hooks/          custom hooks
  types/          shared TypeScript types
  utils/          filtering/sorting helpers
  test/           test suite (vitest + React Testing Library)
```

## Your task

See [TASKS.md](./TASKS.md).
