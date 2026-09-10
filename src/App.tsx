import { TaskProvider } from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';
import { SearchBar } from './components/SearchBar';
import { TaskList } from './components/TaskList';
import { StatsPanel } from './components/StatsPanel';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <header className="app__header">
          <h1>TaskFlow</h1>
          <StatsPanel />
        </header>

        <main className="app__main">
          <TaskForm />
          <SearchBar />
          <FilterBar />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
