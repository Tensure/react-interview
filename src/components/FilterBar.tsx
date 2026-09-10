import { useTaskState, useTaskDispatch } from '../hooks/useTasks';
import type { StatusFilter, SortKey } from '../context/taskReducer';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'createdAt', label: 'Newest first' },
  { value: 'dueDate', label: 'Due date' },
];

export function FilterBar() {
  const { statusFilter, sortKey } = useTaskState();
  const dispatch = useTaskDispatch();

  return (
    <div className="filter-bar">
      <div className="filter-bar__group" role="group" aria-label="Filter by status">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={opt.value === statusFilter ? 'chip chip--active' : 'chip'}
            onClick={() => dispatch({ type: 'SET_STATUS_FILTER', filter: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <label className="filter-bar__sort">
        Sort by{' '}
        <select
          value={sortKey}
          onChange={(e) => dispatch({ type: 'SET_SORT_KEY', sortKey: e.target.value as SortKey })}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
