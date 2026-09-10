export type Priority = 'low' | 'medium' | 'high';

export type Category = 'work' | 'personal' | 'errands' | 'health';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  dueDate: string; // ISO date string, e.g. "2026-09-20"
  createdAt: number; // epoch ms
}

export type NewTaskInput = Omit<Task, 'id' | 'createdAt' | 'completed'>;
