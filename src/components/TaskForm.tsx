import { useState, type FormEvent } from 'react';
import type { Category, Priority } from '../types/task';
import { useTaskDispatch } from '../hooks/useTasks';
import { createTask } from '../api/fakeApi';

const CATEGORIES: Category[] = ['work', 'personal', 'errands', 'health'];
const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export function TaskForm() {
  const dispatch = useTaskDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('work');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    setSubmitting(true);
    const task = await createTask({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate,
    });
    dispatch({ type: 'ADD_TASK', task });

    setTitle('');
    setDescription('');
    setDueDate('');
    setSubmitting(false);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit" disabled={submitting}>
        Add task
      </button>
    </form>
  );
}
