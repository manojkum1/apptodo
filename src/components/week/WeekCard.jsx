import { memo } from 'react';
import TaskList from '../tasks/TaskList';
import { ChevronIcon } from '../ui/Icons';

function WeekCard({ week, expanded, onToggleExpand, taskActions }) {
  const total = week.open + week.completed;
  const progress = total ? Math.round((week.completed / total) * 100) : 0;
  const panelId = `week-${week.key}`;

  return (
    <section className="overflow-hidden rounded-md border border-ink-100 bg-white">
      <button type="button" onClick={() => onToggleExpand(week.key)} aria-expanded={expanded} aria-controls={panelId} className="block w-full p-4 text-left">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{week.isCurrent ? 'This week' : week.label}</p>
            {week.isCurrent && <p className="text-[11px] text-ink-600">{week.label}</p>}
          </div>
          <ChevronIcon className={`text-ink-600 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-sm bg-pending-bg px-3 py-2">
            <p className="text-lg font-semibold leading-none">{String(week.open).padStart(2, '0')}</p>
            <p className="mt-1 text-[10px] text-ink-600">Open tasks</p>
          </div>
          <div className="rounded-sm bg-brand-50 px-3 py-2">
            <p className="text-lg font-semibold leading-none">{String(week.completed).padStart(2, '0')}</p>
            <p className="mt-1 text-[10px] text-ink-600">Completed tasks</p>
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-[2px] bg-brand-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Week progress">
          <div className="h-full bg-brand-navy transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </button>

      {expanded && (
        <div id={panelId} className="border-t border-ink-100 px-4">
          <TaskList tasks={week.tasks} showDate emptyTitle="No tasks this week" emptyMessage="Tap + to plan something for these days." {...taskActions} />
        </div>
      )}
    </section>
  );
}

export default memo(WeekCard);
