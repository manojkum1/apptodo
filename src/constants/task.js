export const STATUS = Object.freeze({
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
});

export const PRIORITY = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
});

export const PRIORITY_OPTIONS = [
  { value: PRIORITY.LOW, label: 'Low' },
  { value: PRIORITY.MEDIUM, label: 'Medium' },
  { value: PRIORITY.HIGH, label: 'High' },
];

export const PRIORITY_STYLES = {
  [PRIORITY.LOW]: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  [PRIORITY.MEDIUM]: 'bg-amber-50 text-amber-700 ring-amber-200',
  [PRIORITY.HIGH]: 'bg-rose-50 text-rose-700 ring-rose-200',
};
