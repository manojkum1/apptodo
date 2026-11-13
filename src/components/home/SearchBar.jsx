import { SearchIcon } from '../ui/Icons';

/** Looks like the design's search field; opens the search screen on tap. */
export default function SearchBar({ onOpen }) {
  return (
    <button type="button" onClick={onOpen} aria-label="Search for a task" className="flex w-full items-center justify-between rounded-md border border-ink-100 bg-white px-3.5 py-3 text-left text-xs text-ink-600">
      Search for a task
      <SearchIcon width={18} height={18} className="text-ink-900" />
    </button>
  );
}
