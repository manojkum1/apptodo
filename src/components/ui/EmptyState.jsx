export default function EmptyState({ title, message }) {
  return (
    <div className="flex flex-col items-center px-6 py-8 text-center">
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      {message && <p className="mt-1 max-w-xs text-xs text-ink-600">{message}</p>}
    </div>
  );
}
