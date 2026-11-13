import { CheckIcon } from './Icons';

/** Square checkbox from the design – blue outline, tick when checked. */
export default function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border transition ${
        checked ? 'border-brand-500 bg-white text-brand-500' : 'border-brand-500/70 bg-white text-transparent'
      }`}
    >
      <CheckIcon width={13} height={13} strokeWidth={2.6} />
    </button>
  );
}
