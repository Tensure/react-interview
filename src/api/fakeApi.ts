import type { Task, NewTaskInput } from '../types/task';
import { seedTasks } from '../data/seedTasks';

// In-memory "database". A real backend would live behind a real network call;
// this simulates one, latency included, so client code has to handle async
// state the same way it would against a real API.
let db: Task[] = seedTasks.map((t) => ({ ...t }));

function randomLatency(): number {
  return 150 + Math.random() * 500;
}

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), randomLatency()));
}

export async function fetchTasks(query?: string): Promise<Task[]> {
  const q = (query ?? '').trim().toLowerCase();
  const results = q
    ? db.filter(
        (t) =>
          t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      )
    : db;
  return delay(results.map((t) => ({ ...t })));
}

export async function createTask(input: NewTaskInput): Promise<Task> {
  const task: Task = {
    ...input,
    id: `t${Date.now()}${Math.floor(Math.random() * 1000)}`,
    completed: false,
    createdAt: Date.now(),
  };
  db = [task, ...db];
  return delay({ ...task });
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task> {
  db = db.map((t) => (t.id === id ? { ...t, ...patch } : t));
  const updated = db.find((t) => t.id === id);
  if (!updated) throw new Error(`Task ${id} not found`);
  return delay({ ...updated });
}

export async function deleteTask(id: string): Promise<void> {
  db = db.filter((t) => t.id !== id);
  return delay(undefined);
}
