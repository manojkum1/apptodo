import { useEffect } from 'react';
import { CloseIcon } from './Icons';

/** Bottom sheet (as in the "Add New Task" design) – centred dialog on wider screens. */
export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 animate-fadeIn bg-black/45" onClick={onClose} />
      <div className="relative max-h-[94dvh] w-full max-w-md animate-sheetUp overflow-y-auto bg-white px-5 pb-6 pt-5 shadow-2xl sm:rounded-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="-mr-1 rounded p-1 text-ink-900 hover:bg-ink-100">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
