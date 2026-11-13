import { useState } from 'react';
import { PRIORITY_OPTIONS } from '../../constants/task';
import { combineDateTime, toDateInput, toTimeInput } from '../../utils/date';
import { CalendarIcon, ClockIcon } from '../ui/Icons';
import Modal from '../ui/Modal';

const Label = ({ htmlFor, children, optional }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-xs text-ink-600">
    {children}
    {optional && <span className="ml-1 text-ink-400">(optional)</span>}
  </label>
);

const Error = ({ children }) => <p className="mt-1 text-[11px] font-medium text-red-500">{children}</p>;

/** Add / edit form. Pass `task` to edit; `defaultDate` pre-fills the date when creating. */
export default function TaskForm({ task, defaultDate, onSubmit, onClose }) {
  const isEdit = Boolean(task);
  const [values, setValues] = useState({
    title: task?.title ?? '',
    description: task?.description ?? '',
    date: toDateInput(task?.dueAt ?? defaultDate),
    start: toTimeInput(task?.dueAt),
    end: task?.endTime ?? '',
    priority: task?.priority ?? '',
  });
  const [errors, setErrors] = useState({});

  const setField = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = 'Enter a title for the task.';
    if (!values.date) next.date = 'Pick a date.';
    if (!values.start) next.start = 'Pick a start time.';
    if (values.end && values.start && values.end <= values.start) next.end = 'End time must be after the start.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      dueAt: combineDateTime(values.date, values.start),
      endTime: values.end || null,
      priority: values.priority || null,
    });
    onClose();
  };

  return (
    <Modal title={isEdit ? 'Edit Task' : 'Add New Task'} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        <div>
          <Label htmlFor="title">Task title</Label>
          <input id="title" className="field" placeholder="Doing Homework" value={values.title} onChange={setField('title')} autoFocus maxLength={120} aria-invalid={Boolean(errors.title)} />
          {errors.title && <Error>{errors.title}</Error>}
        </div>

        <div>
          <Label>Set Time</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="relative">
                <ClockIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-900" />
                <input id="start" type="time" aria-label="Start time" className="field picker relative pl-9" value={values.start} onChange={setField('start')} />
              </div>
              {errors.start && <Error>{errors.start}</Error>}
            </div>
            <div>
              <div className="relative">
                <ClockIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-900" />
                <input id="end" type="time" aria-label="End time (optional)" className="field picker relative pl-9" value={values.end} onChange={setField('end')} />
              </div>
              {errors.end && <Error>{errors.end}</Error>}
            </div>
          </div>
          <p className="mt-1 text-[11px] text-ink-400">Start time is required; end time is optional.</p>
        </div>

        <div>
          <Label htmlFor="date">Set Date</Label>
          <div className="relative">
            <input id="date" type="date" className="field picker relative pr-10" value={values.date} onChange={setField('date')} aria-invalid={Boolean(errors.date)} />
            <CalendarIcon width={16} height={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-900" />
          </div>
          {errors.date && <Error>{errors.date}</Error>}
        </div>

        <div>
          <Label htmlFor="description" optional>Description</Label>
          <textarea id="description" rows={3} className="field resize-none" placeholder="Add Description" value={values.description} onChange={setField('description')} maxLength={500} />
        </div>

        <fieldset>
          <legend className="mb-1.5 text-xs text-ink-600">
            Priority <span className="text-ink-400">(optional)</span>
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {PRIORITY_OPTIONS.map(({ value, label }) => {
              const active = values.priority === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setValues((v) => ({ ...v, priority: active ? '' : value }))}
                  className={`rounded-md border px-3 py-2 text-xs font-medium transition ${
                    active ? 'border-brand-500 bg-brand-500 text-white' : 'border-ink-100 bg-white text-ink-600 hover:border-brand-500'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button type="submit" className="btn-primary !mt-5">
          {isEdit ? 'Save changes' : 'Create task'}
        </button>
      </form>
    </Modal>
  );
}
