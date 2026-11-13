import { memo } from 'react';
import { STATUS } from '../../constants/task';
import { formatDay, formatTimeRange } from '../../utils/date';
import Checkbox from '../ui/Checkbox';
import { EditIcon, TrashIcon } from '../ui/Icons';
import PriorityBadge from '../ui/PriorityBadge';
import SwipeableRow from './SwipeableRow';

function TaskItem({ task, onToggle, onEdit, onDelete, showDate = false }) {
  const done = task.status === STATUS.COMPLETED;
  const meta = showDate ? `${formatDay(task.dueAt)}, ${formatTimeRange(task)}` : formatTimeRange(task);

  return (
    <SwipeableRow onDelete={() => onDelete(task.id)}>
      <div className="flex items-center gap-3 border-b border-ink-100 py-3.5">
        <Checkbox checked={done} onChange={() => onToggle(task.id)} label={done ? 'Mark as in progress' : 'Mark as completed'} />

        <button type="button" onClick={() => onEdit(task)} className="min-w-0 flex-1 text-left">
          <span className={`block truncate text-[13px] font-medium ${done ? 'text-ink-900 line-through' : 'text-ink-900'}`}>
            {task.title}
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-[11px] text-ink-600">
            <span className="truncate">{meta}</span>
            <PriorityBadge priority={task.priority} />
          </span>
          {task.description && <span className="mt-0.5 line-clamp-1 block text-[11px] text-ink-400">{task.description}</span>}
        </button>

        <button type="button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`} className="rounded p-1 text-ink-400 transition hover:text-red-500">
          <TrashIcon width={19} height={19} />
        </button>
        <button type="button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} className="rounded p-1 text-ink-400 transition hover:text-brand-500">
          <EditIcon width={19} height={19} />
        </button>
      </div>
    </SwipeableRow>
  );
}

export default memo(TaskItem);
