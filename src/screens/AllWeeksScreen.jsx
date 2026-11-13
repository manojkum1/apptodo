import WeekList from '../components/week/WeekList';
import { ArrowLeftIcon } from '../components/ui/Icons';

/** "View All": every week as a summary card – tap to expand its tasks. */
export default function AllWeeksScreen({ tasks, taskActions, onBack }) {
  return (
    <div className="px-5 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <div className="mb-5 flex items-center gap-3">
        <button onClick={onBack} aria-label="Back" className="-ml-1 rounded p-1 text-ink-900">
          <ArrowLeftIcon />
        </button>
        <h1 className="text-base font-semibold">All weeks</h1>
      </div>
      <WeekList tasks={tasks} taskActions={taskActions} />
    </div>
  );
}
