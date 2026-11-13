import { CheckSquareIcon, XSquareIcon } from '../ui/Icons';

function Stat({ tone, icon, label, value }) {
  const styles =
    tone === 'done'
      ? { card: 'bg-brand-50', badge: 'bg-brand-200 text-brand-500 border-brand-500/60' }
      : { card: 'bg-pending-bg', badge: 'bg-red-200/70 text-pending-icon border-pending-icon/70' };
  return (
    <div className={`rounded-sm p-3.5 ${styles.card}`}>
      <div className="flex items-center gap-2">
        <span className={`flex h-7 w-7 items-center justify-center rounded-[3px] border ${styles.badge}`}>{icon}</span>
        <span className="text-[11px] text-ink-900">{label}</span>
      </div>
      <p className="mt-2 flex items-baseline gap-1.5">
        <span className="text-xl font-semibold leading-none">{String(value).padStart(2, '0')}</span>
        <span className="text-[9px] text-ink-600">This Week</span>
      </p>
    </div>
  );
}

export default function StatCards({ completed, pending }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Stat tone="done" label="Task Complete" value={completed} icon={<CheckSquareIcon width={16} height={16} />} />
      <Stat tone="pending" label="Task Pending" value={pending} icon={<XSquareIcon width={16} height={16} />} />
    </div>
  );
}
