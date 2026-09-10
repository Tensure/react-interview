import type { Task } from '../types/task';

export type StatusFilter = 'all' | 'active' | 'completed';
export type SortKey = 'createdAt' | 'dueDate';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: StatusFilter;
  sortKey: SortKey;
}

export type TaskAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; tasks: Task[] }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'UPDATE_TASK'; task: Task }
  | { type: 'TOGGLE_COMPLETE'; index: number }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SET_STATUS_FILTER'; filter: StatusFilter }
  | { type: 'SET_SORT_KEY'; sortKey: SortKey };

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  searchQuery: '',
  statusFilter: 'all',
  sortKey: 'createdAt',
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, tasks: action.tasks };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'ADD_TASK':
      return { ...state, tasks: [action.task, ...state.tasks] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.task.id ? action.task : t)),
      };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map((t, i) =>
          i === action.index ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.query };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.filter };
    case 'SET_SORT_KEY':
      return { ...state, sortKey: action.sortKey };
    default:
      return state;
  }
}
