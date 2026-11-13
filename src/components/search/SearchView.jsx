import { useEffect, useMemo, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { searchTasks } from '../../utils/tasks';
import { ArrowLeftIcon, SearchIcon } from '../ui/Icons';
import TaskList from '../tasks/TaskList';

export default function SearchView({ tasks, taskActions, onClose }) {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query);
  const results = useMemo(() => searchTasks(tasks, debounced), [tasks, debounced]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="px-5 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <button onClick={onClose} aria-label="Back" className="-ml-1 mb-4 rounded p-1 text-ink-900">
        <ArrowLeftIcon />
      </button>

      <div className="relative">
        <input type="search" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a task" aria-label="Search tasks" className="field pr-10 [&::-webkit-search-cancel-button]:hidden" />
        <SearchIcon width={18} height={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-900" />
      </div>

      <div className="mt-4">
        {!debounced.trim() ? (
          <p className="py-10 text-center text-xs text-ink-600">Type a keyword to find tasks by title or description.</p>
        ) : (
          <>
            <p className="mb-1 text-[11px] text-ink-600">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
            <TaskList tasks={results} showDate emptyTitle="No matching tasks" emptyMessage="Try a different keyword." {...taskActions} />
          </>
        )}
      </div>
    </div>
  );
}
