import type { Task } from '../types/task';
import type { StatusFilter, SortKey } from '../context/taskReducer';

export function filterByStatus(tasks: Task[], filter: StatusFilter): Task[] {
  if (filter === 'active') return tasks.filter((t) => !t.completed);
  if (filter === 'completed') return tasks.filter((t) => t.completed);
  return tasks;
}

export function sortTasks(tasks: Task[], sortKey: SortKey): Task[] {
  const copy = [...tasks];
  if (sortKey === 'dueDate') {
    copy.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  } else {
    copy.sort((a, b) => b.createdAt - a.createdAt);
  }
  return copy;
}
