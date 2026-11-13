export default function WeeklyProgress({ percent }) {
  return (
    <section aria-labelledby="progress-heading">
      <h2 id="progress-heading" className="text-base font-semibold">Weekly Progress</h2>
      <div className="mt-3 h-3 overflow-hidden rounded-[2px] bg-brand-200" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Weekly progress">
        <div className="h-full bg-brand-navy transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
