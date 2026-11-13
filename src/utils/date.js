const pad = (n) => String(n).padStart(2, '0');

/** Returns the Monday (00:00 local) of the week containing `input`. */
export const getWeekStart = (input) => {
  const date = new Date(input);
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getWeekEnd = (weekStart) => {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  return end;
};

/** The seven days (Mon → Sun) of the week containing `input`. */
export const getWeekDays = (input) => {
  const start = getWeekStart(input);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

/** Stable key for a week, e.g. "2026-11-09" (the Monday). */
export const getWeekKey = (input) => toDateInput(getWeekStart(input));

export const isSameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();

/** Date -> "YYYY-MM-DD" (local), usable in <input type="date">. */
export const toDateInput = (input) => {
  const d = input ? new Date(input) : new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** Date -> "HH:mm" (local), usable in <input type="time">. */
export const toTimeInput = (input) => {
  const d = input ? new Date(input) : new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** "YYYY-MM-DD" + "HH:mm" -> ISO string. */
export const combineDateTime = (date, time) => new Date(`${date}T${time}`).toISOString();

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const weekdayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export const formatWeekRange = (weekStart) =>
  `${shortDate.format(weekStart)} – ${shortDate.format(getWeekEnd(weekStart))}`;
export const formatWeekday = (d) => weekdayShort.format(d);
export const formatDay = (d) => dayFmt.format(new Date(d));
export const formatTime = (d) => timeFmt.format(new Date(d));

/** "10:00 AM" or "10:00 AM – 11:30 AM" when the task has an end time. */
export const formatTimeRange = (task) => {
  const start = formatTime(task.dueAt);
  if (!task.endTime) return start;
  return `${start} – ${formatTime(combineDateTime(toDateInput(task.dueAt), task.endTime))}`;
};
