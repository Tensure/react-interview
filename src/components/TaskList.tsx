import { useTaskState } from '../hooks/useTasks';
import { filterByStatus, sortTasks } from '../utils/filterSort';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const { tasks, statusFilter, sortKey, loading } = useTaskState();

  const visibleTasks = sortTasks(filterByStatus(tasks, statusFilter), sortKey);

  if (loading && tasks.length === 0) {
    return <p className="task-list__empty">Loading tasks...</p>;
  }

  if (visibleTasks.length === 0) {
    return <p className="task-list__empty">No tasks match your filters.</p>;
  }

  return (
    <ul className="task-list">
      {visibleTasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} />
      ))}
    </ul>
  );
}
