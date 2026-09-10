import { useState } from 'react';
import { useTaskDispatch } from '../hooks/useTasks';
import { fetchTasks } from '../api/fakeApi';

export function SearchBar() {
  const [value, setValue] = useState('');
  const dispatch = useTaskDispatch();

  async function handleChange(next: string) {
    setValue(next);
    dispatch({ type: 'FETCH_START' });
    const tasks = await fetchTasks(next);
    dispatch({ type: 'FETCH_SUCCESS', tasks });
  }

  return (
    <input
      className="search-bar"
      type="search"
      placeholder="Search tasks..."
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      aria-label="Search tasks"
    />
  );
}
