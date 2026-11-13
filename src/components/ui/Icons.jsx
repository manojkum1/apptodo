const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};
const make = (children) =>
  function Icon(props) {
    return (
      <svg {...base} {...props}>
        {children}
      </svg>
    );
  };

export const SearchIcon = make(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const PlusIcon = make(<path d="M12 5v14M5 12h14" />);
export const CheckIcon = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const TrashIcon = make(<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />);
export const EditIcon = make(<><path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5" /><path d="m18.5 3.5 2 2L12 14l-3 1 1-3 8.5-8.5Z" /></>);
export const ChevronIcon = make(<path d="m6 9 6 6 6-6" />);
export const CloseIcon = make(<path d="M6 6l12 12M18 6 6 18" />);
export const ArrowLeftIcon = make(<path d="M19 12H5M12 19l-7-7 7-7" />);
export const ClockIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const CalendarIcon = make(<><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M8 3v4M16 3v4M3.5 10h17" /></>);
export const CheckSquareIcon = make(<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></>);
export const XSquareIcon = make(<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="m9 9 6 6M15 9l-6 6" /></>);
