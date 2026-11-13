import { useMemo, useState } from 'react';
import SearchBar from '../components/home/SearchBar';
import StatCards from '../components/home/StatCards';
import WeekStrip from '../components/home/WeekStrip';
import WeeklyProgress from '../components/home/WeeklyProgress';
import TaskList from '../components/tasks/TaskList';
import { PlusIcon } from '../components/ui/Icons';
import { formatDay, getWeekDays, getWeekKey, isSameDay } from '../utils/date';
import { groupTasksByWeek } from '../utils/tasks';

export default function HomeScreen({ tasks, taskActions, onSearch, onViewAll, onAdd }) {
  const [selected, setSelected] = useState(() => new Date());
  const days = useMemo(() => getWeekDays(new Date()), []);

  const week = useMemo(() => {
    const key = getWeekKey(new Date());
    return groupTasksByWeek(tasks).find((w) => w.key === key);
  }, [tasks]);

  const daysWithTasks = useMemo(() => new Set(week.tasks.map((t) => new Date(t.dueAt).toDateString())), [week]);
  const dayTasks = useMemo(() => week.tasks.filter((t) => isSameDay(t.dueAt, selected)), [week, selected]);

  const total = week.open + week.completed;
  const percent = total ? Math.round((week.completed / total) * 100) : 0;
  const isToday = isSameDay(selected, new Date());

  return (
    <div className="px-5 pb-28 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <SearchBar onOpen={onSearch} />

      <div className="mt-5">
        <WeekStrip days={days} selected={selected} daysWithTasks={daysWithTasks} onSelect={setSelected} />
      </div>

      <div className="mt-6">
        <StatCards completed={week.completed} pending={week.open} />
      </div>

      <div className="mt-6">
        <WeeklyProgress percent={percent} />
      </div>

      <section className="mt-6" aria-labelledby="tasks-heading">
        <div className="flex items-center justify-between">
          <h2 id="tasks-heading" className="text-base font-semibold">{isToday ? 'Tasks Today' : `Tasks · ${formatDay(selected)}`}</h2>
          <button onClick={onViewAll} className="text-xs font-medium text-brand-500">View All</button>
        </div>
        <div className="mt-1">
          <TaskList tasks={dayTasks} emptyTitle="No tasks for this day" emptyMessage="Tap the + button to add one." {...taskActions} />
        </div>
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-md justify-center pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <button onClick={() => onAdd(selected)} aria-label="Add task" className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-700 active:scale-95">
          <PlusIcon width={26} height={26} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}
