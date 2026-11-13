import EmptyState from '../ui/EmptyState';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, emptyTitle, emptyMessage, showDate, ...actions }) {
  if (!tasks.length) return <EmptyState title={emptyTitle} message={emptyMessage} />;
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} showDate={showDate} {...actions} />
        </li>
      ))}
    </ul>
  );
}
