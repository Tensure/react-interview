import { createContext, useEffect, useReducer, type ReactNode } from 'react';
import { fetchTasks } from '../api/fakeApi';
import { initialTaskState, taskReducer, type TaskState, type TaskAction } from './taskReducer';

export const TaskStateContext = createContext<TaskState | null>(null);
export const TaskDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'FETCH_START' });
    fetchTasks()
      .then((tasks) => {
        if (!cancelled) dispatch({ type: 'FETCH_SUCCESS', tasks });
      })
      .catch((err) => {
        if (!cancelled) dispatch({ type: 'FETCH_ERROR', error: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}
