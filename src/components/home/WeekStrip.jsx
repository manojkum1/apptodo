import { formatWeekday, isSameDay } from '../../utils/date';

/** Mon → Sun day picker. A dot under a day means it has tasks. */
export default function WeekStrip({ days, selected, daysWithTasks, onSelect }) {
  return (
    <div className="grid grid-cols-7 gap-1" role="tablist" aria-label="Days of this week">
      {days.map((day) => {
        const active = isSameDay(day, selected);
        const hasTasks = daysWithTasks.has(day.toDateString());
        return (
          <button
            key={day.toISOString()}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(day)}
            className={`flex flex-col items-center rounded-[3px] py-2 transition ${active ? 'bg-brand-500 text-white' : 'text-ink-400 hover:bg-brand-50'}`}
          >
            <span className="text-[9px]">{formatWeekday(day)}</span>
            <span className={`mt-1 text-base font-medium ${active ? 'text-white' : 'text-ink-400'}`}>{String(day.getDate()).padStart(2, '0')}</span>
            <span className={`mt-1 h-1 w-1 rounded-full ${hasTasks ? (active ? 'bg-white' : 'bg-brand-500') : 'bg-transparent'}`} />
          </button>
        );
      })}
    </div>
  );
}
