import { useMemo, useState } from 'react';
import { getWeekKey } from '../../utils/date';
import { groupTasksByWeek } from '../../utils/tasks';
import WeekCard from './WeekCard';

export default function WeekList({ tasks, taskActions }) {
  const weeks = useMemo(() => groupTasksByWeek(tasks), [tasks]);
  const [expandedKey, setExpandedKey] = useState(() => getWeekKey(new Date()));
  const toggle = (key) => setExpandedKey((current) => (current === key ? null : key));

  return (
    <div className="space-y-3">
      {weeks.map((week) => (
        <WeekCard key={week.key} week={week} expanded={expandedKey === week.key} onToggleExpand={toggle} taskActions={taskActions} />
      ))}
    </div>
  );
}
