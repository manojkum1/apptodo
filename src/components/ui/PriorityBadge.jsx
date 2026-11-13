import { PRIORITY_OPTIONS, PRIORITY_STYLES } from '../../constants/task';

export default function PriorityBadge({ priority }) {
  if (!priority) return null;
  const label = PRIORITY_OPTIONS.find((p) => p.value === priority)?.label;
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-px text-[10px] font-medium ring-1 ring-inset ${PRIORITY_STYLES[priority]}`}>
      {label}
    </span>
  );
}
