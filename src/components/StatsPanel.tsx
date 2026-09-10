import { useTaskState } from '../hooks/useTasks';

export function StatsPanel() {
  const { tasks } = useTaskState();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter((t) => !t.completed && t.dueDate < today()).length;

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  return (
    <div className="stats-panel">
      <div className="stat">
        <span className="stat__value">{total}</span>
        <span className="stat__label">Total</span>
      </div>
      <div className="stat">
        <span className="stat__value">{completed}</span>
        <span className="stat__label">Completed</span>
      </div>
      <div className="stat">
        <span className="stat__value">{overdue}</span>
        <span className="stat__label">Overdue</span>
      </div>
    </div>
  );
}
