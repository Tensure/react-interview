import { useContext } from 'react';
import { TaskStateContext, TaskDispatchContext } from '../context/TaskContext';

export function useTaskState() {
  const ctx = useContext(TaskStateContext);
  if (!ctx) throw new Error('useTaskState must be used within a TaskProvider');
  return ctx;
}

export function useTaskDispatch() {
  const ctx = useContext(TaskDispatchContext);
  if (!ctx) throw new Error('useTaskDispatch must be used within a TaskProvider');
  return ctx;
}
