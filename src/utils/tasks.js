import { STATUS } from '../constants/task';
import { formatWeekRange, getWeekKey, getWeekStart } from './date';

const byDate = (a, b) => new Date(a.dueAt) - new Date(b.dueAt);

export const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

/**
 * Groups tasks into Monday–Sunday weeks with open / completed counters.
 * The current week is always included so the home screen is never empty.
 */
export const groupTasksByWeek = (tasks) => {
  const weeks = new Map();
  const currentKey = getWeekKey(new Date());

  const ensureWeek = (key, anyDateInWeek) => {
    if (!weeks.has(key)) {
      const start = getWeekStart(anyDateInWeek);
      weeks.set(key, {
        key,
        start,
        label: formatWeekRange(start),
        isCurrent: key === currentKey,
        tasks: [],
        open: 0,
        completed: 0,
      });
    }
    return weeks.get(key);
  };

  ensureWeek(currentKey, new Date());

  tasks.forEach((task) => {
    const week = ensureWeek(getWeekKey(task.dueAt), task.dueAt);
    week.tasks.push(task);
    if (task.status === STATUS.COMPLETED) week.completed += 1;
    else week.open += 1;
  });

  return [...weeks.values()]
    .map((week) => ({ ...week, tasks: week.tasks.sort(byDate) }))
    .sort((a, b) => a.start - b.start);
};

export const searchTasks = (tasks, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tasks
    .filter(
      (t) => t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q),
    )
    .sort(byDate);
};
