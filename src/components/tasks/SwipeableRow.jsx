import { useRef, useState } from 'react';
import { TrashIcon } from '../ui/Icons';

const ACTION_WIDTH = 84;
const SNAP_THRESHOLD = 42;

/** Swipe left to reveal a "Delete" button (touch devices). */
export default function SwipeableRow({ onDelete, children }) {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const touch = useRef({ x: 0, y: 0, base: 0, moved: false, locked: null });

  const handleStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, base: offset, moved: false, locked: null };
    setDragging(true);
  };

  const handleMove = (e) => {
    const t = e.touches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (touch.current.locked === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      touch.current.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (touch.current.locked !== 'x') return;
    touch.current.moved = true;
    setOffset(Math.max(-ACTION_WIDTH, Math.min(0, touch.current.base + dx)));
  };

  const handleEnd = () => {
    setDragging(false);
    setOffset((o) => (o < -SNAP_THRESHOLD ? -ACTION_WIDTH : 0));
  };

  // Swallow the click that follows a swipe, or close the row if it is open.
  const handleClickCapture = (e) => {
    if (touch.current.moved || offset !== 0) {
      e.stopPropagation();
      e.preventDefault();
      touch.current.moved = false;
      if (offset !== 0) setOffset(0);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <button
        type="button"
        onClick={onDelete}
        tabIndex={offset === 0 ? -1 : 0}
        className="absolute inset-y-0 right-0 flex w-[84px] flex-col items-center justify-center gap-0.5 bg-red-500 text-[11px] font-medium text-white"
      >
        <TrashIcon width={18} height={18} />
        Delete
      </button>
      <div
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onClickCapture={handleClickCapture}
        style={{ transform: `translateX(${offset}px)`, touchAction: 'pan-y' }}
        className={`relative bg-white ${dragging ? '' : 'transition-transform duration-200'}`}
      >
        {children}
      </div>
    </div>
  );
}
