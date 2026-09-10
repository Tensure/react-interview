import { useState } from 'react';
import type { Task } from '../types/task';
import { useTaskDispatch } from '../hooks/useTasks';
import { updateTask, deleteTask } from '../api/fakeApi';

interface TaskItemProps {
  task: Task;
  index: number;
}

const PRIORITY_LABEL: Record<Task['priority'], string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TaskItem({ task, index }: TaskItemProps) {
  const dispatch = useTaskDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  function handleToggle() {
    dispatch({ type: 'TOGGLE_COMPLETE', index });
  }

  async function handleDelete() {
    await deleteTask(task.id);
    dispatch({ type: 'DELETE_TASK', id: task.id });
  }

  async function handleSaveTitle() {
    const trimmed = draftTitle.trim();
    if (trimmed && trimmed !== task.title) {
      const updated = await updateTask(task.id, { title: trimmed });
      dispatch({ type: 'UPDATE_TASK', task: updated });
    }
    setIsEditing(false);
  }

  return (
    <li className={task.completed ? 'task-item task-item--done' : 'task-item'}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'complete'}`}
      />

      {isEditing ? (
        <>
          <input
            className="task-item__title-input"
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
          />
          <button type="button" className="task-item__save" onClick={handleSaveTitle}>
            Save
          </button>
        </>
      ) : (
        <span className="task-item__title" onDoubleClick={() => setIsEditing(true)}>
          {task.title}
        </span>
      )}

      <span className={`badge badge--${task.priority}`}>{PRIORITY_LABEL[task.priority]}</span>
      <span className="badge badge--category">{task.category}</span>
      <span className="task-item__due">{task.dueDate}</span>

      <button type="button" className="task-item__delete" onClick={handleDelete} aria-label="Delete task">
        ✕
      </button>
    </li>
  );
}
