/** Rows of zig-zag lines used as decoration on the onboarding hero. */
function ZigZag({ className }) {
  const rows = 5;
  const path = Array.from({ length: 8 }, (_, i) => `${i === 0 ? 'M' : 'L'}${i * 12} ${i % 2 ? 0 : 12}`).join(' ');
  return (
    <svg className={`absolute ${className}`} width="96" height={rows * 18} viewBox={`0 0 96 ${rows * 18}`} fill="none" aria-hidden="true">
      {Array.from({ length: rows }, (_, r) => (
        <path key={r} d={path} transform={`translate(0 ${r * 18})`} stroke="white" strokeOpacity=".28" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function OnboardingScreen({ onStart }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="relative min-h-[58dvh] flex-1 overflow-hidden bg-brand-500">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border-[14px] border-white/20" />
        <ZigZag className="left-0 top-[26%]" />
        <ZigZag className="bottom-[8%] right-4" />
      </div>

      <div className="flex flex-col bg-white px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-7">
        <h1 className="text-2xl font-semibold">Manage What To Do</h1>
        <p className="mt-2 max-w-[16rem] text-[11px] leading-relaxed text-ink-600">The best way to manage what you have to do, don’t forget your plans</p>
        <button onClick={onStart} className="btn-primary mt-14">Get Started</button>
      </div>
    </div>
  );
}
